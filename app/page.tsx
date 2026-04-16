import { GaneshaHeader } from "@/components/wedding/ganesha-header"
import { CoupleNames } from "@/components/wedding/couple-names"
import { EventTimeline } from "@/components/wedding/event-timeline"
import { DecorativeBorder } from "@/components/wedding/decorative-border"
import { RSVPForm } from "@/components/wedding/rsvp-form"
import Image from "next/image"

export default function WeddingPage() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Beautiful Wedding Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/images/wedding-background.jpeg"
          alt="Wedding decoration background with marigold garlands, bells, and lotus flowers"
          fill
          className="object-cover object-center"
          priority
          quality={75}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 pb-16">
        {/* Ganesha Header */}
        <GaneshaHeader />

        <DecorativeBorder />

        {/* Couple Names & Family Info */}
        <CoupleNames />

        <DecorativeBorder />

        {/* Save the Date */}
        <section className="text-center py-10">
          <p className="text-lg text-wedding-cocoa tracking-[0.3em] uppercase mb-3 font-medium">
            Save the Date
          </p>
          <div className="relative inline-block">
            <p className="text-5xl md:text-6xl font-bold text-wedding-cocoa">
              April 26, 2026
            </p>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-wedding-gold to-transparent" />
          </div>
          <p className="text-xl text-wedding-gold mt-6 font-medium">
            Tampa, Florida
          </p>
          
        </section>

        {/* Event Timeline */}
        <EventTimeline />

        <DecorativeBorder />
        
        {/* RSVP Section */}
        <section className="py-12 px-4" id="rsvp">
          <h2 className="text-3xl md:text-4xl font-semibold text-center text-wedding-cocoa mb-2">
            Join Our Celebration
          </h2>
          <p className="text-center text-wedding-cocoa/70 mb-8 max-w-md mx-auto">
            Please let us know if you can attend. You can update your response anytime if your plans change.
          </p>
          <RSVPForm />
        </section>

        <DecorativeBorder />

        {/* Footer */}
        <footer className="text-center py-8 border-t border-wedding-gold/20 mt-8">
          <p className="text-wedding-gold font-[var(--font-script)] text-3xl mb-2">
            Priyanka & Harish
          </p>
          <p className="text-wedding-cocoa/80 text-base">
            We cannot wait to celebrate with you!
          </p>
        </footer>
      </div>
    </main>
  )
}
