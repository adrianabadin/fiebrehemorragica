module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/Documents/CODE/fiebrehemorragica/src/lib/db/prisma.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/Documents/CODE/fiebrehemorragica/node_modules/@prisma/client)");
;
const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]({
    log: [
        "warn",
        "error"
    ]
});
if ("TURBOPACK compile-time truthy", 1) {
    globalForPrisma.prisma = prisma;
}
}),
"[project]/Documents/CODE/fiebrehemorragica/src/lib/auth/get-auth-user.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthError",
    ()=>AuthError,
    "getAuthUser",
    ()=>getAuthUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/CODE/fiebrehemorragica/node_modules/jose/dist/webapi/jwt/verify.js [app-route] (ecmascript)");
;
class AuthError extends Error {
    status;
    constructor(message, status = 401){
        super(message);
        this.status = status;
    }
}
async function getAuthUser(request) {
    const cookieHeader = request.headers.get("cookie") ?? "";
    const tokenMatch = cookieHeader.match(/(?:^|;\s*)token=([^;]*)/);
    if (!tokenMatch?.[1]) {
        throw new AuthError("No autenticado");
    }
    if (!process.env.JWT_SECRET) {
        throw new AuthError("JWT_SECRET no configurado", 500);
    }
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    try {
        const { payload } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jwtVerify"])(tokenMatch[1], secret);
        return {
            userId: payload.userId,
            role: payload.role
        };
    } catch  {
        throw new AuthError("No autenticado");
    }
}
}),
"[project]/Documents/CODE/fiebrehemorragica/src/lib/calendar/calendar.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "findNextAvailableDay",
    ()=>findNextAvailableDay,
    "findNextAvailableFriday",
    ()=>findNextAvailableFriday,
    "getActiveRule",
    ()=>getActiveRule,
    "isBlockedDate",
    ()=>isBlockedDate,
    "loadBlockedDates",
    ()=>loadBlockedDates,
    "nextFridayFrom",
    ()=>nextFridayFrom
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$lib$2f$db$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/CODE/fiebrehemorragica/src/lib/db/prisma.ts [app-route] (ecmascript)");
;
function isBlockedDate(dateIso, blockedDates) {
    return blockedDates.includes(dateIso);
}
function nextFridayFrom(date) {
    const result = new Date(date);
    while(result.getDay() !== 5){
        result.setDate(result.getDate() + 1);
    }
    return result;
}
async function loadBlockedDates(year) {
    const exceptions = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$lib$2f$db$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].calendarException.findMany({
        where: {
            year
        },
        select: {
            date: true
        }
    });
    return exceptions.map((exception)=>exception.date.toLocaleDateString("en-CA"));
}
async function getActiveRule(date) {
    const rule = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$lib$2f$db$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].scheduleRule.findFirst({
        where: {
            validFrom: {
                lte: date
            }
        },
        orderBy: {
            validFrom: "desc"
        }
    });
    if (rule) return rule;
    return {
        dayOfWeek: 5,
        startTime: "08:30",
        endTime: "11:50",
        slotCount: 20
    };
}
async function findNextAvailableFriday(afterDate, blockedDates) {
    const [year, month, day] = afterDate.split("-").map(Number);
    const start = new Date(year, month - 1, day);
    let friday = nextFridayFrom(start);
    for(let i = 0; i < 52; i++){
        const fridayStr = friday.toLocaleDateString("en-CA");
        if (!isBlockedDate(fridayStr, blockedDates)) {
            const count = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$lib$2f$db$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].appointmentRequest.count({
                where: {
                    scheduledAt: {
                        gte: new Date(fridayStr + "T00:00:00"),
                        lt: new Date(new Date(fridayStr + "T00:00:00").getTime() + 86400000)
                    },
                    status: {
                        not: "pending"
                    }
                }
            });
            if (count < 20) {
                return fridayStr;
            }
        }
        friday.setDate(friday.getDate() + 7);
    }
    return null;
}
async function findNextAvailableDay(afterDate, blockedDates) {
    const [year, month, day] = afterDate.split("-").map(Number);
    let current = new Date(year, month - 1, day);
    for(let i = 0; i < 52; i++){
        const rule = await getActiveRule(current);
        while(current.getDay() !== rule.dayOfWeek){
            current.setDate(current.getDate() + 1);
        }
        const dateStr = current.toLocaleDateString("en-CA");
        if (!isBlockedDate(dateStr, blockedDates)) {
            const count = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$lib$2f$db$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].appointmentRequest.count({
                where: {
                    scheduledAt: {
                        gte: new Date(dateStr + "T00:00:00"),
                        lt: new Date(new Date(dateStr + "T00:00:00").getTime() + 86400000)
                    },
                    status: {
                        not: "pending"
                    }
                }
            });
            if (count < rule.slotCount) {
                return dateStr;
            }
        }
        current.setDate(current.getDate() + 7);
    }
    return null;
}
}),
"[project]/Documents/CODE/fiebrehemorragica/src/lib/email/reschedule-email-template.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildRescheduleEmail",
    ()=>buildRescheduleEmail
]);
function buildRescheduleEmail(input) {
    return {
        subject: "Su turno ha sido reprogramado",
        html: `
      <p>Hola ${input.fullName},</p>
      <p>Le informamos que su turno ha sido reprogramado.</p>
      <p><strong>Fecha anterior:</strong> ${input.oldDate}</p>
      <p><strong>Nueva fecha:</strong> ${input.newDate}</p>
      <p><strong>Nueva hora:</strong> ${input.newTime}</p>
      <p>Direccion: Hijas de San Jose 145</p>
      <p>Sede: Region Sanitaria X</p>
    `
    };
}
}),
"[project]/Documents/CODE/fiebrehemorragica/src/lib/email/send-reschedule-email.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sendRescheduleEmail",
    ()=>sendRescheduleEmail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$resend$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/CODE/fiebrehemorragica/node_modules/resend/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$lib$2f$email$2f$reschedule$2d$email$2d$template$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/CODE/fiebrehemorragica/src/lib/email/reschedule-email-template.ts [app-route] (ecmascript)");
