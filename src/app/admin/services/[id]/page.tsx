"use client";

import { useState, useEffect, use } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Save, Plus, Trash2 } from "lucide-react";

interface Benefit {
  id?: string;
  title: string;
  description: string;
  order: number;
}

interface Process {
  id?: string;
  step: number;
  title: string;
  description: string;
}

interface Feature {
  id?: string;
  text: string;
  order: number;
}

interface FAQ {
  id?: string;
  question: string;
  answer: string;
  order: number;
}

interface Service {
  id: string;
  icon: string;
  image: string;
  title: string;
  subtitle: string;
  heroDescription: string;
  color: string;
  longDescription: string;
  order: number;
  active: boolean;
  benefits: Benefit[];
  process: Process[];
  features: Feature[];
  faqs: FAQ[];
}

export default function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [service, setService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    fetchService();
  }, []);

  const fetchService = async () => {
    try {
      const response = await fetch(`/api/admin/services/${resolvedParams.id}`);
      if (response.ok) {
        const data = await response.json();
        setService(data);
      } else {
        toast({
          title: "Erreur",
          description: "Service introuvable",
          variant: "destructive",
        });
        router.push("/admin/services");
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger le service",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!service) return;

    setIsSaving(true);

    try {
      const response = await fetch(`/api/admin/services/${resolvedParams.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(service),
      });

      if (response.ok) {
        toast({
          title: "Succès",
          description: "Service mis à jour",
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

  const addBenefit = () => {
    if (!service) return;
    setService({
      ...service,
      benefits: [
        ...service.benefits,
        { title: "", description: "", order: service.benefits.length + 1 },
      ],
    });
  };

  const removeBenefit = (index: number) => {
    if (!service) return;
    setService({
      ...service,
      benefits: service.benefits.filter((_, i) => i !== index),
    });
  };

  const addProcess = () => {
    if (!service) return;
    setService({
      ...service,
      process: [
        ...service.process,
        { step: service.process.length + 1, title: "", description: "" },
      ],
    });
  };

  const removeProcess = (index: number) => {
    if (!service) return;
    setService({
      ...service,
      process: service.process.filter((_, i) => i !== index),
    });
  };

  const addFeature = () => {
    if (!service) return;
    setService({
      ...service,
      features: [
        ...service.features,
        { text: "", order: service.features.length + 1 },
      ],
    });
  };

  const removeFeature = (index: number) => {
    if (!service) return;
    setService({
      ...service,
      features: service.features.filter((_, i) => i !== index),
    });
  };

  const addFAQ = () => {
    if (!service) return;
    setService({
      ...service,
      faqs: [
        ...service.faqs,
        { question: "", answer: "", order: service.faqs.length + 1 },
      ],
    });
  };

  const removeFAQ = (index: number) => {
    if (!service) return;
    setService({
      ...service,
      faqs: service.faqs.filter((_, i) => i !== index),
    });
  };

  if (isLoading) {
    return (
      <AdminLayout title="Éditer le Service">
        <div className="flex justify-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-brand-purple border-t-transparent rounded-full" />
        </div>
      </AdminLayout>
    );
  }

  if (!service) return null;

  return (
    <AdminLayout
      title={`Éditer: ${service.title}`}
      description="Modifier les détails du service"
    >
      <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
        {/* Basic Info */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h3 className="text-lg font-bold text-foreground mb-4">
            Informations de base
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Titre</Label>
              <Input
                id="title"
                value={service.title}
                onChange={(e) =>
                  setService({ ...service, title: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="subtitle">Sous-titre</Label>
              <Input
                id="subtitle"
                value={service.subtitle}
                onChange={(e) =>
                  setService({ ...service, subtitle: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="heroDescription">Description courte</Label>
            <Textarea
              id="heroDescription"
              value={service.heroDescription}
              onChange={(e) =>
                setService({ ...service, heroDescription: e.target.value })
              }
              rows={2}
              required
            />
          </div>

          <div>
            <Label htmlFor="longDescription">Description longue</Label>
            <Textarea
              id="longDescription"
              value={service.longDescription}
              onChange={(e) =>
                setService({ ...service, longDescription: e.target.value })
              }
              rows={4}
              required
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="icon">Icône Lucide</Label>
              <Input
                id="icon"
                value={service.icon}
                onChange={(e) =>
                  setService({ ...service, icon: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="color">Couleur</Label>
              <Input
                id="color"
                value={service.color}
                onChange={(e) =>
                  setService({ ...service, color: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="order">Ordre</Label>
              <Input
                id="order"
                type="number"
                value={service.order}
                onChange={(e) =>
                  setService({ ...service, order: parseInt(e.target.value) })
                }
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="image">URL de l'image</Label>
            <Input
              id="image"
              type="url"
              value={service.image}
              onChange={(e) =>
                setService({ ...service, image: e.target.value })
              }
              required
            />
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-foreground">Avantages</h3>
            <Button type="button" onClick={addBenefit} size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Ajouter
            </Button>
          </div>

          {service.benefits.map((benefit, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <Label>Avantage #{index + 1}</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeBenefit(index)}
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </Button>
              </div>
              <Input
                placeholder="Titre"
                value={benefit.title}
                onChange={(e) => {
                  const newBenefits = [...service.benefits];
                  newBenefits[index].title = e.target.value;
                  setService({ ...service, benefits: newBenefits });
                }}
              />
              <Textarea
                placeholder="Description"
                value={benefit.description}
                onChange={(e) => {
                  const newBenefits = [...service.benefits];
                  newBenefits[index].description = e.target.value;
                  setService({ ...service, benefits: newBenefits });
                }}
                rows={2}
              />
            </div>
          ))}
        </div>

        {/* Process */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-foreground">Processus</h3>
            <Button type="button" onClick={addProcess} size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Ajouter
            </Button>
          </div>

          {service.process.map((proc, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <Label>Étape #{proc.step}</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeProcess(index)}
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </Button>
              </div>
              <Input
                placeholder="Titre"
                value={proc.title}
                onChange={(e) => {
                  const newProcess = [...service.process];
                  newProcess[index].title = e.target.value;
                  setService({ ...service, process: newProcess });
                }}
              />
              <Textarea
                placeholder="Description"
                value={proc.description}
                onChange={(e) => {
                  const newProcess = [...service.process];
                  newProcess[index].description = e.target.value;
                  setService({ ...service, process: newProcess });
                }}
                rows={2}
              />
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-foreground">Caractéristiques</h3>
            <Button type="button" onClick={addFeature} size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Ajouter
            </Button>
          </div>

          {service.features.map((feature, index) => (
            <div key={index} className="flex gap-2">
              <Input
                placeholder="Caractéristique"
                value={feature.text}
                onChange={(e) => {
                  const newFeatures = [...service.features];
                  newFeatures[index].text = e.target.value;
                  setService({ ...service, features: newFeatures });
                }}
                className="flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeFeature(index)}
              >
                <Trash2 className="h-4 w-4 text-red-600" />
              </Button>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-foreground">FAQs</h3>
            <Button type="button" onClick={addFAQ} size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Ajouter
            </Button>
          </div>

          {service.faqs.map((faq, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <Label>FAQ #{index + 1}</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFAQ(index)}
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </Button>
              </div>
              <Input
                placeholder="Question"
                value={faq.question}
                onChange={(e) => {
                  const newFAQs = [...service.faqs];
                  newFAQs[index].question = e.target.value;
                  setService({ ...service, faqs: newFAQs });
                }}
              />
              <Textarea
                placeholder="Réponse"
                value={faq.answer}
                onChange={(e) => {
                  const newFAQs = [...service.faqs];
                  newFAQs[index].answer = e.target.value;
                  setService({ ...service, faqs: newFAQs });
                }}
                rows={2}
              />
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 sticky bottom-0 bg-gray-50 py-4 border-t border-gray-200">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/services")}
          >
            Annuler
          </Button>
          <Button type="submit" disabled={isSaving} className="gap-2">
            <Save className="h-4 w-4" />
            {isSaving ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </div>
      </form>
    </AdminLayout>
  );
}