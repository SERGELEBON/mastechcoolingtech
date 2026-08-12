import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const contactInfoSchema = z.object({
  phone: z.string().min(1),
  email: z.string().email(),
  address: z.string().min(1),
  addressLink: z.string().url(),
  poBox: z.string().optional(),
  hours: z.string().min(1),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
});

// GET contact info (single record)
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const contactInfo = await db.contactInfo.findFirst();

    return NextResponse.json(contactInfo);
  } catch (error) {
    console.error("Error fetching contact info:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des informations" },
      { status: 500 }
    );
  }
}

// PUT update contact info
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = contactInfoSchema.parse(body);

    // Get existing record or create new one
    const existing = await db.contactInfo.findFirst();

    let contactInfo;
    if (existing) {
      contactInfo = await db.contactInfo.update({
        where: { id: existing.id },
        data: validatedData,
      });
    } else {
      contactInfo = await db.contactInfo.create({
        data: validatedData,
      });
    }

    return NextResponse.json(contactInfo);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Données invalides", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error updating contact info:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour des informations" },
      { status: 500 }
    );
  }
}
