import { defineType, defineField } from 'sanity'

export const adoptionInfo = defineType({
  name: 'adoptionInfo',
  title: 'Informacje o adopcji',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tytuł sekcji',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Podtytuł',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Treść',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
          },
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
        },
      ],
    }),
    defineField({
      name: 'image',
      title: 'Zdjęcie',
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
    }),
    defineField({
      name: 'imagePosition',
      title: 'Pozycja zdjęcia',
      type: 'string',
      options: {
        list: [
          { title: 'Po lewej', value: 'left' },
          { title: 'Po prawej', value: 'right' },
        ],
      },
      initialValue: 'right',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
})
