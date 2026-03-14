"use client"

// Thoranalu (Mango Leaves) decoration
export function MangoLeaf({ className = "" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 40 80" 
      className={`w-8 h-16 ${className}`}
      fill="none"
    >
      <path 
        d="M20 0 C5 20, 5 60, 20 80 C35 60, 35 20, 20 0" 
        fill="#4a7c59" 
        opacity="0.7"
      />
      <path 
        d="M20 10 L20 70" 
        stroke="#3d6b4a" 
        strokeWidth="1.5"
      />
      {/* Leaf veins */}
      <path d="M20 20 L12 30" stroke="#3d6b4a" strokeWidth="0.8" opacity="0.6" />
      <path d="M20 20 L28 30" stroke="#3d6b4a" strokeWidth="0.8" opacity="0.6" />
      <path d="M20 35 L10 45" stroke="#3d6b4a" strokeWidth="0.8" opacity="0.6" />
      <path d="M20 35 L30 45" stroke="#3d6b4a" strokeWidth="0.8" opacity="0.6" />
      <path d="M20 50 L13 58" stroke="#3d6b4a" strokeWidth="0.8" opacity="0.6" />
      <path d="M20 50 L27 58" stroke="#3d6b4a" strokeWidth="0.8" opacity="0.6" />
    </svg>
  )
}

// Marigold flower decoration
export function Marigold({ className = "", size = "md" }: { className?: string, size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-14 h-14"
  }
  
  return (
    <svg 
      viewBox="0 0 50 50" 
      className={`${sizeClasses[size]} ${className}`}
    >
      {/* Outer petals */}
      {[...Array(12)].map((_, i) => (
        <ellipse
          key={`outer-${i}`}
          cx="25"
          cy="8"
          rx="5"
          ry="10"
          fill="#f59e0b"
          opacity="0.9"
          transform={`rotate(${i * 30} 25 25)`}
        />
      ))}
      {/* Inner petals */}
      {[...Array(8)].map((_, i) => (
        <ellipse
          key={`inner-${i}`}
          cx="25"
          cy="12"
          rx="4"
          ry="7"
          fill="#fbbf24"
          transform={`rotate(${i * 45 + 22.5} 25 25)`}
        />
      ))}
      {/* Center */}
      <circle cx="25" cy="25" r="6" fill="#d97706" />
      <circle cx="25" cy="25" r="3" fill="#b45309" />
    </svg>
  )
}

// Jasmine flower string (Mallige)
export function JasmineString({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 30" className={`w-48 h-8 ${className}`}>
      {/* String */}
      <path 
        d="M0 15 Q50 5, 100 15 Q150 25, 200 15" 
        stroke="#4a7c59" 
        strokeWidth="2" 
        fill="none"
        opacity="0.5"
      />
      {/* Jasmine flowers */}
      {[20, 60, 100, 140, 180].map((x, i) => (
        <g key={i} transform={`translate(${x}, ${15 + Math.sin(i) * 3})`}>
          {[...Array(5)].map((_, j) => (
            <ellipse
              key={j}
              cx="0"
              cy="-4"
              rx="3"
              ry="5"
              fill="white"
              stroke="#f0f0f0"
              strokeWidth="0.5"
              transform={`rotate(${j * 72} 0 0)`}
            />
          ))}
          <circle cx="0" cy="0" r="2" fill="#fef3c7" />
        </g>
      ))}
    </svg>
  )
}

// Background decorations component
export function BackgroundDecorations() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Top left thoranalu arrangement */}
      <div className="absolute top-20 left-4 flex gap-1 animate-sway">
        <MangoLeaf className="transform -rotate-30" />
        <MangoLeaf className="transform -rotate-15" />
        <MangoLeaf />
        <MangoLeaf className="transform rotate-15" />
        <MangoLeaf className="transform rotate-30" />
      </div>

      {/* Top right thoranalu arrangement */}
      <div className="absolute top-20 right-4 flex gap-1 animate-sway" style={{ animationDelay: '2s' }}>
        <MangoLeaf className="transform -rotate-30" />
        <MangoLeaf className="transform -rotate-15" />
        <MangoLeaf />
        <MangoLeaf className="transform rotate-15" />
        <MangoLeaf className="transform rotate-30" />
      </div>

      {/* Floating marigolds - left side */}
      <Marigold className="absolute top-40 left-8 animate-float opacity-60" size="lg" />
      <Marigold className="absolute top-[40%] left-4 animate-float-delayed opacity-50" size="md" />
      <Marigold className="absolute top-[60%] left-10 animate-float opacity-40" size="sm" />
      <Marigold className="absolute top-[80%] left-6 animate-float-delayed opacity-50" size="md" />

      {/* Floating marigolds - right side */}
      <Marigold className="absolute top-48 right-6 animate-float-delayed opacity-60" size="lg" />
      <Marigold className="absolute top-[45%] right-10 animate-float opacity-50" size="md" />
      <Marigold className="absolute top-[65%] right-4 animate-float-delayed opacity-40" size="sm" />
      <Marigold className="absolute top-[85%] right-8 animate-float opacity-50" size="md" />

      {/* Jasmine strings at top */}
      <JasmineString className="absolute top-4 left-1/4 opacity-40" />
      <JasmineString className="absolute top-4 right-1/4 opacity-40" />

      {/* Additional scattered small flowers */}
      <Marigold className="absolute top-[30%] left-[15%] animate-float opacity-30" size="sm" />
      <Marigold className="absolute top-[50%] right-[12%] animate-float-delayed opacity-30" size="sm" />
      <Marigold className="absolute top-[70%] left-[10%] animate-float opacity-30" size="sm" />
    </div>
  )
}
