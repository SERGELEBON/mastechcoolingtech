"use client";

import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, type FormEvent } from "react";

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "0244 608 104",
    href: "tel:0244608104",
    description:
      "Call us for a quick diagnostic or to schedule an appointment. Our team is available to answer all your questions and provide expert guidance.",
  },
  {
    icon: Mail,
    label: "Email",
    value: "contact@mastechcooling.com",
    href: "mailto:contact@mastechcooling.com",
    description:
      "Send us an email for any information request, quote, or repair follow-up. We respond to all inquiries as quickly as possible.",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "Kissiman Behind Pure Fire Church, off Ghana Airways Rd., Accra",
    href: "https://maps.google.com/?q=Kissiman+Behind+Pure+Fire+Church+off+Ghana+Airways+Road+Accra+Ghana",
    description:
      "Find our workshop in Kissiman, easily accessible behind Pure Fire Church off Ghana Airways Road. Convenient location for dropping off your vehicle.",
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Mon - Sat: 8:00 AM - 6:00 PM",
    href: "#",
    description:
      "Our workshops are open Monday through Saturday to welcome you and take care of your vehicle under the best possible conditions.",
  },
];

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: "", email: "", phone: "", service: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-white">
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
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
            Let&apos;s Talk About Your{" "}
            <span className="text-brand-red">Project</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Need a diagnostic, a repair, or just some advice? Our team is here
            to listen and guide you every step of the way.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-6"
          >
            {contactInfo.map((info) => (
              <a
                key={info.label}
                href={info.href}
                target={info.label === "Address" ? "_blank" : undefined}
                rel={info.label === "Address" ? "noopener noreferrer" : undefined}
                className="flex items-start gap-4 p-5 rounded-xl border border-border hover:border-brand-purple/30 hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-purple/10 flex items-center justify-center group-hover:bg-brand-purple transition-colors duration-300">
                  <info.icon className="h-5 w-5 text-brand-purple group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    {info.label}
                  </h4>
                  <p className="text-brand-purple font-medium text-sm">
                    {info.value}
                  </p>
                  <p className="text-muted-foreground text-xs mt-1 leading-relaxed">
                    {info.description}
                  </p>
                </div>
              </a>
            ))}

            {/* Google Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-xl overflow-hidden border border-border shadow-md h-[300px]"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.8076869722584!2d-0.1736!3d5.6037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMzYnMTMuMyJOIDDCsDEwJzI1LjAiVw!5e0!3m2!1sen!2sgh!4v1234567890123!5m2!1sen!2sgh&q=Kissiman+Behind+Pure+Fire+Church+off+Ghana+Airways+Road+Accra+Ghana"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mastech Cooling Technology Location - Kissiman, Accra"
              ></iframe>
            </motion.div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <div className="bg-muted/50 rounded-2xl p-6 lg:p-8 border border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-purple flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    Send us a message
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    We&apos;ll get back to you quickly
                  </p>
                </div>
              </div>

              {isSubmitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
                  Thank you for your message! We will contact you as soon as possible.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Full Name
                    </label>
                    <Input
                      placeholder="Your name"
                      value={formState.name}
                      onChange={(e) =>
                        setFormState((prev) => ({ ...prev, name: e.target.value }))
                      }
                      required
                      className="bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Email
                    </label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={formState.email}
                      onChange={(e) =>
                        setFormState((prev) => ({ ...prev, email: e.target.value }))
                      }
                      required
                      className="bg-white"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Phone
                    </label>
                    <Input
                      type="tel"
                      placeholder="0244 XXX XXX"
                      value={formState.phone}
                      onChange={(e) =>
                        setFormState((prev) => ({ ...prev, phone: e.target.value }))
                      }
                      className="bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Desired Service
                    </label>
                    <select
                      value={formState.service}
                      onChange={(e) =>
                        setFormState((prev) => ({ ...prev, service: e.target.value }))
                      }
                      className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="">Select a service</option>
                      <option value="diagnostic">Electronic Diagnostics</option>
                      <option value="repair">Repair & Maintenance</option>
                      <option value="recharge">Refrigerant Recharge</option>
                      <option value="cleaning">System Cleaning</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Message
                  </label>
                  <Textarea
                    placeholder="Describe your problem or request..."
                    rows={5}
                    value={formState.message}
                    onChange={(e) =>
                      setFormState((prev) => ({ ...prev, message: e.target.value }))
                    }
                    required
                    className="bg-white resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-purple hover:bg-brand-purple-light text-white font-semibold h-12"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
