import { defineType, defineField } from 'sanity'

export const cat = defineType({
  name: 'cat',
  title: 'Koty',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Imię',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainPhoto',
      title: 'Zdjęcie główne',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Opis',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'gallery',
      title: 'Galeria zdjęć',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Tekst alternatywny',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Kolejność wyświetlania',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'mainPhoto',
    },
  },
})
