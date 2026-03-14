import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, isAttending, familyMembers } = body

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Check if guest already exists
    const { data: existingGuest } = await supabase
      .from("guests")
      .select("*")
      .eq("email", email.toLowerCase())
      .single()

    if (existingGuest) {
      return NextResponse.json({
        existing: true,
        guest: existingGuest
      })
    }

    // Insert new guest
    const { data: newGuest, error } = await supabase
      .from("guests")
      .insert({
        name,
        email: email.toLowerCase(),
        is_attending: isAttending,
        family_members: isAttending ? familyMembers : 0
      })
      .select()
      .single()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json(
        { error: "Failed to save RSVP" },
        { status: 500 }
      )
    }

    // Trigger confirmation email (async, don't wait)
    fetch(`${request.nextUrl.origin}/api/send-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "confirmation",
        guestId: newGuest.id
      })
    }).catch(console.error)

    return NextResponse.json({
      success: true,
      guest: newGuest
    })
  } catch (error) {
    console.error("RSVP error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, name, email, isAttending, familyMembers } = body

    if (!id) {
      return NextResponse.json(
        { error: "Guest ID is required" },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    const { data: updatedGuest, error } = await supabase
      .from("guests")
      .update({
        name,
        email: email.toLowerCase(),
        is_attending: isAttending,
        family_members: isAttending ? familyMembers : 0
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json(
        { error: "Failed to update RSVP" },
        { status: 500 }
      )
    }

    // Trigger update confirmation email
    fetch(`${request.nextUrl.origin}/api/send-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "update",
        guestId: updatedGuest.id
      })
    }).catch(console.error)

    return NextResponse.json({
      success: true,
      guest: updatedGuest
    })
  } catch (error) {
    console.error("RSVP update error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const supabase = await createClient()

    const { data: guests, error } = await supabase
      .from("guests")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json(
        { error: "Failed to fetch guests" },
        { status: 500 }
      )
    }

    const attending = guests.filter(g => g.is_attending)
    const notAttending = guests.filter(g => !g.is_attending)
    const totalGuests = attending.reduce((sum, g) => sum + (g.family_members || 1), 0)

    return NextResponse.json({
      guests,
      stats: {
        totalResponses: guests.length,
        attending: attending.length,
        notAttending: notAttending.length,
        totalGuests
      }
    })
  } catch (error) {
    console.error("GET guests error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
