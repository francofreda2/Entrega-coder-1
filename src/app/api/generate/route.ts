import { NextRequest, NextResponse } from "next/server";
import type { GenerateRequest, GenerateResponse, StoredProposal, ApiError } from "@/types";

// ---------------------------------------------------------------------------
// MOCK — Fase 2
// En Fase 3 esta función será reemplazada por la llamada real al LLM.
// ---------------------------------------------------------------------------
function buildMockMarkdown(projectName: string): string {
  return `### RESUMEN EJECUTIVO

Este proyecto busca digitalizar y modernizar los procesos actuales del área involucrada, mejorando la eficiencia operativa y reduciendo errores manuales. La implementación contempla análisis, diseño, desarrollo, pruebas y puesta en marcha de la solución propuesta.

El alcance incluye el desarrollo de los módulos principales, la integración con sistemas existentes y la capacitación de los usuarios finales. Se estima una duración de 6 meses con un equipo multidisciplinario. (Supuesto)

### OBJETIVO GENERAL

Implementar una solución tecnológica que digitalice y automatice los procesos del área, reduciendo el tiempo operativo en un 40% y eliminando la gestión manual. (Supuesto)

### OBJETIVOS ESPECÍFICOS

- Relevar y documentar los procesos actuales (AS-IS)
- Diseñar y desarrollar los módulos funcionales requeridos
- Integrar la solución con los sistemas existentes
- Capacitar al equipo usuario en el uso de la nueva herramienta
- Asegurar la migración de datos históricos sin pérdida de información (Supuesto)

### ALCANCE

**Incluye:**
- Análisis de requerimientos y diseño funcional
- Desarrollo de módulos principales
- Integración con sistemas indicados
- Testing funcional y de integración
- Capacitación de usuarios finales
- Documentación técnica y de usuario

**Excluye:**
- Soporte post-implementación (mayor a 30 días)
- Desarrollo de funcionalidades adicionales no relevadas
- Cambios en sistemas legacy no contemplados
- Licencias de software de terceros

### SUPUESTOS Y RESTRICCIONES

**Supuestos:**
- El área usuaria dispondrá de tiempo para participar en el relevamiento (Supuesto)
- Los sistemas de integración tienen APIs documentadas disponibles (Supuesto)
- El ambiente de producción estará disponible para el deploy final (Supuesto)

**Restricciones:**
- Presupuesto y fechas de entrega a confirmar con el cliente
- El equipo de trabajo deberá ser definido antes del inicio del proyecto

### EDT / WBS – ÁRBOL

\`\`\`
${projectName}
├── 1.0 Gestión del Proyecto
│   ├── 1.1 Plan de proyecto
│   └── 1.2 Control y seguimiento
├── 2.0 Análisis y Diseño
│   ├── 2.1 Relevamiento AS-IS
│   ├── 2.2 Diseño funcional TO-BE
│   └── 2.3 Aprobación de diseño
├── 3.0 Desarrollo
│   ├── 3.1 Módulo principal
│   │   ├── 3.1.1 Backend / lógica de negocio
│   │   └── 3.1.2 Frontend / interfaz
│   ├── 3.2 Integraciones
│   └── 3.3 Migración de datos
├── 4.0 Testing
│   ├── 4.1 Pruebas unitarias
│   ├── 4.2 Pruebas de integración
│   └── 4.3 UAT (User Acceptance Testing)
└── 5.0 Implementación
    ├── 5.1 Deploy a producción
    ├── 5.2 Capacitación
    └── 5.3 Cierre y handover
\`\`\`

### TABLA EDT

| Código | Nivel | Nombre | Responsable |
|--------|-------|--------|-------------|
| 0 | 0 | ${projectName} | Project Manager (Supuesto) |
| 1.0 | 1 | Gestión del Proyecto | Project Manager (Supuesto) |
| 1.1 | 2 | Plan de proyecto | PM (Supuesto) |
| 1.2 | 2 | Control y seguimiento | PM (Supuesto) |
| 2.0 | 1 | Análisis y Diseño | Analista Funcional (Supuesto) |
| 2.1 | 2 | Relevamiento AS-IS | Analista (Supuesto) |
| 2.2 | 2 | Diseño funcional TO-BE | Analista (Supuesto) |
| 2.3 | 2 | Aprobación de diseño | Cliente / Sponsor (Supuesto) |
| 3.0 | 1 | Desarrollo | Tech Lead (Supuesto) |
| 3.1 | 2 | Módulo principal | Desarrolladores (Supuesto) |
| 3.1.1 | 3 | Backend / lógica de negocio | Backend Dev (Supuesto) |
| 3.1.2 | 3 | Frontend / interfaz | Frontend Dev (Supuesto) |
| 3.2 | 2 | Integraciones | Backend Dev (Supuesto) |
| 3.3 | 2 | Migración de datos | DBA (Supuesto) |
| 4.0 | 1 | Testing | QA (Supuesto) |
| 4.1 | 2 | Pruebas unitarias | Desarrolladores (Supuesto) |
| 4.2 | 2 | Pruebas de integración | QA (Supuesto) |
| 4.3 | 2 | UAT | Usuarios finales (Supuesto) |
| 5.0 | 1 | Implementación | PM + Tech Lead (Supuesto) |
| 5.1 | 2 | Deploy a producción | DevOps (Supuesto) |
| 5.2 | 2 | Capacitación | Analista + PM (Supuesto) |
| 5.3 | 2 | Cierre y handover | PM (Supuesto) |

### ENTREGABLES PRINCIPALES

| Entregable | Descripción | Fase |
|------------|-------------|------|
| Documento de relevamiento | AS-IS documentado y validado por el cliente | Análisis |
| Diseño funcional aprobado | TO-BE con flujos, pantallas y reglas de negocio | Diseño |
| Software en ambiente de QA | Sistema funcional para pruebas de aceptación | Desarrollo |
| Resultado de UAT firmado | Acta de conformidad del usuario final | Testing |
| Sistema en producción | Solución desplegada y operativa | Implementación |
| Manual de usuario | Documentación de uso del sistema | Implementación |

### HITOS

| Hito | Descripción | Semana estimada |
|------|-------------|-----------------|
| Kick-off realizado | Reunión inicial con todos los stakeholders | Semana 1 (Supuesto) |
| Diseño funcional aprobado | Cliente valida el TO-BE | Semana 5 (Supuesto) |
| Demo interna completada | Revisión del módulo principal con el equipo | Semana 12 (Supuesto) |
| UAT aprobado | Usuario final firma conformidad | Semana 20 (Supuesto) |
| Sistema en producción | Deploy exitoso en ambiente real | Semana 22 (Supuesto) |
| Cierre de proyecto | Entrega formal y handover completado | Semana 24 (Supuesto) |

### RIESGOS Y MITIGACIONES

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|---------|------------|
| Cambios de alcance no controlados | Alta | Alto | Implementar proceso formal de change request con aprobación del sponsor |
| Disponibilidad limitada de usuarios para el relevamiento | Media | Alto | Acordar agenda de trabajo con el área antes del inicio del proyecto |
| Problemas de integración con sistemas legacy | Media | Alto | Realizar spike técnico en la primera semana para validar conectividad |
| Rotación del equipo técnico | Baja | Medio | Documentar decisiones clave y mantener knowledge base actualizada |
| Retrasos en aprobaciones del cliente | Alta | Medio | Establecer SLA de revisión (máx. 48hs) en el acta de constitución |

### KPIs SUGERIDOS

| KPI | Descripción | Meta sugerida |
|-----|-------------|---------------|
| Reducción del tiempo operativo | % de reducción del tiempo en procesos clave | ≥ 40% (Supuesto) |
| Adopción del sistema | % de usuarios activos al mes de go-live | ≥ 80% (Supuesto) |
| Defectos post go-live | Cantidad de bugs críticos en primeros 30 días | 0 bugs críticos (Supuesto) |
| Satisfacción del usuario | NPS o encuesta post-capacitación | ≥ 7/10 (Supuesto) |
| Cumplimiento de cronograma | % de hitos entregados en fecha | ≥ 90% (Supuesto) |

### PENDIENTES DE VALIDACIÓN

- Confirmar presupuesto total asignado al proyecto
- Definir el sponsor ejecutivo y su nivel de disponibilidad
- Validar que las APIs de integración están documentadas y disponibles
- Confirmar la fecha de go-live objetivo
- Definir el equipo completo (roles y dedicación)
- Acordar criterios de aceptación del UAT
- Confirmar ambiente de producción disponible para la fecha estimada
`;
}

