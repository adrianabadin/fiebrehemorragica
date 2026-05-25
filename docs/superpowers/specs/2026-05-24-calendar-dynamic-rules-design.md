# Reglas Dinámicas de Calendario y Reprogramación

## Objetivo
Permitir a los administradores definir reglas de agenda (días, horarios y cupos) con fechas de vigencia. Mantener agenda hardcodeada como fallback. Cancelar días específicos o cambiar reglas dispara reprogramación automática al próximo día disponible según la regla vigente.

## Decisiones Aprobadas
- **Opción B (Historial de reglas)**: Se usa tabla `ScheduleRule` con campo `validFrom`. Permite programar reglas a futuro.
- **Día único semanal**: La regla define 1 solo día de la semana para vacunación.
- **Distribución equitativa**: La duración del turno se calcula dinámicamente `(endTime - startTime) / slotCount`.
- **Fallback**: Si no hay reglas, el sistema usa viernes 8:30 hs (10 min por turno, max 20).
- **Reprogramación automática**: Al cancelar un día o cambiar la regla global, los turnos a futuro afectados se reprograman al próximo día disponible según la regla vigente, notificando por email.

## Modelo de Datos

### Nueva Tabla `ScheduleRule`
```prisma
model ScheduleRule {
  id          String   @id @default(cuid())
  validFrom   DateTime // A partir de cuándo aplica
  dayOfWeek   Int      // 1=Lunes ... 5=Viernes
  startTime   String   // "HH:mm" (ej: "09:00")
  endTime     String   // "HH:mm" (ej: "14:00")
  slotCount   Int      // Máximo de turnos (ej: 20)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## Lógica Core

### 1. Obtener Regla Vigente (`getActiveRule`)
- Busca regla en `ScheduleRule` donde `validFrom <= fecha_evaluada`, ordenada por `validFrom` DESC (la más reciente).
- Si no encuentra, retorna objeto fallback: `{ dayOfWeek: 5, startTime: "08:30", endTime: "11:50", slotCount: 20 }`.

### 2. Cálculo de Duración de Turno
- Minutos totales = `(horaFin - horaInicio)`.
- Duración por slot = `Minutos totales / slotCount`.
- El slot N arranca en `startTime + (N-1) * duración`.

### 3. Búsqueda de Próximo Día Disponible (`findNextAvailableDay`)
- Recibe fecha inicio. Obtiene regla vigente para esa fecha.
- Itera buscando el próximo `dayOfWeek` de la regla.
- Verifica que la fecha no esté en `CalendarException`.
- Cuenta turnos existentes en ese día. Si `< slotCount`, retorna la fecha.

## Endpoints (Admin)

### `POST /api/admin/schedule-rules`
- Body: `{ validFrom, dayOfWeek, startTime, endTime, slotCount }`
- Inserta regla en DB.
- **Trigger**: Busca turnos a futuro (`scheduledAt >= validFrom`) cuyo día de la semana ya no coincida con la nueva regla.
- Para cada turno afectado:
  1. Llama a `findNextAvailableDay(validFrom)`.
  2. Actualiza `scheduledAt` y recalcula hora.
  3. Envía email de reprogramación.

### `DELETE /api/admin/calendar/day` (Modificación)
- Cancela un día puntual. Agrega `CalendarException`.
- Busca turnos de ese día.
- Para cada uno, busca próximo día disponible con regla activa.
- Reasigna y envía mail.

## Criterios de Aceptación
- Sistema asigna turnos nuevos leyendo `ScheduleRule` activa.
- Cupo y horario se calculan on the fly.
- Fallback a viernes hardcodeado funciona si BD está vacía de reglas.
- Cargar regla a futuro reprograma los turnos desfasados.
- Suspender un día reprograma los turnos de ese día.
- Emails de reprogramación salen con nueva fecha y hora exactas.