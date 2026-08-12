import { notFound } from "next/navigation";
import { servicesData, type ServiceId } from "@/lib/services-data";
import ServiceDetailView from "@/components/sections/ServiceDetail";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";

// Pre-render all known service slugs at build time so Vercel never 404s them
export function generateStaticParams() {
  return (Object.keys(servicesData) as ServiceId[]).map((id) => ({
    slug: id,
  }));
}

// Per-page metadata for SEO + social sharing
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = (servicesData as Record<string, (typeof servicesData)[ServiceId]>)[
    slug
  ];
  if (!service) {
    return {
      title: "Service Not Found | Mastech Cooling Technology",
    };
  }
  return {
    title: `${service.title} | Professional Car AC Service in Ghana | Mastech Cooling`,
    description: `${service.subtitle} Expert ${service.title.toLowerCase()} services for all vehicle makes in Ghana. Professional technicians, quality parts, competitive rates. Call +233 24 460 8104 for a free quote.`,
    keywords: [
      service.title,
      "car air conditioning Ghana",
      service.id,
      "Mastech Cooling",
      "auto AC service",
      "car AC repair Accra",
      `${service.title.toLowerCase()} Ghana`,
      "professional car AC",
    ],
    openGraph: {
      title: `${service.title} | Mastech Cooling Technology`,
      description: `${service.subtitle} Expert service for all vehicle makes. Free diagnostics and competitive rates.`,
      type: "website",
      url: `https://mastechcooling.com/services/${slug}`,
      images: [
        {
          url: service.image,
          width: 800,
          height: 600,
          alt: `${service.title} - Mastech Cooling Technology`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | Mastech Cooling`,
      description: service.subtitle,
      images: [service.image],
    },
    alternates: {
      canonical: `https://mastechcooling.com/services/${slug}`,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = (servicesData as Record<string, (typeof servicesData)[ServiceId]>)[
    slug
  ];
  if (!service) {
    notFound();
  }
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <ServiceDetailView serviceId={slug as ServiceId} />
      <Footer />
    </div>
  );
}
