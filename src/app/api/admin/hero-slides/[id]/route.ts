import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const heroSlideUpdateSchema = z.object({
  order: z.number().int().positive().optional(),
  image: z.string().url().optional(),
  icon: z.string().min(1).optional(),
  badge: z.string().min(1).optional(),
  title: z.string().min(1).optional(),
  titleAccent: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  tagline: z.string().min(1).optional(),
  active: z.boolean().optional(),
});

// GET single hero slide
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { id } = await params;
    const slide = await db.heroSlide.findUnique({
      where: { id },
    });

    if (!slide) {
      return NextResponse.json(
        { error: "Slide non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json(slide);
  } catch (error) {
    console.error("Error fetching hero slide:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération du slide" },
      { status: 500 }
    );
  }
}

// PUT update hero slide
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const validatedData = heroSlideUpdateSchema.parse(body);

    const slide = await db.heroSlide.update({
      where: { id },
      data: validatedData,
    });

    return NextResponse.json(slide);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Données invalides", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error updating hero slide:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du slide" },
      { status: 500 }
    );
  }
}

// DELETE hero slide
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { id } = await params;
    await db.heroSlide.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting hero slide:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression du slide" },
      { status: 500 }
    );
  }
}