;
;
const resend = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$resend$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Resend"](process.env.RESEND_API_KEY);
async function sendRescheduleEmail(input) {
    const email = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$lib$2f$email$2f$reschedule$2d$email$2d$template$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildRescheduleEmail"])(input);
    const { data, error } = await resend.emails.send({
        from: process.env.EMAIL_FROM ?? "Turnos <turnos@example.com>",
        to: input.to,
        subject: email.subject,
        html: email.html
    });
    if (error) {
        throw new Error(`Failed to send reschedule email: ${error.message}`);
    }
    return data;
}
}),
"[project]/Documents/CODE/fiebrehemorragica/src/lib/calendar/reschedule.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "reassignAppointmentsForDate",
    ()=>reassignAppointmentsForDate,
    "rescheduleAppointments",
    ()=>rescheduleAppointments
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$lib$2f$db$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/CODE/fiebrehemorragica/src/lib/db/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$lib$2f$calendar$2f$calendar$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/CODE/fiebrehemorragica/src/lib/calendar/calendar.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$lib$2f$email$2f$send$2d$reschedule$2d$email$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/CODE/fiebrehemorragica/src/lib/email/send-reschedule-email.ts [app-route] (ecmascript)");
;
;
;
function timeToMinutes(time) {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
}
async function reassignAppointmentsForDate(date) {
    const year = parseInt(date.split("-")[0], 10);
    const nextYear = year + 1;
    const blockedDates = [
        ...await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$lib$2f$calendar$2f$calendar$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadBlockedDates"])(year),
        ...await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$lib$2f$calendar$2f$calendar$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadBlockedDates"])(nextYear),
        date
    ];
    const appointments = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$lib$2f$db$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].appointmentRequest.findMany({
        where: {
            scheduledAt: {
                gte: new Date(date + "T00:00:00"),
                lt: new Date(new Date(date + "T00:00:00").getTime() + 86400000)
            },
            status: {
                not: "pending"
            }
        }
    });
    if (appointments.length === 0) {
        return {
            rescheduledCount: 0,
            newDate: null
        };
    }
    const nextDate = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$lib$2f$calendar$2f$calendar$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findNextAvailableFriday"])(date, blockedDates);
    if (!nextDate) {
        throw new Error("No hay fecha disponible");
    }
    const existingCount = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$lib$2f$db$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].appointmentRequest.count({
        where: {
            scheduledAt: {
                gte: new Date(nextDate + "T00:00:00"),
                lt: new Date(new Date(nextDate + "T00:00:00").getTime() + 86400000)
            },
            status: {
                not: "pending"
            }
        }
    });
    const SLOT_START_HOUR = 8;
    const SLOT_START_MINUTE = 30;
    const SLOT_SIZE_MINUTES = 10;
    for(let i = 0; i < appointments.length; i++){
        const appt = appointments[i];
        const slotNumber = existingCount + i + 1;
        const zeroBasedSlot = slotNumber - 1;
        const totalMinutes = SLOT_START_HOUR * 60 + SLOT_START_MINUTE + zeroBasedSlot * SLOT_SIZE_MINUTES;
        const hours = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
        const minutes = String(totalMinutes % 60).padStart(2, "0");
        await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$lib$2f$db$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].appointmentRequest.update({
            where: {
                id: appt.id
            },
            data: {
                scheduledAt: new Date(nextDate + "T00:00:00"),
                slotNumber
            }
        });
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$lib$2f$email$2f$send$2d$reschedule$2d$email$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendRescheduleEmail"])({
                to: appt.email,
                fullName: `${appt.firstName} ${appt.lastName}`,
                oldDate: date,
                newDate: nextDate,
                newTime: `${hours}:${minutes}`
            });
        } catch (err) {
            console.error(`Failed to send reschedule email to ${appt.email}:`, err);
        }
    }
    return {
        rescheduledCount: appointments.length,
        newDate: nextDate
    };
}
async function rescheduleAppointments(appointments) {
    const currentYear = new Date().getFullYear();
    const blockedDates = [
        ...await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$lib$2f$calendar$2f$calendar$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadBlockedDates"])(currentYear),
        ...await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$lib$2f$calendar$2f$calendar$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadBlockedDates"])(currentYear + 1)
    ];
    const results = [];
    for (const appt of appointments){
        const oldDate = appt.scheduledAt.toLocaleDateString("en-CA");
        const newDate = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$lib$2f$calendar$2f$calendar$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findNextAvailableDay"])(oldDate, blockedDates);
        if (!newDate) {
            console.error(`No available day found for appointment ${appt.id}`);
            continue;
        }
        const existingCount = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$lib$2f$db$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].appointmentRequest.count({
            where: {
                scheduledAt: {
                    gte: new Date(newDate + "T00:00:00"),
                    lt: new Date(new Date(newDate + "T00:00:00").getTime() + 86400000)
                },
                status: {
                    not: "pending"
                }
            }
        });
        const rule = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$lib$2f$calendar$2f$calendar$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getActiveRule"])(new Date(newDate + "T00:00:00"));
        const startTimeMinutes = timeToMinutes(rule.startTime);
        const endTimeMinutes = timeToMinutes(rule.endTime);
        const slotDuration = (endTimeMinutes - startTimeMinutes) / rule.slotCount;
        const slotNumber = existingCount + 1;
        const zeroBasedSlot = slotNumber - 1;
        const totalMinutes = startTimeMinutes + zeroBasedSlot * slotDuration;
        const hours = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
        const minutes = String(Math.round(totalMinutes % 60)).padStart(2, "0");
        const newTime = `${hours}:${minutes}`;
        await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$lib$2f$db$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].appointmentRequest.update({
            where: {
                id: appt.id
            },
            data: {
                scheduledAt: new Date(newDate + "T00:00:00"),
                slotNumber
            }
        });
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$lib$2f$email$2f$send$2d$reschedule$2d$email$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendRescheduleEmail"])({
                to: appt.email,
                fullName: `${appt.firstName} ${appt.lastName}`,
                oldDate,
                newDate,
                newTime
            });
        } catch (err) {
            console.error(`Failed to send reschedule email to ${appt.email}:`, err);
        }
        results.push({
            id: appt.id,
            oldDate,
            newDate,
            newTime,
            slotNumber
        });
    }
    return results;
}
}),
"[project]/Documents/CODE/fiebrehemorragica/src/app/api/admin/schedule-rules/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "POST",
    ()=>POST,
    "PUT",
    ()=>PUT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/CODE/fiebrehemorragica/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$lib$2f$db$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/CODE/fiebrehemorragica/src/lib/db/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$lib$2f$auth$2f$get$2d$auth$2d$user$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/CODE/fiebrehemorragica/src/lib/auth/get-auth-user.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/Documents/CODE/fiebrehemorragica/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$lib$2f$calendar$2f$reschedule$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/CODE/fiebrehemorragica/src/lib/calendar/reschedule.ts [app-route] (ecmascript)");
