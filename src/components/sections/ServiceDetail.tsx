"use client";

import { motion } from "framer-motion";
import {
  Search,
  Wrench,
  Droplets,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Phone,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { servicesData, type ServiceId } from "@/lib/services-data";
import { useState } from "react";
import Link from "next/link";

const iconMap = {
  Search,
  Wrench,
  Droplets,
  Sparkles,
} as const;

export default function ServiceDetail({
  serviceId,
}: {
  serviceId: ServiceId;
}) {
  const service = servicesData[serviceId];
  const Icon = iconMap[service.icon as keyof typeof iconMap];
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="flex-1">
      {/* Hero section */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-brand-purple-dark via-brand-purple to-brand-purple-light">
        <div className="absolute top-10 right-10 opacity-10">
          <Icon className="h-64 w-64 text-white" />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/30 to-transparent" />

        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl">
            <Link
              href="/#services"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Services
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                <Icon className="h-4 w-4 text-brand-yellow" />
                <span className="text-brand-yellow-light text-sm font-medium">
                  Service
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4"
            >
              {service.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl text-white/80 mb-6"
            >
              {service.subtitle}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-base text-brand-yellow-light italic mb-8"
            >
              {service.heroDescription}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Button asChild size="lg" className="bg-brand-red hover:bg-brand-red-light text-white font-semibold text-base px-8 h-12">
                <Link href="/#contact">Book This Service</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outlineLight"
                className="font-semibold text-base px-8 h-12"
              >
                <a href="tel:0244608104" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  0244 608 104
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Image + Overview section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="relative rounded-2xl overflow-hidden shadow-xl"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-[400px] object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-20`} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block text-brand-purple font-semibold text-sm uppercase tracking-wider mb-3">
                Overview
              </span>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-6">
                What This Service Includes
              </h2>
              <p className="text-muted-foreground leading-relaxed text-base mb-8">
                {service.longDescription}
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                {service.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2 text-sm text-foreground/80"
                  >
                    <CheckCircle2 className="h-4 w-4 text-brand-purple flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits section */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <span className="inline-block text-brand-purple font-semibold text-sm uppercase tracking-wider mb-3">
              Why Choose This Service
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground">
              Key <span className="text-brand-purple">Benefits</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {service.benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-6 lg:p-8 rounded-2xl bg-card border border-border hover:border-brand-purple/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-purple/10 flex items-center justify-center group-hover:bg-brand-purple transition-colors duration-300">
                    <span className="text-brand-purple group-hover:text-white font-bold text-lg transition-colors duration-300">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <span className="inline-block text-brand-purple font-semibold text-sm uppercase tracking-wider mb-3">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground">
              Our <span className="text-brand-red">Process</span>
            </h2>
          </motion.div>

          <div className="relative max-w-5xl mx-auto">
            <div className="hidden lg:block absolute top-12 left-1/2 -translate-x-1/2 w-full h-0.5 bg-border" />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {service.process.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative text-center"
                >
                  <div className="relative inline-flex items-center justify-center w-24 h-24 mx-auto mb-6">
                    <div className="absolute inset-0 rounded-full bg-brand-purple/10" />
                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-brand-purple to-brand-purple-dark flex items-center justify-center text-white font-extrabold text-2xl shadow-lg">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <span className="inline-block text-brand-purple font-semibold text-sm uppercase tracking-wider mb-3">
              Questions & Answers
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground">
              Frequently Asked <span className="text-brand-purple">Questions</span>
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {service.faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-card rounded-xl border border-border overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  aria-expanded={openFaq === index}
                  aria-controls={`faq-content-${service.id}-${index}`}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors"
                >
                  <span className="font-semibold text-foreground pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-brand-purple flex-shrink-0 transition-transform duration-300 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <motion.div
                  id={`faq-content-${service.id}-${index}`}
                  role="region"
                  initial={false}
                  animate={{
                    height: openFaq === index ? "auto" : 0,
                    opacity: openFaq === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-brand-purple-dark via-brand-purple to-brand-purple-light text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
              Ready to Book <span className="text-brand-yellow">{service.title}</span>?
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Contact us today to schedule your appointment. Our team is ready to
              help you get your AC system back to peak performance.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-brand-red hover:bg-brand-red-light text-white font-semibold text-base px-8 h-12">
                <Link href="/#contact" className="flex items-center gap-2">
                  Get a Quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outlineLight"
                className="font-semibold text-base px-8 h-12"
              >
                <a href="tel:0244608104" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  0244 608 104
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related services */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-2">
              Related Services
            </h2>
            <p className="text-muted-foreground">
              Explore other services we offer
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {service.relatedServices.map((relatedId) => {
              const related = servicesData[relatedId];
              const RelatedIcon = iconMap[related.icon as keyof typeof iconMap];
              return (
                <Link
                  key={relatedId}
                  href={`/services/${relatedId}`}
                  className="group text-left p-6 rounded-2xl border border-border hover:border-brand-purple/30 hover:shadow-lg transition-all duration-300 bg-card"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-purple/10 flex items-center justify-center group-hover:bg-brand-purple transition-colors">
                      <RelatedIcon className="h-5 w-5 text-brand-purple group-hover:text-white transition-colors" />
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-brand-purple group-hover:translate-x-1 transition-all ml-auto" />
                  </div>
                  <h3 className="font-bold text-foreground mb-1">
                    {related.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {related.subtitle}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
