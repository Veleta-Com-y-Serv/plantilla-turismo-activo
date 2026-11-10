# Turismo activo y aventura: brief de diseño

Plantilla `turismo-activo` creada el 10/11/2026 a partir de `guia-montana` con `php artisan plantillas:nueva` y
rediseñada entera con el tema **Sport** de la skill Hallmark (género editorial). De la base solo queda la estructura
técnica (carga de `site.yaml`, fichas, varias páginas, SEO de base). Este fichero se queda en el repo: es lo que lee
quien (persona o agente) rediseñe la plantilla.

## Brief

- **Para quién**: empresas de turismo activo y multiaventura con base propia y catálogo de actividades (sectores
  `turismo-activo`, `multiaventura`, `rafting`, `barranquismo`, `aventura`, `parque-aventura`): rafting, hidrospeed,
  kayak, barranquismo, vía ferrata, paddle surf, BTT y bici eléctrica, paintball, parques de aventura; grupos,
  despedidas, colegios y empresas. Su cliente es a menudo un turista que mira desde el móvil y quiere ver las
  actividades con fotos grandes, nivel, duración, edad mínima, precio por persona, qué incluye, temporada, punto de
  encuentro y reservar. Se distingue de `guia-montana` (un guía que ofrece salidas, en primera persona) y de
  `free-tour` (visitas guiadas): aquí habla una empresa («nosotros») con su base y su catálogo.
- **Qué tiene que conseguir la web**: que **reserven** (WhatsApp, teléfono, formulario o el motor de reservas del
  cliente, `contacto.enlace_reservas`). «Reservar» en la cabecera, en la portada, en cada ficha y en la barra fija del
  móvil («Llamar / WhatsApp / Reservar»).
- **Tono**: programa de carrera, directo, de monitor. Sí: una hoja de salida con la distancia, la hora y el sitio. No:
  el anuncio de ropa deportiva, el neón de videojuego ni la plantilla de aventura con naranja, degradados y tarjetas.

## Tema Hallmark y cómo se ha traducido

Sport (`references/themes/sport.md`): papel gris frío, tinta azul casi negra, Saira Condensed 800 en mayúsculas sobre
Albert Sans, cifras condensadas y horas en mono, filetes de dos grosores, radio de 4 px, sin sombras, fotos impresas
en la tinta (duotono) y el lima como único color, siempre de relleno con tinta encima.

- **Cuatro colores** → `fondo` = papel (`#f5f7fa`), `texto` = tinta (`#0a1230`, también la sombra del duotono),
  `acento` = lima (`#cdf23d`: botón de reservar, la etapa destacada de la jornada, «La más reservada», «El más
  pedido»), `primario` = banda oscura (`#121c45`: cabecera, jornada, pie y barra del móvil).
- **Derivados** (`src/styles/global.css`): `--papel-2`/`--papel-3` (pasos de papel), `--tinta-2`, `--apagado`,
  `--filete` (fino), `--barra` (el filete de 2 px: mezcla de primario y tinta), `--acento-hondo` (el lima bajado a
  L 0,56 para subrayados y el anillo de foco sobre el papel, 3:1), `--sobre-primario` y `--sobre-acento` (texto claro u
  oscuro según la luminosidad del color del cliente, con `oklch(from …)`). Probado con primario verde `#0f5132` +
  acento naranja `#ff6b35`, y con primario claro `#e8d9b5` + acento azul `#1d4ed8`: legible en las dos.
- **Material**: cabeza de sección con la barra de 2 px a todo el ancho; hojas de datos (`dl`) con filetes finos; la
  tabla de packs entre dos barras; botones en pareja (lima lleno + borde de 2 px) en mayúsculas de Saira; etiquetas y
  antetítulos en Albert Sans 500, caja normal, sin espaciar; fotos con radio de 4 px, filete de tinta al 8 % y duotono
  por CSS (gris + `multiply` sobre el papel + capa de tinta en `lighten`). Movimiento: solo estados (subrayado lima del
  menú, el signo de las preguntas, el filtro); sin aparecer al hacer scroll.
- **Firma**: cada actividad impresa como una hoja de salida: foto en la tinta, categoría, título condensado, la hoja de
  datos (nivel con tres barras, duración, edad mínima, temporada) y el precio por persona en cifra condensada grande.
- **Titulares sin palabras partidas**: Saira Condensed 800 en mayúsculas mide 12,7 em con «Impermeabilizaciones». En
  vez de un tope fijo pequeño, cada titular se mide por su columna (`container-type`) con
  `font-size: min(tope, 100cqi / var(--k))`, y `--k` lo calcula `anchoTitular()` con la palabra más larga del propio
  titular (0,68 em por letra, con margen). Así «Baja la Noguera en rafting» sale grande y un titular con una palabra de
  20 letras cabe a 375 px y en la columna de escritorio.

## Tipografías y licencias

Saira Condensed 800 (Omnibus-Type), Albert Sans 400 y 500 (Albert Sans Project) y JetBrains Mono 500 (JetBrains), todas
**OFL-1.1**, woff2 `latin` de Fontsource en `public/fuentes/` (60 KB en total), `font-display: swap`, respaldo del
sistema de la misma clase y `preload` solo de Saira Condensed. Son las tres caras del tema; la mono tiene un único papel
(las horas de la jornada y del horario). Detalle en `public/fuentes/LICENCIAS.md`.

