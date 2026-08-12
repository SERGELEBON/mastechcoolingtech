import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import FloatingWhatsApp from "@/components/sections/FloatingWhatsApp";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mastech Cooling Technology | Professional Car AC Repair & Service in Ghana",
  description:
    "Leading car air conditioning specialists in Ghana. Expert electronic diagnostics, AC repair, refrigerant recharge, compressor replacement, and complete system cleaning. Fast, reliable service for all vehicle makes. Call +233 24 460 8104 for a free quote.",
  keywords: [
    "car air conditioning Ghana",
    "car AC repair Accra",
    "AC refrigerant recharge",
    "auto AC service Ghana",
    "electronic car diagnostics",
    "Mastech Cooling Technology",
    "car AC maintenance",
    "AC compressor repair",
    "car AC condenser",
    "evaporator cleaning",
    "auto cooling system",
    "vehicle AC specialists",
    "car aircon repair near me",
    "professional car AC service",
    "automotive cooling experts Ghana",
  ],
  authors: [{ name: "Mastech Cooling Technology" }],
  creator: "Mastech Cooling Technology",
  publisher: "Mastech Cooling Technology",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "mask-icon",
        url: "/mastech-logo.jpeg",
      },
    ],
  },
  openGraph: {
    title: "Mastech Cooling Technology | Professional Car AC Repair & Service in Ghana",
    description:
      "Leading car air conditioning specialists in Ghana. Expert diagnostics, repair, refrigerant recharge, and complete system cleaning. Fast, reliable service for all vehicle makes. Get a free quote today!",
    type: "website",
    locale: "en_US",
    url: "https://mastechcooling.com",
    siteName: "Mastech Cooling Technology",
    images: [
      {
        url: "/mastech-logo.jpeg",
        width: 1200,
        height: 630,
        alt: "Mastech Cooling Technology - Car Air Conditioning Specialists",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mastech Cooling Technology | Car AC Experts in Ghana",
    description:
      "Professional car air conditioning repair, diagnostics & service in Ghana. Expert technicians, quality parts, affordable rates. Call +233 24 460 8104",
    images: ["/mastech-logo.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification-code-here",
  },
  alternates: {
    canonical: "https://mastechcooling.com",
  },
  category: "Automotive Services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": "https://mastechcooling.com",
    "name": "Mastech Cooling Technology",
    "image": "https://mastechcooling.com/mastech-logo.jpeg",
    "description": "Professional car air conditioning repair and service in Ghana. Expert diagnostics, AC repair, refrigerant recharge, and complete system cleaning.",
    "url": "https://mastechcooling.com",
    "telephone": "+233244608104",
    "email": "contact@mastechcooling.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "GH",
      "addressLocality": "Accra",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "addressCountry": "Ghana",
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "08:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "15:00"
      }
    ],
    "priceRange": "$$",
    "slogan": "Masters in Cooling",
    "areaServed": {
      "@type": "Country",
      "name": "Ghana"
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "addressCountry": "Ghana"
      }
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Car Air Conditioning Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Electronic Diagnostics",
            "description": "Advanced computer diagnostics to identify AC system issues"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AC System Repair",
            "description": "Expert repair of all air conditioning components"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Refrigerant Recharge",
            "description": "Professional refrigerant refilling and leak detection"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AC System Cleaning",
            "description": "Complete system cleaning and sanitization"
          }
        }
      ]
    },
    "sameAs": [
      "https://www.facebook.com/mastechcooling",
      "https://www.instagram.com/mastechcooling"
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
