"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Kwame Mensah",
    role: "Toyota Corolla Owner",
    location: "Accra",
    rating: 5,
    text: "Mastech diagnosed an AC issue three other garages couldn't find. Their computerized scanner pinpointed a faulty pressure sensor in 20 minutes. Honest, professional, and fairly priced. I won't take my car anywhere else.",
    initials: "KM",
    color: "from-brand-purple to-brand-purple-dark",
  },
  {
    name: "Abena Owusu",
    role: "Honda Civic Owner",
    location: "Tema",
    rating: 5,
    text: "After my AC stopped blowing cold air, I called Mastech. They came highly recommended and lived up to the hype. The team recharged my refrigerant, fixed a small leak, and even cleaned the system. Now my car feels like a fridge again!",
    initials: "AO",
    color: "from-brand-red to-brand-red-light",
  },
  {
    name: "Yaw Asante",
    role: "Mercedes C-Class Owner",
    location: "Kumasi",
    rating: 5,
    text: "I've used many AC shops over the years, but Mastech is in a league of their own. Their attention to detail and the written report they gave me after diagnostics showed real professionalism. Highly recommend.",
    initials: "YA",
    color: "from-brand-yellow to-brand-gold",
  },
  {
    name: "Ama Boateng",
    role: "Hyundai Elantra Owner",
    location: "Accra",
    rating: 5,
    text: "The team at Mastech cleaned my AC system and the difference is night and day — no more bad smells and the air flow is so much stronger. They explained everything they did. Excellent customer service.",
    initials: "AB",
    color: "from-brand-purple to-brand-purple-light",
  },
  {
    name: "Kofi Adjei",
    role: "Nissan Almera Owner",
    location: "Takoradi",
    rating: 5,
    text: "My compressor failed on a hot afternoon. Mastech had the replacement in stock, installed it the same day, and charged less than the dealer quoted me. The warranty gave me peace of mind. Top-notch work.",
    initials: "KA",
    color: "from-brand-red to-brand-yellow",
  },
  {
    name: "Esi Dankwah",
    role: "Kia Sportage Owner",
    location: "Accra",
    rating: 5,
    text: "What I love about Mastech is their honesty. They told me my AC didn't need a full recharge yet — just a top-up and a cleaning. Saved me money. That kind of integrity is rare. I'll definitely return for my next service.",
    initials: "ED",
    color: "from-brand-purple-dark to-brand-purple",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-muted/50">
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
            Customer Stories
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
            What Our <span className="text-brand-red">Customers</span> Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Real reviews from drivers across Ghana who trusted Mastech with
            their car's air conditioning. Their words, not ours.
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={cardVariants}
              className="relative bg-card rounded-2xl p-6 lg:p-7 border border-border hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 text-brand-purple/10">
                <Quote className="h-10 w-10" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-brand-yellow text-brand-yellow"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-muted-foreground leading-relaxed text-sm mb-6 flex-1">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div
                  className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-sm shadow-md`}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm">
                    {t.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {t.role} · {t.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {[
            { value: "5,000+", label: "Vehicles Serviced" },
            { value: "4.9/5", label: "Average Rating" },
            { value: "98%", label: "Repeat Customers" },
            { value: "15+", label: "Years in Ghana" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-5 rounded-xl bg-gradient-to-br from-brand-purple/10 to-brand-purple/5 border border-brand-purple/10"
            >
              <div className="text-2xl lg:text-3xl font-extrabold text-brand-purple mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
