# Gestión de Laboratorios

Este repositorio contiene la aplicación frontend "gestion-laboratorios" (React + Vite + TypeScript).

### ¿Cómo ponerte en marcha rápidamente?

Sigue este checklist para tener el entorno listo en minutos:

- [ ] Clonar el repo
- [ ] Instalar dependencias
- [ ] Abrir en VS Code y aplicar las extensiones recomendadas
- [ ] Ejecutar el servidor de desarrollo

Resumen de versiones

- React: ^19.2.0
- Vite: ^7.2.2
- TypeScript: ~5.9.3
- Recomendado: Node.js >= 18 (Node 18/20 funcionan bien con estas versiones de Vite/TypeScript)

Requisitos previos

- Node.js (recomendado: 18.x o 20.x) instalado
- npm (v8/9 viene con Node 18/20) o pnpm/yarn si prefieres (los comandos indicados usan npm)
- Visual Studio Code

Instalar dependencias:

```batch
npm install
```

Ejecutar en modo desarrollo (Vite):

```batch
npm run dev
```

Por defecto Vite sirve la app en http://localhost:5173 — abre esa URL en el navegador.

Comandos útiles

- Levantar dev server: npm run dev

Estructura relevante del proyecto (resumen)

- src/: código fuente React/TSX
- src/components/: componentes organizados por funcionalidad
- src/views/: vistas principales (Dashboard, Inventory, Booking...)
