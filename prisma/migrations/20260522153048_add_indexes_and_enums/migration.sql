-- CreateIndex
CREATE INDEX "AppointmentRequest_batchId_idx" ON "AppointmentRequest"("batchId");

-- CreateIndex
CREATE INDEX "AppointmentRequest_status_idx" ON "AppointmentRequest"("status");

-- CreateIndex
CREATE INDEX "AppointmentRequest_createdAt_idx" ON "AppointmentRequest"("createdAt");

-- CreateIndex
CREATE INDEX "CalendarException_year_idx" ON "CalendarException"("year");
