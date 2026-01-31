import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'
import { Cat } from '@/types/sanity'
import { ArrowRight } from 'lucide-react'

interface OurCatsProps {
  cats: Cat[]
}

export default function OurCats({ cats }: OurCatsProps) {
  if (!cats || cats.length === 0) {
    return (
      <section id="nasze-kotki" className="py-24 md:py-32 bg-slate-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-display text-4xl font-bold text-slate-800">Nasze Kotki</h2>
          <p className="mt-4 text-slate-600">Wkrótce dodamy nasze koty...</p>
        </div>
      </section>
    )
  }

  return (
    <section id="nasze-kotki" className="py-24 md:py-32 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-rose-500 font-medium tracking-widest uppercase text-sm">Poznaj naszą rodzinę</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-800 mt-4">
            Nasze Kotki
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-rose-300 to-rose-400 mx-auto mt-6 rounded-full" />
        </div>

        {/* Cats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cats.map((cat, index) => (
            <Link
              key={cat._id}
              href={`/kot/${cat.slug.current}`}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={urlFor(cat.mainPhoto).width(500).height(625).url()}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-80" />
                
                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-2xl font-bold text-white mb-2">
                    {cat.name}
                  </h3>
                  {cat.description && (
                    <p className="text-white/80 text-sm line-clamp-2">
                      {cat.description}
                    </p>
                  )}
                  
                  {/* View more indicator */}
                  <div className="flex items-center gap-2 mt-4 text-rose-300 group-hover:text-rose-200 transition-colors">
                    <span className="text-sm font-medium">Zobacz galerię</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Decorative corner accent */}
              <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-white/30 rounded-tr-2xl group-hover:border-rose-300 transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
