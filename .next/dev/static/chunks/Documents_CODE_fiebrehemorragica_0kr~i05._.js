(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/calendar.module.css [app-client] (css module)", ((__turbopack_context__) => {

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
"[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/forms.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CancelDayForm",
    ()=>CancelDayForm,
    "RuleForm",
    ()=>RuleForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/CODE/fiebrehemorragica/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/CODE/fiebrehemorragica/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$app$2f$calendar$2f$calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/calendar.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
function RuleForm() {
    _s();
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: handleSubmit,
        className: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$app$2f$calendar$2f$calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].form,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                children: [
                    "Vigente desde:",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                children: [
                    "Dia de la semana:",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        name: "dayOfWeek",
                        required: true,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "1",
                                children: "Lunes"
                            }, void 0, false, {
                                fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/forms.tsx",
                                lineNumber: 50,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "2",
                                children: "Martes"
                            }, void 0, false, {
                                fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/forms.tsx",
                                lineNumber: 51,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "3",
                                children: "Miercoles"
                            }, void 0, false, {
                                fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/forms.tsx",
                                lineNumber: 52,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "4",
                                children: "Jueves"
                            }, void 0, false, {
                                fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/forms.tsx",
                                lineNumber: 53,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                children: [
                    "Hora inicio:",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                children: [
                    "Hora fin:",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                children: [
                    "Cantidad de turnos:",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "submit",
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$app$2f$calendar$2f$calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].button,
                children: "Crear Regla"
            }, void 0, false, {
                fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/forms.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            status && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$app$2f$calendar$2f$calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].status,
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
_s(RuleForm, "tFQEoWuxTnOS0Tj0020ukhuK2rw=");
_c = RuleForm;
function CancelDayForm() {
    _s1();
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: handleSubmit,
        className: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$app$2f$calendar$2f$calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].form,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                children: [
                    "Fecha a cancelar:",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "submit",
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$app$2f$calendar$2f$calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dangerButton,
                children: "Cancelar Dia y Reprogramar"
            }, void 0, false, {
                fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/forms.tsx",
                lineNumber: 108,
                columnNumber: 7
            }, this),
            status && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$app$2f$calendar$2f$calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].status,
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
_s1(CancelDayForm, "tFQEoWuxTnOS0Tj0020ukhuK2rw=");
_c1 = CancelDayForm;
var _c, _c1;
__turbopack_context__.k.register(_c, "RuleForm");
__turbopack_context__.k.register(_c1, "CancelDayForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/rule-list.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RuleList",
    ()=>RuleList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/CODE/fiebrehemorragica/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/CODE/fiebrehemorragica/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$app$2f$calendar$2f$calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/calendar.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function formatDateForInput(dateValue) {
    const date = typeof dateValue === "string" ? new Date(dateValue) : dateValue;
    return date.toISOString().split("T")[0];
}
function RuleList({ rules, daysOfWeek }) {
    _s();
    const [editingId, setEditingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [ruleList, setRuleList] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(rules);
    async function handleDelete(id) {
        if (!confirm("Seguro que queres borrar esta regla? Los turnos a futuro se van a reprogramar segun la regla anterior o el default.")) {
            return;
        }
        try {
            const res = await fetch(`/api/admin/schedule-rules?id=${id}`, {
                method: "DELETE"
            });
            if (res.ok) {
                setRuleList((prev)=>prev.filter((r)=>r.id !== id));
                setStatus("Regla eliminada.");
            } else {
                const data = await res.json();
                setStatus(`Error: ${data.error || res.statusText}`);
            }
        } catch (err) {
            setStatus(`Error: ${err.message}`);
        }
    }
    async function handleUpdate(e, id) {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const body = Object.fromEntries(formData.entries());
        const payload = {
            validFrom: body.validFrom,
            dayOfWeek: Number(body.dayOfWeek),
            startTime: body.startTime,
            endTime: body.endTime,
            slotCount: Number(body.slotCount)
        };
        try {
            const res = await fetch(`/api/admin/schedule-rules?id=${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                const updated = await res.json();
                setRuleList((prev)=>prev.map((r)=>r.id === id ? {
                            ...r,
                            validFrom: updated.validFrom,
                            dayOfWeek: updated.dayOfWeek,
                            startTime: updated.startTime,
                            endTime: updated.endTime,
                            slotCount: updated.slotCount
                        } : r));
                setEditingId(null);
                setStatus("Regla actualizada correctamente.");
            } else {
                const data = await res.json();
                setStatus(`Error: ${data.error || res.statusText}`);
            }
        } catch (err) {
            setStatus(`Error: ${err.message}`);
        }
    }
    if (ruleList.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$app$2f$calendar$2f$calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].empty,
            children: "No hay reglas configuradas. Se usa el default (Viernes 08:30 - 11:50, 20 turnos)."
        }, void 0, false, {
            fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/rule-list.tsx",
            lineNumber: 100,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            status && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$app$2f$calendar$2f$calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].status,
                children: status
            }, void 0, false, {
                fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/rule-list.tsx",
                lineNumber: 108,
                columnNumber: 18
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$app$2f$calendar$2f$calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].list,
                children: ruleList.map((rule)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$app$2f$calendar$2f$calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].ruleCard,
                        children: editingId === rule.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: (e)=>handleUpdate(e, rule.id),
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$app$2f$calendar$2f$calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].form,
                            style: {
                                marginTop: 0
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    children: [
                                        "Vigente desde:",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "date",
                                            name: "validFrom",
                                            defaultValue: formatDateForInput(rule.validFrom),
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/rule-list.tsx",
                                            lineNumber: 120,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/rule-list.tsx",
                                    lineNumber: 118,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    children: [
                                        "Dia de la semana:",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            name: "dayOfWeek",
                                            defaultValue: rule.dayOfWeek,
                                            required: true,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "1",
                                                    children: "Lunes"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/rule-list.tsx",
                                                    lineNumber: 130,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "2",
                                                    children: "Martes"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/rule-list.tsx",
                                                    lineNumber: 131,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "3",
                                                    children: "Miercoles"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/rule-list.tsx",
                                                    lineNumber: 132,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "4",
                                                    children: "Jueves"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/rule-list.tsx",
                                                    lineNumber: 133,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "5",
                                                    children: "Viernes"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/rule-list.tsx",
                                                    lineNumber: 134,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/rule-list.tsx",
                                            lineNumber: 129,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/rule-list.tsx",
                                    lineNumber: 127,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    children: [
                                        "Hora inicio:",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "time",
                                            name: "startTime",
                                            defaultValue: rule.startTime,
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/rule-list.tsx",
                                            lineNumber: 139,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/rule-list.tsx",
                                    lineNumber: 137,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    children: [
                                        "Hora fin:",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "time",
                                            name: "endTime",
                                            defaultValue: rule.endTime,
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/rule-list.tsx",
                                            lineNumber: 148,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/rule-list.tsx",
                                    lineNumber: 146,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    children: [
                                        "Cantidad de turnos:",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            name: "slotCount",
                                            defaultValue: rule.slotCount,
                                            min: 1,
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/rule-list.tsx",
                                            lineNumber: 157,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/rule-list.tsx",
                                    lineNumber: 155,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$app$2f$calendar$2f$calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].buttonGroup,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "submit",
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$app$2f$calendar$2f$calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].button,
                                            children: "Guardar"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/rule-list.tsx",
                                            lineNumber: 166,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$app$2f$calendar$2f$calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].secondaryButton,
                                            onClick: ()=>setEditingId(null),
                                            children: "Cancelar"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/rule-list.tsx",
                                            lineNumber: 169,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/rule-list.tsx",
                                    lineNumber: 165,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/rule-list.tsx",
                            lineNumber: 113,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: "Vigente desde:"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/rule-list.tsx",
                                    lineNumber: 180,
                                    columnNumber: 17
                                }, this),
                                " ",
                                (typeof rule.validFrom === "string" ? new Date(rule.validFrom) : rule.validFrom).toLocaleDateString("es-AR"),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                    fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/rule-list.tsx",
                                    lineNumber: 182,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: "Dia:"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/rule-list.tsx",
                                    lineNumber: 183,
                                    columnNumber: 17
                                }, this),
                                " ",
                                daysOfWeek[rule.dayOfWeek],
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                    fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/rule-list.tsx",
                                    lineNumber: 184,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: "Horario:"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/rule-list.tsx",
                                    lineNumber: 185,
                                    columnNumber: 17
                                }, this),
                                " ",
                                rule.startTime,
                                " - ",
                                rule.endTime,
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                    fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/rule-list.tsx",
                                    lineNumber: 186,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: "Turnos:"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/rule-list.tsx",
                                    lineNumber: 187,
                                    columnNumber: 17
                                }, this),
                                " ",
                                rule.slotCount,
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$app$2f$calendar$2f$calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].buttonGroup,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$app$2f$calendar$2f$calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].button,
                                            onClick: ()=>setEditingId(rule.id),
                                            children: "Editar"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/rule-list.tsx",
                                            lineNumber: 189,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$src$2f$app$2f$calendar$2f$calendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dangerButton,
                                            onClick: ()=>handleDelete(rule.id),
                                            children: "Borrar"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/rule-list.tsx",
                                            lineNumber: 195,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/rule-list.tsx",
                                    lineNumber: 188,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true)
                    }, rule.id, false, {
                        fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/rule-list.tsx",
                        lineNumber: 111,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Documents/CODE/fiebrehemorragica/src/app/calendar/rule-list.tsx",
                lineNumber: 109,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(RuleList, "wQRav9jhorlNpc/jTgkQQ7/btWc=");
_c = RuleList;
var _c;
__turbopack_context__.k.register(_c, "RuleList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/CODE/fiebrehemorragica/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Documents/CODE/fiebrehemorragica/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/Documents/CODE/fiebrehemorragica/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/Documents/CODE/fiebrehemorragica/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$CODE$2f$fiebrehemorragica$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Documents/CODE/fiebrehemorragica/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/Documents/CODE/fiebrehemorragica/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
]);

//# sourceMappingURL=Documents_CODE_fiebrehemorragica_0kr~i05._.js.map