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
"[project]/Documents/CODE/fiebrehemorragica/src/app/api/admin/users/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "PATCH",
    ()=>PATCH
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/CODE/fiebrehemorragica/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$lib$2f$db$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/CODE/fiebrehemorragica/src/lib/db/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$lib$2f$auth$2f$get$2d$auth$2d$user$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/CODE/fiebrehemorragica/src/lib/auth/get-auth-user.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/Documents/CODE/fiebrehemorragica/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z>");
;
;
;
;
async function GET(request) {
    try {
        const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$lib$2f$auth$2f$get$2d$auth$2d$user$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAuthUser"])(request);
        if (user.role !== "admin") {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Sin permisos"
            }, {
                status: 403
            });
        }
        const users = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$lib$2f$db$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].user.findMany({
            select: {
                id: true,
                username: true,
                role: true,
                createdAt: true
            },
            orderBy: {
                createdAt: "desc"
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(users);
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
const patchSchema = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    userId: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    role: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "admin",
        "user"
    ])
});
async function PATCH(request) {
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
        const parsed = patchSchema.parse(body);
        // Prevent self-demotion (optional safety)
        if (parsed.userId === user.userId && parsed.role !== "admin") {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "No podes quitarte el rol de admin a vos mismo"
            }, {
                status: 400
            });
        }
        const updated = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$lib$2f$db$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].user.update({
            where: {
                id: parsed.userId
            },
            data: {
                role: parsed.role
            },
            select: {
                id: true,
                username: true,
                role: true
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(updated);
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
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0u_vjhs._.js.map