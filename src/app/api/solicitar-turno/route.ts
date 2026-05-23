import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { appointmentSchema } from "@/lib/validation/appointment-schema";
import { appendPendingRequestRow } from "@/lib/sheets/google-sheets";
import { prisma } from "@/lib/db/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parsed = appointmentSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Datos inválidos", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const requestId = randomUUID();
    const createdAtIso = new Date().toISOString();

    const [dbRequest, sheetsResult] = await Promise.all([
      prisma.appointmentRequest.create({
        data: {
          id: requestId,
          firstName: parsed.data.firstName,
          lastName: parsed.data.lastName,
          documentType: parsed.data.documentType,
          documentNumber: parsed.data.documentNumber,
          email: parsed.data.email,
          phone: parsed.data.phone,
          status: "pending",
          createdAt: new Date(createdAtIso),
        },
      }),
      appendPendingRequestRow({
        requestId,
        createdAtIso,
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
        documentType: parsed.data.documentType,
        documentNumber: parsed.data.documentNumber,
        email: parsed.data.email,
        phone: parsed.data.phone,
      }),
    ]);

    return NextResponse.json(
      { requestId: dbRequest.id, sheetRowNumber: sheetsResult.sheetRowNumber },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create appointment request:", error);
    return NextResponse.json(
      { error: "Error interno al procesar la solicitud" },
      { status: 500 }
    );
  }
}