# Plantilla «Turismo activo y aventura» (NoExpertise)

Web estática Astro 5 + Tailwind 4, derivada de AstroWind (MIT, ver `LICENSE-ASTROWIND.md`). Estilo: **sport** (tema
Sport de Hallmark: hoja de resultados; papel gris frío, tinta azul casi negra, Saira Condensed 800 en mayúsculas para
titulares, cifras y botones, Albert Sans para leer, JetBrains Mono para las horas, filetes fino y de 2 px, radio de
4 px, sin sombras, fotos impresas en la tinta y el lima solo como relleno). Es la web de una empresa con base propia y
catálogo de actividades: habla de «nosotros» y trata al cliente de tú. Reservar manda: botón en la cabecera, en la
portada, en cada actividad y barra fija «Llamar / WhatsApp / Reservar» en el móvil. Castellano de España, frases cortas.
Diseño y decisiones: `DISEÑO.md`.

## Dónde está cada cosa
- **Textos, contacto, menú, SEO y secciones**: `site.yaml` (raíz). Es la única fuente de contenido. `src/data/site.ts` lo carga y lo tipa; no pongas textos fijos en los componentes.
- **Colores**: `site.yaml → colores` (primario, acento, fondo, texto). `src/layouts/Base.astro` los convierte en variables CSS (`--c-primario`…).
  - `primario` = banda oscura: cabecera, la jornada, el pie y la barra del móvil.
  - `acento` = lima: siempre de relleno con tinta encima (botón de reservar, la etapa destacada, «La más reservada», «El más pedido»). Nunca como color de letra sobre el papel.
  - `fondo` = papel; `texto` = tinta (también es el color en que se imprimen las fotos).
  - Derivados en `src/styles/global.css`: `--papel-2`, `--papel-3`, `--tinta-2`, `--apagado`, `--filete`, `--barra` (el filete de 2 px), `--acento-hondo` (subrayados y foco sobre el papel), `--sobre-primario` y `--sobre-acento` (texto claro u oscuro según el color del cliente). Probado con primario verde y acento naranja, y con primario claro y acento azul.
- **Tipografías**: `public/fuentes/` (woff2 alojados, OFL-1.1, `LICENCIAS.md`), `@font-face` en `global.css`, `preload` de Saira Condensed en `Base.astro`. No añadas fuentes externas.
- **Titulares**: nunca parten palabras (`overflow-wrap: normal`, `hyphens: manual`). Su tamaño es `min(tope, 100cqi / var(--k))`: `--k` lo calcula `anchoTitular()` de `src/data/site.ts` con la palabra más larga, y el titular se mide por su columna (`.cq`). Si creas un titular nuevo, ponle `style={`--k:${anchoTitular(texto)}`}` y un ancestro `.cq`.
- **Fotos**: `public/fotos/` (lista y descripción en `fotos.json`); si una foto todavía no existe, `Imagen.astro` enseña su respaldo `public/placeholders/<mismo nombre>.svg`. Van dentro de `.foto` (duotono tinta/papel por CSS). En `site.yaml`, ruta absoluta (`/fotos/hero.jpg`). Sin caras.
- **Logo**: `site.yaml → logo` (ruta en `public/`); vacío = el nombre en Saira Condensed.
- **Pie**: nombre muy grande, reservas, la base (dirección y horario), menú, redes y «Web creada con NoExpertise» si `marca_pie` no es `false`. La barra móvil sale con teléfono, WhatsApp o botón de cabecera.

## Secciones
Cada sección es un componente que solo se pinta si `site.yaml → secciones.<id>.activa` es `true`, en el orden de `site.yaml`.
- `hero` → `hero.astro`: portada a sangre (foto `imagen` impresa en la tinta, velo de tinta), `antetitulo`, `titulo` (mejor 3-6 palabras), `texto` (una frase), `cta` (lleno) y `cta_secundario` (borde). Debajo, las cifras `items: [{titulo, texto}]` (cifra corta y su etiqueta; sin cifras no sale la fila).
- `actividades` → `actividades.astro`: `actividades: [{titulo, categoria, texto, nivel, duracion, edad, precio, temporada, incluye, imagen, destacado, detalle, imagenes}]`. `categoria` (Agua, Montaña, Tierra…) alimenta el filtro (sale con dos o más). `nivel`: «Iniciación», «Medio» o «Avanzado» se pintan con 1-3 barras (otro texto, tal cual). `precio` es por persona («39 €»; la web añade «por persona»). `incluye` con «;». La de `destacado: true` va en grande con «La más reservada» (solo una).
- `jornada` → `jornada.astro`: `etapas: [{hora, titulo, texto, destacado}]` (hora libre, «9:30»). La etapa con `destacado: true` va sobre el lima.
- `packs` → `packs.astro`: `packs: [{nombre, texto, incluye, duracion, precio, destacado}]` en tabla; `incluye` con «;»; el `destacado` lleva «El más pedido». `nota` opcional.
- `grupos` → `grupos.astro`: `texto`, `imagen` a sangre, `items: [{titulo, texto}]` (tipos de grupo) y `cta`.
- `seguridad` → `seguridad.astro`: `texto` e `items: [{titulo, texto}]`.
- `galeria` → `galeria.astro`: `galeria: [ruta…]` (la primera grande).
- `opiniones` → `opiniones.astro`: `testimonios: [{texto, autor, nota}]`. No inventes opiniones.
- `base` → `base.astro`: `texto`, `imagen`, `items: [{titulo, icono}]` (servicios), `horario: [{dia, horas}]` (temporadas). La dirección sale de `contacto.direccion`.
- `preguntas` → `preguntas.astro` (acordeón `details/summary`; sin preguntas no se pinta).
- `contacto` → `contacto.astro`: teléfono enorme, WhatsApp, `enlace_reservas` (motor de reservas online; vacío = no sale), vías y formulario de reserva (fecha, personas, actividad de la lista y nivel con `niveles` en «;»). `boton_formulario` opcional.
- `texto` → `texto.astro`: apartado genérico (párrafos, `imagen`, `items`, `cta`). Para apartados nuevos: `tipo: texto`.

