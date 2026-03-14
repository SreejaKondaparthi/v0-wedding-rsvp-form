export function DecorativeBorder() {
  return (
    <div className="flex items-center justify-center gap-4 py-4">
      <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-wedding-gold" />
      <svg 
        viewBox="0 0 24 24" 
        className="w-6 h-6 text-wedding-gold animate-shimmer"
        fill="currentColor"
      >
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
      <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-wedding-gold" />
    </div>
  )
}

export function MandalaCorner({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={`w-16 h-16 text-wedding-gold/30 ${className}`}
      fill="currentColor"
    >
      <circle cx="10" cy="10" r="3" />
      <circle cx="20" cy="10" r="2" />
      <circle cx="10" cy="20" r="2" />
      <circle cx="25" cy="25" r="4" />
      <path d="M0 30 Q30 30 30 0" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M0 50 Q50 50 50 0" fill="none" stroke="currentColor" strokeWidth="0.5" />
    </svg>
  )
}
