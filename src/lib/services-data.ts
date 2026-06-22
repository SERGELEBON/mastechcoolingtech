export type ServiceId = "diagnostic" | "repair" | "recharge" | "cleaning";

export interface ServiceDetail {
  id: ServiceId;
  icon: string;
  image: string;
  title: string;
  subtitle: string;
  heroDescription: string;
  color: string;
  longDescription: string;
  benefits: { title: string; description: string }[];
  process: { step: number; title: string; description: string }[];
  features: string[];
  faqs: { question: string; answer: string }[];
  relatedServices: ServiceId[];
}

export const servicesData: Record<ServiceId, ServiceDetail> = {
  diagnostic: {
    id: "diagnostic",
    icon: "Search",
    image: "/service-diagnostic.png",
    title: "Electronic Diagnostics",
    subtitle: "Precise fault detection with computerized tools",
    heroDescription:
      "State-of-the-art computerized diagnostic tools that pinpoint faults in your AC system with surgical precision.",
    color: "from-brand-purple to-brand-purple-light",
    longDescription:
      "Modern vehicle air conditioning systems are complex networks of electronic sensors, actuators, and control modules. When something goes wrong, simply guessing at the cause can lead to unnecessary parts replacement and wasted money. Our electronic diagnostics service uses manufacturer-grade scanning equipment to communicate directly with your vehicle's AC control unit, reading live data streams and stored fault codes to identify the exact source of the problem. Whether it's a failing pressure sensor, an open circuit in the compressor clutch, or a communication fault on the CAN bus, our diagnostic process leaves nothing to chance. Every diagnostic session concludes with a detailed written report that explains what we found, what it means, and what we recommend — empowering you to make an informed decision before any repair work begins.",
    benefits: [
      {
        title: "Pinpoint Accuracy",
        description:
          "Our computerized tools read live sensor data and stored fault codes directly from your AC control module, eliminating guesswork and identifying the exact failing component. This precision saves you money by ensuring we only replace what truly needs replacing.",
      },
      {
        title: "Saves Time & Money",
        description:
          "Rather than swapping parts until the problem disappears, our diagnostic approach targets the root cause immediately. Most diagnostic sessions are completed within 30-60 minutes, getting you back on the road faster and at a fraction of the cost of trial-and-error repairs.",
      },
      {
        title: "Detailed Report",
        description:
          "You receive a comprehensive written report listing every fault code found, the corresponding component, our interpretation, and a clear recommended action plan. This transparency lets you compare quotes and make decisions with full confidence.",
      },
      {
        title: "Preventive Insights",
        description:
          "Beyond identifying current faults, our technicians analyze trends in sensor readings that may indicate an impending failure. Catching a weak compressor or slow leak early can prevent a much more expensive breakdown down the road.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Initial Consultation",
        description:
          "We listen to your description of the symptoms — when they occur, under what conditions, and how long they've been present. This context helps us target the diagnostic session efficiently.",
      },
      {
        step: 2,
        title: "System Scan",
        description:
          "Our technician connects the diagnostic scanner to your vehicle's OBD-II port and queries the AC control module for stored fault codes and live data parameters across all sensors.",
      },
      {
        step: 3,
        title: "Component Testing",
        description:
          "Based on the scan results, we perform targeted tests on suspect components — pressure switches, temperature sensors, compressor clutch, blend door actuators — to confirm the diagnosis.",
      },
      {
        step: 4,
        title: "Report & Recommendations",
        description:
          "We compile our findings into a detailed report, explain the results in plain language, and provide a transparent quote for any recommended repairs. No work begins without your approval.",
      },
    ],
    features: [
      "Complete AC system analysis",
      "Electronic leak detection",
      "Detailed diagnostic report",
      "Fault code reading & interpretation",
      "Live sensor data monitoring",
      "CAN bus communication check",
      "Compressor clutch testing",
      "Pressure switch verification",
    ],
    faqs: [
      {
        question: "How long does an electronic diagnostic take?",
        answer:
          "Most diagnostic sessions are completed within 30 to 60 minutes, depending on the complexity of the symptoms and the number of fault codes present. In rare cases involving intermittent issues, we may need to keep the vehicle longer for road testing under various conditions.",
      },
      {
        question: "Will the diagnostic fee be applied to my repair?",
        answer:
          "Yes. If you choose to proceed with the recommended repairs at our workshop, the diagnostic fee is fully credited toward your repair invoice. We believe you shouldn't have to pay twice to find out what's wrong with your vehicle.",
      },
      {
        question: "Can you diagnose any car brand?",
        answer:
          "Our diagnostic equipment supports all major vehicle brands sold in Madagascar, including European, Asian, and American makes. For some luxury or specialty brands, we may need to confirm specific module compatibility when you book your appointment.",
      },
    ],
    relatedServices: ["repair", "recharge", "cleaning"],
  },
  repair: {
    id: "repair",
    icon: "Wrench",
    image: "/service-repair.png",
    title: "Repair & Maintenance",
    subtitle: "Compressors, condensers, evaporators and beyond",
    heroDescription:
      "Expert repair and maintenance on every major component of your AC system, performed by certified technicians.",
    color: "from-brand-red to-brand-red-light",
    longDescription:
      "Your car's air conditioning system contains dozens of mechanical and electrical components working in harmony under high pressure and extreme temperature swings. When one of them fails, the entire system suffers — and so does your comfort. Our repair and maintenance service covers every major component: compressors (the heart of the system), condensers (which release heat to the outside air), evaporators (which absorb heat from the cabin), expansion valves, receiver-driers, blower motors, and the network of hoses and seals that keep the refrigerant contained. We use only OEM-quality parts sourced from reputable suppliers, and every repair is performed by technicians who specialize exclusively in automotive AC systems. Whether you need a single hose replaced or a complete system overhaul, we approach every job with the same attention to detail, ensuring your AC performs like new when we hand back the keys.",
    benefits: [
      {
        title: "OEM-Quality Parts",
        description:
          "We source components exclusively from reputable manufacturers that meet or exceed original equipment specifications. This commitment to quality means your repaired system will perform reliably for years, not months.",
      },
      {
        title: "Specialized Technicians",
        description:
          "Our mechanics don't generalize — they specialize in automotive AC systems. This focused expertise means faster diagnosis, cleaner repairs, and fewer comebacks than you'd get from a generalist shop.",
      },
      {
        title: "Comprehensive Warranty",
        description:
          "Every repair we perform is backed by a written warranty covering both parts and labor. If a repaired component fails within the warranty period, we fix it again at no charge — no questions asked.",
      },
      {
        title: "Preventive Maintenance Plans",
        description:
          "We don't just fix what's broken — we help you avoid future breakdowns. Our maintenance plans include scheduled inspections, filter replacements, and system performance checks to extend the life of your AC investment.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Diagnostic Confirmation",
        description:
          "Before any repair begins, we confirm the failed component through hands-on testing — not just fault codes. This ensures we're fixing the actual problem, not a symptom.",
      },
      {
        step: 2,
        title: "Parts Sourcing",
        description:
          "We source OEM-quality replacement parts and provide you with a transparent quote including parts, labor, and estimated turnaround time before any work begins.",
      },
      {
        step: 3,
        title: "Expert Repair",
        description:
          "Our certified technicians perform the repair using manufacturer-approved procedures and torque specifications, with every step documented for your records.",
      },
      {
        step: 4,
        title: "Post-Repair Testing",
        description:
          "We pressure-test the system, verify refrigerant charge, and run a full performance check including vent temperature and airflow before returning your vehicle.",
      },
    ],
    features: [
      "Compressor repair & replacement",
      "Condenser replacement",
      "Evaporator service",
      "Expansion valve replacement",
      "Receiver-drier replacement",
      "Hose & seal replacement",
      "Blower motor service",
      "System pressure testing",
    ],
    faqs: [
      {
        question: "How do I know if my compressor needs replacement?",
        answer:
          "Common signs include unusual noises when the AC is engaged, weak or no cooling, visible clutch slipping, or a seized compressor pulley. Our diagnostic can confirm whether the compressor is truly failed or if the issue lies elsewhere — sometimes a faulty pressure switch or low refrigerant can mimic compressor failure.",
      },
      {
        question: "Do you offer a warranty on repairs?",
        answer:
          "Yes. Every repair includes a written warranty on both parts and labor. The exact duration depends on the component replaced — compressors typically carry a longer warranty than a hose or seal. Your service advisor will provide the specific warranty terms in writing before any work begins.",
      },
      {
        question: "How long does a typical repair take?",
        answer:
          "Simple repairs like a hose replacement or sensor swap can often be completed same-day. Major component replacements such as a compressor or evaporator typically require 1-2 days. We'll provide an accurate time estimate with your quote so you can plan accordingly.",
      },
    ],
    relatedServices: ["diagnostic", "recharge", "cleaning"],
  },
  recharge: {
    id: "recharge",
    icon: "Droplets",
    image: "/service-recharge.png",
    title: "Refrigerant Recharge",
    subtitle: "Professional AC gas service with leak testing",
    heroDescription:
      "Complete refrigerant recharge service with circuit flush, leak test, and gas compatible with your vehicle.",
    color: "from-brand-purple to-brand-purple-light",
    longDescription:
      "Refrigerant is the lifeblood of your air conditioning system — the fluid that absorbs heat from your cabin and releases it outside. Over time, even a healthy AC system loses a small amount of refrigerant through microscopic seal permeation, and leaks can accelerate this loss dramatically. When refrigerant levels drop, your AC blows warm, your compressor works harder (and risks damage), and your fuel economy suffers. Our refrigerant recharge service is far more than simply topping up the gas. We begin by recovering any remaining refrigerant from the system, then pull a deep vacuum to remove moisture and air that could damage internal components. We pressure-test the system with nitrogen to identify any leaks that need addressing before recharge. Only then do we recharge with the precise weight of refrigerant specified by your vehicle's manufacturer — using either R134a or R1234yf depending on your vehicle's requirements and current environmental regulations.",
    benefits: [
      {
        title: "Complete Service, Not Just a Top-Up",
        description:
          "We don't simply add gas to a leaking system. Our service includes recovery, vacuum, leak testing, and precise recharge — ensuring the job is done right the first time and that your AC performs at peak efficiency for the long haul.",
      },
      {
        title: "Environmental Compliance",
        description:
          "We handle refrigerants according to strict environmental standards, recovering and recycling old gas rather than venting it to the atmosphere. We also use R1234yf where required, the low-global-warming-potential refrigerant mandated in newer vehicles.",
      },
      {
        title: "Leak Detection Included",
        description:
          "A recharge without addressing leaks is money down the drain. Our nitrogen pressure test and UV dye injection option catch leaks before they drain your fresh refrigerant, saving you from repeat visits and protecting your compressor from low-charge damage.",
      },
      {
        title: "Precise Manufacturer Specifications",
        description:
          "We recharge by weight, not by guesswork. Every vehicle has a specific refrigerant charge weight listed on its under-hood sticker — we use a calibrated scale to deliver exactly that amount, ensuring optimal performance and preventing overcharge damage.",
      },
    ],
    process: [
      {
        step: 1,
        title: "System Recovery",
        description:
          "We recover any remaining refrigerant from your system using approved recovery equipment, then store it for recycling or proper disposal according to environmental regulations.",
      },
      {
        step: 2,
        title: "Vacuum & Dehydration",
        description:
          "We pull a deep vacuum on the system for 20-30 minutes to boil off any moisture and remove non-condensable gases. This step is critical — moisture in the system causes acid formation that destroys compressors from the inside out.",
      },
      {
        step: 3,
        title: "Leak Testing",
        description:
          "We pressurize the system with nitrogen and check every connection, hose, and component for leaks using electronic leak detectors and soap solution. Optional UV dye can be added for future leak tracing.",
      },
      {
        step: 4,
        title: "Precision Recharge",
        description:
          "With the system confirmed leak-free, we recharge with the exact refrigerant weight specified by your vehicle manufacturer, using a calibrated scale. We then verify vent temperature and system performance.",
      },
    ],
    features: [
      "Complete circuit flush",
      "Leak test with nitrogen",
      "R134a refrigerant recharge",
      "R1234yf refrigerant recharge",
      "Vacuum dehydration process",
      "UV dye leak tracing option",
      "Calibrated weight-based recharge",
      "Performance verification",
    ],
    faqs: [
      {
        question: "How often should I recharge my AC?",
        answer:
          "A healthy AC system in a vehicle with no leaks can go 2-3 years between recharges. If you notice diminished cooling performance, hear the compressor cycling frequently, or see visible oil stains around AC fittings, it's time to have the system checked. Annual preventive checks are recommended for older vehicles.",
      },
      {
        question: "What's the difference between R134a and R1234yf?",
        answer:
          "R134a is the older refrigerant used in most vehicles built before 2014. R1234yf is the newer, environmentally-friendlier refrigerant mandated in vehicles built after 2014 in many markets. The two are not interchangeable — your vehicle's under-hood sticker specifies which one your system uses, and we always recharge with the correct type.",
      },
      {
        question: "Will recharging fix my AC if it's not cooling?",
        answer:
          "Only if low refrigerant is the cause. If your system has a leak, simply recharging will provide temporary relief but the gas will escape again. That's why we always include leak testing in our recharge service — if we find a leak, we'll recommend repair before recharge to avoid wasting your money.",
      },
    ],
    relatedServices: ["diagnostic", "repair", "cleaning"],
  },
  cleaning: {
    id: "cleaning",
    icon: "Sparkles",
    image: "/service-cleaning.png",
    title: "System Cleaning",
    subtitle: "Longevity, performance, and healthy cabin air",
    heroDescription:
      "Deep cleaning that removes debris, moisture, and bacteria for system longevity and healthier cabin air.",
    color: "from-brand-red to-brand-red-light",
    longDescription:
      "Your car's air conditioning system does more than cool the air — it filters it, dehumidifies it, and circulates it through a network of ducts and components that, over time, accumulate dust, pollen, mold spores, and bacteria. A dirty AC system doesn't just perform poorly; it can actively harm your health, triggering allergies and respiratory issues, while also forcing your compressor to work harder and burn more fuel. Our system cleaning service is a comprehensive deep-clean that addresses both the mechanical and hygienic aspects of your AC. We flush the refrigerant circuit to remove debris and moisture that cause internal corrosion, clean the evaporator coil where mold and bacteria thrive, replace the cabin air filter, and apply an antibacterial treatment that eliminates odors at their source. The result is a system that cools more efficiently, lasts longer, and delivers air that's genuinely clean — a difference you can feel every time you turn the key.",
    benefits: [
      {
        title: "Healthier Cabin Air",
        description:
          "Mold, bacteria, and pollen that accumulate in your evaporator and ducts don't just smell bad — they trigger allergies and respiratory issues. Our antibacterial treatment eliminates these contaminants at the source, delivering noticeably cleaner air for you and your family.",
      },
      {
        title: "Improved Cooling Performance",
        description:
          "A dirty evaporator coil insulates poorly and restricts airflow, forcing your compressor to work harder for less cooling. After our deep clean, you'll feel the difference immediately — colder vent temperatures and faster cooldown times, even on the hottest days.",
      },
      {
        title: "Extended Component Life",
        description:
          "Debris and moisture in the refrigerant circuit cause internal corrosion that slowly destroys your compressor, condenser, and expansion valve from the inside. Our flush removes these contaminants, protecting your investment and delaying expensive component replacement.",
      },
      {
        title: "Eliminated Odors",
        description:
          "That musty gym-sock smell when you first turn on the AC isn't normal — it's mold growing in your evaporator case. Our antibacterial treatment and evaporator cleaning eliminate odors at their source, leaving your cabin smelling fresh mile after mile.",
      },
    ],
    process: [
      {
        step: 1,
        title: "System Inspection",
        description:
          "We inspect the cabin air filter, evaporator access, ductwork, and drain tube for signs of contamination, blockage, or mold growth. This tells us where to focus our cleaning effort for maximum impact.",
      },
      {
        step: 2,
        title: "Circuit Flush",
        description:
          "We flush the refrigerant circuit with a specialized solvent to remove debris, sludge, and moisture that have accumulated over time. This protects internal components from corrosion and restores proper refrigerant flow.",
      },
      {
        step: 3,
        title: "Evaporator Cleaning",
        description:
          "We apply a foaming antibacterial cleaner directly to the evaporator coil, where it breaks down mold, bacteria, and biofilm that cause odors and restrict airflow. The cleaner is then rinsed and drained.",
      },
      {
        step: 4,
        title: "Filter Replacement & Treatment",
        description:
          "We replace your cabin air filter with a new OEM-quality unit and apply a long-lasting antibacterial treatment throughout the ductwork. We finish with a final performance check and odor verification.",
      },
    ],
    features: [
      "Complete circuit flush",
      "Antibacterial treatment",
      "Moisture elimination",
      "Evaporator coil cleaning",
      "Cabin air filter replacement",
      "Ductwork sanitization",
      "System odor removal",
      "Drain tube clearing",
    ],
    faqs: [
      {
        question: "How often should I have my AC system cleaned?",
        answer:
          "For most vehicles, we recommend a system cleaning every 12-18 months. If you frequently drive in dusty conditions, have allergies, or notice musty odors when starting the AC, more frequent cleaning may be beneficial. A good rule of thumb is to clean at the start of the cooling season.",
      },
      {
        question: "Will cleaning fix bad AC odors?",
        answer:
          "Yes. Persistent AC odors are almost always caused by mold and bacteria growing on the evaporator coil. Our antibacterial treatment and evaporator cleaning eliminate these microbes at their source, providing long-lasting odor relief. If odors return quickly, it may indicate a clogged drain tube that we'll address.",
      },
      {
        question: "Does cleaning improve cooling performance?",
        answer:
          "Absolutely. A dirty evaporator coil and clogged cabin air filter can reduce cooling efficiency by 20% or more. After our deep clean, most customers notice colder vent temperatures, faster cooldown, and improved airflow — often without needing a refrigerant recharge.",
      },
    ],
    relatedServices: ["diagnostic", "repair", "recharge"],
  },
};
