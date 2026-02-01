import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { urlFor } from '@/sanity/lib/image'
import { AboutUs as AboutUsType } from '@/types/sanity'

interface AboutUsProps {
  data: AboutUsType | null
}

export default function AboutUs({ data }: AboutUsProps) {
  if (!data) return null

  return (
    <section id="o-nas" className="py-24 md:py-10 bg-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <span className="text-rose-500 font-medium tracking-widest uppercase text-sm">Poznaj nas</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-800 mt-4 mb-8">
              {data.title}
            </h2>
            <div className="prose prose-lg prose-slate prose-headings:font-display prose-p:text-slate-600 prose-p:leading-relaxed max-w-none">
              <PortableText value={data.content} />
            </div>
          </div>

          {/* Images - full, not cropped */}
          <div className="relative">
            {data.images && data.images.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {data.images.slice(0, 4).map((image, index) => (
                  <div
                    key={index}
                    className={`rounded-2xl overflow-hidden shadow-lg ${
                      index === 0 ? 'col-span-2' : ''
                    }`}
                  >
                    <Image
                      src={urlFor(image).width(index === 0 ? 800 : 400).url()}
                      alt={image.alt || 'Nasza hodowla'}
                      width={index === 0 ? 800 : 400}
                      height={index === 0 ? 600 : 400}
                      className="w-full h-auto hover:scale-105 transition-transform duration-500"
                      style={{ display: 'block' }}
                    />
                  </div>
                ))}
              </div>
            )}
            {/* Decorative accent */}
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-rose-200 to-rose-300 rounded-full -z-10 blur-2xl opacity-60" />
          </div>
        </div>
      </div>
    </section>
  )
}
