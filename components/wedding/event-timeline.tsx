import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
        note: "Main ceremony"
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
      <h2 className="text-3xl md:text-4xl font-semibold text-center text-wedding-maroon mb-8">
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
                <span className="block text-2xl text-wedding-maroon font-semibold">
                  {day.day}
                </span>
                <span className="text-lg text-wedding-red">
                  {day.date}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {day.events.map((event, idx) => (
                  <div 
                    key={idx}
                    className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 pb-4 last:pb-0 border-b border-wedding-gold/10 last:border-0"
                  >
                    <div className="md:w-48 shrink-0">
                      <p className="text-wedding-gold font-semibold text-lg">
                        {event.name}
                      </p>
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-foreground font-medium">
                        {event.time}
                      </p>
                      <p className="text-muted-foreground">
                        @ {event.venue}
                      </p>
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
