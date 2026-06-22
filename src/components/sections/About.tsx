"use client";

import { motion } from "framer-motion";
import {
  ThermometerSnowflake,
  ShieldCheck,
  Clock,
  Users,
  Award,
  Wrench,
} from "lucide-react";

const stats = [
  { value: "15+", label: "Years of Experience", icon: Clock },
  { value: "5000+", label: "Vehicles Serviced", icon: Wrench },
  { value: "100%", label: "Customer Satisfaction", icon: ShieldCheck },
  { value: "10+", label: "Expert Technicians", icon: Users },
];

const values = [
  {
    icon: ThermometerSnowflake,
    title: "Technical Expertise",
    description:
      "Our team possesses in-depth knowledge of all car air conditioning systems, from the oldest models to the latest technologies. We continuously invest in our technicians' training to stay at the forefront of innovation and deliver cutting-edge solutions for every vehicle that enters our workshop.",
  },
  {
    icon: ShieldCheck,
    title: "Guaranteed Quality",
    description:
      "Every intervention is performed with OEM-quality parts and state-of-the-art diagnostic equipment. We provide a warranty on all our repairs for your complete peace of mind, ensuring that your AC system operates reliably long after you leave our workshop.",
  },
  {
    icon: Clock,
    title: "Fast Turnaround",
    description:
      "We understand the value of your time. Our optimized process allows us to diagnose and repair your air conditioning system in the shortest possible time, without ever compromising on service quality or the durability of the work performed.",
  },
  {
    icon: Award,
    title: "Personalized Service",
    description:
      "Every vehicle is unique and requires special attention. We adapt our approach to your specific needs and advise you on the best solutions to maintain your air conditioning system in perfect working condition, building a long-term relationship based on trust.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function About() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-white">
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
            Who We Are
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
            About{" "}
            <span className="text-brand-red">Mastech</span>{" "}
            <span className="text-brand-purple">Cooling</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Specialists in car air conditioning for over 15 years, Mastech
            Cooling Technology is your trusted partner for the maintenance and
            repair of all AC systems.
          </p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="text-center p-6 rounded-2xl bg-gradient-to-br from-brand-purple to-brand-purple-dark text-white"
            >
              <stat.icon className="h-8 w-8 mx-auto mb-3 text-brand-yellow" />
              <div className="text-3xl lg:text-4xl font-extrabold mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-white/70">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Values grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-8"
        >
          {values.map((value) => (
            <motion.div
              key={value.title}
              variants={itemVariants}
              className="group p-6 lg:p-8 rounded-2xl border border-border hover:border-brand-purple/30 bg-card hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-brand-purple/10 flex items-center justify-center group-hover:bg-brand-purple group-hover:text-white transition-colors duration-300">
                  <value.icon className="h-7 w-7 text-brand-purple group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
