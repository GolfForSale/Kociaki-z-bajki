'use client'

import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { SanityImage } from '@/types/sanity'
import { ChevronDown } from 'lucide-react'

interface HeroProps {
  heroImage: SanityImage
  heroTitle?: string
  heroSubtitle?: string
}

export default function Hero({ heroImage, heroTitle, heroSubtitle }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={urlFor(heroImage).width(1920).height(1080).quality(90).url()}
          alt="Ragdoll cat"
          fill
          priority
          className="object-cover"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/30 to-slate-900/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-rose-900/20 to-blue-900/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Decorative element */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
          </div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
            <span className="block opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              {heroTitle || 'Kociak z Bajki'}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-12 leading-relaxed opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            {heroSubtitle || 'Hodowla kotów rasowych Ragdoll. Piękne, spokojne koty o wyjątkowym charakterze i niebieskich oczach.'}
          </p>

          {/* CTA Button */}
          <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            <a
              href="#nasze-kotki"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#nasze-kotki')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 rounded-full text-white font-medium hover:bg-white hover:text-slate-800 transition-all duration-300 group"
            >
              Poznaj nasze koty
              <span className="w-5 h-5 rounded-full bg-rose-400 group-hover:bg-rose-500 transition-colors" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
        <a
          href="#o-rasie"
          onClick={(e) => {
            e.preventDefault()
            document.querySelector('#o-rasie')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }}
          className="flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <span className="text-sm font-medium tracking-widest uppercase">Przewiń</span>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </a>
      </div>

      {/* Decorative shapes */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-rose-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
    </section>
  )
}
