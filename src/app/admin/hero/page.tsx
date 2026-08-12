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
import { Plus, Image as ImageIcon } from "lucide-react";

interface HeroSlide {
  id: string;
  order: number;
  image: string;
  icon: string;
  badge: string;
  title: string;
  titleAccent: string;
  description: string;
  tagline: string;
  active: boolean;
}

export default function HeroSlidesPage() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    order: 1,
    image: "",
    icon: "Snowflake",
    badge: "",
    title: "",
    titleAccent: "",
    description: "",
    tagline: "",
    active: true,
  });

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const response = await fetch("/api/admin/hero-slides");
      if (response.ok) {
        const data = await response.json();
        setSlides(data);
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les slides",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingSlide
        ? `/api/admin/hero-slides/${editingSlide.id}`
        : "/api/admin/hero-slides";

      const method = editingSlide ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Succès",
          description: editingSlide ? "Slide modifié" : "Slide créé",
        });
        fetchSlides();
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

  const handleEdit = (slide: HeroSlide) => {
    setEditingSlide(slide);
    setFormData({
      order: slide.order,
      image: slide.image,
      icon: slide.icon,
      badge: slide.badge,
      title: slide.title,
      titleAccent: slide.titleAccent,
      description: slide.description,
      tagline: slide.tagline,
      active: slide.active,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (slide: HeroSlide) => {
    if (!confirm("Voulez-vous vraiment supprimer ce slide ?")) return;

    try {
      const response = await fetch(`/api/admin/hero-slides/${slide.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Succès",
          description: "Slide supprimé",
        });
        fetchSlides();
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le slide",
        variant: "destructive",
      });
    }
  };

  const handleToggleActive = async (slide: HeroSlide) => {
    try {
      const response = await fetch(`/api/admin/hero-slides/${slide.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !slide.active }),
      });

      if (response.ok) {
        fetchSlides();
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
    setEditingSlide(null);
    setFormData({
      order: slides.length + 1,
      image: "",
      icon: "Snowflake",
      badge: "",
      title: "",
      titleAccent: "",
      description: "",
      tagline: "",
      active: true,
    });
  };

  const columns = [
    {
      header: "Ordre",
      accessor: "order" as keyof HeroSlide,
      width: "80px",
    },
    {
      header: "Image",
      accessor: (slide: HeroSlide) => (
        <div className="flex items-center gap-2">
          <ImageIcon className="h-4 w-4 text-brand-purple" />
          <span className="text-xs text-muted-foreground truncate max-w-[200px]">
            {slide.image}
          </span>
        </div>
      ),
    },
    {
      header: "Badge",
      accessor: "badge" as keyof HeroSlide,
    },
    {
      header: "Titre",
      accessor: (slide: HeroSlide) => (
        <span>
          {slide.title} <span className="text-brand-purple">{slide.titleAccent}</span>
        </span>
      ),
    },
    {
      header: "Statut",
      accessor: (slide: HeroSlide) => (
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            slide.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
          }`}
        >
          {slide.active ? "Actif" : "Inactif"}
        </span>
      ),
      width: "100px",
    },
  ];

  return (
    <AdminLayout
      title="Hero Slides"
      description="Gérer les slides du carrousel de la page d'accueil"
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            {slides.length} slide(s) au total
          </p>
          <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Ajouter un slide
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin h-8 w-8 border-4 border-brand-purple border-t-transparent rounded-full" />
          </div>
        ) : (
          <DataTable
            data={slides}
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
              {editingSlide ? "Modifier le slide" : "Nouveau slide"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="order">Ordre</Label>
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
              <div>
                <Label htmlFor="icon">Icône Lucide</Label>
                <Input
                  id="icon"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="Snowflake"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="image">URL de l'image</Label>
              <Input
                id="image"
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>

            <div>
              <Label htmlFor="badge">Badge</Label>
              <Input
                id="badge"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Titre</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="titleAccent">Titre (accent)</Label>
                <Input
                  id="titleAccent"
                  value={formData.titleAccent}
                  onChange={(e) =>
                    setFormData({ ...formData, titleAccent: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
                required
              />
            </div>

            <div>
              <Label htmlFor="tagline">Tagline</Label>
              <Input
                id="tagline"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
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
                {editingSlide ? "Modifier" : "Créer"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
