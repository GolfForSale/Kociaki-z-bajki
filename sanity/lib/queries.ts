import { groq } from 'next-sanity'

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    logo,
    heroImage,
    heroTitle,
    heroSubtitle,
    contactEmail,
    contactPhone,
    address,
    facebookUrl,
    instagramUrl
  }
`

export const aboutBreedQuery = groq`
  *[_type == "aboutBreed"][0] {
    title,
    content,
    images
  }
`

export const aboutUsQuery = groq`
  *[_type == "aboutUs"][0] {
    title,
    content,
    images
  }
`

export const catsQuery = groq`
  *[_type == "cat"] | order(order asc) {
    _id,
    name,
    slug,
    mainPhoto,
    description,
    gallery
  }
`

export const catBySlugQuery = groq`
  *[_type == "cat" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    mainPhoto,
    description,
    gallery
  }
`

export const galleryQuery = groq`
  *[_type == "galleryImage"] | order(order asc) {
    _id,
    image,
    alt,
    category
  }
`

export const littersQuery = groq`
  *[_type == "litter"] | order(expectedDate desc) {
    _id,
    name,
    mother->{name, slug, mainPhoto},
    father,
    expectedDate,
    status,
    description,
    kittens[]->{
      _id,
      name,
      photos,
      status,
      description,
      gender
    }
  }
`

export const availableKittensQuery = groq`
  *[_type == "kitten" && status == "available"] | order(_createdAt desc) {
    _id,
    name,
    photos,
    status,
    description,
    gender,
    birthDate,
    litter->{name}
  }
`
