import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-mono',
  display: 'swap',
})

const SITE_URL = 'https://andresgaleano.dev'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Andres Felipe Galeano Tellez — Data & AI Engineer | Portfolio Profesional',
    template: '%s — Andres Galeano',
  },
  description:
    'Portfolio oficial de Andres Felipe Galeano Tellez. Data Engineer, AI Engineer y Software Engineer especializado en Ciencia de Datos. Construyo pipelines de datos, arquitecturas escalables y soluciones inteligentes con Python, SQL, Cloud y Machine Learning.',
  keywords: [
    'Andres Felipe Galeano Tellez',
    'Andres Galeano',
    'Data Engineer',
    'AI Engineer',
    'Software Engineer',
    'Ingeniero de Datos',
    'Ciencia de Datos',
    'Python',
    'SQL',
    'Snowflake',
    'Docker',
    'Machine Learning',
    'Inteligencia Artificial',
    'IA Generativa',
    'CrewAI',
    'Portfolio Data Engineer',
    'Portfolio AI Engineer',
    'Bogotá Data Engineer',
    'Tunja',
    'Colombia',
  ],
  authors: [{ name: 'Andres Felipe Galeano Tellez', url: SITE_URL }],
  creator: 'Andres Felipe Galeano Tellez',
  publisher: 'Andres Felipe Galeano Tellez',
  applicationName: 'Andres Galeano — Portfolio',
  formatDetection: { telephone: true, email: true, address: true },
  alternates: {
    canonical: SITE_URL,
    languages: { 'es-CO': SITE_URL },
  },
  openGraph: {
    type: 'profile',
    locale: 'es_CO',
    alternateLocale: 'en_US',
    url: SITE_URL,
    siteName: 'Andres Galeano',
    title: 'Andres Felipe Galeano Tellez — Data & AI Engineer',
    description:
      'Portfolio profesional y blog técnico de Andres Galeano: Data Engineering con Python, SQL, Cloud e IA.',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Andres Galeano — Data & AI Engineer | Python · SQL · Cloud · ML',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Andres Felipe Galeano Tellez — Data & AI Engineer',
    description:
      'Data Engineering, IA y Cloud. Conoce mi portfolio y blog técnico.',
    images: [`${SITE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'technology',
  classification: 'Portfolio profesional - Ingeniería de Datos e IA',
  verification: { google: 'TU_GOOGLE_SITE_VERIFICATION' },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#141414',
  width: 'device-width',
  initialScale: 1,
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    name: 'Andres Felipe Galeano Tellez — Portfolio',
    url: SITE_URL,
    inLanguage: 'es-CO',
    mainEntity: {
      '@type': 'Person',
      name: 'Andres Felipe Galeano Tellez',
      givenName: 'Andres Felipe',
      familyName: 'Galeano Tellez',
      alternateName: 'Andres Galeano',
      identifier: 'andres-felipe-galeano-tellez',
      image: `${SITE_URL}/og-image.png`,
      jobTitle: ['Data Engineer', 'AI Engineer', 'Software Engineer'],
      worksFor: {
        '@type': 'EducationalOrganization',
        name: 'Universidad Santo Tomás — Seccional Tunja',
      },
      email: 'andres.galeano@usantoto.edu.co',
      telephone: '+57 316 368 4112',
      url: SITE_URL,
      sameAs: [
        'https://github.com/Zanyllect68',
        'https://github.com/AndresF-GaleanoT',
        'https://www.linkedin.com/in/andres-felipe-galeano-tellez-a7285a250',
      ],
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'CO',
        addressLocality: 'Tunja',
        addressRegion: 'Boyacá',
      },
      nationality: {
        '@type': 'Country',
        name: 'Colombia',
      },
      knowsLanguage: ['es', 'en'],
      knowsAbout: [
        'Data Engineering',
        'ETL',
        'Artificial Intelligence',
        'Machine Learning',
        'IA Generativa',
        'CrewAI',
        'NVIDIA NIM',
        'Software Architecture',
        'Arquitectura Hexagonal',
        'Cloud Computing',
        'AWS',
        'Python',
        'SQL',
        'PostgreSQL',
        'Snowflake',
        'Docker',
      ],
      alumniOf: [
        {
          '@type': 'EducationalOrganization',
          name: 'Universidad Santo Tomás',
          alumniOf: 'Grado en Ingeniería de Sistemas',
        },
        {
          '@type': 'EducationalOrganization',
          name: 'Universidad de La Sabana',
        },
        {
          '@type': 'EducationalOrganization',
          name: 'Universidad del Rosario',
        },
        {
          '@type': 'EducationalOrganization',
          name: 'Universidad EAN',
        },
      ],
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'degree',
          name: 'Ingeniería de Sistemas',
          educationalLevel: 'Grado en Ingeniería',
          recognizedBy: { '@type': 'Organization', name: 'Universidad Santo Tomás' },
        },
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'degree',
          name: 'Ingeniería de Datos e Inteligencia Artificial',
          educationalLevel: 'Grado en Ingeniería',
          recognizedBy: { '@type': 'Organization', name: 'Universidad Santo Tomás' },
        },
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'specialty',
          name: 'Especialización en Ciencia de Datos',
          recognizedBy: { '@type': 'Organization', name: 'Universidad Santo Tomás' },
        },
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'professional',
          name: 'IA Generativa: Ingeniería de Prompts y Agentes Inteligentes',
          recognizedBy: { '@type': 'Organization', name: 'Universidad de La Sabana' },
        },
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'andres.galeano@usantoto.edu.co',
        telephone: '+57 316 368 4112',
        contactType: 'professional',
        availableLanguage: ['es', 'en'],
      },
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Andres Felipe Galeano Tellez — Portfolio',
    alternateName: 'Andres Galeano Portfolio',
    url: SITE_URL,
    inLanguage: 'es-CO',
    publisher: {
      '@type': 'Person',
      name: 'Andres Felipe Galeano Tellez',
      url: SITE_URL,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/?s={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Andres Felipe Galeano Tellez — Data & AI Engineer | Portfolio Profesional',
    description:
      'Portfolio profesional y blog técnico de Andres Galeano: Data Engineering, IA y Cloud.',
    url: SITE_URL,
    inLanguage: 'es-CO',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Andres Galeano Portfolio',
      url: SITE_URL,
    },
  },
]

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`dark ${spaceGrotesk.variable} ${plexMono.variable} bg-background`}
      suppressHydrationWarning
    >
      <head>
        <link rel="canonical" href={SITE_URL} />
        <meta name="google-site-verification" content="TU_GOOGLE_SITE_VERIFICATION" />
        <meta name="geo.region" content="CO-BOY" />
        <meta name="geo.placename" content="Tunja, Boyacá, Colombia" />
        <meta name="author" content="Andres Felipe Galeano Tellez" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
