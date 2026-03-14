import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, ExternalLink } from "lucide-react"

// Event icon components
function MehandiIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-12 h-12">
      {/* Hand outline */}
      <path 
        d="M24 44 L24 28 M18 34 L24 28 L30 34 M12 28 L18 22 M36 28 L30 22 M16 18 L24 10 L32 18"
        stroke="#412920"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* Mehandi patterns */}
      <circle cx="24" cy="20" r="3" fill="#c26e2a" opacity="0.8" />
      <path d="M24 24 Q20 28, 24 32 Q28 28, 24 24" fill="#c26e2a" opacity="0.6" />
      <circle cx="18" cy="26" r="2" fill="#c26e2a" opacity="0.5" />
      <circle cx="30" cy="26" r="2" fill="#c26e2a" opacity="0.5" />
    </svg>
  )
}

function SangeethIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-12 h-12">
      {/* Music notes */}
      <circle cx="16" cy="32" r="5" fill="#412920" />
      <path d="M21 32 L21 12 L36 8 L36 28" stroke="#412920" strokeWidth="2" fill="none" />
      <circle cx="31" cy="28" r="5" fill="#412920" />
      {/* Musical wave */}
      <path d="M8 40 Q14 36, 20 40 Q26 44, 32 40 Q38 36, 44 40" stroke="#d4a574" strokeWidth="2" fill="none" opacity="0.6" />
    </svg>
  )
}

function HaldiIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-12 h-12">
      {/* Haldi bowl */}
      <ellipse cx="24" cy="32" rx="14" ry="6" fill="#f59e0b" opacity="0.8" />
      <path d="M10 32 Q10 40, 24 42 Q38 40, 38 32" fill="#f59e0b" />
      {/* Turmeric powder effect */}
      <circle cx="20" cy="28" r="3" fill="#fbbf24" opacity="0.6" />
      <circle cx="28" cy="26" r="4" fill="#fbbf24" opacity="0.5" />
      <circle cx="24" cy="22" r="2" fill="#fcd34d" opacity="0.4" />
      {/* Leaves */}
      <path d="M16 18 Q12 12, 18 8 Q24 14, 16 18" fill="#4a7c59" opacity="0.7" />
      <path d="M32 18 Q36 12, 30 8 Q24 14, 32 18" fill="#4a7c59" opacity="0.7" />
    </svg>
  )
}

function PelliIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-12 h-12">
      {/* Traditional lamp (Deepam) */}
      <ellipse cx="24" cy="38" rx="10" ry="4" fill="#d4a574" />
      <path d="M16 38 L18 28 L30 28 L32 38" fill="#d4a574" />
      <ellipse cx="24" cy="28" rx="6" ry="2" fill="#c9a064" />
      {/* Flame */}
      <path d="M24 26 Q20 20, 24 12 Q28 20, 24 26" fill="#f59e0b" />
      <path d="M24 24 Q22 20, 24 14 Q26 20, 24 24" fill="#fbbf24" />
      {/* Glow */}
      <circle cx="24" cy="18" r="8" fill="#fef3c7" opacity="0.3" />
    </svg>
  )
}

function MuhurthamIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-12 h-12">
      {/* Mangalsutra representation */}
      <path d="M8 16 Q24 24, 40 16" stroke="#d4a574" strokeWidth="2" fill="none" />
      <circle cx="24" cy="22" r="6" fill="#f59e0b" stroke="#d4a574" strokeWidth="2" />
      {/* Wedding rings interlinked */}
      <circle cx="20" cy="36" r="6" fill="none" stroke="#412920" strokeWidth="2" />
      <circle cx="28" cy="36" r="6" fill="none" stroke="#412920" strokeWidth="2" />
      {/* Decorative dots */}
      <circle cx="12" cy="14" r="2" fill="#c9302c" />
      <circle cx="36" cy="14" r="2" fill="#c9302c" />
    </svg>
  )
}

function WeddingCeremonyIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-12 h-12">
      {/* Fire (Homam/Agni) */}
      <path d="M24 8 Q16 20, 20 28 Q24 24, 24 32 Q24 24, 28 28 Q32 20, 24 8" fill="#f59e0b" />
      <path d="M24 12 Q20 20, 22 26 Q24 22, 24 28 Q24 22, 26 26 Q28 20, 24 12" fill="#fbbf24" />
      <path d="M24 16 Q22 22, 23 24 L24 26 L25 24 Q26 22, 24 16" fill="#fef3c7" />
      {/* Fire pit base */}
      <rect x="14" y="32" width="20" height="6" rx="2" fill="#8b4513" />
      <path d="M12 38 L36 38 L34 44 L14 44 Z" fill="#654321" />
    </svg>
  )
}

