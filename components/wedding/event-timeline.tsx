import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, ExternalLink } from "lucide-react"

// Mandap with decorations for Wedding Ceremony
function MandapIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-16 h-16">
      {/* Mandap pillars */}
      <rect x="8" y="24" width="6" height="32" fill="#d4a574" rx="1" />
      <rect x="50" y="24" width="6" height="32" fill="#d4a574" rx="1" />
      
      {/* Mandap roof/canopy */}
      <path d="M4 24 L32 8 L60 24 L56 28 L32 14 L8 28 Z" fill="#c9302c" />
      <path d="M8 28 L32 14 L56 28 L52 32 L32 20 L12 32 Z" fill="#d4574a" />
      
      {/* Decorative toran/garland on top */}
      <path d="M12 26 Q22 32, 32 26 Q42 32, 52 26" stroke="#f59e0b" strokeWidth="3" fill="none" />
      <circle cx="22" cy="29" r="3" fill="#ff9800" />
      <circle cx="32" cy="26" r="3" fill="#ff9800" />
      <circle cx="42" cy="29" r="3" fill="#ff9800" />
      
      {/* Mango leaves */}
      <path d="M18 30 Q16 34, 14 30 Q16 28, 18 30" fill="#4a7c59" />
      <path d="M46 30 Q48 34, 50 30 Q48 28, 46 30" fill="#4a7c59" />
      
      {/* Flower garlands on pillars */}
      <circle cx="11" cy="32" r="2" fill="#e91e63" opacity="0.8" />
      <circle cx="11" cy="38" r="2" fill="#ff9800" opacity="0.8" />
      <circle cx="11" cy="44" r="2" fill="#e91e63" opacity="0.8" />
      <circle cx="53" cy="32" r="2" fill="#e91e63" opacity="0.8" />
      <circle cx="53" cy="38" r="2" fill="#ff9800" opacity="0.8" />
      <circle cx="53" cy="44" r="2" fill="#e91e63" opacity="0.8" />
      
      {/* Base platform */}
      <rect x="4" y="54" width="56" height="6" fill="#8b4513" rx="2" />
      <rect x="6" y="52" width="52" height="4" fill="#a0522d" rx="1" />
      
      {/* Sacred fire in center */}
      <path d="M32 42 Q28 48, 30 52 Q32 48, 32 54 Q32 48, 34 52 Q36 48, 32 42" fill="#f59e0b" />
      <path d="M32 44 Q30 48, 31 50 L32 52 L33 50 Q34 48, 32 44" fill="#fbbf24" />
    </svg>
  )
}

// Couple in Mandap for Muhurtham
function CoupleInMandapIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-16 h-16">
      {/* Simple mandap frame */}
      <rect x="6" y="20" width="4" height="36" fill="#d4a574" rx="1" />
      <rect x="54" y="20" width="4" height="36" fill="#d4a574" rx="1" />
      <path d="M4 20 L32 6 L60 20 L56 24 L32 12 L8 24 Z" fill="#c9302c" />
      
      {/* Decorative toran */}
      <path d="M10 22 Q32 30, 54 22" stroke="#f59e0b" strokeWidth="2" fill="none" />
      
      {/* Bride (left) */}
      <circle cx="24" cy="34" r="6" fill="#ffd5c8" /> {/* Face */}
      <path d="M18 34 Q24 26, 30 34" fill="#c9302c" /> {/* Hair/pallu */}
      <circle cx="24" cy="32" r="1" fill="#f59e0b" /> {/* Bindi */}
      <path d="M18 40 L18 54 Q24 56, 30 54 L30 40 Q24 42, 18 40" fill="#c9302c" /> {/* Saree */}
      <path d="M20 54 L20 56 L28 56 L28 54" fill="#d4a574" /> {/* Feet */}
      {/* Bride jewelry */}
      <circle cx="22" cy="36" r="1" fill="#f59e0b" />
      <circle cx="26" cy="36" r="1" fill="#f59e0b" />
      
      {/* Groom (right) */}
      <circle cx="40" cy="34" r="6" fill="#e8c4a0" /> {/* Face */}
      <path d="M34 30 Q40 28, 46 30 L46 32 L34 32 Z" fill="#412920" /> {/* Hair */}
      <path d="M34 40 L34 54 Q40 56, 46 54 L46 40 Q40 42, 34 40" fill="#f5f5dc" /> {/* Dhoti/kurta */}
      <path d="M34 40 L46 40 L46 44 L34 44 Z" fill="#f59e0b" /> {/* Uttariya/shawl */}
      <path d="M36 54 L36 56 L44 56 L44 54" fill="#d4a574" /> {/* Feet */}
      
      {/* Joined hands (thaali tying moment) */}
      <ellipse cx="32" cy="46" rx="4" ry="2" fill="#ffd5c8" />
      <path d="M30 44 Q32 42, 34 44" stroke="#f59e0b" strokeWidth="1.5" fill="none" /> {/* Mangalsutra */}
      
      {/* Flower petals around */}
      <circle cx="16" cy="48" r="2" fill="#e91e63" opacity="0.6" />
      <circle cx="48" cy="48" r="2" fill="#ff9800" opacity="0.6" />
      <circle cx="32" cy="52" r="2" fill="#e91e63" opacity="0.6" />
      
      {/* Base */}
      <rect x="4" y="54" width="56" height="6" fill="#8b4513" rx="2" />
    </svg>
  )
}

