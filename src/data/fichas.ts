// Páginas propias de esta plantilla (NoExpertise): espejo de `fichas:` y `zonas:` de template.yaml.
// Cada lista de FICHAS da una página por elemento con `detalle` en /<ruta>/<slug>/ (src/pages/[coleccion]/[slug].astro).
// Sin zonas: null (la empresa trabaja desde su base).
import type { DefFicha, DefZonas } from '../lib/paginas';

export const FICHAS: DefFicha[] = [
  { lista: 'actividades', campo: 'actividades', ruta: 'actividades', nombre: 'Actividad', tipo: 'TouristTrip' },
];

export const ZONAS: DefZonas | null = null;
