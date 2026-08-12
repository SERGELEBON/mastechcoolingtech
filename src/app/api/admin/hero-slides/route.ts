import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const heroSlideSchema = z.object({
  order: z.number().int().positive(),
  image: z.string().url(),
  icon: z.string().min(1),
  badge: z.string().min(1),
  title: z.string().min(1),
  titleAccent: z.string().min(1),
  description: z.string().min(1),
  tagline: z.string().min(1),
  active: z.boolean().optional().default(true),
});

// GET all hero slides
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const slides = await db.heroSlide.findMany({
      orderBy: { order: "asc" },
    });

    return NextResponse.json(slides);
  } catch (error) {
    console.error("Error fetching hero slides:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des slides" },
      { status: 500 }
    );
  }
}

// POST create new hero slide
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = heroSlideSchema.parse(body);

    const slide = await db.heroSlide.create({
      data: validatedData,
    });

    return NextResponse.json(slide, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Données invalides", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error creating hero slide:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du slide" },
      { status: 500 }
    );
  }
}