// Venue addresses and links
const ICC_MAPS_LINK = "https://www.google.com/maps/search/?api=1&query=ICC+Tampa+FL"

interface Event {
  name: string
  time: string
  venue: string
  note?: string
  icon: "mandap" | "couple"
}

const events: Event[] = [
  {
    name: "Wedding Ceremony",
    time: "7:00 AM - 2:00 PM",
    venue: "ICC, Tampa, FL",
    icon: "mandap"
  },
  {
    name: "Muhurtham",
    time: "8:20 AM",
    venue: "ICC, Tampa, FL",
    note: "Auspicious moment - Blessings for the couple",
    icon: "couple"
  }
]

export function EventTimeline() {
  return (
    <section className="py-12 px-4">
      <h2 className="text-3xl md:text-4xl font-semibold text-center text-wedding-cocoa mb-2">
        Wedding Event
      </h2>
      <p className="text-center text-wedding-gold mb-8 text-lg">
        Saturday, April 26, 2026
      </p>
      
      <div className="max-w-2xl mx-auto">
        <Card className="bg-card/95 border-2 border-wedding-gold/30 shadow-lg overflow-hidden">
          <CardHeader className="bg-wedding-red/10 border-b border-wedding-gold/20 pb-4">
            <CardTitle className="text-center">
              <span className="block text-2xl text-wedding-cocoa font-semibold">
                The Big Day
              </span>
              <span className="text-base text-wedding-cocoa/70 font-normal mt-1 block">
                Join us as we begin our forever
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-8">
              {events.map((event, idx) => (
                <div 
                  key={idx}
                  className="flex items-start gap-5 pb-8 last:pb-0 border-b border-wedding-gold/10 last:border-0"
                >
                  {/* Event Icon */}
                  <div className="shrink-0 p-3 bg-wedding-cream rounded-xl border border-wedding-gold/30 shadow-sm">
                    {event.icon === "mandap" ? <MandapIcon /> : <CoupleInMandapIcon />}
                  </div>
                  
                  {/* Event Details */}
                  <div className="flex-1 space-y-2">
                    <p className="text-wedding-cocoa font-bold text-xl">
                      {event.name}
                    </p>
                    <p className="text-wedding-cocoa font-medium text-lg">
                      {event.time}
                    </p>
                    <a 
                      href={ICC_MAPS_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-wedding-red hover:text-wedding-maroon transition-colors group"
                    >
                      <MapPin className="w-4 h-4" />
                      <span className="underline underline-offset-2">
                        {event.venue}
                      </span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                    {event.note && (
                      <p className="text-sm text-wedding-orange italic mt-2">
                        {event.note}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