;
;
;
;
;
const schema = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    validFrom: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().regex(/^\d{4}-\d{2}-\d{2}$/),
    dayOfWeek: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().min(1).max(7),
    startTime: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().regex(/^\d{2}:\d{2}$/),
    endTime: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().regex(/^\d{2}:\d{2}$/),
    slotCount: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().min(1)
});
async function POST(request) {
    try {
        const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$lib$2f$auth$2f$get$2d$auth$2d$user$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAuthUser"])(request);
        if (user.role !== "admin") {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Sin permisos"
            }, {
                status: 403
            });
        }
        const body = await request.json();
        const parsed = schema.parse(body);
        const rule = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$lib$2f$db$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].scheduleRule.create({
            data: {
                validFrom: new Date(parsed.validFrom + "T00:00:00"),
                dayOfWeek: parsed.dayOfWeek,
                startTime: parsed.startTime,
                endTime: parsed.endTime,
                slotCount: parsed.slotCount
            }
        });
        // Trigger reschedule for affected future appointments
        const futureAppointments = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$lib$2f$db$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].appointmentRequest.findMany({
            where: {
                scheduledAt: {
                    gte: new Date(parsed.validFrom + "T00:00:00")
                },
                status: {
                    not: "pending"
                }
            }
        });
        const validAppointments = futureAppointments.filter((a)=>a.scheduledAt !== null).map((a)=>({
                id: a.id,
                scheduledAt: a.scheduledAt,
                email: a.email,
                firstName: a.firstName,
                lastName: a.lastName
            }));
        if (validAppointments.length > 0) {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$lib$2f$calendar$2f$reschedule$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["rescheduleAppointments"])(validAppointments);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(rule);
    } catch (error) {
        if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].ZodError) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: error.message
            }, {
                status: 400
            });
        }
        if (error instanceof Error && error.message === "No autenticado") {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "No autenticado"
            }, {
                status: 401
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Error interno"
        }, {
            status: 500
        });
    }
}
async function PUT(request) {
    try {
        const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$lib$2f$auth$2f$get$2d$auth$2d$user$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAuthUser"])(request);
        if (user.role !== "admin") {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Sin permisos"
            }, {
                status: 403
            });
        }
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        if (!id) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "ID requerido"
            }, {
                status: 400
            });
        }
        const body = await request.json();
        const parsed = schema.parse(body);
        const rule = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$lib$2f$db$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].scheduleRule.update({
            where: {
                id
            },
            data: {
                validFrom: new Date(parsed.validFrom + "T00:00:00"),
                dayOfWeek: parsed.dayOfWeek,
                startTime: parsed.startTime,
                endTime: parsed.endTime,
                slotCount: parsed.slotCount
            }
        });
        // Trigger reschedule for affected future appointments
        const futureAppointments = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$lib$2f$db$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].appointmentRequest.findMany({
            where: {
                scheduledAt: {
                    gte: new Date(parsed.validFrom + "T00:00:00")
                },
                status: {
                    not: "pending"
                }
            }
        });
        const validAppointments = futureAppointments.filter((a)=>a.scheduledAt !== null).map((a)=>({
                id: a.id,
                scheduledAt: a.scheduledAt,
                email: a.email,
                firstName: a.firstName,
                lastName: a.lastName
            }));
        if (validAppointments.length > 0) {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$lib$2f$calendar$2f$reschedule$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["rescheduleAppointments"])(validAppointments);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(rule);
    } catch (error) {
        if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].ZodError) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: error.message
            }, {
                status: 400
            });
        }
        if (error instanceof Error && error.message === "No autenticado") {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "No autenticado"
            }, {
                status: 401
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Error interno"
        }, {
            status: 500
        });
    }
}
async function DELETE(request) {
    try {
        const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$lib$2f$auth$2f$get$2d$auth$2d$user$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAuthUser"])(request);
        if (user.role !== "admin") {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Sin permisos"
            }, {
                status: 403
            });
        }
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        if (!id) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "ID requerido"
            }, {
                status: 400
            });
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$lib$2f$db$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].scheduleRule.delete({
            where: {
                id
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true
        });
    } catch (error) {
        if (error instanceof Error && error.message === "No autenticado") {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "No autenticado"
            }, {
                status: 401
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Error interno"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0c0v0mi._.js.map