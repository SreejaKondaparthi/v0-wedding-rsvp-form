"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { toast } from "sonner"
import { Calendar } from "lucide-react"

// Generate calendar file content for the wedding event
function generateICSContent() {
  const eventTitle = "Priyanka & Harish Wedding"
  const eventDescription = "Wedding Ceremony and Muhurtham at ICC, Tampa, FL. Muhurtham at 8:20 AM."
  const eventLocation = "ICC, Tampa, FL"
  const startDate = "20260426T070000" // April 26, 2026 7:00 AM
  const endDate = "20260426T140000" // April 26, 2026 2:00 PM
  
  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Priyanka & Harish Wedding//EN
BEGIN:VEVENT
UID:priyanka-harish-wedding-2026@wedding.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${startDate}
DTEND:${endDate}
SUMMARY:${eventTitle}
DESCRIPTION:${eventDescription}
LOCATION:${eventLocation}
STATUS:CONFIRMED
BEGIN:VALARM
TRIGGER:-P7D
ACTION:DISPLAY
DESCRIPTION:Reminder: Priyanka & Harish Wedding in 1 week!
END:VALARM
BEGIN:VALARM
TRIGGER:-P1D
ACTION:DISPLAY
DESCRIPTION:Reminder: Priyanka & Harish Wedding is tomorrow!
END:VALARM
END:VEVENT
END:VCALENDAR`
}

function downloadCalendarFile() {
  const icsContent = generateICSContent()
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'priyanka-harish-wedding.ics'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
  toast.success("Calendar event downloaded! Open the file to add it to your calendar.")
}

// Generate Google Calendar URL
function getGoogleCalendarUrl() {
  const title = encodeURIComponent("Priyanka & Harish Wedding")
  const details = encodeURIComponent("Wedding Ceremony and Muhurtham at ICC, Tampa, FL. Muhurtham at 8:20 AM.")
  const location = encodeURIComponent("ICC, Tampa, FL")
  const startDate = "20260426T070000"
  const endDate = "20260426T140000"
  
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`
}

export function RSVPForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isAttending, setIsAttending] = useState<string>("yes")
  const [formData, setFormData] = useState({
    name: "",
    familyMembers: "1"
  })
  const [submitted, setSubmitted] = useState(false)
  const [existingGuest, setExistingGuest] = useState<{
    id: string
    name: string
    is_attending: boolean
    family_members: number
  } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          isAttending: isAttending === "yes",
          familyMembers: isAttending === "yes" ? parseInt(formData.familyMembers) : 0
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit RSVP")
      }

      if (data.existing) {
        setExistingGuest(data.guest)
        toast.info("We found your existing RSVP. You can update it below.")
      } else {
        setSubmitted(true)
        toast.success("Thank you! Your RSVP has been submitted.")
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdate = async () => {
    if (!existingGuest) return
    setIsLoading(true)

    try {
      const response = await fetch("/api/rsvp", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: existingGuest.id,
          name: formData.name,
          isAttending: isAttending === "yes",
          familyMembers: isAttending === "yes" ? parseInt(formData.familyMembers) : 0
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to update RSVP")
      }

      setSubmitted(true)
      toast.success("Your RSVP has been updated successfully!")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  if (submitted) {
    return (
      <Card className="max-w-md mx-auto bg-card/95 border-2 border-wedding-gold/30">
        <CardContent className="pt-8 pb-8 text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-wedding-gold/20 flex items-center justify-center">
            <svg className="w-8 h-8 text-wedding-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-wedding-cocoa">Thank You!</h3>
          <p className="text-foreground">
            {isAttending === "yes" 
              ? "We are excited to celebrate with you and your family!"
              : "We will miss you, but thank you for letting us know."
            }
          </p>
          
          {isAttending === "yes" && (
            <div className="pt-4 space-y-3">
              <p className="text-sm text-wedding-cocoa font-medium">Add to your calendar:</p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={downloadCalendarFile}
                  className="border-wedding-gold text-wedding-cocoa hover:bg-wedding-gold/10"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Download .ics
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="border-wedding-gold text-wedding-cocoa hover:bg-wedding-gold/10"
                >
                  <a href={getGoogleCalendarUrl()} target="_blank" rel="noopener noreferrer">
                    <Calendar className="w-4 h-4 mr-2" />
                    Google Calendar
                  </a>
                </Button>
              </div>
            </div>
          )}
          
          <Button 
            variant="outline" 
            onClick={() => {
              setSubmitted(false)
              setExistingGuest(null)
              setFormData({ name: "", familyMembers: "1" })
            }}
            className="border-wedding-gold text-wedding-cocoa hover:bg-wedding-gold/10 mt-4"
          >
            Submit Another RSVP
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-md mx-auto bg-card/95 border-2 border-wedding-gold/30">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-wedding-cocoa">RSVP</CardTitle>
        <CardDescription>
          {existingGuest 
            ? "Update your response below"
            : "Please let us know if you can join us"
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Your Name</FieldLabel>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="border-wedding-gold/30 focus:border-wedding-gold"
              />
            </Field>

            <Field>
              <FieldLabel>Will you be joining us?</FieldLabel>
              <RadioGroup
                value={isAttending}
                onValueChange={setIsAttending}
                className="flex gap-6 pt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="yes" />
                  <Label htmlFor="yes" className="cursor-pointer">Yes, I will attend</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="no" />
                  <Label htmlFor="no" className="cursor-pointer">Sorry, cannot attend</Label>
                </div>
              </RadioGroup>
            </Field>

            {isAttending === "yes" && (
              <Field>
                <FieldLabel htmlFor="familyMembers">Number of Guests (including yourself)</FieldLabel>
                <Input
                  id="familyMembers"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.familyMembers}
                  onChange={(e) => setFormData({ ...formData, familyMembers: e.target.value })}
                  required
                  className="border-wedding-gold/30 focus:border-wedding-gold w-24"
                />
              </Field>
            )}
          </FieldGroup>

          {existingGuest ? (
            <Button 
              type="button"
              onClick={handleUpdate}
              disabled={isLoading}
              className="w-full bg-wedding-red hover:bg-wedding-maroon text-primary-foreground"
            >
              {isLoading ? <Spinner className="mr-2" /> : null}
              Update RSVP
            </Button>
          ) : (
            <Button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-wedding-red hover:bg-wedding-maroon text-primary-foreground"
            >
              {isLoading ? <Spinner className="mr-2" /> : null}
              Submit RSVP
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
