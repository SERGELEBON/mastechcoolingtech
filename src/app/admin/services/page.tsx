"use client";

import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Edit, Wrench } from "lucide-react";
import Link from "next/link";

interface Service {
  id: string;
  icon: string;
  image: string;
  title: string;
  subtitle: string;
  heroDescription: string;
  color: string;
  order: number;
  active: boolean;
  benefits: any[];
  process: any[];
  features: any[];
  faqs: any[];
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch("/api/admin/services");
      if (response.ok) {
        const data = await response.json();
        setServices(data);
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les services",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleActive = async (service: Service) => {
    try {
      const response = await fetch(`/api/admin/services/${service.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !service.active }),
      });

      if (response.ok) {
        fetchServices();
        toast({
          title: "Succès",
          description: "Statut modifié",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de modifier le statut",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <AdminLayout title="Services">
        <div className="flex justify-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-brand-purple border-t-transparent rounded-full" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title="Services"
      description="Gérer les 4 services principaux de Mastech"
    >
      <div className="space-y-6">
        <p className="text-sm text-muted-foreground">
          {services.length} service(s) configuré(s)
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Image */}
              <div className="h-48 overflow-hidden bg-gray-100">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Wrench className="h-5 w-5 text-brand-purple" />
                      <h3 className="font-bold text-lg text-foreground">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {service.subtitle}
                    </p>
                  </div>

                  <span
                    className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${
                      service.active
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {service.active ? "Actif" : "Inactif"}
                  </span>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p className="line-clamp-2">{service.heroDescription}</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-2 pt-4 border-t border-gray-100">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Avantages</p>
                    <p className="font-bold text-brand-purple">
                      {service.benefits?.length || 0}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Étapes</p>
                    <p className="font-bold text-brand-purple">
                      {service.process?.length || 0}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Features</p>
                    <p className="font-bold text-brand-purple">
                      {service.features?.length || 0}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">FAQs</p>
                    <p className="font-bold text-brand-purple">
                      {service.faqs?.length || 0}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleActive(service)}
                    className="flex-1"
                  >
                    {service.active ? "Désactiver" : "Activer"}
                  </Button>
                  <Link
                    href={`/admin/services/${service.id}`}
                    className="flex-1"
                  >
                    <Button size="sm" className="w-full gap-2">
                      <Edit className="h-4 w-4" />
                      Éditer
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {services.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <Wrench className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-muted-foreground">Aucun service configuré</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}