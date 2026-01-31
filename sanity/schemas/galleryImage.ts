import { defineType, defineField } from 'sanity'

export const galleryImage = defineType({
  name: 'galleryImage',
  title: 'Galeria',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Zdjęcie',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Tekst alternatywny',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Kategoria',
      type: 'string',
      options: {
        list: [
          { title: 'Koty', value: 'cats' },
          { title: 'Kocięta', value: 'kittens' },
          { title: 'Hodowla', value: 'cattery' },
          { title: 'Inne', value: 'other' },
        ],
      },
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
      title: 'alt',
      media: 'image',
      subtitle: 'category',
    },
  },
})
