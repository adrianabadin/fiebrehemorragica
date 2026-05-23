# Turnos: Nombre, Apellido y Documento

## Objetivo

Actualizar el flujo de solicitud de turnos para reemplazar el campo `name` por `firstName` y `lastName`, eliminar `reason`, y agregar `documentType` y `documentNumber`.

El cambio asume reinicio completo de la base local y recreación de la hoja `Solicitudes`, por lo que no se preserva compatibilidad con datos históricos cargados con el esquema anterior.

## Decisiones Aprobadas

- Se reinicia la base local y se aplica un esquema nuevo limpio.
- Se recrea la pestaña `Solicitudes` con el nuevo orden de columnas.
- `documentType` será un selector cerrado con estas opciones:
  - `DNI`
  - `LC`
  - `LE`
  - `Pasaporte`
  - `Otro`
- `documentNumber` se validará como string numérico de 7 a 10 dígitos.

## Alcance

El cambio impacta estos componentes:

- esquema Prisma
- validación Zod
- endpoint `POST /api/solicitar-turno`
- formulario público
- integración con Google Sheets
- email de asignación
- batch processor
- pruebas automatizadas relevantes
- documentación operativa

## Modelo de Datos

El modelo `AppointmentRequest` pasa a usar estos campos de identidad:

- `firstName: String`
- `lastName: String`
- `documentType: String`
- `documentNumber: String`

Se conservan los campos ya existentes para operación del sistema:

- `id`
- `email`
- `phone`
- `status`
- `batchId`
- `scheduledAt`
- `slotNumber`
- `sheetRowNumber`
- `createdAt`
- `updatedAt`

Se eliminan del modelo:

- `name`
- `reason`

## Validación

El schema de entrada pasa a aceptar:

- `firstName`: string trim, mínimo 2, máximo 100
- `lastName`: string trim, mínimo 2, máximo 100
- `documentType`: enum cerrado `DNI | LC | LE | Pasaporte | Otro`
- `documentNumber`: regex de solo dígitos, longitud entre 7 y 10
- `email`: email válido
- `phone`: string trim, mínimo 8, máximo 30

No se aceptarán más `name` ni `reason` como parte del payload válido.

## API

El endpoint `POST /api/solicitar-turno` dejará de aceptar el payload viejo y pasará a aceptar exclusivamente:

```json
{
  "firstName": "Ana",
  "lastName": "Perez",
  "documentType": "DNI",
  "documentNumber": "12345678",
  "email": "ana@example.com",
  "phone": "2346512345"
}
```

El endpoint seguirá:

- validando con Zod
- insertando una fila pendiente en Google Sheets
- guardando la solicitud en la base
- devolviendo `requestId` y `sheetRowNumber`

## Google Sheets

La pestaña `Solicitudes` debe recrearse con estas columnas, en este orden:

1. `requestId`
2. `createdAtIso`
3. `firstName`
4. `lastName`
5. `documentType`
6. `documentNumber`
7. `email`
8. `phone`
9. `status`
10. `scheduledDate`
11. `scheduledTime`
12. `address`
13. `site`
14. `campaign`
15. `finalStatus`

### Escritura inicial

`appendPendingRequestRow` debe escribir una fila pendiente con los nuevos datos de identidad y contacto, dejando vacías las columnas de turno todavía no asignadas.

### Actualización posterior

`updateAssignedTurnRow` debe seguir completando fecha, hora, dirección, sede, campaña y estado final, pero ajustado al nuevo offset de columnas.

## Formulario Público

El formulario eliminará `Motivo` y mostrará estos campos:

- `Nombre`
- `Apellido`
- `Tipo de documento`
- `Número de documento`
- `Email`
- `Teléfono`

### Reglas UI

- `Tipo de documento` será un `select`
- `Número de documento` será input textual con validación para aceptar solo dígitos de 7 a 10 caracteres
- Se mantiene el mismo patrón de submit, loading, mensaje de éxito y mensaje de error

## Email

El template seguirá enviando la misma información del turno.

La única modificación funcional será el saludo:

- antes: `Hola Ana`
- ahora: `Hola Ana Perez`

No se agrega documento al email salvo que más adelante se pida explícitamente.

## Batch Processor

En la etapa de procesamiento de lote:

- donde hoy se usa `request.name`, se debe usar nombre completo armado a partir de `firstName` y `lastName`
- el resto del flujo de asignación de turnos no cambia

## Estrategia de Reset

La implementación asumirá entorno local descartable.

### Base de datos

- reset completo de SQLite local
- regeneración del cliente Prisma
- aplicación del esquema nuevo sin migración de compatibilidad hacia atrás

### Google Sheet

- recrear o limpiar la pestaña `Solicitudes`
- cargar encabezados nuevos alineados con el orden que usa el código

## Pruebas

Se deben actualizar o agregar pruebas para cubrir:

- validación de `documentType` permitido
- rechazo de `documentNumber` con letras
- rechazo de `documentNumber` fuera del rango 7-10
- aceptación de payload nuevo válido en el endpoint
- rechazo de payload viejo con `name` o `reason`
- escritura de fila pendiente con nuevo orden de columnas
- saludo de email con nombre completo
- formulario sin campo `Motivo`

## Criterios de Aceptación

- el formulario ya no muestra `Motivo`
- el formulario exige nombre, apellido, tipo de documento, número de documento, email y teléfono
- la API ya no acepta `name` ni `reason`
- la base local usa el nuevo esquema sin datos heredados
- Google Sheets recibe filas con el nuevo layout
- el email usa nombre completo
- `npm run build` debe seguir pasando al final del cambio

## Plan de Implementación Esperado

1. actualizar esquema Prisma
2. resetear base local
3. actualizar validación y tipos
4. actualizar integración con Google Sheets
5. actualizar endpoint
6. actualizar formulario y UI
7. actualizar email y batch processor
8. ajustar pruebas
9. verificar build y flujo básico
