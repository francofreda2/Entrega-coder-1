# PM Copilot

Asistente basado en IA (Claude de Anthropic) para transformar descripciones simples de proyectos en artefactos completos de project management.

## Qué genera

- Resumen ejecutivo
- Objetivo general y específicos
- Alcance (incluye / excluye)
- Supuestos y restricciones
- EDT/WBS en árbol ASCII + tabla
- Entregables principales
- Hitos
- Riesgos y mitigaciones
- KPIs sugeridos
- Pendientes de validación

## Requisitos

- Node.js 18 o superior
- Una API key de Anthropic ([obtenerla acá](https://console.anthropic.com/))

## Instalación y uso local

```bash
# 1. Clonar el repositorio
git clone <url-del-repo>
cd <nombre-del-repo>

# 2. Instalar dependencias
npm install

# 3. Configurar la API key
cp .env.example .env.local
# Editar .env.local y pegar tu ANTHROPIC_API_KEY

# 4. Correr en modo desarrollo
npm run dev

# 5. Abrir en el navegador
# http://localhost:3000
```

## Estructura del proyecto

```
src/
├── app/                    # Pages y API routes (Next.js App Router)
│   ├── page.tsx            # Home: formulario + resultado
│   ├── history/            # Historial de propuestas
│   ├── settings/           # Base de conocimiento
│   └── api/
│       ├── generate/       # POST: genera propuesta con LLM
│       ├── proposals/      # GET: historial
│       └── knowledge/      # GET/POST/DELETE: base de conocimiento
├── components/             # Componentes React reutilizables
├── lib/                    # Lógica de negocio
│   ├── llm.ts              # Adapter Anthropic (intercambiable)
│   ├── prompts.ts          # System prompt + builder de user prompt
│   ├── storage.ts          # Persistencia en JSON local
│   └── errors.ts           # Errores tipados
└── types/                  # Interfaces TypeScript
data/                       # Datos locales (no se suben a git)
├── proposals.json          # Historial de propuestas
└── knowledge.json          # Base de conocimiento
```

## Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `ANTHROPIC_API_KEY` | API key de Anthropic (requerida) |

## Deployment en Vercel

1. Hacer fork o push del repo a GitHub
2. Ir a [vercel.com](https://vercel.com) → New Project → importar el repo
3. En "Environment Variables" agregar `ANTHROPIC_API_KEY`
4. Deploy → listo