export async function POST(req: NextRequest) {
  try {
    const body: GenerateRequest = await req.json();

    if (!body.input?.description?.trim()) {
      const error: ApiError = {
        error: "La descripción del proyecto es requerida.",
        code: "UNKNOWN",
      };
      return NextResponse.json(error, { status: 400 });
    }

    // Derivar nombre del proyecto de la descripción (primeras 6 palabras)
    const projectName = body.input.description
      .trim()
      .split(/\s+/)
      .slice(0, 6)
      .join(" ")
      .replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s0-9\-]/g, "")
      .trim() || "Proyecto sin nombre";

    const rawMarkdown = buildMockMarkdown(projectName);

    const proposal: StoredProposal = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      projectName,
      input: body.input,
      output: {
        executiveSummary: "",    // En Fase 3 se parsea el markdown
        generalObjective: "",
        specificObjectives: [],
        scope: { includes: [], excludes: [] },
        assumptions: [],
        constraints: [],
        wbsTree: "",
        wbsTable: [],
        deliverables: [],
        milestones: [],
        risks: [],
        kpis: [],
        pendingValidations: [],
        rawMarkdown,
      },
    };

    const response: GenerateResponse = { proposal };
    return NextResponse.json(response, { status: 200 });
  } catch {
    const error: ApiError = { error: "Error interno del servidor.", code: "UNKNOWN" };
    return NextResponse.json(error, { status: 500 });
  }
}