## Reglas para órdenes
1. **Activar o quitar una sección**: cambia `activa: true|false` en `site.yaml`. No borres componentes.
2. **Reordenar secciones**: mueve el bloque dentro de `secciones:` en `site.yaml`.
3. **Cambiar textos, precios, actividades, fotos**: solo en `site.yaml`. Si un texto contiene comas o dos puntos dentro de `{ … }`, ponlo entre comillas (horas y precios, siempre).
4. **Listas planas**: nunca una lista dentro de un elemento de lista. Precios siempre como texto entre comillas. Máximo 24 elementos por lista.
5. **Página nueva**: crea `src/pages/<slug>.astro` con `import Base from '../layouts/Base.astro'` y `<Base titulo="…" descripcion="…">…</Base>`; enlázala en `site.yaml → menu`. Ejemplo: `src/pages/aviso-legal.astro`.
6. **Sección nueva**: mejor un apartado con `tipo:` (`tipo: texto`, `tipo: packs`, `tipo: actividades`…) y su propio id. Si hace falta un diseño nuevo, crea `src/components/secciones/<id>.astro` con `seccion(Astro.props.id)` y `Banda` (`color`: papel, clara o tinta; como mucho dos bandas oscuras contando el pie). `src/pages/index.astro` la recoge sola: no lo toques.
7. **No tocar** `src/layouts/Base.astro`, `src/pages/index.astro`, `tailwind.config.mjs` ni `src/styles/comun.css` salvo orden explícita de diseño. Los ids `hero` y `contacto` son obligatorios. Tampoco `src/lib/seo.ts` ni `src/pages/robots.txt.ts`, `sitemap.xml.ts` y `llms.txt.ts`: son el SEO de base y salen solos de `site.yaml`. `seo.url` y `seo.indexable` los pone la plataforma: no los cambies.
8. Mantén: `lang="es-ES"`, imágenes con `Imagen.astro` dentro de `.foto`, sin JavaScript nuevo salvo necesidad real (hay dos pequeños: cerrar el menú móvil y el filtro de actividades), el lima solo de relleno, titulares sin palabras partidas, sin scroll horizontal en móvil. Imágenes de contenido con `alt` sacado del contenido (`altHero`, `altFicha`, `altGaleria`, `altSeccion` de `src/lib/seo.ts`); las decorativas, `alt=""`.
9. El formulario no tiene servidor: abre el correo (`mailto`) con el email de `site.yaml` (la plataforma lo conecta al publicar). No cambies su marcado en `src/components/ui/FormularioContacto.astro`.
10. Iconos: `src/components/ui/Icono.astro` (`whatsapp, telefono, correo, mapa, reloj, calendario, check, agua, casco, cuerda, mosqueton, mochila, botiquin, bici, usuarios, escudo, ducha`…). Nunca emojis ni flechas pegadas al texto.

## Construir
```
npm ci && npm run build      # resultado en dist/
npx astro preview            # ver dist/ en http://localhost:4321
```
Antes de dar una orden por buena: `npm run build` sin errores.

## Páginas propias (fichas por elemento)
- Lista con página propia (espejo de `fichas:` de template.yaml en `src/data/fichas.ts`): `secciones.actividades.actividades` → `/actividades/<slug>/` (actividad, `TouristTrip`).
  **Solo los elementos con `detalle`** (texto largo, párrafos separados por una línea en blanco, ≤ 3000 caracteres, sin HTML) tienen página;
  los demás siguen como hasta ahora. Campos opcionales: `slug` (si falta, sale del nombre; no lo pongas sin motivo)
  e `imagenes` («/fotos/a.jpg; /fotos/b.jpg», galería de la ficha). El resto de campos sale en la hoja de datos de la ficha.
- Una orden «añade una página para X» = escribir su `detalle` en site.yaml. Nunca crees a mano páginas en `src/pages/actividades/`.
- Sin zonas (`ZONAS = null`): la empresa trabaja desde su base.
- No tocar `src/lib/paginas.ts`, `src/lib/slug.ts` ni `src/lib/seo.ts` (comunes a todas las plantillas).

## Varias páginas
- `paginas:` (raíz de site.yaml, opcional): `[{ ruta, titulo, secciones: "actividades; packs" }]`, como mucho 6, cada sección en una sola página y nunca `hero`. Con ella la web pasa a Inicio (hero + lo que no esté en ninguna página) y una página por entrada; el menú se hace solo y los enlaces `/#id` se cambian solos por la dirección de su sección. Sin ella, una sola página larga. Una orden «haz la web de varias páginas» = escribir `paginas`; nunca crees páginas a mano para eso.
- No tocar `src/lib/multipagina.ts`, `src/pages/index.astro` ni `src/pages/[...pagina].astro` (comunes a todas las plantillas). En un componente, un enlace fijo a una sección va con `enlace('/#contacto')` (de `src/lib/multipagina.ts`).
