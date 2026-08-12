"use client";

import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Image as ImageIcon, Video, Trash2, Upload } from "lucide-react";

interface Media {
  id: string;
  filename: string;
  url: string;
  type: "image" | "video";
  category?: string;
  size: number;
  mimeType: string;
  alt?: string;
  uploadedAt: string;
}

export default function MediaPage() {
  const [media, setMedia] = useState<Media[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "image" | "video">("all");
  const { toast } = useToast();

  useEffect(() => {
    fetchMedia();
  }, [filter]);

  const fetchMedia = async () => {
    try {
      const url =
        filter === "all"
          ? "/api/admin/media"
          : `/api/admin/media?type=${filter}`;

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setMedia(data);
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les médias",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (item: Media) => {
    if (!confirm("Voulez-vous vraiment supprimer ce média ?")) return;

    try {
      const response = await fetch(`/api/admin/media/${item.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Succès",
          description: "Média supprimé",
        });
        fetchMedia();
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le média",
        variant: "destructive",
      });
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <AdminLayout
      title="Gestionnaire de Médias"
      description="Gérer les images et vidéos du site"
    >
      <div className="space-y-6">
        {/* Filters */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
            >
              Tous ({media.length})
            </Button>
            <Button
              variant={filter === "image" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("image")}
            >
              Images
            </Button>
            <Button
              variant={filter === "video" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("video")}
            >
              Vidéos
            </Button>
          </div>

          <Button className="gap-2">
            <Upload className="h-4 w-4" />
            Uploader
          </Button>
        </div>

        {/* Media Grid */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin h-8 w-8 border-4 border-brand-purple border-t-transparent rounded-full" />
          </div>
        ) : media.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <ImageIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-muted-foreground">Aucun média trouvé</p>
            <p className="text-sm text-muted-foreground mt-2">
              Cliquez sur "Uploader" pour ajouter des images ou vidéos
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {media.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Preview */}
                <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                  {item.type === "image" ? (
                    <img
                      src={item.url}
                      alt={item.alt || item.filename}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Video className="h-12 w-12 text-gray-400" />
                  )}
                </div>

                {/* Info */}
                <div className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {item.filename}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatSize(item.size)}
                      </p>
                    </div>
                    <div
                      className={`p-1.5 rounded ${
                        item.type === "image"
                          ? "bg-brand-purple/10"
                          : "bg-brand-red/10"
                      }`}
                    >
                      {item.type === "image" ? (
                        <ImageIcon className="h-4 w-4 text-brand-purple" />
                      ) : (
                        <Video className="h-4 w-4 text-brand-red" />
                      )}
                    </div>
                  </div>

                  {item.category && (
                    <span className="inline-block px-2 py-1 text-xs bg-gray-100 rounded">
                      {item.category}
                    </span>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        navigator.clipboard.writeText(item.url);
                        toast({
                          title: "Copié",
                          description: "URL copiée dans le presse-papier",
                        });
                      }}
                    >
                      Copier URL
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(item)}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}