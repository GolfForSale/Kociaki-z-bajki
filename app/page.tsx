import { safeFetch } from '@/sanity/lib/client'
import {
  siteSettingsQuery,
  aboutBreedQuery,
  aboutUsQuery,
  catsQuery,
  galleryQuery,
  littersQuery,
  availableKittensQuery,
  adoptionInfoQuery,
} from '@/sanity/lib/queries'
import {
  SiteSettings,
  AboutBreed,
  AboutUs,
  Cat,
  GalleryImage,
  Litter,
  Kitten,
  AdoptionInfo,
} from '@/types/sanity'

import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import AboutBreedSection from '@/components/AboutBreed'
import AboutUsSection from '@/components/AboutUs'
import OurCats from '@/components/OurCats'
import Gallery from '@/components/Gallery'
import BreedingPlans from '@/components/BreedingPlans'
import AdoptionInfoSection from '@/components/AdoptionInfo'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

async function getData() {
  const [siteSettings, aboutBreed, aboutUs, cats, gallery, litters, availableKittens, adoptionInfo] = await Promise.all([
    safeFetch<SiteSettings>(siteSettingsQuery),
    safeFetch<AboutBreed>(aboutBreedQuery),
    safeFetch<AboutUs>(aboutUsQuery),
    safeFetch<Cat[]>(catsQuery),
    safeFetch<GalleryImage[]>(galleryQuery),
    safeFetch<Litter[]>(littersQuery),
    safeFetch<Kitten[]>(availableKittensQuery),
    safeFetch<AdoptionInfo>(adoptionInfoQuery),
  ])

  return {
    siteSettings,
    aboutBreed,
    aboutUs,
    cats: cats || [],
    gallery: gallery || [],
    litters: litters || [],
    availableKittens: availableKittens || [],
    adoptionInfo,
  }
}

export default async function Home() {
  const data = await getData()

  // Default values for when CMS is not set up yet
  const defaultSettings = {
    siteName: 'Kociak z Bajki',
    heroTitle: 'Kociak z Bajki',
    heroSubtitle: 'Hodowla kotów rasowych Ragdoll. Piękne, spokojne koty o wyjątkowym charakterze i niebieskich oczach.',
  }

  const settings = data.siteSettings || defaultSettings

  return (
    <>
      <Navigation
        logo={data.siteSettings?.logo}
        siteName={settings.siteName}
      />

      <main>
        {data.siteSettings?.heroImage ? (
          <Hero
            heroImage={data.siteSettings.heroImage}
            heroTitle={settings.heroTitle}
            heroSubtitle={settings.heroSubtitle}
          />
        ) : (
          // Placeholder hero when no image is set
          <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
            <div className="text-center text-white p-6">
              <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
                {settings.heroTitle}
              </h1>
              <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
                {settings.heroSubtitle}
              </p>
              <p className="text-sm text-white/50">
                Przejdź do panelu CMS (/studio), aby dodać zdjęcie główne i treści.
              </p>
            </div>
          </section>
        )}

        <AboutBreedSection data={data.aboutBreed} />
        <AboutUsSection data={data.aboutUs} />
        <OurCats cats={data.cats || []} />
        <Gallery images={data.gallery || []} />
        <BreedingPlans
          litters={data.litters || []}
          availableKittens={data.availableKittens || []}
        />
        <AdoptionInfoSection data={data.adoptionInfo} />
        <Contact
          email={data.siteSettings?.contactEmail}
          phone={data.siteSettings?.contactPhone}
          address={data.siteSettings?.address}
          facebookUrl={data.siteSettings?.facebookUrl}
          instagramUrl={data.siteSettings?.instagramUrl}
        />
      </main>

      <Footer
        logo={data.siteSettings?.logo}
        siteName={settings.siteName}
        facebookUrl={data.siteSettings?.facebookUrl}
        instagramUrl={data.siteSettings?.instagramUrl}
      />
    </>
  )
}
