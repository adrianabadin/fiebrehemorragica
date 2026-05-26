import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { appointmentSchema } from "@/lib/validation/appointment-schema";
import { appendPendingRequestRow } from "@/lib/sheets/google-sheets";
import { prisma } from "@/lib/db/prisma";
import { reserveBatchIfReady } from "@/lib/queue/request-queue";
import { processBatch } from "@/lib/queue/batch-processor";

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
    console.log(`[ROUTE] New appointment request: id=${requestId} email=${parsed.data.email}`);

    const dbRequest = await prisma.appointmentRequest.create({
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
    });

    const sheetsResult = await appendPendingRequestRow({
      requestId,
      createdAtIso,
      firstName: parsed.data.firstName,
      lastName: parsed.data.lastName,
      documentType: parsed.data.documentType,
      documentNumber: parsed.data.documentNumber,
      email: parsed.data.email,
      phone: parsed.data.phone,
    });

    await prisma.appointmentRequest.update({
      where: { id: dbRequest.id },
      data: { sheetRowNumber: sheetsResult.sheetRowNumber },
    });
    console.log(`[ROUTE] Saved sheetRowNumber=${sheetsResult.sheetRowNumber} for request ${requestId}`);

    const batchResult = await reserveBatchIfReady();
    if (batchResult) {
      console.log(`[ROUTE] Batch ${batchResult.batch.id} reserved, firing processBatch`);
      processBatch(batchResult.batch).catch((err) => {
        console.error(`[ROUTE] Batch processing failed for batch ${batchResult.batch.id}:`, err);
      });
    }

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