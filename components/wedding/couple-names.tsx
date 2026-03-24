export function CoupleNames() {
  return (
    <div className="text-center py-8 space-y-4">
      <p className="text-wedding-cocoa text-lg tracking-wide">
        Cordially Invited by
      </p>
      <h1 className="text-xl font-semibold text-wedding-cocoa">
        Kondaparthi & Vavilala Families
      </h1>

      <div className="py-6">
        <p className="font-[var(--font-script)] text-5xl md:text-7xl text-wedding-cocoa leading-tight">
          Priyanka
        </p>
        <p className="text-wedding-gold text-3xl md:text-4xl font-medium py-2">&</p>
        <p className="font-[var(--font-script)] text-5xl md:text-7xl text-wedding-cocoa leading-tight">
          Harish
        </p>
      </div>

      {/* Romantic Message */}
      <div className="py-4 px-6 max-w-lg mx-auto">
        <p className="text-wedding-cocoa text-lg md:text-xl italic font-medium leading-relaxed">
          &ldquo;From Best Friends to Life Partners&rdquo;
        </p>
        <p className="text-wedding-gold text-base md:text-lg mt-2">
          Bless us as we begin this beautiful journey together
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16 text-base md:text-lg text-wedding-cocoa pt-4">
        <div className="space-y-1">
          <p className="font-semibold text-wedding-red">Priyanka</p>
          <p>D/O Sri. Bikshapathi</p>
          <p>& Smt. Kanaka Durga</p>
        </div>
        <div className="hidden md:block w-px bg-wedding-gold/50" />
        <div className="space-y-1">
          <p className="font-semibold text-wedding-red">Harish</p>
          <p>S/O Sri. Prabhakar Reddy</p>
          <p>& Smt. Amala</p>
        </div>
      </div>
    </div>
  )
}
