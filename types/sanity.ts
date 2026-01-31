import { PortableTextBlock } from '@portabletext/types'

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  alt?: string
}

export interface SiteSettings {
  siteName: string
  logo?: SanityImage
  heroImage: SanityImage
  heroTitle?: string
  heroSubtitle?: string
  contactEmail?: string
  contactPhone?: string
  address?: string
  facebookUrl?: string
  instagramUrl?: string
}

export interface AboutBreed {
  title: string
  content: PortableTextBlock[]
  images?: SanityImage[]
}

export interface AboutUs {
  title: string
  content: PortableTextBlock[]
  images?: SanityImage[]
}

export interface Cat {
  _id: string
  name: string
  slug: {
    current: string
  }
  mainPhoto: SanityImage
  description?: string
  gallery?: SanityImage[]
}

export interface GalleryImage {
  _id: string
  image: SanityImage
  alt?: string
  category?: 'cats' | 'kittens' | 'cattery' | 'other'
}

export interface Kitten {
  _id: string
  name: string
  photos: SanityImage[]
  gender?: 'female' | 'male'
  birthDate?: string
  status: 'available' | 'reserved' | 'sold' | 'staying'
  description?: string
  color?: string
  litter?: {
    name: string
  }
}

export interface Litter {
  _id: string
  name: string
  mother?: {
    name: string
    slug: { current: string }
    mainPhoto: SanityImage
  }
  father?: string
  expectedDate?: string
  status: 'planned' | 'expected' | 'born' | 'available' | 'completed'
  description?: string
  kittens?: Kitten[]
}
