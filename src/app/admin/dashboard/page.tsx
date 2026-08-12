"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  ImageIcon,
  Wrench,
  MessageSquare,
  FileText,
  Phone,
  Image,
  Settings,
  LogOut,
  User,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    icon: ImageIcon,
    label: "Hero Slides",
    href: "/admin/hero",
    description: "Gérer les slides du carrousel",
    count: 5,
  },
  {
    icon: Wrench,
    label: "Services",
    href: "/admin/services",
    description: "Éditer les 4 services",
    count: 4,
  },
  {
    icon: MessageSquare,
    label: "Témoignages",
    href: "/admin/testimonials",
    description: "Ajouter et modifier les avis",
    count: 3,
  },
  {
    icon: FileText,
    label: "Contenus",
    href: "/admin/content",
    description: "About, Why Choose, FAQ",
    count: null,
  },
  {
    icon: Phone,
    label: "Contact Info",
    href: "/admin/contact-info",
    description: "Téléphone, email, adresse",
    count: null,
  },
  {
    icon: Image,
    label: "Médias",
    href: "/admin/media",
    description: "Images et vidéos",
    count: null,
  },
];

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-brand-purple border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-purple to-brand-red flex items-center justify-center">
                <LayoutDashboard className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  MASTECH Admin
                </h1>
                <p className="text-xs text-muted-foreground">
                  Panel d'administration
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                <User className="h-4 w-4 text-brand-purple" />
                <span className="text-sm font-medium">{session.user?.name}</span>
              </div>
              <Button
                onClick={() => signOut({ callbackUrl: "/admin/login" })}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Déconnexion</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Bienvenue, {session.user?.name} 👋
          </h2>
          <p className="text-muted-foreground">
            Gérez le contenu de votre site Mastech Cooling Technology
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-purple/10 flex items-center justify-center">
                <ImageIcon className="h-6 w-6 text-brand-purple" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">5</p>
                <p className="text-sm text-muted-foreground">Hero Slides</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-red/10 flex items-center justify-center">
                <Wrench className="h-6 w-6 text-brand-red" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">4</p>
                <p className="text-sm text-muted-foreground">Services Actifs</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-yellow/10 flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-brand-yellow" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">3</p>
                <p className="text-sm text-muted-foreground">Témoignages</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-xl font-bold text-foreground mb-4">
            Gestion du contenu
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="group bg-white rounded-xl p-6 border border-gray-200 hover:border-brand-purple hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-purple/10 group-hover:bg-brand-purple flex items-center justify-center transition-colors duration-300">
                    <item.icon className="h-6 w-6 text-brand-purple group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-foreground group-hover:text-brand-purple transition-colors">
                        {item.label}
                      </h4>
                      {item.count !== null && (
                        <span className="text-xs font-medium text-muted-foreground bg-gray-100 px-2 py-1 rounded">
                          {item.count}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Last Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 bg-white rounded-xl p-6 border border-gray-200"
        >
          <div className="flex items-center gap-3 mb-4">
            <Clock className="h-5 w-5 text-brand-purple" />
            <h3 className="text-lg font-bold text-foreground">
              Dernière connexion
            </h3>
          </div>
          <p className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString("fr-FR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </motion.div>
      </main>
    </div>
  );
}
