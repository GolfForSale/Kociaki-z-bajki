import type { Metadata } from 'next'
import { Cormorant_Garamond, Lora } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  variable: '--font-display',
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const lora = Lora({
  variable: '--font-body',
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Kociak z Bajki - Hodowla Ragdoll',
    default: 'Kociak z Bajki - Hodowla kotów Ragdoll',
  },
  description: 'Hodowla kotów rasowych Ragdoll. Piękne, spokojne koty o wyjątkowym charakterze i niebieskich oczach. Profesjonalna hodowla z pasją i miłością.',
  keywords: ['ragdoll', 'koty ragdoll', 'hodowla kotów', 'kocięta ragdoll', 'koty rasowe', 'hodowla ragdoll'],
  authors: [{ name: 'Kociak z Bajki' }],
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    siteName: 'Kociak z Bajki',
    title: 'Kociak z Bajki - Hodowla kotów Ragdoll',
    description: 'Hodowla kotów rasowych Ragdoll. Piękne, spokojne koty o wyjątkowym charakterze i niebieskich oczach.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pl" className="scroll-smooth">
      <body className={`${cormorant.variable} ${lora.variable} font-body antialiased`}>
        {children}
      </body>
    </html>
  )
}
