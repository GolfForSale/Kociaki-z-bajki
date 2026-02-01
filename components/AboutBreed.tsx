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
    <section id="o-rasie" className="py-24 md:py-10 bg-cream-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-rose-50/50 to-transparent pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative">
        {/* Header */}
        <div className="mb-8">
          <span className="text-rose-500 font-medium tracking-widest uppercase text-sm">O rasie</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-800 mt-4">
            {data.title}
          </h2>
        </div>

        {/* Content with floated image */}
        <div className="prose prose-lg prose-slate prose-headings:font-display prose-p:text-slate-600 prose-p:leading-relaxed max-w-none">
          {/* Floated image */}
          {data.images && data.images.length > 0 && (
            <div className="float-none md:float-left md:mr-8 md:mb-4 mb-8 md:w-2/5 lg:w-1/3">
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src={urlFor(data.images[0]).width(600).url()}
                    alt={data.images[0].alt || 'Ragdoll cat'}
                    width={600}
                    height={800}
                    className="w-full h-auto"
                    style={{ display: 'block' }}
                  />
                </div>
                {/* Second image - offset */}
                {data.images.length > 1 && (
                  <div className="absolute -bottom-4 -right-4 w-1/2 rounded-2xl overflow-hidden shadow-xl border-4 border-cream-50">
                    <Image
                      src={urlFor(data.images[1]).width(300).url()}
                      alt={data.images[1].alt || 'Ragdoll cat'}
                      width={300}
                      height={300}
                      className="w-full h-auto"
                      style={{ display: 'block' }}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Text content that wraps around the image */}
          <PortableText value={data.content} />

          {/* Clear float */}
          <div className="clear-both" />
        </div>
      </div>
    </section>
  )
}
