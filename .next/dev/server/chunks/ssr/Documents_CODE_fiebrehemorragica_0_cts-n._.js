module.exports = [
"[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/calendar.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "button": "calendar-module__sAgE-G__button",
  "buttonGroup": "calendar-module__sAgE-G__buttonGroup",
  "container": "calendar-module__sAgE-G__container",
  "dangerButton": "calendar-module__sAgE-G__dangerButton",
  "empty": "calendar-module__sAgE-G__empty",
  "exceptionCard": "calendar-module__sAgE-G__exceptionCard",
  "form": "calendar-module__sAgE-G__form",
  "list": "calendar-module__sAgE-G__list",
  "ruleCard": "calendar-module__sAgE-G__ruleCard",
  "secondaryButton": "calendar-module__sAgE-G__secondaryButton",
  "section": "calendar-module__sAgE-G__section",
  "status": "calendar-module__sAgE-G__status",
  "title": "calendar-module__sAgE-G__title",
});
}),
"[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/forms.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CancelDayForm",
    ()=>CancelDayForm,
    "RuleForm",
    ()=>RuleForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/CODE/fiebrehemorragica/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/CODE/fiebrehemorragica/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$app$2f$calendar$2f$calendar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/calendar.module.css [app-ssr] (css module)");
"use client";
;
;
;
function RuleForm() {
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    async function handleSubmit(e) {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const body = Object.fromEntries(formData.entries());
        // Convert types
        const payload = {
            validFrom: body.validFrom,
            dayOfWeek: Number(body.dayOfWeek),
            startTime: body.startTime,
            endTime: body.endTime,
            slotCount: Number(body.slotCount)
        };
        try {
            const res = await fetch("/api/admin/schedule-rules", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                setStatus("Regla creada correctamente.");
                form.reset();
            } else {
                const data = await res.json();
                setStatus(`Error: ${data.error || res.statusText}`);
            }
        } catch (err) {
            setStatus(`Error: ${err.message}`);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: handleSubmit,
        className: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$app$2f$calendar$2f$calendar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].form,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                children: [
                    "Vigente desde:",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "date",
                        name: "validFrom",
                        required: true
                    }, void 0, false, {
                        fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/forms.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/forms.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                children: [
                    "Dia de la semana:",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        name: "dayOfWeek",
                        required: true,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "1",
                                children: "Lunes"
                            }, void 0, false, {
                                fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/forms.tsx",
                                lineNumber: 50,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "2",
                                children: "Martes"
                            }, void 0, false, {
                                fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/forms.tsx",
                                lineNumber: 51,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "3",
                                children: "Miercoles"
                            }, void 0, false, {
                                fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/forms.tsx",
                                lineNumber: 52,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "4",
                                children: "Jueves"
                            }, void 0, false, {
                                fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/forms.tsx",
                                lineNumber: 53,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "5",
                                children: "Viernes"
                            }, void 0, false, {
                                fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/forms.tsx",
                                lineNumber: 54,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/forms.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/forms.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                children: [
                    "Hora inicio:",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "time",
                        name: "startTime",
                        defaultValue: "09:00",
                        required: true
                    }, void 0, false, {
                        fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/forms.tsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/forms.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                children: [
                    "Hora fin:",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "time",
                        name: "endTime",
                        defaultValue: "14:00",
                        required: true
                    }, void 0, false, {
                        fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/forms.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/forms.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                children: [
                    "Cantidad de turnos:",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "number",
                        name: "slotCount",
                        defaultValue: 20,
                        min: 1,
                        required: true
                    }, void 0, false, {
                        fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/forms.tsx",
                        lineNumber: 67,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/forms.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "submit",
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$app$2f$calendar$2f$calendar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].button,
                children: "Crear Regla"
            }, void 0, false, {
                fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/forms.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            status && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$app$2f$calendar$2f$calendar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].status,
                children: status
            }, void 0, false, {
                fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/forms.tsx",
                lineNumber: 70,
                columnNumber: 18
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/forms.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
function CancelDayForm() {
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    async function handleSubmit(e) {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const body = Object.fromEntries(formData.entries());
        try {
            const res = await fetch("/api/admin/calendar/day", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });
            if (res.ok) {
                setStatus("Dia cancelado y turnos reprogramados.");
                form.reset();
            } else {
                const data = await res.json();
                setStatus(`Error: ${data.error || res.statusText}`);
            }
        } catch (err) {
            setStatus(`Error: ${err.message}`);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: handleSubmit,
        className: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$app$2f$calendar$2f$calendar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].form,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                children: [
                    "Fecha a cancelar:",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "date",
                        name: "date",
                        required: true
                    }, void 0, false, {
                        fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/forms.tsx",
                        lineNumber: 106,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/forms.tsx",
                lineNumber: 104,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "submit",
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$app$2f$calendar$2f$calendar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].dangerButton,
                children: "Cancelar Dia y Reprogramar"
            }, void 0, false, {
                fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/forms.tsx",
                lineNumber: 108,
                columnNumber: 7
            }, this),
            status && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$app$2f$calendar$2f$calendar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].status,
                children: status
            }, void 0, false, {
                fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/forms.tsx",
                lineNumber: 109,
                columnNumber: 18
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/forms.tsx",
        lineNumber: 103,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/CODE/fiebrehemorragica/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/Documents/CODE/fiebrehemorragica/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime;
}),
];

//# sourceMappingURL=Documents_CODE_fiebrehemorragica_0_cts-n._.js.map