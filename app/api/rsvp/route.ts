import { put, list, get } from "@vercel/blob"
import { NextRequest, NextResponse } from "next/server"

const GUESTS_FILE = "wedding-guests.json"

interface Guest {
  id: string
  name: string
  is_attending: boolean
  family_members: number
  created_at: string
  updated_at: string
}

// Helper to get guests from Blob
async function getGuests(): Promise<Guest[]> {
  try {
    const result = await get(GUESTS_FILE, { access: "private" })
    
    if (!result) {
      return []
    }
    
    const text = await result.text()
    const guests = JSON.parse(text)
    return guests as Guest[]
  } catch (error) {
    // File doesn't exist yet or other error - return empty array
    return []
  }
}

// Helper to save guests to Blob
async function saveGuests(guests: Guest[]): Promise<void> {
  await put(GUESTS_FILE, JSON.stringify(guests, null, 2), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json"
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, isAttending, familyMembers } = body

    if (!name) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      )
    }

    const guests = await getGuests()

    // Check if guest already exists by name (case insensitive)
    const existingGuest = guests.find(
      g => g.name.toLowerCase() === name.trim().toLowerCase()
    )

    if (existingGuest) {
      return NextResponse.json({
        existing: true,
        guest: existingGuest
      })
    }

    // Create new guest
    const newGuest: Guest = {
      id: crypto.randomUUID(),
      name: name.trim(),
      is_attending: isAttending,
      family_members: isAttending ? familyMembers : 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    guests.push(newGuest)
    await saveGuests(guests)

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

    const guests = await getGuests()
    const guestIndex = guests.findIndex(g => g.id === id)

    if (guestIndex === -1) {
      return NextResponse.json(
        { error: "Guest not found" },
        { status: 404 }
      )
    }

    // Update guest
    guests[guestIndex] = {
      ...guests[guestIndex],
      name: name.trim(),
      is_attending: isAttending,
      family_members: isAttending ? familyMembers : 0,
      updated_at: new Date().toISOString()
    }

    await saveGuests(guests)

    return NextResponse.json({
      success: true,
      guest: guests[guestIndex]
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
    const guests = await getGuests()

    // Sort by created_at descending
    guests.sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )

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
