"use client";

import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Save, FileText } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface SectionContent {
  id?: string;
  slug: string;
  title: string;
  subtitle?: string;
  content: string;
}

export default function ContentPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [contents, setContents] = useState<Record<string, SectionContent>>({});
  const { toast } = useToast();

  const sections = [
    { slug: "about", name: "About", defaultTitle: "About Mastech" },
    { slug: "why-choose-us", name: "Why Choose Us", defaultTitle: "Why Choose Us?" },
    { slug: "faq-section", name: "FAQ Section", defaultTitle: "Questions Fréquentes" },
  ];

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    try {
      const response = await fetch("/api/admin/content");
      if (response.ok) {
        const data = await response.json();
        const contentMap: Record<string, SectionContent> = {};

        data.forEach((item: SectionContent) => {
          contentMap[item.slug] = item;
        });

        setContents(contentMap);
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les contenus",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (slug: string) => {
    const content = contents[slug];
    if (!content) return;

    try {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });

      if (response.ok) {
        toast({
          title: "Succès",
          description: "Contenu mis à jour",
        });
        fetchContents();
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

  const updateContent = (slug: string, field: keyof SectionContent, value: string) => {
    setContents((prev) => ({
      ...prev,
      [slug]: {
        ...prev[slug],
        slug,
        [field]: value,
      },
    }));
  };

  if (isLoading) {
    return (
      <AdminLayout title="Contenus des Sections">
        <div className="flex justify-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-brand-purple border-t-transparent rounded-full" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title="Contenus des Sections"
      description="Modifier les textes des sections About, Why Choose Us et FAQ"
    >
      <Tabs defaultValue={sections[0].slug} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          {sections.map((section) => (
            <TabsTrigger key={section.slug} value={section.slug}>
              {section.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {sections.map((section) => {
          const content = contents[section.slug] || {
            slug: section.slug,
            title: section.defaultTitle,
            subtitle: "",
            content: "{}",
          };

          return (
            <TabsContent key={section.slug} value={section.slug} className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="h-5 w-5 text-brand-purple" />
                  <h3 className="text-lg font-bold text-foreground">
                    {section.name}
                  </h3>
                </div>

                <div>
                  <Label htmlFor={`${section.slug}-title`}>Titre</Label>
                  <Input
                    id={`${section.slug}-title`}
                    value={content.title}
                    onChange={(e) =>
                      updateContent(section.slug, "title", e.target.value)
                    }
                    placeholder={section.defaultTitle}
                  />
                </div>

                <div>
                  <Label htmlFor={`${section.slug}-subtitle`}>Sous-titre (optionnel)</Label>
                  <Input
                    id={`${section.slug}-subtitle`}
                    value={content.subtitle || ""}
                    onChange={(e) =>
                      updateContent(section.slug, "subtitle", e.target.value)
                    }
                  />
                </div>

                <div>
                  <Label htmlFor={`${section.slug}-content`}>
                    Contenu (JSON)
                  </Label>
                  <Textarea
                    id={`${section.slug}-content`}
                    value={content.content}
                    onChange={(e) =>
                      updateContent(section.slug, "content", e.target.value)
                    }
                    rows={12}
                    className="font-mono text-sm"
                    placeholder='{"key": "value"}'
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Format JSON pour une structure flexible. Exemple: {`{"items": ["Item 1", "Item 2"]}`}
                  </p>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={() => handleSave(section.slug)}
                    className="gap-2"
                  >
                    <Save className="h-4 w-4" />
                    Enregistrer {section.name}
                  </Button>
                </div>
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </AdminLayout>
  );
}