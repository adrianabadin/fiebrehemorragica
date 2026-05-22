import { google } from "googleapis";

const sheets = google.sheets({ version: "v4" });

export type AppendRequestRowInput = {
  requestId: string;
  createdAtIso: string;
  name: string;
  email: string;
  phone: string;
  reason: string;
};

/**
 * Appends a new pending request row to the "Solicitudes" sheet.
 * Returns the row number where the data was written.
 */
export async function appendPendingRequestRow(input: AppendRequestRowInput) {
  if (!process.env.GOOGLE_SHEETS_SPREADSHEET_ID) {
    throw new Error("GOOGLE_SHEETS_SPREADSHEET_ID environment variable is not set");
  }

  try {
    const values = [
      [
        input.requestId,
        input.createdAtIso,
        input.name,
        input.email,
        input.phone,
        input.reason,
        "pendiente",
        "",
        "",
        "",
        "",
        "",
      ],
    ];

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range: "Solicitudes!A:L",
      valueInputOption: "RAW",
      requestBody: { values },
    });

    const updatedRange = response.data.updates?.updatedRange ?? "Solicitudes!A1:L1";
    const match = updatedRange.match(/!(?:[A-Z]+)(\d+):/);
    if (!match) {
      throw new Error(`Could not parse row number from range: ${updatedRange}`);
    }
    const rowNumber = Number(match[1]);

    return { sheetRowNumber: rowNumber };
  } catch (error) {
    throw new Error(`Failed to append pending request row: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export type UpdateAssignedTurnRowInput = {
  sheetRowNumber: number;
  scheduledDate: string;
  scheduledTime: string;
};

/**
 * Updates an existing row with assigned turn data (date, time, address, site, campaign, status).
 * Updates columns H-M of the specified row.
 */
export async function updateAssignedTurnRow(input: UpdateAssignedTurnRowInput) {
  if (!process.env.GOOGLE_SHEETS_SPREADSHEET_ID) {
    throw new Error("GOOGLE_SHEETS_SPREADSHEET_ID environment variable is not set");
  }

  try {
    const range = `Solicitudes!H${input.sheetRowNumber}:M${input.sheetRowNumber}`;

    await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range,
      valueInputOption: "RAW",
      requestBody: {
        values: [[
          input.scheduledDate,
          input.scheduledTime,
          "Hijas de San Jose 145",
          "Region Sanitaria X",
          "Vacunacion de fiebre hemorragica",
          "turno asignado",
        ]],
      },
    });
  } catch (error) {
    throw new Error(`Failed to update assigned turn row: ${error instanceof Error ? error.message : String(error)}`);
  }
}