
**Mi Portfolio — React + TypeScript + Vite**

Descripción
- Este repositorio es una plantilla/portfolio personal creado con Vite, React (TSX) y TypeScript. Incluye configuración básica para desarrollo local, estilos con TailwindCSS y algunas utilidades para una experiencia de desarrollo moderna.

Estado del proyecto
- Proyecto con React 19, Vite, TypeScript (~5.9.x), TailwindCSS (v4) y ESLint configurado. Contiene secciones, componentes y assets para un portfolio personal.

## Requisitos
- Node.js 16+ (recomendado)
- npm, pnpm o yarn

## Instalación (rápida)
```powershell
git clone <url-del-repo>
cd my-portfolio
npm install
```

## Comandos principales
- `npm run dev` — Inicia Vite en modo desarrollo con HMR.
- `npm run build` — Construye la aplicación para producción (`tsc -b` y `vite build`).
- `npm run preview` — Previsualiza la build de producción localmente.
- `npx tsc --noEmit` — Valida los tipos TypeScript sin generar archivos.
- `npm run lint` — Ejecuta ESLint en el código.

## Estructura relevante
- `index.html` — Entrada HTML.
- `src/` — Código fuente principal:
  - `main.tsx`, `App.tsx` — Punto de arranque y componente raíz.
  - `components/` — Componentes UI (layout, secciones, ui).
  - `assets/` — Recursos internos.
- `tsconfig.json`, `tsconfig.node.json` — Configuración TypeScript.
- `vite.config.ts` — Configuración del bundler.

