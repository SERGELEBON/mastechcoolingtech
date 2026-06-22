"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    question: "How often should I service my car's air conditioning?",
    answer:
      "We recommend a full AC inspection at least once a year, ideally before the hot season begins. Even if your AC seems to work fine, refrigerant naturally leaks over time (up to 10% per year), and components accumulate moisture and debris that reduce efficiency. Annual servicing catches small issues before they become expensive failures, keeps your cabin air clean, and ensures peak cooling performance when you need it most. For high-mileage vehicles or those used in heavy traffic, we suggest a check-up every six months.",
  },
  {
    question: "What refrigerant does my car use — R134a or R1234yf?",
    answer:
      "It depends on your vehicle's year and manufacturer. Most cars built before 2014 use R134a, while newer vehicles (especially those built after 2017) typically use R1234yf, a more environmentally friendly refrigerant with a lower global warming potential. Some vehicles can use either. Our technicians will identify the correct refrigerant for your car from the under-hood sticker or service port configuration before any work begins — using the wrong gas can damage your system and is illegal in many jurisdictions.",
  },
  {
    question: "Why is my AC blowing warm air even though the system is running?",
    answer:
      "Warm air from a running AC has several common causes: low refrigerant due to a leak, a failing compressor clutch, a clogged expansion valve, an electrical fault in the pressure sensor circuit, or a damaged condenser. The exact cause can only be determined with proper diagnostic equipment — guessing leads to unnecessary parts replacement. Our computerized diagnostic service reads live sensor data and stored fault codes to pinpoint the issue, typically within 30 to 60 minutes, so you only pay for the repair you actually need.",
  },
  {
    question: "Do you offer a warranty on your repairs?",
    answer:
      "Yes. Every repair we perform is backed by a written warranty covering both parts and labor. The exact duration depends on the component — compressors typically carry a 12-month warranty, while other repairs range from 6 to 24 months. If the same issue recurs within the warranty period, we'll re-diagnose and repair it at no charge. Our goal is lasting solutions, not quick fixes, and the warranty is our way of standing behind every job we do.",
  },
  {
    question: "How long does an AC repair typically take?",
    answer:
      "Diagnostic sessions usually take 30 to 60 minutes. Simple repairs like refrigerant recharges or sensor replacements can be completed the same day, often within 2 to 3 hours. More complex jobs — compressor replacement, condenser repair, or full system flush — may require the vehicle to stay for a half or full day. We provide a clear time estimate before starting any work and keep you updated if anything changes. Walk-ins are welcome, but appointments get priority scheduling.",
  },
  {
    question: "Can you service AC systems on hybrid and electric vehicles?",
    answer:
      "Yes. Our technicians are specially trained to work on hybrid and electric vehicle AC systems, which operate at higher voltages and use specific refrigerants and insulating oils. We have the proper personal protective equipment and insulated tools required for high-voltage work, and we follow manufacturer service procedures exactly. Whether you drive a Toyota Prius, a Tesla, or any other electrified vehicle, we have the expertise to service your AC system safely and correctly.",
  },
  {
    question: "Do you offer fleet and corporate AC maintenance contracts?",
    answer:
      "Absolutely. We provide tailored fleet maintenance contracts for taxi companies, delivery services, ride-share operators, and corporate fleets. Contracts include scheduled inspections, priority booking, discounted labor rates, and detailed service records for each vehicle. If you operate five or more vehicles, contact us for a custom quote — fleet clients typically save 15 to 25% compared to ad-hoc servicing, and scheduled maintenance significantly reduces unexpected breakdowns and downtime.",
  },
];

export default function FAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 lg:py-28 bg-white">
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
            Knowledge Base
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
            Frequently Asked <span className="text-brand-purple">Questions</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Everything you need to know about car AC service, refrigerants,
            warranties, and how Mastech can keep your vehicle cool year-round.
          </p>
        </motion.div>

        {/* FAQ list */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-card rounded-xl border border-border overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                aria-expanded={openFaq === index}
                aria-controls={`faq-content-${index}`}
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
                id={`faq-content-${index}`}
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

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            Still have questions? We&apos;re happy to help.
          </p>
          <Button asChild className="bg-brand-purple hover:bg-brand-purple-light text-white">
            <Link href="/#contact">Get in Touch</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
