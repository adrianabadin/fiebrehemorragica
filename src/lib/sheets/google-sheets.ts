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

export async function appendPendingRequestRow(input: AppendRequestRowInput) {
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
    spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID!,
    range: "Solicitudes!A:L",
    valueInputOption: "RAW",
    requestBody: { values },
  });

  const updatedRange = response.data.updates?.updatedRange ?? "Solicitudes!A1:L1";
  const rowNumber = Number(updatedRange.match(/!(?:[A-Z]+)(\d+):/)?.[1] ?? "1");

  return { sheetRowNumber: rowNumber };
}

export type UpdateAssignedTurnRowInput = {
  sheetRowNumber: number;
  scheduledDate: string;
  scheduledTime: string;
};

export async function updateAssignedTurnRow(input: UpdateAssignedTurnRowInput) {
  const range = `Solicitudes!H${input.sheetRowNumber}:M${input.sheetRowNumber}`;
  
  await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID!,
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
}