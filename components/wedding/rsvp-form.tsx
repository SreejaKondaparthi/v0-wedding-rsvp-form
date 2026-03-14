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

export function RSVPForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isAttending, setIsAttending] = useState<string>("yes")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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
          email: formData.email,
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
        toast.success("Thank you! Your RSVP has been submitted. A confirmation email will be sent shortly.")
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
          email: formData.email,
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
      <Card className="max-w-md mx-auto bg-card border-2 border-wedding-gold/30">
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
          <p className="text-sm text-muted-foreground">
            A confirmation email will be sent to your email address.
          </p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSubmitted(false)
              setExistingGuest(null)
              setFormData({ name: "", email: "", familyMembers: "1" })
            }}
            className="border-wedding-gold text-wedding-cocoa hover:bg-wedding-gold/10"
          >
            Submit Another RSVP
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-md mx-auto bg-card border-2 border-wedding-gold/30">
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
              <FieldLabel htmlFor="email">Email Address</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