// Get icon by event name
function getEventIcon(name: string) {
  const lowerName = name.toLowerCase()
  if (lowerName.includes("mehandi")) return <MehandiIcon />
  if (lowerName.includes("sangeeth")) return <SangeethIcon />
  if (lowerName.includes("haldi")) return <HaldiIcon />
  if (lowerName.includes("pelli")) return <PelliIcon />
  if (lowerName.includes("muhurtham")) return <MuhurthamIcon />
  if (lowerName.includes("wedding") || lowerName.includes("ceremony")) return <WeddingCeremonyIcon />
  return <MuhurthamIcon />
}

// Venue addresses and links
const HOME_ADDRESS = "11765 Conifer Cone Ct, Riverview, FL"
const HOME_MAPS_LINK = "https://www.google.com/maps/search/?api=1&query=11765+Conifer+Cone+Ct+Riverview+FL"
const CORY_LAKES_MAPS_LINK = "https://www.google.com/maps/search/?api=1&query=Cory+Lakes+Tampa+FL"
const ICC_MAPS_LINK = "https://www.google.com/maps/search/?api=1&query=ICC+Tampa+FL"

function getVenueLink(venue: string): string {
  if (venue.toLowerCase().includes("home")) return HOME_MAPS_LINK
  if (venue.toLowerCase().includes("cory")) return CORY_LAKES_MAPS_LINK
  if (venue.toLowerCase().includes("icc")) return ICC_MAPS_LINK
  return ""
}

function getVenueDisplay(venue: string): string {
  if (venue.toLowerCase() === "home") return HOME_ADDRESS
  return venue
}

interface Event {
  name: string
  time: string
  venue: string
  note?: string
}

interface DaySchedule {
  date: string
  day: string
  events: Event[]
}

const schedule: DaySchedule[] = [
  {
    date: "April 24, 2026",
    day: "Thursday",
    events: [
      {
        name: "Mehandi",
        time: "9:00 AM - 1:00 PM",
        venue: "Home"
      },
      {
        name: "Sangeeth",
        time: "5:00 PM - 10:30 PM",
        venue: "Cory Lakes, Tampa"
      }
    ]
  },
  {
    date: "April 25, 2026",
    day: "Friday",
    events: [
      {
        name: "Haldi",
        time: "9:00 AM - 12:00 PM",
        venue: "Home"
      },
      {
        name: "Pelli Kuturu & Pelli Koduku",
        time: "2:30 PM - 6:30 PM",
        venue: "Home",
        note: "Time tentative"
      }
    ]
  },
  {
    date: "April 26, 2026",
    day: "Saturday",
    events: [
      {
        name: "Muhurtham",
        time: "8:20 AM",
        venue: "ICC, Tampa, FL",
        note: "Auspicious moment"
      },
      {
        name: "Wedding Ceremony",
        time: "7:00 AM - 2:00 PM",
        venue: "ICC, Tampa, FL"
      }
    ]
  }
]

export function EventTimeline() {
  return (
    <section className="py-12 px-4">
      <h2 className="text-3xl md:text-4xl font-semibold text-center text-wedding-cocoa mb-8">
        Wedding Events
      </h2>
      
      <div className="max-w-4xl mx-auto grid gap-6">
        {schedule.map((day) => (
          <Card 
            key={day.date} 
            className="bg-card border-2 border-wedding-gold/30 shadow-md overflow-hidden"
          >
            <CardHeader className="bg-wedding-red/10 border-b border-wedding-gold/20 pb-4">
              <CardTitle className="text-center">
                <span className="block text-2xl text-wedding-cocoa font-semibold">
                  {day.day}
                </span>
                <span className="text-lg text-wedding-red">
                  {day.date}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {day.events.map((event, idx) => (
                  <div 
                    key={idx}
                    className="flex items-start gap-4 pb-6 last:pb-0 border-b border-wedding-gold/10 last:border-0"
                  >
                    {/* Event Icon */}
                    <div className="shrink-0 p-2 bg-wedding-cream rounded-lg border border-wedding-gold/20">
                      {getEventIcon(event.name)}
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
                        href={getVenueLink(event.venue)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-wedding-red hover:text-wedding-maroon transition-colors group"
                      >
                        <MapPin className="w-4 h-4" />
                        <span className="underline underline-offset-2">
                          {getVenueDisplay(event.venue)}
                        </span>
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                      {event.note && (
                        <p className="text-sm text-wedding-orange italic">
                          * {event.note}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
