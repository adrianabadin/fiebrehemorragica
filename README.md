# Fiebre Hemorragica Turnos

## Setup

1. `npm install`
2. Copy `.env.example` to `.env`
3. `npm run prisma:generate`
4. `npm run prisma:migrate -- --name init`
5. `npm run calendar:sync -- 2026`
6. `npm run dev`

## Development

### Environment Variables

Required in `.env`:
- `DATABASE_URL` - PostgreSQL connection string
- `GOOGLE_SHEETS_SPREADSHEET_ID` - Google Sheets spreadsheet ID
- `RESEND_API_KEY` - Resend email API key
- `GOOGLE_PRIVATE_KEY` - Service account private key
- `GOOGLE_SERVICE_ACCOUNT_EMAIL` - Service account email

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run Prisma migrations
- `npm run calendar:sync -- <year>` - Sync national holidays and Chivilcoy exception for a year

## Architecture

### Request Flow

1. Client submits form → `POST /api/solicitar-turno`
2. API validates input, writes to Google Sheets (pendiente), stores in DB (pending)
3. When 10 pending requests accumulate, `reserveBatchIfReady()` atomically reserves them
4. `processBatch()` assigns Friday slots, updates Sheets, sends emails

### Key Files

- `src/lib/calendar/` - Scheduling rules and slot calculation
- `src/lib/queue/` - Batch reservation and processing
- `src/lib/sheets/` - Google Sheets integration
- `src/lib/email/` - Turn assignment email
- `src/app/api/solicitar-turno/` - Request intake endpoint