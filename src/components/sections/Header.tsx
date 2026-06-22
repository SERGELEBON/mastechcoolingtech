"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  Menu,
  X,
  Snowflake,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "About Us", href: "/#about" },
  { label: "Why Choose Us", href: "/#why-choose-us" },
  { label: "Services", href: "/#services" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Contact Us", href: "/#contact" },
];

export default function Header({
  currentView,
  onNavigate,
}: {
  currentView?: { type: "home" } | { type: "service"; id: string };
  onNavigate?: (view: { type: "home" } | { type: "service"; id: string }) => void;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth-scroll to hash (works on home page) or navigate home first
  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const hash = href.replace("/", "");
    if (pathname !== "/" && pathname !== "") {
      // We're on a sub-page — navigate home then scroll
      onNavigate?.({ type: "home" });
      window.location.href = href;
      return;
    }
    const element = document.querySelector(hash);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Top info bar */}
      <div className="bg-brand-purple text-white text-sm">
        <div className="container mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <a
              href="tel:+233244608104"
              className="flex items-center gap-2 hover:text-brand-yellow transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>+233 24 460 8104</span>
            </a>
            <a
              href="mailto:contact@mastechcooling.com"
              className="flex items-center gap-2 hover:text-brand-yellow transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>contact@mastechcooling.com</span>
            </a>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-brand-yellow-light">
            <Snowflake className="h-3.5 w-3.5" />
            <span className="italic font-medium">Masters in Cooling</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <motion.header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-white shadow-sm"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group"
              aria-label="Go to home"
            >
              <div className="relative">
                <img
                  src="/mastech-logo.png"
                  alt="Mastech Cooling Technology"
                  className="h-10 w-10 lg:h-12 lg:w-12 object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-brand-red font-extrabold text-lg lg:text-xl leading-tight tracking-tight">
                  MASTECH
                </span>
                <span className="text-brand-purple text-[10px] lg:text-xs font-semibold tracking-wider uppercase leading-tight">
                  Cooling Technology
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="relative px-4 py-2 text-sm font-medium text-foreground/80 hover:text-brand-purple transition-colors group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-brand-purple group-hover:w-3/4 transition-all duration-300" />
                </button>
              ))}
              <Button
                onClick={() => handleNavClick("/#contact")}
                className="ml-4 bg-brand-red hover:bg-brand-red-light text-white"
              >
                Get a Quote
              </Button>
            </nav>

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-t bg-white overflow-hidden"
            >
              <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="px-4 py-3 text-left text-base font-medium text-foreground/80 hover:text-brand-purple hover:bg-brand-purple/5 rounded-lg transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
                <Button
                  onClick={() => handleNavClick("/#contact")}
                  className="mt-2 bg-brand-red hover:bg-brand-red-light text-white"
                >
                  Get a Quote
                </Button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
