import { google } from "googleapis";

const SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";

export function createSheetsAuth() {
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_EMAIL environment variable is not set");
  }

  if (!process.env.GOOGLE_PRIVATE_KEY) {
    throw new Error("GOOGLE_PRIVATE_KEY environment variable is not set");
  }

  return new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY,
    scopes: [SHEETS_SCOPE],
  });
}

function getSheetsClient() {
  return google.sheets({ version: "v4", auth: createSheetsAuth() });
}

export type AppendRequestRowInput = {
  requestId: string;
  createdAtIso: string;
  firstName: string;
  lastName: string;
  documentType: string;
  documentNumber: string;
  email: string;
  phone: string;
};

export function buildPendingRequestRowValues(input: AppendRequestRowInput) {
  return [
    input.requestId,
    input.createdAtIso,
    input.firstName,
    input.lastName,
    input.documentType,
    input.documentNumber,
    input.email,
    input.phone,
    "pendiente",
    "",
    "",
    "",
    "",
    "",
    "",
  ];
}

export type UpdateAssignedTurnRowInput = {
  scheduledDate: string;
  scheduledTime: string;
};

export function buildAssignedTurnRowValues(input: UpdateAssignedTurnRowInput) {
  return [
    input.scheduledDate,
    input.scheduledTime,
    "Hijas de San Jose 145",
    "Region Sanitaria X",
    "Vacunacion de fiebre hemorragica",
    "turno asignado",
  ];
}

/**
 * Appends a new pending request row to the "Solicitudes" sheet.
 * Returns the row number where the data was written.
 */
export async function appendPendingRequestRow(input: AppendRequestRowInput) {
  if (!process.env.GOOGLE_SHEETS_SPREADSHEET_ID) {
    throw new Error("GOOGLE_SHEETS_SPREADSHEET_ID environment variable is not set");
  }

  try {
    const sheets = getSheetsClient();

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range: "Solicitudes!A:O",
      valueInputOption: "RAW",
      requestBody: { values: [buildPendingRequestRowValues(input)] },
    });

    const updatedRange = response.data.updates?.updatedRange ?? "Solicitudes!A1:O1";
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

/**
 * Updates an existing row with assigned turn data (date, time, address, site, campaign, status).
 * Updates columns J-O of the specified row.
 */
export async function updateAssignedTurnRow(input: UpdateAssignedTurnRowInput & { sheetRowNumber: number }) {
  if (!process.env.GOOGLE_SHEETS_SPREADSHEET_ID) {
    throw new Error("GOOGLE_SHEETS_SPREADSHEET_ID environment variable is not set");
  }

  try {
    const sheets = getSheetsClient();
    const range = `Solicitudes!J${input.sheetRowNumber}:O${input.sheetRowNumber}`;

    await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range,
      valueInputOption: "RAW",
      requestBody: {
        values: [buildAssignedTurnRowValues(input)],
      },
    });
  } catch (error) {
    throw new Error(`Failed to update assigned turn row: ${error instanceof Error ? error.message : String(error)}`);
  }
}