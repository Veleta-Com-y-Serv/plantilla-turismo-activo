# Plantilla NoExpertise · Turismo activo y aventura

Web para empresas de turismo activo y multiaventura con base propia: rafting, hidrospeed, kayak, barranquismo, vía
ferrata, bici eléctrica, parques de aventura y actividades para grupos, colegios y empresas. Diseñada con el tema
**Sport** de Hallmark: papel gris frío, tinta azul casi negra, titulares en Saira Condensed en mayúsculas, horas en
JetBrains Mono, filetes de dos grosores, fotos impresas en la tinta (duotono) y un único color de señal (lima) como
relleno. Pensada para el turista que mira desde el móvil: barra fija «Llamar / WhatsApp / Reservar».

Astro 5 + Tailwind 4, derivada de AstroWind (MIT, `LICENSE-ASTROWIND.md`). Todo el contenido está en `site.yaml`.
Tipografías alojadas en `public/fuentes/` (OFL-1.1, ver `public/fuentes/LICENCIAS.md`).

## Secciones (en este orden en el ejemplo)

| id | Qué enseña | Campos propios |
|---|---|---|
| `hero` | Portada a sangre con la foto impresa en la tinta, titular, frase y dos botones; debajo, las cifras | `items: [{titulo, texto}]` (cifra y etiqueta; la plataforma no las inventa) |
| `actividades` | El catálogo: filtro por categoría, la destacada en grande y el resto en rejilla, cada una con su hoja de datos | `actividades: [{titulo, categoria, texto, nivel, duracion, edad, precio, temporada, incluye, imagen, destacado, detalle, imagenes}]` |
| `jornada` | El día de la actividad como etapas sobre una barra, en la banda oscura | `etapas: [{hora, titulo, texto, destacado}]` |
| `packs` | Hoja de precios de los packs entre dos barras | `packs: [{nombre, texto, incluye, duracion, precio, destacado}]`, `nota` |
| `grupos` | Despedidas, colegios y empresas: mitad foto a sangre, filas y botón de presupuesto | `imagen`, `items: [{titulo, texto}]`, `cta` |
| `seguridad` | Monitores, seguro, material y parte del río en filas | `items: [{titulo, texto}]` |
| `galeria` | Una foto grande y otra al lado; el resto debajo | `galeria: [ruta…]` |
| `opiniones` | La primera como frase grande y las demás en dos columnas | `testimonios: [{texto, autor, nota}]` |
| `base` | Punto de encuentro: dirección grande, cómo llegar, servicios y horario por temporadas | `imagen`, `items: [{titulo, icono}]`, `horario: [{dia, horas}]` |
| `preguntas` | Preguntas frecuentes (acordeón, JSON-LD FAQPage) | `preguntas: [{pregunta, respuesta}]` |
| `contacto` | Reserva: teléfono enorme, WhatsApp, reserva online, vías y formulario de reserva | `enlace_reservas`, `niveles` («;»), `boton_formulario` |

`texto` es el diseño genérico para apartados nuevos (`tipo: texto`).

## Construir

```
npm ci
npm run build     # dist/
```

Fotos: `fotos.json` (12, sin personas reconocibles); mientras no existan se ven los SVG de `public/placeholders/`.

## Páginas propias
- Cada elemento de `secciones.actividades.actividades` con `detalle` tiene su página en `/actividades/<slug>/` (`src/pages/[coleccion]/[slug].astro`, tipo `TouristTrip`). Sin zonas.
- Campos opcionales de los elementos con ficha: `detalle` (párrafos separados por una línea en blanco), `slug` e `imagenes` («/fotos/a.jpg; /fotos/b.jpg»).
- Varias páginas (opcional, `paginas:` en la raíz de `site.yaml`): Inicio + una página por entrada (`{ ruta, titulo, secciones: "a; b" }`, hasta 6) con el menú hecho solo; reparto recomendado en `template.yaml → paginas` (Actividades, Grupos y empresas, La base, Reservas). Sin la clave, una sola página larga.
