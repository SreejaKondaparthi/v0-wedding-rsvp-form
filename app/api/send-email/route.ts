import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

// Email templates
function getConfirmationEmail(guest: { name: string; is_attending: boolean; family_members: number }) {
  const attending = guest.is_attending
  return {
    subject: "Wedding RSVP Confirmation - Priyanka & Harish",
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #FDF8F3;">
        <div style="text-align: center; padding: 20px; border-bottom: 2px solid #D4A574;">
          <h1 style="color: #5C2018; margin: 0;">Priyanka & Harish</h1>
          <p style="color: #8B4513; margin-top: 10px;">Wedding Celebration</p>
        </div>
        
        <div style="padding: 30px 20px;">
          <p style="color: #333; font-size: 16px;">Dear ${guest.name},</p>
          
          ${attending ? `
            <p style="color: #333; font-size: 16px;">
              Thank you for confirming your attendance! We are thrilled that you${guest.family_members > 1 ? ` and your ${guest.family_members - 1} guest(s)` : ''} will be joining us.
            </p>
            
            <div style="background: #FFF; border: 1px solid #D4A574; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h3 style="color: #5C2018; margin-top: 0;">Event Schedule</h3>
              
              <p style="margin: 10px 0;"><strong>April 24, 2026</strong></p>
              <ul style="color: #333; padding-left: 20px;">
                <li>Mehandi: 9 AM - 1 PM @ Home</li>
                <li>Sangeeth: 5 PM - 10:30 PM @ Cory Lakes, Tampa</li>
              </ul>
              
              <p style="margin: 10px 0;"><strong>April 25, 2026</strong></p>
              <ul style="color: #333; padding-left: 20px;">
                <li>Haldi: 9 AM - 12 PM @ Home</li>
                <li>Pelli Kuturu & Pelli Koduku: 2:30 PM - 6:30 PM @ Home</li>
              </ul>
              
              <p style="margin: 10px 0;"><strong>April 26, 2026</strong></p>
              <ul style="color: #333; padding-left: 20px;">
                <li>Muhurtham: 8:20 AM</li>
                <li>Wedding Ceremony: 7 AM - 2 PM @ ICC, Tampa, FL</li>
              </ul>
            </div>
          ` : `
            <p style="color: #333; font-size: 16px;">
              We understand you won't be able to join us. Thank you for letting us know. You will be missed!
            </p>
            <p style="color: #333; font-size: 16px;">
              If your plans change, you can always update your RSVP on our website.
            </p>
          `}
          
          <p style="color: #333; font-size: 16px; margin-top: 30px;">
            With love and blessings,<br/>
            <strong>Kondaparthi & Vavilalla Families</strong>
          </p>
        </div>
        
        <div style="text-align: center; padding: 20px; border-top: 2px solid #D4A574; color: #8B4513; font-size: 14px;">
          <p>April 24-26, 2026 | Tampa, FL</p>
        </div>
      </div>
    `
  }
}

function getReminderEmail(guest: { name: string; family_members: number }, daysUntil: string) {
  return {
    subject: `Reminder: Priyanka & Harish Wedding - ${daysUntil}`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #FDF8F3;">
        <div style="text-align: center; padding: 20px; border-bottom: 2px solid #D4A574;">
          <h1 style="color: #5C2018; margin: 0;">Reminder</h1>
          <p style="color: #8B4513; margin-top: 10px;">Priyanka & Harish Wedding</p>
        </div>
        
        <div style="padding: 30px 20px;">
          <p style="color: #333; font-size: 16px;">Dear ${guest.name},</p>
          
          <p style="color: #333; font-size: 16px;">
            This is a friendly reminder that the wedding celebrations are ${daysUntil}!
          </p>
          
          <p style="color: #333; font-size: 16px;">
            We${guest.family_members > 1 ? `, along with your ${guest.family_members - 1} guest(s),` : ''} can't wait to see you there.
          </p>
          
          <div style="background: #FFF; border: 1px solid #D4A574; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h3 style="color: #5C2018; margin-top: 0;">Quick Reference</h3>
            <p><strong>Main Ceremony:</strong> April 26, 2026</p>
            <p><strong>Muhurtham:</strong> 8:20 AM</p>
            <p><strong>Venue:</strong> ICC, Tampa, FL</p>
          </div>
          
          <p style="color: #333; font-size: 16px; margin-top: 30px;">
            See you soon!<br/>
            <strong>Kondaparthi & Vavilalla Families</strong>
          </p>
        </div>
      </div>
    `
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, guestId } = body

    const supabase = await createClient()

    // Get guest details
    const { data: guest, error: guestError } = await supabase
      .from("guests")
      .select("*")
      .eq("id", guestId)
      .single()

    if (guestError || !guest) {
      return NextResponse.json(
        { error: "Guest not found" },
        { status: 404 }
      )
    }

    let emailContent
    let updateField: string

    switch (type) {
      case "confirmation":
      case "update":
        emailContent = getConfirmationEmail(guest)
        updateField = "confirmation_sent_at"
        break
      case "reminder_week":
        emailContent = getReminderEmail(guest, "in one week")
        updateField = "reminder_week_sent_at"
        break
      case "reminder_day":
        emailContent = getReminderEmail(guest, "tomorrow")
        updateField = "reminder_day_sent_at"
        break
      default:
        return NextResponse.json(
          { error: "Invalid email type" },
          { status: 400 }
        )
    }

    // In production, integrate with an email service like Resend, SendGrid, etc.
    // For now, we'll just log and update the tracking field
    console.log(`[EMAIL] Sending ${type} email to ${guest.email}:`, emailContent.subject)

    // Update the sent timestamp
    await supabase
      .from("guests")
      .update({ [updateField]: new Date().toISOString() })
      .eq("id", guestId)

    return NextResponse.json({
      success: true,
      message: `${type} email queued for ${guest.email}`
    })
  } catch (error) {
    console.error("Send email error:", error)
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    )
  }
}

// Endpoint to trigger reminders (can be called by a cron job)
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  
  // Simple auth check for cron jobs - in production use a proper secret
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    // Allow without auth in development
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
  }

  try {
    const supabase = await createClient()

    // Get all attending guests
    const { data: guests } = await supabase
      .from("guests")
      .select("*")
      .eq("is_attending", true)

    if (!guests) {
      return NextResponse.json({ message: "No guests to remind" })
    }

    const weddingDate = new Date("2026-04-24")
    const now = new Date()
    const daysUntilWedding = Math.ceil((weddingDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

    let remindersQueued = 0

    for (const guest of guests) {
      // Week reminder (7 days before)
      if (daysUntilWedding === 7 && !guest.reminder_week_sent_at) {
        await fetch(`${request.nextUrl.origin}/api/send-email`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "reminder_week", guestId: guest.id })
        })
        remindersQueued++
      }

      // Day before reminder (1 day before)
      if (daysUntilWedding === 1 && !guest.reminder_day_sent_at) {
        await fetch(`${request.nextUrl.origin}/api/send-email`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "reminder_day", guestId: guest.id })
        })
        remindersQueued++
      }
    }

    return NextResponse.json({
      success: true,
      daysUntilWedding,
      remindersQueued
    })
  } catch (error) {
    console.error("Reminder check error:", error)
    return NextResponse.json(
      { error: "Failed to process reminders" },
      { status: 500 }
    )
  }
}