## Forma y ritmo de bandas

| # | Sección | Papel | Lleva |
|---|---|---|---|
| 1 | `hero` | foto + papel | Poster: foto a sangre en la tinta con velo y titular abajo a la izquierda; en móvil, la foto arriba (4:3) y el texto sobre la tinta. Debajo, las cifras entre la barra y un filete |
| 2 | `actividades` | papel | filtro por categoría, la destacada en grande (foto 7/12 + hoja) y el resto en rejilla de 3 |
| 3 | `jornada` | oscura | las etapas del día sobre una barra, la hora en mono, la etapa fuerte sobre lima |
| 4 | `packs` | papel | tabla de precios entre dos barras, el más pedido un paso de papel con marca lima |
| 5 | `grupos` | papel | foto a sangre a la izquierda, filas con filete y botón de presupuesto |
| 6 | `seguridad` | clara | cabeza a la izquierda, filas a la derecha |
| 7 | `galeria` | papel | una foto de 8 columnas y otra de 4 a la misma altura |
| 8 | `opiniones` | clara | la primera como frase grande, las demás en dos columnas |
| 9 | `base` | papel | dirección en letra condensada, cómo llegar, servicios y horario (mono); foto a sangre a la derecha |
| 10 | `preguntas` | clara | filas `details` con la cabeza fija al bajar |
| 11 | `contacto` | papel | teléfono enorme, WhatsApp, reserva online, vías y formulario de reserva |
| — | pie | oscura | nombre como mástil, cuatro columnas, barra fija del móvil |

Se alternan bandas guiadas por foto (portada, actividades, grupos, galería, base) con bandas que solo hace el material
(cifras, etapas sobre la barra, tabla, filas, teléfono a tamaño de titular); nunca dos de foto seguidas.

## Listas propias y páginas

- `actividades.actividades` {titulo, categoria, texto, nivel, duracion, edad, precio, temporada, incluye, imagen,
  destacado, detalle, imagenes}, `jornada.etapas` {hora, titulo, texto, destacado}, `packs.packs` {nombre, texto,
  incluye, duracion, precio, destacado}, `base.horario` {dia, horas} y `base.items` {titulo} (servicios).
- Fichas: cada actividad con `detalle` tiene su página en `/actividades/<slug>/` (`TouristTrip`). Sin zonas (trabaja
  desde su base). Los packs no tienen ficha (el comprobador lo sugiere): un pack se explica en una línea.
- Varias páginas recomendadas: Actividades (actividades, jornada, packs), Grupos y empresas, La base (seguridad, base),
  Reservas (preguntas, contacto). Inicio se queda con la portada, las fotos y las opiniones.
- Asistente: 13 pasos propios (empresa, cómo te reservan, actividades, el día, packs, grupos, seguridad, la base,
  horario, preguntas, fotos, colores y logo, repaso); la plataforma añade «Más de cada actividad» antes de las fotos.

## Fotos

12 fotos generadas con IA a partir de `fotos.json` (rafting desde el agua para la portada, rafting desde un puente,
hidrospeed, kayak, rápel en barranco, vía ferrata, bici eléctrica, parque de aventura, grupo con la balsa a hombros, la
base con neoprenos secándose, el material en la orilla y un salto a una poza). Sin texto legible, sin logotipos, gente
de espaldas o lejos. La herramienta da 1024×1024: se recortan al aspecto y se amplían como mucho ×1,5 (la portada, a
1536 px); el duotono y el velo disimulan la blandura a pantalla completa. Conviene que el cliente ponga las suyas.

## Lo que no se ha podido o choca con Hallmark

- `antetitulo` es contrato: se pinta como etiqueta en caja normal (Hallmark prohíbe el antetítulo).
- `opiniones` y las cifras de la portada llevan ejemplos ficticios (Hallmark prohíbe inventarlos); la plataforma los
  deja vacíos y desmarcados al crear una web.
- El sello de Hallmark no queda en la primera línea del CSS servido (Tailwind antepone su cabecera al ir en línea);
  `comun.css` (común a todas las plantillas) trae colores literales y etiquetas en mayúsculas que aquí se anulan, y el
  `style` de `<html>` con los cuatro colores es contrato. sloplint los marca (20, 48, 67) y quedan como renuncias.
- Hallmark pide 450 palabras por página; con el catálogo, los packs y las preguntas pasa de 1200. Es lo que necesita
  quien va a reservar.
- Hay botón lleno en la cabecera, la portada, el formulario y la barra del móvil: es la misma acción (reservar).
- El tema pide dos bandas oscuras como mucho: la jornada y el pie (la cabecera es una barra, no una banda).

## Ajuste del coordinador (10/11/2026)

Las fotos de las actividades (tarjetas y fichas) y la galería van en su color (`.foto--color`): el agua, el bosque y la roca venden la actividad. El duotono tinta/papel del tema se queda en la portada y en las bandas de ambiente (grupos, seguridad, base).
