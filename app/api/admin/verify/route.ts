import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { password } = body
    
    // Get admin password from environment variable, with fallback default
    const adminPassword = process.env.ADMIN_PASSWORD || "priyanka2026"
    
    if (password === adminPassword) {
      return NextResponse.json({ success: true })
    }
    
    return NextResponse.json(
      { error: "Invalid password" },
      { status: 401 }
    )
  } catch (error) {
    console.error("Admin verification error:", error)
    return NextResponse.json(
      { error: "Verification failed" },
      { status: 500 }
    )
  }
}
