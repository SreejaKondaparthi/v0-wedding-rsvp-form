"use client"

import { useState } from "react"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Spinner } from "@/components/ui/spinner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Guest {
  id: string
  name: string
  email: string
  is_attending: boolean
  family_members: number
  created_at: string
  updated_at: string
}

interface GuestData {
  guests: Guest[]
  stats: {
    totalResponses: number
    attending: number
    notAttending: number
    totalGuests: number
  }
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function GuestListButton() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="border-wedding-gold text-wedding-maroon hover:bg-wedding-gold/10"
        >
          View Guest List
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-wedding-maroon">Guest List</DialogTitle>
          <DialogDescription>
            View all RSVP responses for the wedding
          </DialogDescription>
        </DialogHeader>
        <GuestListContent />
      </DialogContent>
    </Dialog>
  )
}

function GuestListContent() {
  const { data, error, isLoading } = useSWR<GuestData>("/api/rsvp", fetcher, {
    refreshInterval: 30000 // Refresh every 30 seconds
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner className="w-8 h-8 text-wedding-gold" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12 text-destructive">
        Failed to load guest list. Please try again.
      </div>
    )
  }

  if (!data || data.guests.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No RSVPs yet. Be the first to respond!
      </div>
    )
  }

  const attendingGuests = data.guests.filter(g => g.is_attending)
  const notAttendingGuests = data.guests.filter(g => !g.is_attending)

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-wedding-gold/10 border-wedding-gold/30">
          <CardContent className="pt-4 text-center">
            <p className="text-3xl font-bold text-wedding-maroon">{data.stats.totalResponses}</p>
            <p className="text-sm text-muted-foreground">Total Responses</p>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200">
          <CardContent className="pt-4 text-center">
            <p className="text-3xl font-bold text-green-700">{data.stats.attending}</p>
            <p className="text-sm text-muted-foreground">Attending</p>
          </CardContent>
        </Card>
        <Card className="bg-red-50 border-red-200">
          <CardContent className="pt-4 text-center">
            <p className="text-3xl font-bold text-red-700">{data.stats.notAttending}</p>
            <p className="text-sm text-muted-foreground">Not Attending</p>
          </CardContent>
        </Card>
        <Card className="bg-wedding-red/10 border-wedding-red/30">
          <CardContent className="pt-4 text-center">
            <p className="text-3xl font-bold text-wedding-red">{data.stats.totalGuests}</p>
            <p className="text-sm text-muted-foreground">Total Guests</p>
          </CardContent>
        </Card>
      </div>

      {/* Guest Tabs */}
      <Tabs defaultValue="attending" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="attending">
            Attending ({attendingGuests.length})
          </TabsTrigger>
          <TabsTrigger value="not-attending">
            Not Attending ({notAttendingGuests.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="attending" className="mt-4">
          <GuestTable guests={attendingGuests} showFamilyMembers />
        </TabsContent>
        
        <TabsContent value="not-attending" className="mt-4">
          <GuestTable guests={notAttendingGuests} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function GuestTable({ guests, showFamilyMembers = false }: { guests: Guest[]; showFamilyMembers?: boolean }) {
  if (guests.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No guests in this category
      </div>
    )
  }

  return (
    <div className="rounded-md border border-wedding-gold/20">
      <Table>
        <TableHeader>
          <TableRow className="bg-wedding-gold/5">
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            {showFamilyMembers && <TableHead className="text-center">Guests</TableHead>}
            <TableHead>RSVP Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {guests.map((guest) => (
            <TableRow key={guest.id}>
              <TableCell className="font-medium">{guest.name}</TableCell>
              <TableCell className="text-muted-foreground">{guest.email}</TableCell>
              {showFamilyMembers && (
                <TableCell className="text-center">
                  <Badge variant="secondary" className="bg-wedding-gold/20 text-wedding-maroon">
                    {guest.family_members}
                  </Badge>
                </TableCell>
              )}
              <TableCell className="text-muted-foreground">
                {new Date(guest.created_at).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
