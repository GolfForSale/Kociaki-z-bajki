import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { urlFor } from '@/sanity/lib/image'
import { AdoptionInfo as AdoptionInfoType } from '@/types/sanity'

interface AdoptionInfoProps {
  data: AdoptionInfoType | null
}

export default function AdoptionInfo({ data }: AdoptionInfoProps) {
  if (!data) return null

  const imageOnLeft = data.imagePosition === 'left'

  return (
    <section id="adopcja" className="py-24 md:py-10 bg-gradient-to-br from-amber-50 to-orange-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent" />
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-amber-200/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-orange-200/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative">
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16`}>
          {/* Image */}
          {data.image && (
            <div className={`${imageOnLeft ? 'lg:order-1' : 'lg:order-2'}`}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={urlFor(data.image).width(700).url()}
                  alt={data.image.alt || 'Adopcja kota'}
                  width={700}
                  height={700}
                  className="w-full h-auto"
                  style={{ display: 'block' }}
                />
              </div>
            </div>
          )}

          {/* Content */}
          <div className={`${imageOnLeft ? 'lg:order-2' : 'lg:order-1'}`}>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              {data.title}
            </h2>
            {data.subtitle && (
              <p className="text-amber-600 font-medium text-lg mb-8">
                {data.subtitle}
              </p>
            )}
            <div className="prose prose-lg prose-slate prose-headings:font-display prose-p:text-slate-600 prose-p:leading-relaxed prose-li:text-slate-600 prose-strong:text-slate-800 max-w-none">
              <PortableText value={data.content} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
