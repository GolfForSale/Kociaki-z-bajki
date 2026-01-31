# Kociak z Bajki - Hodowla Ragdoll

Profesjonalna strona internetowa dla hodowli kotów Ragdoll, zbudowana z wykorzystaniem Next.js 14, Sanity CMS i Tailwind CSS.

## Funkcje

- **SPA z płynną nawigacją** - Wszystkie sekcje na jednej stronie z gładkim przewijaniem
- **CMS Sanity** - Łatwe zarządzanie treścią dla osób nietechnicznych
- **SEO** - Zoptymalizowana pod kątem wyszukiwarek
- **Responsywność** - Działa na wszystkich urządzeniach
- **Galeria ze lightboxem** - Przeglądanie zdjęć w pełnoekranowym trybie
- **Formularz kontaktowy** - Integracja z Formspree
- **Profile kotów** - Indywidualne strony dla każdego kota z galerią

## Sekcje

1. **Hero** - Duże zdjęcie w tle z informacjami o hodowli
2. **O rasie Ragdoll** - Informacje o rasie
3. **O nas** - Historia i opis hodowli
4. **Nasze Kotki** - Galeria kotów z linkami do profili
5. **Galeria** - Zdjęcia z filtrowaniem kategorii
6. **Plany hodowlane** - Planowane mioty i dostępne kocięta
7. **Kontakt** - Formularz kontaktowy i dane

## Technologie

- **Next.js 14** (App Router)
- **Sanity v3** (Headless CMS)
- **Tailwind CSS v4**
- **TypeScript**
- **Lucide React** (Ikony)

## Instalacja

### 1. Klonowanie repozytorium

```bash
git clone <repo-url>
cd ragdolls-cats
npm install
```

### 2. Konfiguracja Sanity

1. Utwórz konto na [sanity.io](https://www.sanity.io/)
2. Utwórz nowy projekt w [Sanity Dashboard](https://www.sanity.io/manage)
3. Skopiuj Project ID

### 3. Zmienne środowiskowe

Skopiuj plik `env.example` do `.env.local`:

```bash
cp env.example .env.local
```

Uzupełnij wartości:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=twój_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/twój_form_id
```

### 4. Konfiguracja CORS w Sanity

W [Sanity Dashboard](https://www.sanity.io/manage) dodaj dozwolone originy:
- `http://localhost:3000` (development)
- `https://twoja-domena.vercel.app` (production)

### 5. Uruchomienie

```bash
npm run dev
```

Strona: http://localhost:3000
Panel CMS: http://localhost:3000/studio

## Panel CMS (Sanity Studio)

Panel administracyjny dostępny pod `/studio`. Pozwala na zarządzanie:

- **Ustawienia strony** - Logo, hero, dane kontaktowe
- **O rasie Ragdoll** - Treść i zdjęcia sekcji
- **O nas** - Treść i zdjęcia sekcji
- **Koty** - Profile kotów z galeriami
- **Galeria** - Zdjęcia z kategoriami
- **Mioty** - Planowane i aktualne mioty
- **Kocięta** - Dostępne kocięta ze statusem

## Hosting na Vercel (Za darmo)

1. Utwórz konto na [vercel.com](https://vercel.com)
2. Zaimportuj repozytorium z GitHub
3. Dodaj zmienne środowiskowe w ustawieniach projektu
4. Deploy!

## Formularz kontaktowy (Formspree)

1. Utwórz konto na [formspree.io](https://formspree.io)
2. Utwórz nowy formularz
3. Skopiuj endpoint i dodaj do `.env.local`

## Struktura projektu

```
ragdolls-cats/
├── app/
│   ├── layout.tsx          # Główny layout z fontami
│   ├── page.tsx            # Strona główna (SPA)
│   ├── globals.css         # Style globalne
│   ├── kot/[slug]/         # Strony profili kotów
│   └── studio/             # Sanity Studio
├── components/             # Komponenty React
├── sanity/
│   ├── schemas/            # Schematy CMS
│   └── lib/                # Klient i zapytania
├── types/                  # TypeScript types
└── public/                 # Statyczne pliki
```

## Customizacja

### Kolory

Edytuj zmienne w `app/globals.css`:

```css
@theme {
  --color-cream-50: #fdfcfb;
  --color-rose-500: #f43f5e;
  /* ... */
}
```

### Fonty

Zmień fonty w `app/layout.tsx`:

```typescript
const cormorant = Cormorant_Garamond({...})
const lora = Lora({...})
```

## Licencja

Wszystkie prawa zastrzeżone.
