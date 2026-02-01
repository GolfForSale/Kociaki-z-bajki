'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Mail, Phone, MapPin, Facebook, Instagram, Send, CheckCircle } from 'lucide-react'

interface ContactProps {
  email?: string
  phone?: string
  address?: string
  facebookUrl?: string
  instagramUrl?: string
}

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export default function Contact({ email, phone, address, facebookUrl, instagramUrl }: ContactProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT

      if (!formspreeEndpoint) {
        // If no Formspree endpoint, show success anyway for demo
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setIsSubmitted(true)
        reset()
        return
      }

      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setIsSubmitted(true)
        reset()
      } else {
        throw new Error('Nie udało się wysłać wiadomości')
      }
    } catch {
      setError('Wystąpił błąd. Spróbuj ponownie lub skontaktuj się bezpośrednio.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="kontakt" className="py-24 md:py-10 bg-gradient-to-br from-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-rose-400/30 to-transparent" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-rose-400 font-medium tracking-widest uppercase text-sm">Porozmawiajmy</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-4">
            Kontakt
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-rose-500 mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <h3 className="font-display text-2xl font-bold text-white mb-8">
              Skontaktuj się z nami
            </h3>
            <p className="text-slate-300 leading-relaxed mb-10">
              Masz pytania dotyczące naszych kotów lub hodowli? Chętnie odpowiemy na wszystkie Twoje pytania. Napisz do nas lub zadzwoń.
            </p>

            <div className="space-y-6">
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-4 text-slate-300 hover:text-rose-400 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-slate-700/50 flex items-center justify-center group-hover:bg-rose-500/20 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span>{email}</span>
                </a>
              )}

              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="flex items-center gap-4 text-slate-300 hover:text-rose-400 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-slate-700/50 flex items-center justify-center group-hover:bg-rose-500/20 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span>{phone}</span>
                </a>
              )}

              {address && (
                <div className="flex items-center gap-4 text-slate-300">
                  <div className="w-12 h-12 rounded-full bg-slate-700/50 flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="whitespace-pre-line">{address}</span>
                </div>
              )}
            </div>

            {/* Social Links */}
            {(facebookUrl || instagramUrl) && (
              <div className="mt-10">
                <h4 className="text-white font-medium mb-4">Znajdź nas w social media</h4>
                <div className="flex gap-4">
                  {facebookUrl && (
                    <a
                      href={facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-slate-700/50 flex items-center justify-center text-slate-300 hover:bg-blue-600 hover:text-white transition-all"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                  )}
                  {instagramUrl && (
                    <a
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-slate-700/50 flex items-center justify-center text-slate-300 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 hover:text-white transition-all"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Contact Form */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-white/10">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-4">
                  Wiadomość wysłana!
                </h3>
                <p className="text-slate-300 mb-6">
                  Dziękujemy za kontakt. Odpowiemy najszybciej jak to możliwe.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-rose-400 hover:text-rose-300 font-medium transition-colors"
                >
                  Wyślij kolejną wiadomość
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                      Imię i nazwisko *
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register('name', { required: 'Pole wymagane' })}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition-colors"
                      placeholder="Jan Kowalski"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-rose-400">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register('email', {
                        required: 'Pole wymagane',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Nieprawidłowy adres email',
                        },
                      })}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition-colors"
                      placeholder="jan@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-rose-400">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      {...register('phone')}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition-colors"
                      placeholder="+48 123 456 789"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
                      Temat
                    </label>
                    <select
                      id="subject"
                      {...register('subject')}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition-colors"
                    >
                      <option value="general">Pytanie ogólne</option>
                      <option value="kitten">Zapytanie o kociaka</option>
                      <option value="visit">Umówienie wizyty</option>
                      <option value="other">Inne</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                    Wiadomość *
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    {...register('message', { required: 'Pole wymagane' })}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition-colors resize-none"
                    placeholder="Twoja wiadomość..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-rose-400">{errors.message.message}</p>
                  )}
                </div>

                {error && (
                  <div className="p-4 bg-rose-500/20 border border-rose-500/50 rounded-xl text-rose-300 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-rose-500 text-white rounded-xl font-medium hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 focus:ring-offset-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Wysyłanie...
                    </>
                  ) : (
                    <>
                      Wyślij wiadomość
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
