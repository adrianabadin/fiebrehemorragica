# Autenticación y gestión de calendario

## Objetivo

Agregar autenticación con usuario/contraseña, registro bootstrap para admin, y permitir que usuarios autenticados con rol admin bloqueen o eliminen días del calendario. Al eliminar un día con turnos asignados, se reprograman automáticamente al próximo viernes con lugar disponible y se envía un mail de aviso al paciente.

## Decisiones aprobadas

- Primer registro es libre y recibe rol `admin`. Los siguientes requieren admin autenticado.
- Sesiones vía JWT en cookie httpOnly firmado con HS256 (`jose`).
- Hashing de contraseñas con `argon2`.
- Verificación de auth mediante helper compartido (`getAuthUser`), sin middleware Edge.
- Reprogramación busca próximo viernes con slots libres (no simplemente el próximo viernes).
- Mail de reprogramación usa template nuevo dedicado, no el de turno original.
- Roles: `admin` y `user`. String plano en Prisma, no enum.

## Modelo de datos

### Modelo `User` (nuevo)

```prisma
model User {
  id           String   @id @default(cuid())
  username     String   @unique
  passwordHash String
  role         String   @default("admin")
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

No se modifican los modelos existentes (`AppointmentRequest`, `Batch`, `CalendarException`).

## Auth

### `POST /api/auth/register`

- Body: `{ username: string, password: string }`
- Validación Zod: `username` string trim 3-50, `password` string min 8.
- Si la tabla `User` tiene 0 registros: crea usuario con `role: "admin"`.
- Si ya hay usuarios: requiere cookie JWT válida con `role === "admin"`. Si no, 403.
- Hashea password con argon2.
- Devuelve `{ userId, username, role }`.

### `POST /api/auth/login`

- Body: `{ username: string, password: string }`
- Verifica credenciales contra argon2.
- Genera JWT `{ userId, role }` firmado con `HS256` y `JWT_SECRET` de env.
- Setea cookie: nombre `token`, `httpOnly`, `secure` en producción, `sameSite=strict`, `path=/api`, `maxAge=8h`.
- Devuelve `{ userId, username, role }`.

### Helper: `getAuthUser(request)`

Archivo: `src/lib/auth/get-auth-user.ts`.

1. Lee cookie `token` del request.
2. Verifica JWT con `jose`.
3. Devuelve `{ userId: string, role: string }` o lanza `AuthError` (401).

Cada endpoint protegido llama a esta función al inicio.

## Gestión de calendario

### `POST /api/admin/calendar/block`

Requiere `role === "admin"`.

- Body: `{ date: string }` (ISO date `YYYY-MM-DD`).
- Valida con Zod.
- Crea `CalendarException` con `type: "blocked"`, `label: "Bloqueado por administrador"`, `sourceUrl: "manual"`, `year` extraído de la fecha.
- Si la fecha ya existe como excepción: 409.
- No afecta turnos ya asignados — solo previene futuras asignaciones.
- Devuelve `{ date, type }`.

### `DELETE /api/admin/calendar/day`

Requiere `role === "admin"`.

- Body: `{ date: string }` (ISO date `YYYY-MM-DD`).
- Valida con Zod.
- Busca `AppointmentRequest` con `scheduledAt` en esa fecha y status asignado.
- Si hay turnos:
  1. Calcula próximo viernes con lugar libre vía `findNextAvailableFriday()`.
  2. Reasigna `scheduledAt` y `slotNumber` de cada turno.
  3. Envía mail de reprogramación a cada paciente.
- Crea `CalendarException` con `type: "cancelled"`.
- Devuelve `{ rescheduledCount, newDate }`.

### Lógica de reprogramación

Función nueva `findNextAvailableFriday(afterDate, blockedDates)` en `src/lib/calendar/calendar.ts`:

- Itera viernes a viernes desde `afterDate`.
- Para cada viernes, cuenta turnos asignados (`AppointmentRequest` con `scheduledAt` en esa fecha).
- Primer viernes con `turnos < 20` (MAX_SLOTS_PER_FRIDAY) y no bloqueado es el elegido.
- Safety limit: 52 iteraciones (1 año).

Función nueva `reassignAppointmentsForDate(date)` en `src/lib/calendar/reschedule.ts`:

- Orquesta la búsqueda de fecha, reasignación de turnos y envío de mails.
- Usa `prisma` para actualizar `scheduledAt` y `slotNumber`.
- Envía mail por cada turno reasignado.

## Email de reprogramación

### Template

Archivo: `src/lib/email/reschedule-email-template.ts`.

```typescript
export function buildRescheduleEmail(input: {
  fullName: string;
  oldDate: string;
  newDate: string;
  newTime: string;
})
```

- Subject: `"Su turno ha sido reprogramado"`.
- Body: nombre, fecha original, fecha nueva, hora nueva, dirección y sede.

### Envío

Archivo: `src/lib/email/send-reschedule-email.ts`.

- Usa Resend, mismo patrón que `send-turno-email.ts`.

## Estructura de archivos nuevos

```
src/lib/auth/
  get-auth-user.ts
  password.ts

