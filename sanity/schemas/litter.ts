import { defineType, defineField } from 'sanity'

export const litter = defineType({
  name: 'litter',
  title: 'Mioty',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nazwa miotu',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mother',
      title: 'Mama',
      type: 'reference',
      to: [{ type: 'cat' }],
    }),
    defineField({
      name: 'father',
      title: 'Tata (imię)',
      type: 'string',
    }),
    defineField({
      name: 'expectedDate',
      title: 'Przewidywana data / Data urodzenia',
      type: 'date',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Planowany', value: 'planned' },
          { title: 'Oczekiwany', value: 'expected' },
          { title: 'Urodzony', value: 'born' },
          { title: 'Dostępny', value: 'available' },
          { title: 'Zakończony', value: 'completed' },
        ],
      },
      initialValue: 'planned',
    }),
    defineField({
      name: 'description',
      title: 'Opis',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'kittens',
      title: 'Kocięta',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'kitten' }],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'status',
    },
  },
})
