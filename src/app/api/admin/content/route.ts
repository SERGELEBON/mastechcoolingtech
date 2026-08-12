import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const sectionContentSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().optional(),
  content: z.string().min(1),
});

// GET all section contents or specific by slug
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (slug) {
      const content = await db.sectionContent.findUnique({
        where: { slug },
      });
      return NextResponse.json(content);
    }

    const contents = await db.sectionContent.findMany({
      orderBy: { slug: "asc" },
    });

    return NextResponse.json(contents);
  } catch (error) {
    console.error("Error fetching section contents:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des contenus" },
      { status: 500 }
    );
  }
}

// POST create new section content
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = sectionContentSchema.parse(body);

    const content = await db.sectionContent.create({
      data: validatedData,
    });

    return NextResponse.json(content, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Données invalides", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error creating section content:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du contenu" },
      { status: 500 }
    );
  }
}

// PUT update section content by slug
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await request.json();
    const { slug, ...data } = body;

    if (!slug) {
      return NextResponse.json(
        { error: "Le slug est requis" },
        { status: 400 }
      );
    }

    const content = await db.sectionContent.upsert({
      where: { slug },
      update: data,
      create: { slug, ...data },
    });

    return NextResponse.json(content);
  } catch (error) {
    console.error("Error updating section content:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du contenu" },
      { status: 500 }
    );
  }
}
