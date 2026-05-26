import { chromium } from "playwright";

const BASE_URL = "http://localhost:3000";

const TEST_USERS = Array.from({ length: 11 }, (_, i) => ({
  firstName: `TestNombre${i + 1}`,
  lastName: `TestApellido${i + 1}`,
  documentType: "DNI",
  documentNumber: `2000000${String(i + 1).padStart(2, "0")}`,
  email: `testturno${i + 1}@mailsac.com`,
  phone: `11444400${String(i + 1).padStart(2, "0")}`,
}));

async function submitRequest(
  page: Awaited<ReturnType<typeof chromium.launch>>["contexts"][0]["pages"][0],
  user: (typeof TEST_USERS)[0],
  index: number
) {
  console.log(`\n[SCRIPT] --- Submitting request ${index + 1}/11: ${user.email} ---`);

  await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });

  await page.fill('[name="firstName"]', user.firstName);
  await page.fill('[name="lastName"]', user.lastName);
  await page.selectOption('[name="documentType"]', user.documentType);
  await page.fill('[name="documentNumber"]', user.documentNumber);
  await page.fill('[name="email"]', user.email);
  await page.fill('[name="phone"]', user.phone);

  const [response] = await Promise.all([
    page.waitForResponse((r) => r.url().includes("/api/solicitar-turno") && r.request().method() === "POST"),
    page.click('[type="submit"]'),
  ]);

  const status = response.status();
  const body = await response.json().catch(() => ({}));

  if (status === 201) {
    console.log(`[SCRIPT] ✓ Request ${index + 1} accepted — requestId=${body.requestId} sheetRow=${body.sheetRowNumber}`);
  } else {
    console.error(`[SCRIPT] ✗ Request ${index + 1} FAILED — HTTP ${status}:`, JSON.stringify(body));
  }

  return status === 201;
}

async function main() {
  console.log(`[SCRIPT] Starting flow test — sending 11 requests to ${BASE_URL}`);
  console.log("[SCRIPT] Emails will go to @mailsac.com (public inbox, check https://mailsac.com/inbox/<email>)");

  const browser = await chromium.launch({ headless: false, slowMo: 50 });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Capture server console logs forwarded via network responses aren't visible here,
  // but we print API response status for each request.

  let successCount = 0;

  for (let i = 0; i < TEST_USERS.length; i++) {
    const ok = await submitRequest(page, TEST_USERS[i]!, i);
    if (ok) successCount++;

    // Small delay between requests to let the server breathe
    if (i < TEST_USERS.length - 1) {
      await page.waitForTimeout(300);
    }
  }

  console.log(`\n[SCRIPT] === Summary ===`);
  console.log(`[SCRIPT] ${successCount}/11 requests succeeded`);

  if (successCount >= 10) {
    console.log("[SCRIPT] Batch of 10 should have triggered. Waiting 8s for batch processing + emails...");
    await page.waitForTimeout(8000);
    console.log("[SCRIPT] Done waiting. Check server logs for [BATCH] and [EMAIL] entries.");
    console.log("[SCRIPT] Check email inboxes at: https://mailsac.com/inbox/testturno1@mailsac.com");
  } else {
    console.error("[SCRIPT] Not enough requests succeeded to trigger a batch.");
  }

  await browser.close();
}

main().catch((err) => {
  console.error("[SCRIPT] Fatal error:", err);
  process.exit(1);
});
