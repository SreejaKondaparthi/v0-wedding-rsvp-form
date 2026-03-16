import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { password } = await request.json()
    
    // Get admin password from environment variable
    const adminPassword = process.env.ADMIN_PASSWORD
    
    if (!adminPassword) {
      console.error("ADMIN_PASSWORD environment variable not set")
      return NextResponse.json(
        { error: "Admin access not configured" },
        { status: 500 }
      )
    }
    
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
