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
    title: `${service.title} | Mastech Cooling Technology`,
    description: service.subtitle,
    keywords: [service.title, "car air conditioning", service.id, "Mastech Cooling"],
    openGraph: {
      title: `${service.title} | Mastech Cooling Technology`,
      description: service.subtitle,
      type: "website",
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
