"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Snowflake,
  Phone,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  Search,
  Wrench,
  Droplets,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// 4-slide hero carousel — each slide showcases one service
// All images feature Black Ghanaian mechanics
const slides = [
  {
    image: "/hero-bg.png",
    icon: Snowflake,
    badge: "Car Air Conditioning Experts",
    title: "MASTECH",
    titleAccent: "Cooling Technology",
    description:
      "Your trusted partner for all your car air conditioning needs. Diagnostics, repair, recharge and maintenance performed by certified experts.",
    tagline: "Masters in Cooling",
  },
  {
    image: "/service-diagnostic.png",
    icon: Search,
    badge: "Service 1 of 4",
    title: "Electronic",
    titleAccent: "Diagnostics",
    description:
      "State-of-the-art computerized tools pinpoint faults in your AC system with surgical precision — no guesswork, no unnecessary parts.",
    tagline: "Precision You Can Trust",
  },
  {
    image: "/service-repair.png",
    icon: Wrench,
    badge: "Service 2 of 4",
    title: "Repair &",
    titleAccent: "Maintenance",
    description:
      "Qualified technicians servicing compressors, condensers, evaporators and expansion valves — meticulous, professional, OEM-quality work.",
    tagline: "Built to Last",
  },
  {
    image: "/service-recharge.png",
    icon: Droplets,
    badge: "Service 3 of 4",
    title: "Refrigerant",
    titleAccent: "Recharge",
    description:
      "Complete circuit flush, rigorous leak test, then a recharge with the gas adapted to your vehicle — R134a or R1234yf.",
    tagline: "Cool Air Restored",
  },
  {
    image: "/service-cleaning.png",
    icon: Sparkles,
    badge: "Service 4 of 4",
    title: "System",
    titleAccent: "Cleaning",
    description:
      "Deep cleaning removes accumulated debris, moisture and bacteria that impair performance and air quality — guaranteed longevity.",
    tagline: "Fresh Air, Every Drive",
  },
];

const SLIDE_DURATION = 5500; // ms per slide

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToSlide = useCallback((index: number) => {
    setCurrent(((index % slides.length) + slides.length) % slides.length);
  }, []);

  const goNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const goPrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handleScrollTo = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const slide = slides[current];
  const SlideIcon = slide.icon;

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* === Background image slider === */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={slide.image}
              alt={`Mastech — ${slide.titleAccent}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Light purple overlay — strong enough on the left for text contrast, transparent on the right to reveal the mechanic */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-purple-dark/65 via-brand-purple-dark/20 to-transparent" />
        {/* Subtle bottom gradient for the scroll indicator */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
      </div>

      {/* Decorative snowflakes */}
      <div className="absolute top-20 right-10 opacity-10 pointer-events-none">
        <Snowflake className="h-64 w-64 text-white animate-spin" style={{ animationDuration: "30s" }} />
      </div>
      <div className="absolute bottom-20 left-10 opacity-5 pointer-events-none">
        <Snowflake className="h-48 w-48 text-white animate-spin" style={{ animationDuration: "45s", animationDirection: "reverse" }} />
      </div>

      {/* === Slide content (changes per slide) === */}
      <div className="relative container mx-auto px-4 py-20 w-full">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                <SlideIcon className="h-4 w-4 text-brand-yellow" />
                <span
                  className="text-brand-yellow-light text-sm font-medium"
                  suppressHydrationWarning
                >
                  {slide.badge}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
                <span className="text-brand-red" suppressHydrationWarning>
                  {slide.title}
                </span>
                <br />
                <span className="text-brand-yellow" suppressHydrationWarning>
                  {slide.titleAccent.split(" ")[0]}
                </span>{" "}
                <span className="text-white" suppressHydrationWarning>
                  {slide.titleAccent.split(" ").slice(1).join(" ")}
                </span>
              </h1>

              {/* Description */}
              <p
                className="text-lg sm:text-xl text-white/85 mb-4 max-w-xl"
                suppressHydrationWarning
              >
                {slide.description}
              </p>

              {/* Tagline */}
              <p
                className="text-base text-brand-gold italic mb-8"
                suppressHydrationWarning
              >
                &ldquo;{slide.tagline}&rdquo;
              </p>
            </motion.div>
          </AnimatePresence>

          {/* CTAs — persistent across all slides */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Button
              onClick={() => handleScrollTo("#services")}
              size="lg"
              className="bg-brand-red hover:bg-brand-red-light text-white font-semibold text-base px-8 h-12"
              suppressHydrationWarning
            >
              Our Services
            </Button>
            <Button
              asChild
              size="lg"
              variant="outlineLight"
              className="font-semibold text-base px-8 h-12"
            >
              <a
                href="tel:+233244608104"
                className="flex items-center gap-2"
                suppressHydrationWarning
              >
                <Phone className="h-4 w-4" />
                +233 24 460 8104
              </a>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* === Slider navigation arrows (desktop) === */}
      <button
        onClick={goPrev}
        aria-label="Previous slide"
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-sm border border-white/20 items-center justify-center text-white transition-all"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={goNext}
        aria-label="Next slide"
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-sm border border-white/20 items-center justify-center text-white transition-all"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* === Slide dots (bottom right) === */}
      <div className="absolute bottom-20 right-5 sm:right-10 z-20 flex flex-col items-center gap-3">
        <div className="flex gap-2">
          {slides.map((s, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === current}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-8 bg-brand-yellow"
                  : "w-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
        <span
          className="text-xs text-white/60 font-medium tracking-wider"
          suppressHydrationWarning
        >
          {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <button
          onClick={() => handleScrollTo("#about")}
          className="flex flex-col items-center gap-2 text-white/60 hover:text-white/80 transition-colors"
          aria-label="Scroll down"
        >
          <span className="text-xs uppercase tracking-widest" suppressHydrationWarning>
            Discover
          </span>
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </button>
      </motion.div>
    </section>
  );
}
