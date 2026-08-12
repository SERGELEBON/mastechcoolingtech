"use client";

import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DataTable } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Star } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  text: string;
  initials: string;
  color: string;
  order: number;
  active: boolean;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    location: "",
    rating: 5,
    text: "",
    initials: "",
    color: "from-brand-purple to-brand-red",
    order: 1,
    active: true,
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch("/api/admin/testimonials");
      if (response.ok) {
        const data = await response.json();
        setTestimonials(data);
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les témoignages",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingItem
        ? `/api/admin/testimonials/${editingItem.id}`
        : "/api/admin/testimonials";

      const method = editingItem ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Succès",
          description: editingItem ? "Témoignage modifié" : "Témoignage créé",
        });
        fetchTestimonials();
        handleCloseDialog();
      } else {
        throw new Error();
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (item: Testimonial) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      role: item.role,
      location: item.location,
      rating: item.rating,
      text: item.text,
      initials: item.initials,
      color: item.color,
      order: item.order,
      active: item.active,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (item: Testimonial) => {
    if (!confirm("Voulez-vous vraiment supprimer ce témoignage ?")) return;

    try {
      const response = await fetch(`/api/admin/testimonials/${item.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Succès",
          description: "Témoignage supprimé",
        });
        fetchTestimonials();
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le témoignage",
        variant: "destructive",
      });
    }
  };

  const handleToggleActive = async (item: Testimonial) => {
    try {
      const response = await fetch(`/api/admin/testimonials/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !item.active }),
      });

      if (response.ok) {
        fetchTestimonials();
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de modifier le statut",
        variant: "destructive",
      });
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingItem(null);
    setFormData({
      name: "",
      role: "",
      location: "",
      rating: 5,
      text: "",
      initials: "",
      color: "from-brand-purple to-brand-red",
      order: testimonials.length + 1,
      active: true,
    });
  };

  const columns = [
    {
      header: "Ordre",
      accessor: "order" as keyof Testimonial,
      width: "80px",
    },
    {
      header: "Nom",
      accessor: "name" as keyof Testimonial,
    },
    {
      header: "Rôle",
      accessor: "role" as keyof Testimonial,
    },
    {
      header: "Lieu",
      accessor: "location" as keyof Testimonial,
    },
    {
      header: "Note",
      accessor: (item: Testimonial) => (
        <div className="flex items-center gap-1">
          {Array.from({ length: item.rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-brand-yellow text-brand-yellow" />
          ))}
        </div>
      ),
      width: "120px",
    },
    {
      header: "Statut",
      accessor: (item: Testimonial) => (
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            item.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
          }`}
        >
          {item.active ? "Actif" : "Inactif"}
        </span>
      ),
      width: "100px",
    },
  ];

  return (
    <AdminLayout
      title="Témoignages"
      description="Gérer les avis clients affichés sur le site"
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            {testimonials.length} témoignage(s) au total
          </p>
          <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Ajouter un témoignage
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin h-8 w-8 border-4 border-brand-purple border-t-transparent rounded-full" />
          </div>
        ) : (
          <DataTable
            data={testimonials}
            columns={columns}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleActive={handleToggleActive}
            idKey="id"
            activeKey="active"
          />
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Modifier le témoignage" : "Nouveau témoignage"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nom complet</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="initials">Initiales</Label>
                <Input
                  id="initials"
                  value={formData.initials}
                  onChange={(e) => setFormData({ ...formData, initials: e.target.value })}
                  maxLength={3}
                  placeholder="JD"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="role">Fonction</Label>
                <Input
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="Propriétaire de taxi"
                  required
                />
              </div>
              <div>
                <Label htmlFor="location">Lieu</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Accra, Ghana"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="rating">Note (1-5)</Label>
                <Input
                  id="rating"
                  type="number"
                  min="1"
                  max="5"
                  value={formData.rating}
                  onChange={(e) =>
                    setFormData({ ...formData, rating: parseInt(e.target.value) })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="order">Ordre d'affichage</Label>
                <Input
                  id="order"
                  type="number"
                  value={formData.order}
                  onChange={(e) =>
                    setFormData({ ...formData, order: parseInt(e.target.value) })
                  }
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="text">Témoignage</Label>
              <Textarea
                id="text"
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                rows={4}
                placeholder="Le témoignage du client..."
                required
              />
            </div>

            <div>
              <Label htmlFor="color">Couleur (Tailwind gradient)</Label>
              <Input
                id="color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                placeholder="from-brand-purple to-brand-red"
                required
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="active"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="w-4 h-4"
              />
              <Label htmlFor="active" className="cursor-pointer">
                Actif
              </Label>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Annuler
              </Button>
              <Button type="submit">
                {editingItem ? "Modifier" : "Créer"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
