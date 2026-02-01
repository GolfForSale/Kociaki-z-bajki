'use client'

import { useState } from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { GalleryImage } from '@/types/sanity'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface GalleryProps {
  images: GalleryImage[]
}

const categories = [
  { value: 'all', label: 'Wszystkie' },
  { value: 'cats', label: 'Koty' },
  { value: 'kittens', label: 'Kocięta' },
  { value: 'cattery', label: 'Hodowla' },
  { value: 'other', label: 'Inne' },
]

export default function Gallery({ images }: GalleryProps) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const filteredImages = activeCategory === 'all'
    ? images
    : images.filter(img => img.category === activeCategory)

  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = 'auto'
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? filteredImages.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === filteredImages.length - 1 ? 0 : prev + 1))
  }

  if (!images || images.length === 0) {
    return (
      <section id="galeria" className="py-24 md:py-32 bg-cream-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-display text-4xl font-bold text-slate-800">Galeria</h2>
          <p className="mt-4 text-slate-600">Wkrótce dodamy zdjęcia...</p>
        </div>
      </section>
    )
  }

  return (
    <section id="galeria" className="py-24 md:py-10 bg-cream-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-rose-100/40 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-rose-500 font-medium tracking-widest uppercase text-sm">Wspomnienia</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-800 mt-4">
            Galeria
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-rose-300 to-rose-400 mx-auto mt-6 rounded-full" />
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.value
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-200'
                  : 'bg-white text-slate-600 hover:bg-rose-50 hover:text-rose-600 shadow-sm'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Images Grid - Cropped thumbnails for uniform look */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image, index) => (
            <button
              key={image._id}
              onClick={() => openLightbox(index)}
              className="relative aspect-square rounded-2xl overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300"
            >
              <Image
                src={urlFor(image.image).width(400).height(400).fit('crop').url()}
                alt={image.alt || 'Zdjęcie z galerii'}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/30 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                  <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && filteredImages[currentIndex] && (
        <div className="fixed inset-0 z-50 bg-slate-900/95 flex items-center justify-center p-4">
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 md:left-8 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 md:right-8 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image - Full uncropped image in lightbox */}
          <div className="relative max-w-5xl max-h-[80vh] w-full h-full flex items-center justify-center">
            <Image
              src={urlFor(filteredImages[currentIndex].image).width(1600).url()}
              alt={filteredImages[currentIndex].alt || 'Zdjęcie z galerii'}
              width={1600}
              height={1200}
              className="max-w-full max-h-[80vh] w-auto h-auto"
              style={{ objectFit: 'contain' }}
            />
          </div>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm">
            {currentIndex + 1} / {filteredImages.length}
          </div>
        </div>
      )}
    </section>
  )
}
