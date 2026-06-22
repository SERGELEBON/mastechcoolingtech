"use client";

import { motion } from "framer-motion";
import {
  Search,
  Wrench,
  Droplets,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ServiceId } from "@/lib/services-data";
import Link from "next/link";

const serviceCards: {
  id: ServiceId;
  icon: typeof Search;
  image: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  accent: string; // tailwind color class for icon/hover
  gradient: string; // gradient used on image overlay
}[] = [
  {
    id: "diagnostic",
    icon: Search,
    image: "/service-diagnostic.png",
    title: "Electronic Diagnostics",
    subtitle: "Precise fault detection",
    shortDescription:
      "Computerized tools that pinpoint faults in your AC system with surgical precision — no guesswork, no unnecessary parts.",
    accent: "text-brand-purple",
    gradient: "from-brand-purple/85 to-brand-purple-dark/30",
  },
  {
    id: "repair",
    icon: Wrench,
    image: "/service-repair.png",
    title: "Repair & Maintenance",
    subtitle: "Compressors, condensers, evaporators",
    shortDescription:
      "Qualified technicians servicing all major AC components — compressors, condensers, evaporators, and expansion valves.",
    accent: "text-brand-red",
    gradient: "from-brand-red/85 to-brand-purple-dark/30",
  },
  {
    id: "recharge",
    icon: Droplets,
    image: "/service-recharge.png",
    title: "Refrigerant Recharge",
    subtitle: "Professional AC gas service",
    shortDescription:
      "Complete circuit flush, rigorous leak test, and recharge with the correct gas for your vehicle — R134a or R1234yf.",
    accent: "text-brand-purple",
    gradient: "from-brand-purple/85 to-brand-purple-dark/30",
  },
  {
    id: "cleaning",
    icon: Sparkles,
    image: "/service-cleaning.png",
    title: "System Cleaning",
    subtitle: "Longevity & performance",
    shortDescription:
      "Deep cleaning removes debris, moisture, and bacteria that impair performance and air quality — guaranteed longevity.",
    accent: "text-brand-red",
    gradient: "from-brand-red/85 to-brand-purple-dark/30",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Services() {
  const handleScrollTo = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="py-20 lg:py-28 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span
            className="inline-block text-brand-purple font-semibold text-sm uppercase tracking-wider mb-3"
            suppressHydrationWarning
          >
            What We Offer
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-4"
            suppressHydrationWarning
          >
            Our <span className="text-brand-purple">Services</span>
          </h2>
          <p
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
            suppressHydrationWarning
          >
            Professional solutions for all your car air conditioning needs. Each
            service is performed with expertise and cutting-edge equipment.
          </p>
        </motion.div>

        {/* Services grid — 4 columns on large screens for compact, balanced layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {serviceCards.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <Link
                href={`/services/${service.id}`}
                className="flex flex-col h-full"
                aria-label={service.title}
              >
                {/* Image — square on desktop, wider on mobile */}
                <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Gradient overlay — always visible for icon legibility */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${service.gradient} opacity-90 group-hover:opacity-75 transition-opacity duration-500`}
                  />
                  {/* Floating icon top-left */}
                  <div className="absolute top-3 left-3 w-11 h-11 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg">
                    <service.icon className="h-5 w-5 text-white" />
                  </div>
                  {/* Service number top-right */}
                  <span
                    className="absolute top-3 right-3 text-xs font-bold text-white/80 tracking-wider bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full"
                    suppressHydrationWarning
                  >
                    0{serviceCards.indexOf(service) + 1}
                  </span>
                  {/* Title overlay at the bottom of the image */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3
                      className="text-lg font-bold text-white leading-tight mb-0.5"
                      suppressHydrationWarning
                    >
                      {service.title}
                    </h3>
                    <p
                      className="text-white/80 text-xs"
                      suppressHydrationWarning
                    >
                      {service.subtitle}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <p
                    className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1"
                    suppressHydrationWarning
                  >
                    {service.shortDescription}
                  </p>
                  {/* Learn more link */}
                  <span
                    className={`inline-flex items-center gap-1.5 text-sm font-semibold ${service.accent} group-hover:gap-2.5 transition-all`}
                    suppressHydrationWarning
                  >
                    Learn More
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-16"
        >
          <Button
            onClick={() => handleScrollTo("#contact")}
            size="lg"
            className="bg-brand-purple hover:bg-brand-purple-light text-white font-semibold text-base px-8 h-12"
            suppressHydrationWarning
          >
            Request a Quote
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
