import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const mediaSchema = z.object({
  filename: z.string().min(1),
  url: z.string().url(),
  type: z.enum(["image", "video"]),
  category: z.string().optional(),
  size: z.number().int().positive(),
  mimeType: z.string().min(1),
  alt: z.string().optional(),
});

// GET all media files
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const type = searchParams.get("type");

    const where: any = {};
    if (category) where.category = category;
    if (type) where.type = type;

    const media = await db.media.findMany({
      where,
      orderBy: { uploadedAt: "desc" },
    });

    return NextResponse.json(media);
  } catch (error) {
    console.error("Error fetching media:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des médias" },
      { status: 500 }
    );
  }
}

// POST create new media record
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = mediaSchema.parse(body);

    const media = await db.media.create({
      data: validatedData,
    });

    return NextResponse.json(media, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Données invalides", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error creating media:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du média" },
      { status: 500 }
    );
  }
}
