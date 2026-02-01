'use client'

import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'
import { SanityImage } from '@/types/sanity'
import { Heart, Facebook, Instagram } from 'lucide-react'

interface FooterProps {
  logo?: SanityImage
  siteName: string
  facebookUrl?: string
  instagramUrl?: string
}

const navItems = [
  { href: '#o-rasie', label: 'O rasie Ragdoll' },
  { href: '#o-nas', label: 'O nas' },
  { href: '#nasze-kotki', label: 'Nasze Kotki' },
  { href: '#galeria', label: 'Galeria' },
  { href: '#plany-hodowlane', label: 'Plany hodowlane' },
  { href: '#adopcja', label: 'Zanim kupisz kota' },
  { href: '#kontakt', label: 'Kontakt' },
]

export default function Footer({ logo, siteName, facebookUrl, instagramUrl }: FooterProps) {
  const currentYear = new Date().getFullYear()

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              {logo && (
                <div className="relative w-12 h-12 overflow-hidden rounded-full ring-2 ring-rose-400/30">
                  <Image
                    src={urlFor(logo).width(96).height(96).url()}
                    alt={siteName}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <span className="font-display text-xl font-semibold text-white">
                {siteName}
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed max-w-md">
              Hodowla kotów rasowych Ragdoll. Nasze koty są wychowywane z miłością, w domowym środowisku, 
              co gwarantuje ich wspaniały charakter i zdrowie.
            </p>

            {/* Social Links */}
            {(facebookUrl || instagramUrl) && (
              <div className="flex gap-4 mt-6">
                {facebookUrl && (
                  <a
                    href={facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                )}
                {instagramUrl && (
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 hover:text-white transition-all"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-display font-semibold text-white mb-6">Nawigacja</h3>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-slate-400 hover:text-rose-400 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Info */}
          <div>
            <h3 className="font-display font-semibold text-white mb-6">O Ragdollach</h3>
            <ul className="space-y-3 text-slate-400">
              <li>Spokojny charakter</li>
              <li>Niebieskie oczy</li>
              <li>Półdługie futro</li>
              <li>Idealne do domu</li>
              <li>Przyjazne dzieciom</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {currentYear} {siteName}. Wszelkie prawa zastrzeżone.
          </p>
          <p className="text-slate-500 text-sm flex items-center gap-1">
            Stworzone z <Heart className="w-4 h-4 text-rose-400" /> dla miłośników kotów
          </p>
        </div>
      </div>
    </footer>
  )
}
