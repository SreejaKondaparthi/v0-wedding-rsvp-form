import { GaneshaHeader } from "@/components/wedding/ganesha-header"
import { CoupleNames } from "@/components/wedding/couple-names"
import { EventTimeline } from "@/components/wedding/event-timeline"
import { DecorativeBorder, MandalaCorner } from "@/components/wedding/decorative-border"
import { RSVPForm } from "@/components/wedding/rsvp-form"
import { GuestListButton } from "@/components/wedding/guest-list"

export default function WeddingPage() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Decorative Corner Elements */}
      <MandalaCorner className="absolute top-0 left-0" />
      <MandalaCorner className="absolute top-0 right-0 rotate-90" />
      <MandalaCorner className="absolute bottom-0 left-0 -rotate-90" />
      <MandalaCorner className="absolute bottom-0 right-0 rotate-180" />

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 pb-16">
        {/* Ganesha Header */}
        <GaneshaHeader />

        <DecorativeBorder />

        {/* Couple Names & Family Info */}
        <CoupleNames />

        <DecorativeBorder />

        {/* Save the Date */}
        <section className="text-center py-8">
          <p className="text-lg text-muted-foreground tracking-wide uppercase mb-2">
            Save the Date
          </p>
          <p className="text-4xl md:text-5xl font-semibold text-wedding-maroon">
            April 24 - 26, 2026
          </p>
          <p className="text-xl text-wedding-gold mt-2">
            Tampa, Florida
          </p>
        </section>

        <DecorativeBorder />

        {/* Event Timeline */}
        <EventTimeline />

        <DecorativeBorder />

        {/* RSVP Section */}
        <section className="py-12 px-4" id="rsvp">
          <h2 className="text-3xl md:text-4xl font-semibold text-center text-wedding-maroon mb-2">
            Join Our Celebration
          </h2>
          <p className="text-center text-muted-foreground mb-8 max-w-md mx-auto">
            Please let us know if you can attend. You can update your response anytime if your plans change.
          </p>
          <RSVPForm />
        </section>

        {/* Admin Section */}
        <section className="py-8 text-center">
          <GuestListButton />
        </section>

        {/* Footer */}
        <footer className="text-center py-8 border-t border-wedding-gold/20 mt-8">
          <p className="text-wedding-gold font-[var(--font-script)] text-2xl mb-2">
            Priyanka & Harish
          </p>
          <p className="text-muted-foreground text-sm">
            We cannot wait to celebrate with you!
          </p>
        </footer>
      </div>
    </main>
  )
}
