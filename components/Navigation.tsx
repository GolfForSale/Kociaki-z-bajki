'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { urlFor } from '@/sanity/lib/image'
import { SanityImage } from '@/types/sanity'

interface NavigationProps {
  logo?: SanityImage
  siteName: string
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

export default function Navigation({ logo, siteName }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-cream-50/95 backdrop-blur-md shadow-lg py-3'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            {logo ? (
              <div className="relative w-12 h-12 overflow-hidden rounded-full ring-2 ring-rose-200 group-hover:ring-rose-300 transition-all">
                <Image
                  src={urlFor(logo).width(96).height(96).url()}
                  alt={siteName}
                  fill
                  className="object-cover"
                />
              </div>
            ) : null}
            <span className={`font-display text-xl font-semibold transition-colors ${
              isScrolled ? 'text-slate-800' : 'text-white'
            }`}>
              {siteName}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isScrolled
                    ? 'text-slate-600 hover:text-rose-600 hover:bg-rose-50'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-white/10'
            }`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-96 mt-4' : 'max-h-0'
          }`}
        >
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-4 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="block px-4 py-3 rounded-xl text-slate-700 hover:text-rose-600 hover:bg-rose-50 transition-colors font-medium"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
