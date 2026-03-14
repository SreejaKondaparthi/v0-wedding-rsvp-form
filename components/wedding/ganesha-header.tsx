import Image from "next/image"

export function GaneshaHeader() {
  return (
    <div className="flex flex-col items-center gap-2 pt-8">
      <div className="relative w-32 h-32 md:w-40 md:h-40">
        <Image
          src="/images/ganesha.jpg"
          alt="Lord Ganesha - Symbol of auspicious beginnings"
          fill
          className="object-contain rounded-full border-4 border-wedding-gold shadow-lg"
          priority
        />
      </div>
      <p className="text-sm text-wedding-maroon font-medium tracking-widest uppercase">
        Shri Ganeshaya Namaha
      </p>
    </div>
  )
}
