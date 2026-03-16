"use client"

import { useState } from "react"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Lock } from "lucide-react"
import Link from "next/link"

interface Guest {
  id: string
  name: string
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

// Simple password protection - you can change this password
const ADMIN_PASSWORD = "priyanka2026"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setError("")
    } else {
      setError("Incorrect password")
    }
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-wedding-cream flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-2 border-wedding-gold/30">
          <CardContent className="pt-8 pb-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-wedding-gold/20 flex items-center justify-center mb-4">
                <Lock className="w-8 h-8 text-wedding-gold" />
              </div>
              <h1 className="text-2xl font-semibold text-wedding-cocoa">Admin Access</h1>
              <p className="text-muted-foreground mt-2">Enter password to view guest list</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-wedding-gold/30 focus:border-wedding-gold"
              />
              {error && <p className="text-destructive text-sm text-center">{error}</p>}
              <Button 
                type="submit" 
                className="w-full bg-wedding-red hover:bg-wedding-maroon text-primary-foreground"
              >
                Access Guest List
              </Button>
            </form>
            <div className="mt-6 text-center">
              <Link href="/" className="text-wedding-cocoa hover:text-wedding-red inline-flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Wedding Page
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-wedding-cream p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-wedding-cocoa">Guest List</h1>
            <p className="text-muted-foreground">Priyanka & Harish Wedding - April 26, 2026</p>
          </div>
          <Link href="/">
            <Button variant="outline" className="border-wedding-gold text-wedding-cocoa hover:bg-wedding-gold/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Wedding
            </Button>
          </Link>
        </div>
        
        <GuestListContent />
      </div>
    </main>
  )
}

function GuestListContent() {
  const { data, error, isLoading } = useSWR<GuestData>("/api/rsvp", fetcher, {
    refreshInterval: 30000
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
      <Card className="border-2 border-wedding-gold/30">
        <CardContent className="text-center py-12 text-muted-foreground">
          No RSVPs yet. Share the wedding page to start collecting responses!
        </CardContent>
      </Card>
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
            <p className="text-3xl font-bold text-wedding-cocoa">{data.stats.totalResponses}</p>
            <p className="text-sm text-muted-foreground">Total Responses</p>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200">
          <CardContent className="pt-4 text-center">
            <p className="text-3xl font-bold text-green-700">{data.stats.attending}</p>
            <p className="text-sm text-muted-foreground">Families Attending</p>
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
      <Card className="border-2 border-wedding-gold/20">
        <CardContent className="text-center py-8 text-muted-foreground">
          No guests in this category
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-2 border-wedding-gold/20">
      <Table>
        <TableHeader>
          <TableRow className="bg-wedding-gold/5">
            <TableHead>Name</TableHead>
            {showFamilyMembers && <TableHead className="text-center">Guests</TableHead>}
            <TableHead>RSVP Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {guests.map((guest) => (
            <TableRow key={guest.id}>
              <TableCell className="font-medium">{guest.name}</TableCell>
              {showFamilyMembers && (
                <TableCell className="text-center">
                  <Badge variant="secondary" className="bg-wedding-gold/20 text-wedding-cocoa">
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
    </Card>
  )
}
