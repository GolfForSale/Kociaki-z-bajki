'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'
import { Litter, Kitten } from '@/types/sanity'
import { Calendar, Heart, ChevronLeft, ChevronRight, X } from 'lucide-react'

interface BreedingPlansProps {
  litters: Litter[]
  availableKittens: Kitten[]
}

const statusLabels: Record<string, { label: string; color: string }> = {
  planned: { label: 'Planowany', color: 'bg-blue-100 text-blue-700' },
  expected: { label: 'Oczekiwany', color: 'bg-amber-100 text-amber-700' },
  born: { label: 'Urodzony', color: 'bg-green-100 text-green-700' },
  available: { label: 'Dostępny', color: 'bg-rose-100 text-rose-700' },
  completed: { label: 'Zakończony', color: 'bg-slate-100 text-slate-600' },
}

const kittenStatusLabels: Record<string, { label: string; color: string }> = {
  available: { label: 'Dostępny', color: 'bg-green-100 text-green-700' },
  reserved: { label: 'Zarezerwowany', color: 'bg-amber-100 text-amber-700' },
  sold: { label: 'Sprzedany', color: 'bg-slate-100 text-slate-600' },
  staying: { label: 'Zostaje w hodowli', color: 'bg-rose-100 text-rose-700' },
}

export default function BreedingPlans({ litters, availableKittens }: BreedingPlansProps) {
  const [selectedKitten, setSelectedKitten] = useState<Kitten | null>(null)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  const openKittenModal = (kitten: Kitten) => {
    setSelectedKitten(kitten)
    setCurrentPhotoIndex(0)
    document.body.style.overflow = 'hidden'
  }

  const closeKittenModal = () => {
    setSelectedKitten(null)
    document.body.style.overflow = 'auto'
  }

  const nextPhoto = () => {
    if (selectedKitten && selectedKitten.photos) {
      setCurrentPhotoIndex((prev) => 
        prev === selectedKitten.photos.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevPhoto = () => {
    if (selectedKitten && selectedKitten.photos) {
      setCurrentPhotoIndex((prev) => 
        prev === 0 ? selectedKitten.photos.length - 1 : prev - 1
      )
    }
  }

  return (
    <section id="plany-hodowlane" className="py-24 md:py-10 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-1/3 h-px bg-gradient-to-r from-slate-200 to-transparent" />
      <div className="absolute top-1/2 right-0 w-1/3 h-px bg-gradient-to-l from-slate-200 to-transparent" />

      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-rose-500 font-medium tracking-widest uppercase text-sm">Przyszłość hodowli</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-800 mt-4">
            Plany Hodowlane
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-rose-300 to-rose-400 mx-auto mt-6 rounded-full" />
        </div>

        {/* Litters */}
        {litters && litters.length > 0 && (
          <div className="mb-20">
            <h3 className="font-display text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
              <Calendar className="w-6 h-6 text-rose-400" />
              Mioty
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {litters.map((litter) => (
                <div
                  key={litter._id}
                  className="bg-cream-50 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="font-display text-xl font-bold text-slate-800">
                      {litter.name}
                    </h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusLabels[litter.status]?.color || 'bg-slate-100 text-slate-600'}`}>
                      {statusLabels[litter.status]?.label || litter.status}
                    </span>
                  </div>

                  {/* Parents */}
                  <div className="flex items-center gap-4 mb-4">
                    {litter.mother && (
                      <Link
                        href={`/kot/${litter.mother.slug.current}`}
                        className="flex items-center gap-2 group"
                      >
                        <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-rose-200 group-hover:ring-rose-400 transition-all">
                          <Image
                            src={urlFor(litter.mother.mainPhoto).width(80).height(80).url()}
                            alt={litter.mother.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="text-sm text-slate-600 group-hover:text-rose-600 transition-colors">
                          {litter.mother.name}
                        </span>
                      </Link>
                    )}
                    {litter.father && (
                      <span className="text-sm text-slate-500">
                        + {litter.father}
                      </span>
                    )}
                  </div>

                  {/* Date */}
                  {litter.expectedDate && (
                    <p className="text-sm text-slate-500 mb-3">
                      Data: {new Date(litter.expectedDate).toLocaleDateString('pl-PL')}
                    </p>
                  )}

                  {/* Description */}
                  {litter.description && (
                    <p className="text-sm text-slate-600 line-clamp-2">
                      {litter.description}
                    </p>
                  )}

                  {/* Kittens count */}
                  {litter.kittens && litter.kittens.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <p className="text-sm text-slate-500">
                        Kocięta: <span className="font-medium text-slate-700">{litter.kittens.length}</span>
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Available Kittens */}
        {availableKittens && availableKittens.length > 0 && (
          <div>
            <h3 className="font-display text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
              <Heart className="w-6 h-6 text-rose-400" />
              Dostępne Kocięta
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {availableKittens.map((kitten) => (
                <button
                  key={kitten._id}
                  onClick={() => openKittenModal(kitten)}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 text-left"
                >
                  {/* Photo */}
                  <div className="relative aspect-square overflow-hidden">
                    {kitten.photos && kitten.photos.length > 0 && (
                      <Image
                        src={urlFor(kitten.photos[0]).width(400).height(400).url()}
                        alt={kitten.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    )}
                    {/* Photo count badge */}
                    {kitten.photos && kitten.photos.length > 1 && (
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-slate-700">
                        +{kitten.photos.length - 1} zdjęć
                      </div>
                    )}
                    {/* Status badge */}
                    <div className={`absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${kittenStatusLabels[kitten.status]?.color || 'bg-slate-100 text-slate-600'}`}>
                      {kittenStatusLabels[kitten.status]?.label || kitten.status}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h4 className="font-display text-lg font-bold text-slate-800 mb-1">
                      {kitten.name}
                    </h4>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      {kitten.gender && (
                        <span>{kitten.gender === 'female' ? 'Kotka' : 'Kocur'}</span>
                      )}
                      {kitten.color && (
                        <>
                          <span>•</span>
                          <span>{kitten.color}</span>
                        </>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {(!litters || litters.length === 0) && (!availableKittens || availableKittens.length === 0) && (
          <div className="text-center py-12">
            <p className="text-slate-600">Aktualnie nie mamy zaplanowanych miotów ani dostępnych kociąt.</p>
            <p className="text-slate-500 mt-2">Skontaktuj się z nami, aby dowiedzieć się więcej o przyszłych planach.</p>
          </div>
        )}
      </div>

      {/* Kitten Modal */}
      {selectedKitten && (
        <div className="fixed inset-0 z-50 bg-slate-900/95 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row">
            {/* Photos */}
            <div className="relative md:w-1/2 bg-slate-100">
              <div className="relative aspect-square md:aspect-auto md:h-full">
                {selectedKitten.photos && selectedKitten.photos[currentPhotoIndex] && (
                  <Image
                    src={urlFor(selectedKitten.photos[currentPhotoIndex]).width(600).height(600).url()}
                    alt={selectedKitten.name}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              {/* Photo navigation */}
              {selectedKitten.photos && selectedKitten.photos.length > 1 && (
                <>
                  <button
                    onClick={prevPhoto}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextPhoto}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {selectedKitten.photos.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPhotoIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentPhotoIndex ? 'bg-rose-500' : 'bg-white/60'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Info */}
            <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto">
              <button
                onClick={closeKittenModal}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${kittenStatusLabels[selectedKitten.status]?.color || 'bg-slate-100 text-slate-600'}`}>
                {kittenStatusLabels[selectedKitten.status]?.label || selectedKitten.status}
              </span>

              <h3 className="font-display text-3xl font-bold text-slate-800 mb-4">
                {selectedKitten.name}
              </h3>

              <div className="space-y-3 mb-6">
                {selectedKitten.gender && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <span className="font-medium">Płeć:</span>
                    <span>{selectedKitten.gender === 'female' ? 'Kotka' : 'Kocur'}</span>
                  </div>
                )}
                {selectedKitten.color && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <span className="font-medium">Umaszczenie:</span>
                    <span>{selectedKitten.color}</span>
                  </div>
                )}
                {selectedKitten.birthDate && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <span className="font-medium">Data urodzenia:</span>
                    <span>{new Date(selectedKitten.birthDate).toLocaleDateString('pl-PL')}</span>
                  </div>
                )}
              </div>

              {selectedKitten.description && (
                <p className="text-slate-600 leading-relaxed">
                  {selectedKitten.description}
                </p>
              )}

              <div className="mt-8">
                <a
                  href="#kontakt"
                  onClick={(e) => {
                    e.preventDefault()
                    closeKittenModal()
                    setTimeout(() => {
                      document.querySelector('#kontakt')?.scrollIntoView({ behavior: 'smooth' })
                    }, 300)
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-rose-500 text-white rounded-full font-medium hover:bg-rose-600 transition-colors"
                >
                  Zapytaj o tego kociaka
                  <Heart className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
