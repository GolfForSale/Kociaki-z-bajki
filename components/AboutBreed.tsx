import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { urlFor } from '@/sanity/lib/image'
import { AboutBreed as AboutBreedType } from '@/types/sanity'

interface AboutBreedProps {
  data: AboutBreedType | null
}

export default function AboutBreed({ data }: AboutBreedProps) {
  if (!data) return null

  return (
    <section id="o-rasie" className="py-24 md:py-32 bg-cream-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-rose-50/50 to-transparent pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Images */}
          <div className="order-2 lg:order-1">
            {data.images && data.images.length > 0 && (
              <div className="relative">
                {/* Main image */}
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src={urlFor(data.images[0]).width(600).height(750).url()}
                    alt={data.images[0].alt || 'Ragdoll cat'}
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Second image - offset */}
                {data.images.length > 1 && (
                  <div className="absolute -bottom-8 -right-8 w-2/3 aspect-square rounded-2xl overflow-hidden shadow-xl border-4 border-cream-50">
                    <Image
                      src={urlFor(data.images[1]).width(400).height(400).url()}
                      alt={data.images[1].alt || 'Ragdoll cat'}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                {/* Decorative element */}
                <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-rose-200 rounded-2xl" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <span className="text-rose-500 font-medium tracking-widest uppercase text-sm">O rasie</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-800 mt-4 mb-8">
              {data.title}
            </h2>
            <div className="prose prose-lg prose-slate prose-headings:font-display prose-p:text-slate-600 prose-p:leading-relaxed max-w-none">
              <PortableText value={data.content} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
