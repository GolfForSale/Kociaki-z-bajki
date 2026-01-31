import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { safeFetch } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { catBySlugQuery, catsQuery, siteSettingsQuery } from '@/sanity/lib/queries'
import { Cat, SiteSettings } from '@/types/sanity'
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import CatGallery from './CatGallery'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const cats = await safeFetch<Cat[]>(catsQuery)
  if (!cats) return []
  return cats.map((cat) => ({
    slug: cat.slug.current,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cat = await safeFetch<Cat>(catBySlugQuery, { slug })

  if (!cat) {
    return {
      title: 'Kot nie znaleziony',
    }
  }

  return {
    title: cat.name,
    description: cat.description || `Poznaj ${cat.name} - pięknego kota rasy Ragdoll z naszej hodowli.`,
    openGraph: {
      title: `${cat.name} | Kociak z Bajki`,
      description: cat.description || `Poznaj ${cat.name} - pięknego kota rasy Ragdoll.`,
      images: cat.mainPhoto
        ? [{ url: urlFor(cat.mainPhoto).width(1200).height(630).url() }]
        : [],
    },
  }
}

export default async function CatPage({ params }: Props) {
  const { slug } = await params
  const [cat, siteSettings, allCatsResult] = await Promise.all([
    safeFetch<Cat>(catBySlugQuery, { slug }),
    safeFetch<SiteSettings>(siteSettingsQuery),
    safeFetch<Cat[]>(catsQuery),
  ])
  
  const allCats = allCatsResult || []

  if (!cat) {
    notFound()
  }

  // Find next and previous cats
  const currentIndex = allCats.findIndex((c) => c._id === cat._id)
  const prevCat = currentIndex > 0 ? allCats[currentIndex - 1] : null
  const nextCat = currentIndex < allCats.length - 1 ? allCats[currentIndex + 1] : null

  // Combine main photo with gallery
  const allPhotos = [cat.mainPhoto, ...(cat.gallery || [])]

  return (
    <>
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cream-50/95 backdrop-blur-md shadow-sm py-4">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link
            href="/#nasze-kotki"
            className="flex items-center gap-2 text-slate-600 hover:text-rose-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Powrót do kotów</span>
          </Link>

          <Link href="/" className="font-display text-xl font-semibold text-slate-800">
            {siteSettings?.siteName || 'Kociak z Bajki'}
          </Link>

          <div className="w-32" /> {/* Spacer */}
        </div>
      </nav>

      <main className="pt-20 min-h-screen bg-cream-50">
        {/* Hero Section */}
        <section className="relative">
          <div className="container mx-auto px-6 py-12 md:py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Gallery */}
              <CatGallery photos={allPhotos} catName={cat.name} />

              {/* Info */}
              <div className="lg:sticky lg:top-32">
                <span className="text-rose-500 font-medium tracking-widest uppercase text-sm">
                  Ragdoll
                </span>
                <h1 className="font-display text-5xl md:text-6xl font-bold text-slate-800 mt-4 mb-8">
                  {cat.name}
                </h1>

                {cat.description && (
                  <p className="text-lg text-slate-600 leading-relaxed mb-8">
                    {cat.description}
                  </p>
                )}

                {/* Stats/Info Cards */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white rounded-2xl p-5 shadow-sm">
                    <span className="text-sm text-slate-500">Galeria zdjęć</span>
                    <p className="font-display text-2xl font-bold text-slate-800 mt-1">
                      {allPhotos.length} zdjęć
                    </p>
                  </div>
                  <div className="bg-white rounded-2xl p-5 shadow-sm">
                    <span className="text-sm text-slate-500">Rasa</span>
                    <p className="font-display text-2xl font-bold text-slate-800 mt-1">
                      Ragdoll
                    </p>
                  </div>
                </div>

                {/* Contact CTA */}
                <Link
                  href="/#kontakt"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-rose-500 text-white rounded-full font-medium hover:bg-rose-600 transition-colors shadow-lg shadow-rose-200"
                >
                  Zapytaj o kociaki
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation between cats */}
        <section className="border-t border-slate-200 bg-white">
          <div className="container mx-auto px-6">
            <div className="flex">
              {/* Previous Cat */}
              <div className="flex-1 border-r border-slate-200">
                {prevCat ? (
                  <Link
                    href={`/kot/${prevCat.slug.current}`}
                    className="flex items-center gap-4 p-6 md:p-10 hover:bg-slate-50 transition-colors group"
                  >
                    <ChevronLeft className="w-6 h-6 text-slate-400 group-hover:text-rose-500 transition-colors" />
                    <div className="hidden sm:block relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-slate-200 group-hover:ring-rose-300 transition-all">
                      <Image
                        src={urlFor(prevCat.mainPhoto).width(128).height(128).url()}
                        alt={prevCat.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-sm text-slate-500">Poprzedni</span>
                      <p className="font-display text-lg font-bold text-slate-800 group-hover:text-rose-600 transition-colors">
                        {prevCat.name}
                      </p>
                    </div>
                  </Link>
                ) : (
                  <div className="p-6 md:p-10" />
                )}
              </div>

              {/* Next Cat */}
              <div className="flex-1">
                {nextCat ? (
                  <Link
                    href={`/kot/${nextCat.slug.current}`}
                    className="flex items-center justify-end gap-4 p-6 md:p-10 hover:bg-slate-50 transition-colors group"
                  >
                    <div className="text-right">
                      <span className="text-sm text-slate-500">Następny</span>
                      <p className="font-display text-lg font-bold text-slate-800 group-hover:text-rose-600 transition-colors">
                        {nextCat.name}
                      </p>
                    </div>
                    <div className="hidden sm:block relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-slate-200 group-hover:ring-rose-300 transition-all">
                      <Image
                        src={urlFor(nextCat.mainPhoto).width(128).height(128).url()}
                        alt={nextCat.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <ChevronRight className="w-6 h-6 text-slate-400 group-hover:text-rose-500 transition-colors" />
                  </Link>
                ) : (
                  <div className="p-6 md:p-10" />
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Simple Footer */}
      <footer className="bg-slate-900 py-8">
        <div className="container mx-auto px-6 text-center">
          <Link href="/" className="font-display text-xl font-semibold text-white hover:text-rose-400 transition-colors">
            {siteSettings?.siteName || 'Kociak z Bajki'}
          </Link>
          <p className="text-slate-500 mt-2">
            © {new Date().getFullYear()} Wszelkie prawa zastrzeżone.
          </p>
        </div>
      </footer>
    </>
  )
}
