# Generax

Nuevo sitio de GENERAX construido con Astro.

## Requisitos

- Node.js 18+
- npm

## Desarrollo local

```bash
npm install
npm run dev
```

Preview local por defecto:

```text
http://localhost:4321/
```

## Build de producción

```bash
npm run build
```

El sitio estático generado queda en `dist/`.

## Deploy manual en Vercel

Configuración esperada:

- Framework Preset: `Astro`
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

Variable opcional:

- `PUBLIC_GTM_ID` para cargar Google Tag Manager

## Contenido base

- Código fuente del sitio: `src/`
- Assets públicos: `public/`
- Export de referencia del sitio original: `generax-mx/`

## GitHub

Repositorio remoto previsto:

```text
git@github.com:alanquantic/generax.git
```
