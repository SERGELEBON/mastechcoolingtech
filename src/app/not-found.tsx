import Link from "next/link";
import { Snowflake, Home, ArrowLeft, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-purple-dark via-brand-purple to-brand-purple-light px-4">
      <div className="absolute top-20 right-10 opacity-10">
        <Snowflake className="h-64 w-64 text-white animate-spin" style={{ animationDuration: "30s" }} />
      </div>

      <div className="relative text-center max-w-xl">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
          <Snowflake className="h-4 w-4 text-brand-yellow" />
          <span className="text-brand-yellow-light text-sm font-medium">
            Mastech Cooling Technology
          </span>
        </div>

        <h1 className="text-7xl sm:text-9xl font-extrabold text-white mb-4">
          404
        </h1>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-white/80 text-lg mb-8">
          The page you&apos;re looking for may have been moved, deleted, or
          never existed. Let&apos;s get you back to cool territory.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild size="lg" className="bg-brand-red hover:bg-brand-red-light text-white font-semibold px-8 h-12">
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Back Home
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outlineLight"
            className="font-semibold px-8 h-12"
          >
            <a href="tel:+233244608104" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              +233 24 460 8104
            </a>
          </Button>
        </div>

        <div className="mt-10 text-white/60 text-sm">
          <p className="mb-2 font-medium">Quick Links</p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            <Link href="/#services" className="hover:text-white">Services</Link>
            <Link href="/services/diagnostic" className="hover:text-white">Diagnostics</Link>
            <Link href="/services/repair" className="hover:text-white">Repair</Link>
            <Link href="/services/recharge" className="hover:text-white">Recharge</Link>
            <Link href="/services/cleaning" className="hover:text-white">Cleaning</Link>
            <Link href="/#contact" className="hover:text-white">Contact</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
