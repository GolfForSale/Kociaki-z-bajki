import { defineType, defineField } from 'sanity'

export const kitten = defineType({
  name: 'kitten',
  title: 'Kocięta',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Imię',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photos',
      title: 'Zdjęcia',
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
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'gender',
      title: 'Płeć',
      type: 'string',
      options: {
        list: [
          { title: 'Kotka', value: 'female' },
          { title: 'Kocur', value: 'male' },
        ],
      },
    }),
    defineField({
      name: 'birthDate',
      title: 'Data urodzenia',
      type: 'date',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Dostępny', value: 'available' },
          { title: 'Zarezerwowany', value: 'reserved' },
          { title: 'Sprzedany', value: 'sold' },
          { title: 'Zostaje w hodowli', value: 'staying' },
        ],
      },
      initialValue: 'available',
    }),
    defineField({
      name: 'description',
      title: 'Opis',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'color',
      title: 'Umaszczenie',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'status',
      media: 'photos.0',
    },
  },
})