src/lib/email/
  reschedule-email-template.ts
  send-reschedule-email.ts

src/lib/calendar/
  reschedule.ts

src/app/api/auth/
  register/route.ts
  login/route.ts

src/app/api/admin/calendar/
  block/route.ts
  day/route.ts
```

## Variables de entorno nuevas

- `JWT_SECRET` — clave HS256 para JWT.

## Error handling

| Caso | Código | Body |
|------|--------|------|
| Sin cookie o token inválido | 401 | `{ error: "No autenticado" }` |
| Token válido pero role != admin | 403 | `{ error: "Sin permisos" }` |
| Validación Zod falla | 400 | `{ error: mensaje Zod }` |
| Fecha ya bloqueada | 409 | `{ error: "Fecha ya bloqueada" }` |
| No hay viernes disponible en 52 intentos | 422 | `{ error: "No hay fecha disponible" }` |
| Error inesperado | 500 | `{ error: "Error interno" }` |

## Pruebas

- `src/lib/auth/password.test.ts` — hash y verify de contraseñas.
- `src/lib/auth/get-auth-user.test.ts` — token válido, expirado, sin cookie, role incorrecto.
- `src/lib/calendar/reschedule.test.ts` — reasignación con slots libres, sin slots, día sin turnos.
- `src/lib/email/reschedule-email-template.test.ts` — contenido del template.
- Tests de integración para los 4 endpoints nuevos (register, login, block, delete day).

## Dependencias nuevas

- `argon2` — hashing de contraseñas.
- `jose` — verificación y firma de JWT (pure JS).

## Criterios de aceptación

- El primer registro crea un admin sin auth previa.
- Los registros subsiguientes requieren admin autenticado.
- Login devuelve cookie httpOnly con JWT.
- Endpoints admin rechazan sin cookie (401) o sin rol admin (403).
- Bloquear un día previene futuras asignaciones sin afectar turnos existentes.
- Eliminar un día reprograma todos los turnos al próximo viernes con lugar.
- Cada turno reprogramado recibe un mail con fecha vieja, fecha nueva y hora nueva.
- `npm run build` pasa sin errores.

## Plan de implementación esperado

1. Instalar dependencias (`argon2`, `jose`).
2. Agregar modelo `User` en Prisma y migrar.
3. Implementar `password.ts` (hash/verify).
4. Implementar `get-auth-user.ts` (JWT helper).
5. Implementar `register/route.ts` con lógica bootstrap.
6. Implementar `login/route.ts`.
7. Implementar `findNextAvailableFriday()` en calendar.
8. Implementar `reschedule.ts`.
9. Implementar template y envío de mail de reprogramación.
10. Implementar `block/route.ts`.
11. Implementar `day/route.ts` (DELETE).
12. Escribir pruebas.
13. Verificar build.
