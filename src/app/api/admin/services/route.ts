import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const serviceSchema = z.object({
  id: z.string().min(1),
  icon: z.string().min(1),
  image: z.string().url(),
  title: z.string().min(1),
  subtitle: z.string().min(1),
  heroDescription: z.string().min(1),
  color: z.string().min(1),
  longDescription: z.string().min(1),
  order: z.number().int().positive(),
  active: z.boolean().optional().default(true),
  benefits: z.array(z.object({
    title: z.string(),
    description: z.string(),
    order: z.number().int(),
  })).optional().default([]),
  process: z.array(z.object({
    step: z.number().int(),
    title: z.string(),
    description: z.string(),
  })).optional().default([]),
  features: z.array(z.object({
    text: z.string(),
    order: z.number().int(),
  })).optional().default([]),
  faqs: z.array(z.object({
    question: z.string(),
    answer: z.string(),
    order: z.number().int(),
  })).optional().default([]),
});

// GET all services
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const services = await db.service.findMany({
      include: {
        benefits: { orderBy: { order: "asc" } },
        process: { orderBy: { step: "asc" } },
        features: { orderBy: { order: "asc" } },
        faqs: { orderBy: { order: "asc" } },
      },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des services" },
      { status: 500 }
    );
  }
}

// POST create new service
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = serviceSchema.parse(body);

    const { benefits, process, features, faqs, ...serviceData } = validatedData;

    const service = await db.service.create({
      data: {
        ...serviceData,
        benefits: {
          create: benefits,
        },
        process: {
          create: process,
        },
        features: {
          create: features,
        },
        faqs: {
          create: faqs,
        },
      },
      include: {
        benefits: true,
        process: true,
        features: true,
        faqs: true,
      },
    });

    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Données invalides", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error creating service:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du service" },
      { status: 500 }
    );
  }
}
