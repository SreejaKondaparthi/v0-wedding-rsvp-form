import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, isAttending, familyMembers } = body
    
    console.log("[v0] RSVP POST received:", { name, isAttending, familyMembers })

    if (!name) {
      console.log("[v0] Name is missing")
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      )
    }

    const supabase = await createClient()
    console.log("[v0] Supabase client created")

    // Check if guest already exists by name (case insensitive)
    const { data: existingGuest, error: lookupError } = await supabase
      .from("guests")
      .select("*")
      .ilike("name", name.trim())
      .single()

    console.log("[v0] Existing guest lookup:", { existingGuest, lookupError })

    if (existingGuest) {
      console.log("[v0] Found existing guest, returning for update")
      return NextResponse.json({
        existing: true,
        guest: existingGuest
      })
    }

    // Insert new guest
    console.log("[v0] Inserting new guest...")
    const { data: newGuest, error } = await supabase
      .from("guests")
      .insert({
        name: name.trim(),
        is_attending: isAttending,
        family_members: isAttending ? familyMembers : 0
      })
      .select()
      .single()

    console.log("[v0] Insert result:", { newGuest, error })

    if (error) {
      console.error("[v0] Supabase insert error:", error)
      return NextResponse.json(
        { error: "Failed to save RSVP: " + error.message },
        { status: 500 }
      )
    }

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
    const { id, name, isAttending, familyMembers } = body

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
        name: name.trim(),
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
