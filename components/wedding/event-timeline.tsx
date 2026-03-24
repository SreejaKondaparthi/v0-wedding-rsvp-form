import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, ExternalLink } from "lucide-react"

// Couple in Mandap - Combined wedding scene with bride and groom
function WeddingCeremonyIcon() {
  return (
    <svg viewBox="0 0 80 80" className="w-20 h-20">
      {/* Mandap pillars */}
      <rect x="6" y="24" width="5" height="40" fill="#d4a574" rx="1" />
      <rect x="69" y="24" width="5" height="40" fill="#d4a574" rx="1" />
      
      {/* Mandap roof/canopy */}
      <path d="M2 24 L40 6 L78 24 L72 28 L40 12 L8 28 Z" fill="#c9302c" />
      <path d="M8 28 L40 12 L72 28 L66 32 L40 18 L14 32 Z" fill="#d4574a" />
      
      {/* Decorative toran/garland on top */}
      <path d="M12 26 Q26 34, 40 26 Q54 34, 68 26" stroke="#f59e0b" strokeWidth="3" fill="none" />
      <circle cx="26" cy="30" r="3" fill="#ff9800" />
      <circle cx="40" cy="26" r="3" fill="#ff9800" />
      <circle cx="54" cy="30" r="3" fill="#ff9800" />
      
      {/* Mango leaves */}
      <path d="M18 30 Q15 35, 12 30 Q15 27, 18 30" fill="#4a7c59" />
      <path d="M62 30 Q65 35, 68 30 Q65 27, 62 30" fill="#4a7c59" />
      
      {/* Flower garlands on pillars */}
      <circle cx="8.5" cy="34" r="2" fill="#e91e63" opacity="0.8" />
      <circle cx="8.5" cy="40" r="2" fill="#ff9800" opacity="0.8" />
      <circle cx="8.5" cy="46" r="2" fill="#e91e63" opacity="0.8" />
      <circle cx="71.5" cy="34" r="2" fill="#e91e63" opacity="0.8" />
      <circle cx="71.5" cy="40" r="2" fill="#ff9800" opacity="0.8" />
      <circle cx="71.5" cy="46" r="2" fill="#e91e63" opacity="0.8" />
      
      {/* Bride (left) */}
      <circle cx="30" cy="38" r="6" fill="#ffd5c8" /> {/* Face */}
      <path d="M24 38 Q30 30, 36 38" fill="#c9302c" /> {/* Hair/pallu */}
      <circle cx="30" cy="36" r="1" fill="#f59e0b" /> {/* Bindi */}
      <path d="M24 44 L24 60 Q30 62, 36 60 L36 44 Q30 46, 24 44" fill="#c9302c" /> {/* Saree */}
      {/* Bride jewelry */}
      <circle cx="28" cy="40" r="1" fill="#f59e0b" />
      <circle cx="32" cy="40" r="1" fill="#f59e0b" />
      
      {/* Groom (right) */}
      <circle cx="50" cy="38" r="6" fill="#e8c4a0" /> {/* Face */}
      <path d="M44 34 Q50 32, 56 34 L56 36 L44 36 Z" fill="#412920" /> {/* Hair */}
      <path d="M44 44 L44 60 Q50 62, 56 60 L56 44 Q50 46, 44 44" fill="#f5f5dc" /> {/* Dhoti/kurta */}
      <path d="M44 44 L56 44 L56 48 L44 48 Z" fill="#f59e0b" /> {/* Uttariya/shawl */}
      
      {/* Joined hands (mangalsutra tying moment) */}
      <ellipse cx="40" cy="52" rx="5" ry="3" fill="#ffd5c8" />
      <path d="M37 50 Q40 47, 43 50" stroke="#f59e0b" strokeWidth="2" fill="none" /> {/* Mangalsutra */}
      
      {/* Sacred fire in front */}
      <path d="M40 58 Q35 64, 38 68 Q40 64, 40 70 Q40 64, 42 68 Q45 64, 40 58" fill="#f59e0b" />
      <path d="M40 60 Q37 64, 39 66 L40 68 L41 66 Q43 64, 40 60" fill="#fbbf24" />
      
      {/* Flower petals around */}
      <circle cx="20" cy="54" r="2" fill="#e91e63" opacity="0.6" />
      <circle cx="60" cy="54" r="2" fill="#ff9800" opacity="0.6" />
      
      {/* Base platform */}
      <rect x="4" y="64" width="72" height="6" fill="#8b4513" rx="2" />
      <rect x="6" y="62" width="68" height="4" fill="#a0522d" rx="1" />
    </svg>
  )
}

// Venue address and link
const ICC_MAPS_LINK = "https://www.google.com/maps/search/?api=1&query=ICC+Tampa+FL"

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
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
              {/* Event Icon */}
              <div className="shrink-0 p-4 bg-wedding-cream rounded-xl border border-wedding-gold/30 shadow-sm">
                <WeddingCeremonyIcon />
              </div>
              
              {/* Event Details */}
              <div className="flex-1 text-center md:text-left space-y-3">
                <p className="text-wedding-cocoa font-bold text-2xl">
                  Wedding Ceremony
                </p>
                <div className="space-y-1">
                  <p className="text-wedding-cocoa font-medium text-lg">
                    7:00 AM - 2:00 PM
                  </p>
                  <p className="text-wedding-orange font-semibold text-lg">
                    Muhurtham at 8:20 AM
                  </p>
                </div>
                <a 
                  href={ICC_MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-wedding-red hover:text-wedding-maroon transition-colors group"
                >
                  <MapPin className="w-4 h-4" />
                  <span className="underline underline-offset-2">
                    ICC, Tampa, FL
                  </span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <p className="text-sm text-wedding-cocoa/70 italic mt-2">
                  Blessings for the couple at the auspicious moment
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
