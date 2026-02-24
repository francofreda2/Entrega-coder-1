# PM Copilot

Asistente basado en LLM para transformar descripciones breves de proyectos en artefactos de project management completos y profesionales.

## ¿Qué genera?

A partir de una descripción simple del proyecto, PM Copilot produce:

- Resumen ejecutivo
- Objetivo general y específicos
- Alcance (incluye / excluye)
- Supuestos y restricciones
- EDT/WBS en árbol ASCII
- Tabla EDT (Nivel 0 al 3)
- Entregables principales
- Hitos del proyecto
- Riesgos + mitigaciones
- KPIs sugeridos
- Pendientes de validación

## Stack

- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS**
- **Anthropic API** (Claude) — llamada server-side via API route
- **Persistencia local** — archivos JSON en `data/` (sin base de datos)

---

## Cómo correr el proyecto localmente

### 1. Prerequisitos

- Node.js v18 o superior
- Una API key de Anthropic ([obtenerla aquí](https://console.anthropic.com))

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copiá el archivo de ejemplo y completá tu clave:

```bash
cp .env.example .env.local
```

Editá `.env.local`:

```env
ANTHROPIC_API_KEY=sk-ant-...tu-clave-aquí...
LLM_MODEL=claude-sonnet-4-6
```

### 4. Correr en desarrollo

```bash
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000) en tu navegador.

### 5. Build de producción (local)

```bash
npm run build
npm start
```

---

## Deploy en Vercel (producción)

### Paso 1: Crear cuenta en Vercel

1. Ir a [vercel.com](https://vercel.com)
2. Hacer clic en **"Sign Up"** → **"Continue with GitHub"**
3. Autorizar a Vercel a acceder a tus repositorios

### Paso 2: Importar el proyecto

1. En el dashboard de Vercel, clic en **"Add New… → Project"**
2. Buscar el repositorio `Entrega-coder-1`
3. Clic en **"Import"**
4. En la configuración, dejar todo por defecto (Vercel detecta Next.js automáticamente)

### Paso 3: Configurar las variables de entorno

Antes de hacer deploy, en la sección **"Environment Variables"**:

| Variable | Valor |
|---|---|
| `ANTHROPIC_API_KEY` | `sk-ant-...tu-clave...` |
| `LLM_MODEL` | `claude-sonnet-4-6` (opcional) |

### Paso 4: Deploy

Clic en **"Deploy"**. En ~2 minutos tenés la URL pública.

Cada vez que hagas `git push` al branch principal, Vercel redespliega automáticamente.

> **Importante sobre el historial en Vercel:** El storage en JSON funciona localmente. En Vercel (serverless), los archivos `data/` no persisten entre deploys. Para producción real, migrar a una base de datos (ej: Vercel Postgres, PlanetScale, Upstash Redis). Ver sección "Próximos pasos".

---

## Estructura del proyecto

```
src/
├── app/
│   ├── page.tsx                  # Home: formulario + resultado
│   ├── history/page.tsx          # Historial de propuestas
│   ├── knowledge/page.tsx        # Base de conocimiento
│   └── api/
│       ├── generate/route.ts     # POST → llama al LLM
│       ├── proposals/route.ts    # GET → lista historial
│       ├── proposals/[id]/       # GET → propuesta por ID
│       ├── knowledge/route.ts    # GET/POST → base de conocimiento
│       └── knowledge/[id]/       # DELETE → eliminar documento
├── components/
│   ├── ProjectForm.tsx           # Formulario de entrada
│   ├── ProposalResult.tsx        # Renderiza resultado + export
│   └── KnowledgePanel.tsx        # Gestiona base de conocimiento
├── lib/
│   ├── llm.ts                    # Adapter Anthropic (intercambiable)
│   ├── prompts.ts                # System prompt + user prompt builder
│   └── storage.ts                # Capa de persistencia JSON
└── types/
    └── index.ts                  # Interfaces TypeScript centrales
data/
    proposals.json                # Historial (creado en runtime, gitignored)
    knowledge.json                # Base de conocimiento (creado en runtime, gitignored)
```

---

## Cambiar el modelo de Claude

En `.env.local`, cambiar `LLM_MODEL`:

```env
# Más potente, más lento y más caro
LLM_MODEL=claude-opus-4-6

# Balanceado (default)
LLM_MODEL=claude-sonnet-4-6

# Más rápido y económico
LLM_MODEL=claude-haiku-4-5-20251001
```

No hay que tocar código.

---

## Próximos pasos (post-MVP)

- [ ] Migrar storage a base de datos para persistencia real en producción (ej: Vercel Postgres)
- [ ] Agregar streaming de la respuesta del LLM para mejor UX
- [ ] Parsear el Markdown para llenar campos estructurados (filtros, búsqueda)
- [ ] Autenticación de usuario (NextAuth)
- [ ] Templates de proyecto reutilizables
- [ ] Exportar a DOCX / PDF
