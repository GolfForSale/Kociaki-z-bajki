import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Ustawienia strony',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Nazwa hodowli',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'heroImage',
      title: 'Zdjęcie główne (Hero)',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroTitle',
      title: 'Tytuł na stronie głównej',
      type: 'string',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Podtytuł na stronie głównej',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'contactEmail',
      title: 'Email kontaktowy',
      type: 'string',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Telefon kontaktowy',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Adres',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'facebookUrl',
      title: 'Link do Facebook',
      type: 'url',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Link do Instagram',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      title: 'siteName',
      media: 'logo',
    },
  },
})
