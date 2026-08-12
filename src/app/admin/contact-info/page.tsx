"use client";

import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Save, Phone, Mail, MapPin, Clock } from "lucide-react";

interface ContactInfo {
  id: string;
  phone: string;
  email: string;
  address: string;
  addressLink: string;
  poBox?: string;
  hours: string;
  latitude?: string;
  longitude?: string;
}

export default function ContactInfoPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    address: "",
    addressLink: "",
    poBox: "",
    hours: "",
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      const response = await fetch("/api/admin/contact-info");
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setFormData({
            phone: data.phone || "",
            email: data.email || "",
            address: data.address || "",
            addressLink: data.addressLink || "",
            poBox: data.poBox || "",
            hours: data.hours || "",
            latitude: data.latitude || "",
            longitude: data.longitude || "",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les informations",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await fetch("/api/admin/contact-info", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Succès",
          description: "Informations mises à jour",
        });
      } else {
        throw new Error();
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout title="Informations de Contact">
        <div className="flex justify-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-brand-purple border-t-transparent rounded-full" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title="Informations de Contact"
      description="Modifier les coordonnées affichées sur le site"
    >
      <div className="max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
            {/* Phone & Email */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-brand-purple" />
                  Téléphone
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+233 24 460 8104"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-brand-purple" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="contact@mastechcooling.com"
                  required
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand-purple" />
                Adresse complète
              </Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                placeholder="Teshie Nungua Estates, Accra, Ghana"
                required
              />
            </div>

            {/* Address Link (Google Maps) */}
            <div>
              <Label htmlFor="addressLink">Lien Google Maps</Label>
              <Input
                id="addressLink"
                type="url"
                value={formData.addressLink}
                onChange={(e) =>
                  setFormData({ ...formData, addressLink: e.target.value })
                }
                placeholder="https://maps.app.goo.gl/..."
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                Lien vers l'adresse sur Google Maps
              </p>
            </div>

            {/* PO Box */}
            <div>
              <Label htmlFor="poBox">Boîte postale (optionnel)</Label>
              <Input
                id="poBox"
                value={formData.poBox}
                onChange={(e) =>
                  setFormData({ ...formData, poBox: e.target.value })
                }
                placeholder="P.O. Box..."
              />
            </div>

            {/* Hours */}
            <div>
              <Label htmlFor="hours" className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-brand-purple" />
                Horaires d'ouverture
              </Label>
              <Input
                id="hours"
                value={formData.hours}
                onChange={(e) =>
                  setFormData({ ...formData, hours: e.target.value })
                }
                placeholder="Lun-Sam: 8h-18h"
                required
              />
            </div>

            {/* Coordinates */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="latitude">Latitude (optionnel)</Label>
                <Input
                  id="latitude"
                  value={formData.latitude}
                  onChange={(e) =>
                    setFormData({ ...formData, latitude: e.target.value })
                  }
                  placeholder="5.614818"
                />
              </div>

              <div>
                <Label htmlFor="longitude">Longitude (optionnel)</Label>
                <Input
                  id="longitude"
                  value={formData.longitude}
                  onChange={(e) =>
                    setFormData({ ...formData, longitude: e.target.value })
                  }
                  placeholder="-0.157276"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={fetchContactInfo}>
              Réinitialiser
            </Button>
            <Button type="submit" disabled={isSaving} className="gap-2">
              <Save className="h-4 w-4" />
              {isSaving ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}