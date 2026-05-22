# Diseno: Turnos de Vacunacion Fiebre Hemorragica

## Objetivo

Construir en `./fiebrehemorragica/` una aplicacion web con Next.js que reciba solicitudes de turnos, las procese en lotes exactos de 10, escriba cada solicitud inmediatamente en Google Sheets, y asigne turnos para vacunacion de fiebre hemorragica cuando cierre cada lote.

## Decisiones Aprobadas

1. La aplicacion vive completa dentro de `./fiebrehemorragica/`.
2. El stack base es `Next.js + TypeScript + Prisma + SQLite`.
3. El entorno es `single instance`, por lo que la concurrencia se resuelve con un lock en proceso y transacciones SQLite.
4. Cada solicitud se escribe en Google Sheets al momento de recibirse.
5. Los emails se envian solo cuando se completa el lote exacto de 10.
6. La fila de Google Sheets no se duplica: se crea una vez y luego se actualiza con el turno asignado.
7. Los turnos se asignan solo los viernes, desde `08:30`, cada `10 minutos`, con `20` turnos maximos por viernes.
8. Al completar `20/20` turnos de un viernes, el sistema pasa al siguiente viernes habil.
9. Se excluyen de la agenda los viernes feriado nacional y el `22 de octubre` por Chivilcoy.
10. Las excepciones de calendario se cargan una vez por anio en una tabla local para evitar errores de calculo en runtime.

## Flujo de Negocio

### Recepcion de Solicitudes

1. El usuario completa `Nombre`, `Email`, `Telefono` y `Motivo`.
2. El backend valida los datos.
3. La solicitud se guarda en SQLite con estado `pending`.
4. La solicitud se escribe de inmediato en Google Sheets con estado `pendiente` y sin turno asignado.
5. Si aun no se reunieron 10 solicitudes pendientes, la respuesta solo confirma recepcion.

### Cierre de Batch

1. Cuando ingresa la solicitud numero 10 pendiente, el sistema toma exactamente las 10 mas antiguas sin procesar.
2. El sistema crea un `batch` y marca esas 10 solicitudes como `processing`.
3. El scheduler calcula los 10 turnos correlativos disponibles.
4. Se actualizan las 10 filas correspondientes en Google Sheets con fecha, hora, direccion y estado final.
5. Se envian 10 emails, uno por solicitud.
6. Las 10 solicitudes quedan marcadas como `completed`.

## Reglas de Agenda

### Slots

- Dia de atencion: `viernes`
- Hora de inicio: `08:30`
- Duracion por slot: `10 minutos`
- Capacidad por viernes: `20`

Distribucion:

- Slots `1..10`: `08:30` a `10:00`
- Slots `11..20`: `10:10` a `11:40`

### Fechas Bloqueadas

No se asignan turnos si el viernes candidato coincide con:

1. Un feriado nacional cargado desde `argentina.gob.ar`.
2. El `22/10/<anio>` como excepcion local para Chivilcoy.
3. Cualquier override manual agregado por operacion.

### Resolucion de Fecha

1. Se calcula el proximo bloque de 10 turnos a partir de la cantidad total de turnos ya asignados.
2. Se obtiene el viernes candidato segun capacidad acumulada de `20` por viernes.
3. Si la fecha esta bloqueada, se avanza al siguiente viernes y se recalcula el mismo bloque.
4. Se asignan los 10 slots del bloque al viernes habil encontrado.

## Estructura Propuesta

```text
fiebrehemorragica/
  src/
    app/
      api/
        requests/
          route.ts
      globals.css
      layout.tsx
      page.tsx
    components/
      forms/
        appointment-form.tsx
      ui/
        button.tsx
        card.tsx
        input.tsx
        textarea.tsx
        status-message.tsx
    lib/
      calendar/
        calendar.ts
        schedule.ts
      db/
        prisma.ts
      email/
        send-turno-email.ts
        turno-email-template.ts
      queue/
        batch-processor.ts
        request-queue.ts
      sheets/
        google-sheets.ts
      validation/
        appointment-schema.ts
      mutex.ts
    types/
      appointment.ts
  prisma/
    schema.prisma
  scripts/
    sync-calendar-exceptions.ts
  docs/
    plans/
  .env.example
  package.json
```

