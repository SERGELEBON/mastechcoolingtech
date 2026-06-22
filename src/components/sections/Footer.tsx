"use client";

import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Snowflake,
  Facebook,
  Instagram,
  Youtube,
  ArrowUp,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const quickLinks = [
  { label: "Home", href: "/#home" },
  { label: "About Us", href: "/#about" },
  { label: "Why Choose Us", href: "/#why-choose-us" },
  { label: "Services", href: "/#services" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact Us", href: "/#contact" },
];

const serviceLinks = [
  { label: "Electronic Diagnostics", href: "/services/diagnostic" },
  { label: "Repair & Maintenance", href: "/services/repair" },
  { label: "Refrigerant Recharge", href: "/services/recharge" },
  { label: "System Cleaning", href: "/services/cleaning" },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

// Floating bubbles — Ghana flag colors (red / yellow / green) + white
const bubbles = [
  { size: 80, left: "5%", delay: 0, duration: 12, color: "rgba(255,255,255,0.10)" },
  { size: 24, left: "12%", delay: 2, duration: 9, color: "rgba(252, 209, 22, 0.25)" },
  { size: 48, left: "22%", delay: 4, duration: 14, color: "rgba(206, 17, 38, 0.20)" },
  { size: 16, left: "32%", delay: 1, duration: 8, color: "rgba(255,255,255,0.18)" },
  { size: 60, left: "42%", delay: 3, duration: 11, color: "rgba(0, 107, 63, 0.22)" },
  { size: 32, left: "52%", delay: 5, duration: 10, color: "rgba(252, 209, 22, 0.22)" },
  { size: 96, left: "62%", delay: 1.5, duration: 15, color: "rgba(255,255,255,0.08)" },
  { size: 20, left: "72%", delay: 3.5, duration: 9, color: "rgba(206, 17, 38, 0.22)" },
  { size: 56, left: "82%", delay: 2.5, duration: 13, color: "rgba(0, 107, 63, 0.20)" },
  { size: 28, left: "92%", delay: 4.5, duration: 10, color: "rgba(252, 209, 22, 0.25)" },
  { size: 40, left: "18%", delay: 6, duration: 14, color: "rgba(255,255,255,0.12)" },
  { size: 36, left: "48%", delay: 0.5, duration: 12, color: "rgba(206, 17, 38, 0.18)" },
  { size: 22, left: "78%", delay: 5.5, duration: 11, color: "rgba(255,255,255,0.16)" },
];

export default function Footer() {
  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative overflow-hidden text-white">
      {/* Ghana flag background — 3 horizontal stripes (red / yellow / green) */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #CE1126 0%, #CE1126 33.33%, #FCD116 33.33%, #FCD116 66.66%, #006B3F 66.66%, #006B3F 100%)",
        }}
      />

      {/* Black star — Ghana flag symbol, centered on the yellow stripe */}
      <div
        aria-hidden
        className="absolute inset-x-0 flex justify-center pointer-events-none"
        style={{ top: "calc(33.33% + 8%)" }}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-32 w-32 opacity-30"
          fill="#000000"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>

      {/* Dark overlay so content stays readable over the flag */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/80 to-black/85"
      />

      {/* Floating bubbles layer */}
      <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
        {bubbles.map((b, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              left: b.left,
              bottom: "-120px",
              width: b.size,
              height: b.size,
              background: b.color,
              boxShadow: "0 0 24px rgba(255,255,255,0.15) inset, 0 4px 16px rgba(0,0,0,0.15)",
            }}
            animate={{
              y: [0, -700],
              x: [0, 30, -20, 10, 0],
              opacity: [0, 0.9, 0.9, 0],
            }}
            transition={{
              duration: b.duration,
              delay: b.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main footer content */}
      <div className="relative container mx-auto px-4 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-white/15 backdrop-blur-sm flex items-center justify-center">
                <Snowflake className="h-5 w-5 text-brand-yellow" />
              </div>
              <div className="flex flex-col">
                <span className="text-brand-red-light font-extrabold text-lg leading-tight">
                  MASTECH
                </span>
                <span className="text-brand-yellow-light text-[10px] font-semibold tracking-wider uppercase leading-tight">
                  Cooling Technology
                </span>
              </div>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed mb-5">
              Your trusted partner for all your car air conditioning needs.
              Experts in AC system diagnostics, repair, and maintenance — proudly
              serving drivers across Ghana and West Africa.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-white/15 hover:bg-brand-yellow hover:text-black transition-all duration-300 flex items-center justify-center"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-bold text-base mb-5 text-brand-yellow-light">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-brand-yellow/70" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services links */}
          <div>
            <h4 className="font-bold text-base mb-5 text-brand-yellow-light">
              Our Services
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-brand-yellow/70" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-bold text-base mb-5 text-brand-yellow-light">
              Contact Info
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-brand-yellow mt-0.5 flex-shrink-0" />
                <span className="text-white/70 text-sm">
                  Spintex Road, Accra, Ghana
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-brand-yellow flex-shrink-0" />
                <a
                  href="tel:+233244608104"
                  className="text-white/70 hover:text-white text-sm transition-colors"
                >
                  +233 24 460 8104
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-brand-yellow flex-shrink-0" />
                <a
                  href="mailto:contact@mastechcooling.com"
                  className="text-white/70 hover:text-white text-sm transition-colors"
                >
                  contact@mastechcooling.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-brand-yellow mt-0.5 flex-shrink-0" />
                <span className="text-white/70 text-sm">
                  Mon - Sat: 8:00 AM - 6:00 PM
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar — sits on the green stripe */}
      <div className="relative border-t border-white/15">
        <div className="container mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/70 text-xs">
            &copy; {new Date().getFullYear()} Mastech Cooling Technology. All rights reserved.
          </p>
          <p className="text-white/70 text-xs italic">
            Masters in Cooling — Car Air Conditioning Experts
          </p>
          <Button
            onClick={scrollToTop}
            size="sm"
            variant="outlineLight"
          >
            <ArrowUp className="h-4 w-4 mr-1" />
            Top
          </Button>
        </div>
      </div>
    </footer>
  );
}
