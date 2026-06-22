import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import FloatingWhatsApp from "@/components/sections/FloatingWhatsApp";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mastech Cooling Technology | Car Air Conditioning Experts",
  description:
    "Mastech Cooling Technology - Car air conditioning specialists. Electronic diagnostics, repair, refrigerant recharge and system cleaning. Masters in Cooling.",
  keywords: [
    "car air conditioning",
    "AC repair",
    "AC refrigerant recharge",
    "electronic diagnostics",
    "Mastech Cooling Technology",
    "AC maintenance",
    "AC compressor",
    "condenser",
    "evaporator",
    "auto cooling",
  ],
  authors: [{ name: "Mastech Cooling Technology" }],
  icons: {
    icon: "/mastech-logo.png",
  },
  openGraph: {
    title: "Mastech Cooling Technology | Car Air Conditioning Experts",
    description:
      "Car air conditioning specialists. Diagnostics, repair, refrigerant recharge and system cleaning.",
    type: "website",
    locale: "en_US",
    siteName: "Mastech Cooling Technology",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