## Modelo de Datos

### `appointment_requests`

- `id`
- `name`
- `email`
- `phone`
- `reason`
- `status` (`pending | processing | completed | failed`)
- `batchId`
- `scheduledAt`
- `slotNumber`
- `sheetRowNumber`
- `createdAt`
- `updatedAt`

### `batches`

- `id`
- `status` (`processing | completed | failed`)
- `createdAt`
- `processedAt`

### `calendar_exceptions`

- `id`
- `date`
- `type` (`national | local-chivilcoy | manual`)
- `label`
- `sourceUrl`
- `year`
- `createdAt`

## Concurrencia

Como la app corre en una sola instancia, el punto critico se protege con un lock en proceso:

1. Insertar solicitud.
2. Detectar si ahora hay 10 pendientes.
3. Reservar exactamente esas 10 solicitudes.
4. Crear el batch.

El envio de emails y la actualizacion de Google Sheets ocurren fuera del lock para no bloquear nuevas solicitudes.

## Google Sheets

### Escritura Inicial

Cada solicitud crea una fila con:

- `requestId`
- `createdAt`
- `name`
- `email`
- `phone`
- `reason`
- `status = pendiente`
- `scheduledDate = ""`
- `scheduledTime = ""`
- `address = ""`

### Actualizacion al Asignar Turno

La misma fila se actualiza con:

- `scheduledDate`
- `scheduledTime`
- `address = Hijas de San Jose 145`
- `site = Region Sanitaria X`
- `campaign = Vacunacion de fiebre hemorragica`
- `status = turno asignado`

## Email

El email debe comunicar explicitamente:

- que se le ha asignado un turno para vacunacion de fiebre hemorragica
- fecha
- hora
- direccion `Hijas de San Jose 145`
- sede `Region Sanitaria X`

## UI/UX

La interfaz publica tendra una sola pantalla con formulario y feedback de estado.

Se respetan estrictamente estos tokens:

```css
:root {
  --primary: #00A4E4;
  --secondary: #00558C;
  --accent: #D92378;
  --success: #28A745;
  --background: #F8F9FA;
  --surface: #FFFFFF;
  --border: #E9ECEF;
  --text-main: #333333;
  --text-muted: #6C757D;
  --radius-md: 4px;
  --spacing-card: 24px;
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.05);
}
```

Tipografia:

- `H1`: Montserrat 700 40px
- `H2`: Montserrat 600 32px
- `H3`: Montserrat 500 20px
- `Body`: Roboto 400 16px
- `Small`: Roboto 400 14px

Reglas aplicadas:

1. Labels visibles en todos los campos.
2. Boton con loading y estado disabled durante submit.
3. Focus visible y accesible.
4. Layout mobile-first sin scroll horizontal.
5. Contenedor maximo `1140px` y gutter `24px`.

## Riesgos y Mitigaciones

1. Reintento parcial de batch: el batch guarda estado y permite reintento controlado.
2. Fallo de Google Sheets: la solicitud queda persistida localmente y se puede reintentar sync.
3. Feriados trasladables: se resuelven una vez por anio y se persisten en base local.
4. Dobles asignaciones: se evitan con lock en proceso y reserva previa de las 10 solicitudes.

## Fuentes Operativas

1. Feriados nacionales: `https://www.argentina.gob.ar/jefatura/feriados-nacionales-<anio>`
2. Excepcion local fija: `22 de octubre` para Chivilcoy

## No Alcances de la Primera Version

1. Panel administrativo.
2. Reprogramacion manual de turnos.
3. Multi-sede o multiples campañas.
4. Multi-instancia o despliegue serverless.
