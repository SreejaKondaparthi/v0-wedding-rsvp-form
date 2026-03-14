export function CoupleNames() {
  return (
    <div className="text-center py-8 space-y-4">
      <p className="text-wedding-maroon text-lg tracking-wide">
        Cordially Invited by
      </p>
      <p className="text-wedding-red text-xl font-semibold">
        Kondaparthi & Vavilalla Families
      </p>
      
      <div className="py-6">
        <h1 className="font-[var(--font-script)] text-5xl md:text-7xl text-wedding-maroon leading-tight">
          Priyanka
        </h1>
        <p className="text-wedding-gold text-3xl md:text-4xl font-medium py-2">&</p>
        <h1 className="font-[var(--font-script)] text-5xl md:text-7xl text-wedding-maroon leading-tight">
          Harish
        </h1>
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16 text-base md:text-lg text-foreground">
        <div className="space-y-1">
          <p className="font-semibold text-wedding-red">Priyanka</p>
          <p>D/O Sri. Bikshapathi</p>
          <p>& Smt. Kanaka Durga</p>
        </div>
        <div className="hidden md:block w-px bg-wedding-gold/50" />
        <div className="space-y-1">
          <p className="font-semibold text-wedding-red">Harish</p>
          <p>S/O Sri. Prabhakar</p>
          <p>& Smt. Amala</p>
        </div>
      </div>
    </div>
  )
}
