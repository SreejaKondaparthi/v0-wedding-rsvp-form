import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { password } = body
    
    console.log("[v0] Admin verify - received password:", password)
    console.log("[v0] Admin verify - expected password:", process.env.ADMIN_PASSWORD || "priyanka2026")
    
    // Get admin password from environment variable, with fallback default
    const adminPassword = process.env.ADMIN_PASSWORD || "priyanka2026"
    
    const isMatch = password === adminPassword
    console.log("[v0] Admin verify - password match:", isMatch)
    
    if (isMatch) {
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
