import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const testimonialSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  location: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  text: z.string().min(1),
  initials: z.string().min(1).max(3),
  color: z.string().min(1),
  order: z.number().int().positive(),
  active: z.boolean().optional().default(true),
});

// GET all testimonials
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const testimonials = await db.testimonial.findMany({
      orderBy: { order: "asc" },
    });

    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des témoignages" },
      { status: 500 }
    );
  }
}

// POST create new testimonial
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = testimonialSchema.parse(body);

    const testimonial = await db.testimonial.create({
      data: validatedData,
    });

    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Données invalides", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error creating testimonial:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du témoignage" },
      { status: 500 }
    );
  }
}
