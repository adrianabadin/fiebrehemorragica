module.exports = [
"[project]/Documents/CODE/fiebrehemorragica/src/components/Header.module.css [app-rsc] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "authLinks": "Header-module__hxL9Xq__authLinks",
  "cta": "Header-module__hxL9Xq__cta",
  "header": "Header-module__hxL9Xq__header",
  "link": "Header-module__hxL9Xq__link",
  "logo": "Header-module__hxL9Xq__logo",
  "logoutBtn": "Header-module__hxL9Xq__logoutBtn",
  "nav": "Header-module__hxL9Xq__nav",
  "userContainer": "Header-module__hxL9Xq__userContainer",
  "userName": "Header-module__hxL9Xq__userName",
});
}),
"[project]/Documents/CODE/fiebrehemorragica/src/lib/auth/session.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getSession",
    ()=>getSession
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/CODE/fiebrehemorragica/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/CODE/fiebrehemorragica/node_modules/jose/dist/webapi/jwt/verify.js [app-rsc] (ecmascript)");
;
;
async function getSession() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    const token = cookieStore.get("token")?.value;
    if (!token) return null;
    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jwtVerify"])(token, secret);
        // Asumimos que podemos obtener el nombre del usuario desde DB o payload
        // El payload del login ahora tiene { userId, role }
        // Vamos a retornar esto
        return {
            userId: payload.userId,
            role: payload.role,
            name: payload.name || "Usuario"
        };
    } catch (error) {
        return null;
    }
}
}),
"[project]/Documents/CODE/fiebrehemorragica/src/components/Header.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/CODE/fiebrehemorragica/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
// src/components/Header.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/CODE/fiebrehemorragica/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$components$2f$Header$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/Documents/CODE/fiebrehemorragica/src/components/Header.module.css [app-rsc] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$lib$2f$auth$2f$session$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/CODE/fiebrehemorragica/src/lib/auth/session.ts [app-rsc] (ecmascript)");
;
;
;
;
async function Header() {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$lib$2f$auth$2f$session$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSession"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$components$2f$Header$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].header,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                href: "/",
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$components$2f$Header$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].logo,
                children: "Región Sanitaria X"
            }, void 0, false, {
                fileName: "[project]/Documents/CODE/fiebrehemorragica/src/components/Header.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$components$2f$Header$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].nav,
                children: [
                    user?.role === 'admin' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        href: "/calendar",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$components$2f$Header$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].link,
                        children: "Calendario"
                    }, void 0, false, {
                        fileName: "[project]/Documents/CODE/fiebrehemorragica/src/components/Header.tsx",
                        lineNumber: 17,
                        columnNumber: 11
                    }, this),
                    user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$components$2f$Header$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].userContainer,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$components$2f$Header$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].userName,
                                children: user.name
                            }, void 0, false, {
                                fileName: "[project]/Documents/CODE/fiebrehemorragica/src/components/Header.tsx",
                                lineNumber: 23,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                action: "/api/auth/logout",
                                method: "POST",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$components$2f$Header$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].logoutBtn,
                                    children: "Cerrar Sesión"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/CODE/fiebrehemorragica/src/components/Header.tsx",
                                    lineNumber: 25,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Documents/CODE/fiebrehemorragica/src/components/Header.tsx",
                                lineNumber: 24,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/CODE/fiebrehemorragica/src/components/Header.tsx",
                        lineNumber: 22,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$components$2f$Header$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].authLinks,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                href: "/login",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$components$2f$Header$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].link,
                                children: "Iniciar Sesión"
                            }, void 0, false, {
                                fileName: "[project]/Documents/CODE/fiebrehemorragica/src/components/Header.tsx",
                                lineNumber: 30,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                href: "/register",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$components$2f$Header$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].cta,
                                children: "Registrarse"
                            }, void 0, false, {
                                fileName: "[project]/Documents/CODE/fiebrehemorragica/src/components/Header.tsx",
                                lineNumber: 31,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/CODE/fiebrehemorragica/src/components/Header.tsx",
                        lineNumber: 29,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/CODE/fiebrehemorragica/src/components/Header.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/CODE/fiebrehemorragica/src/components/Header.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/CODE/fiebrehemorragica/src/app/layout.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RootLayout,
    "metadata",
    ()=>metadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/CODE/fiebrehemorragica/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$components$2f$Header$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/CODE/fiebrehemorragica/src/components/Header.tsx [app-rsc] (ecmascript)");
;
;
;
const metadata = {
    title: "Turnos - Vacunación Fiebre Hemorrágica",
    description: "Solicite un turno para vacunación de fiebre hemorrágica"
};
function RootLayout({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("html", {
        lang: "es",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("head", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                    href: "https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;500;600;700&display=swap",
                    rel: "stylesheet"
                }, void 0, false, {
                    fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/layout.tsx",
                    lineNumber: 14,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/layout.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$components$2f$Header$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/layout.tsx",
                        lineNumber: 17,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/layout.tsx",
                        lineNumber: 18,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/layout.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/layout.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/CODE/fiebrehemorragica/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Documents/CODE/fiebrehemorragica/src/app/layout.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=Documents_CODE_fiebrehemorragica_src_0t2zn5~._.js.map