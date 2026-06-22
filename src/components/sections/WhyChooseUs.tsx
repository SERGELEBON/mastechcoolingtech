"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Gauge,
  Users,
  Award,
  Truck,
  HeartHandshake,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Certified Technicians",
    description:
      "Every member of our team is factory-trained and holds industry certifications in automotive HVAC service. We invest continuously in training so our technicians stay current with the latest AC technologies — including R1234yf systems, hybrid/electric vehicle AC, and OEM-specific diagnostic protocols.",
    accent: "from-brand-purple to-brand-purple-dark",
  },
  {
    icon: Gauge,
    title: "State-of-the-Art Equipment",
    description:
      "Our workshop is equipped with manufacturer-grade diagnostic scanners, automatic refrigerant recovery stations, and electronic leak detectors. This professional equipment lets us deliver precise, repeatable results — never guesswork — for every vehicle that enters our bay.",
    accent: "from-brand-red to-brand-red-light",
  },
  {
    icon: Users,
    title: "Customer-First Approach",
    description:
      "We take the time to explain what's wrong, what we'll do, and what it will cost — before any work begins. No surprise charges, no unnecessary repairs, no jargon. Our customers receive honest, transparent advice that respects their time and their budget.",
    accent: "from-brand-purple-light to-brand-purple",
  },
  {
    icon: Award,
    title: "Warranty on All Repairs",
    description:
      "We back every repair with a written warranty covering both parts and labor. If the issue we fixed comes back within the warranty period, we'll re-diagnose and repair it at no charge. Our goal is lasting solutions, not quick fixes that put you back on the road for a week.",
    accent: "from-brand-yellow to-brand-gold",
  },
  {
    icon: Truck,
    title: "Fast Turnaround",
    description:
      "Most diagnostic appointments are completed within 60 minutes, and the majority of common repairs are done same-day. We respect your schedule and provide accurate time estimates upfront so you can plan your day around the service.",
    accent: "from-brand-purple to-brand-purple-light",
  },
  {
    icon: HeartHandshake,
    title: "Fair, Transparent Pricing",
    description:
      "You receive a detailed written quote before any work begins, with line items for parts, labor, and taxes. We don't upsell — if a component still has life in it, we'll tell you. If a repair isn't urgent, we'll say so. Honest pricing builds long-term trust.",
    accent: "from-brand-red to-brand-yellow",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-brand-purple font-semibold text-sm uppercase tracking-wider mb-3">
            Why Trust Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
            Why <span className="text-brand-red">Choose</span>{" "}
            <span className="text-brand-purple">Mastech</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Six reasons drivers across Ghana trust us with their car's air
            conditioning — from certified expertise to honest, transparent
            service.
          </p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group relative p-6 lg:p-8 rounded-2xl border border-border bg-card hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Accent corner */}
              <div
                className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${feature.accent} opacity-10 group-hover:opacity-20 transition-opacity`}
              />

              <div
                className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${feature.accent} flex items-center justify-center mb-5 shadow-lg`}
              >
                <feature.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
