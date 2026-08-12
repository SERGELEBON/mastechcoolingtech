import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const serviceUpdateSchema = z.object({
  icon: z.string().min(1).optional(),
  image: z.string().url().optional(),
  title: z.string().min(1).optional(),
  subtitle: z.string().min(1).optional(),
  heroDescription: z.string().min(1).optional(),
  color: z.string().min(1).optional(),
  longDescription: z.string().min(1).optional(),
  order: z.number().int().positive().optional(),
  active: z.boolean().optional(),
  benefits: z.array(z.object({
    id: z.string().optional(),
    title: z.string(),
    description: z.string(),
    order: z.number().int(),
  })).optional(),
  process: z.array(z.object({
    id: z.string().optional(),
    step: z.number().int(),
    title: z.string(),
    description: z.string(),
  })).optional(),
  features: z.array(z.object({
    id: z.string().optional(),
    text: z.string(),
    order: z.number().int(),
  })).optional(),
  faqs: z.array(z.object({
    id: z.string().optional(),
    question: z.string(),
    answer: z.string(),
    order: z.number().int(),
  })).optional(),
});

// GET single service
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
    const service = await db.service.findUnique({
      where: { id },
      include: {
        benefits: { orderBy: { order: "asc" } },
        process: { orderBy: { step: "asc" } },
        features: { orderBy: { order: "asc" } },
        faqs: { orderBy: { order: "asc" } },
      },
    });

    if (!service) {
      return NextResponse.json(
        { error: "Service non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json(service);
  } catch (error) {
    console.error("Error fetching service:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération du service" },
      { status: 500 }
    );
  }
}

// PUT update service
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
    const validatedData = serviceUpdateSchema.parse(body);

    const { benefits, process, features, faqs, ...serviceData } = validatedData;

    // Update main service data
    const service = await db.service.update({
      where: { id },
      data: serviceData,
    });

    // Update related data if provided
    if (benefits) {
      await db.serviceBenefit.deleteMany({ where: { serviceId: id } });
      await db.serviceBenefit.createMany({
        data: benefits.map((b) => ({ ...b, serviceId: id })),
      });
    }

    if (process) {
      await db.serviceProcess.deleteMany({ where: { serviceId: id } });
      await db.serviceProcess.createMany({
        data: process.map((p) => ({ ...p, serviceId: id })),
      });
    }

    if (features) {
      await db.serviceFeature.deleteMany({ where: { serviceId: id } });
      await db.serviceFeature.createMany({
        data: features.map((f) => ({ ...f, serviceId: id })),
      });
    }

    if (faqs) {
      await db.serviceFAQ.deleteMany({ where: { serviceId: id } });
      await db.serviceFAQ.createMany({
        data: faqs.map((f) => ({ ...f, serviceId: id })),
      });
    }

    // Fetch updated service
    const updatedService = await db.service.findUnique({
      where: { id },
      include: {
        benefits: { orderBy: { order: "asc" } },
        process: { orderBy: { step: "asc" } },
        features: { orderBy: { order: "asc" } },
        faqs: { orderBy: { order: "asc" } },
      },
    });

    return NextResponse.json(updatedService);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Données invalides", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error updating service:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du service" },
      { status: 500 }
    );
  }
}

// DELETE service
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
    await db.service.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting service:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression du service" },
      { status: 500 }
    );
  }
}
