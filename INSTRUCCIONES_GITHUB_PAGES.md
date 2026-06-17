# INSTRUCCIONES PARA SUBIR STREAMER EMPIRE A GITHUB PAGES

## 1. Crear un repositorio nuevo

1. Entra a GitHub.
2. Haz clic en el botón `+` de la parte superior derecha.
3. Selecciona `New repository`.
4. Nombre sugerido del repositorio:
   `streamer-empire`
5. Marca el repositorio como `Public`.
6. No necesitas seleccionar plantillas.
7. Haz clic en `Create repository`.

## 2. Subir los archivos

1. Entra al repositorio que acabas de crear.
2. Haz clic en `uploading an existing file` o en `Add file` > `Upload files`.
3. Abre en tu computadora la carpeta descomprimida de este ZIP.
4. Arrastra TODO el contenido de la carpeta, no la carpeta completa. Debes subir:
   - `index.html`
   - carpeta `assets`
   - carpeta `legal`
   - `README.md`
   - este archivo de instrucciones
5. Baja hasta el campo `Commit changes`.
6. Escribe:
   `First Streamer Empire website upload`
7. Haz clic en `Commit changes`.

## 3. Activar GitHub Pages

1. Dentro del repositorio, entra a `Settings`.
2. En el menú izquierdo, busca `Pages`.
3. En `Build and deployment`, selecciona:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
4. Haz clic en `Save`.
5. GitHub tardará entre 1 y 5 minutos.
6. Cuando esté listo, verás una URL parecida a:
   `https://TU-USUARIO.github.io/streamer-empire/`

## 4. Probar la página

Abre la URL que GitHub te dé y revisa:

- que cargue el logo
- que carguen imágenes
- que carguen videos
- que el menú funcione
- que el selector de idiomas funcione
- que el botón de WhatsApp abra WhatsApp
- que el correo abra tu programa de email
- que el archivo legal descargue

## 5. Si algo no carga

Revisa primero que subiste las carpetas completas:

- `assets/css/style.css`
- `assets/js/app.js`
- `assets/js/translations.js`
- `assets/images/...`
- `assets/videos/...`
- `legal/streamer-empire-legal-summary.txt`

No cambies los nombres de carpetas ni archivos.

## 6. Dominio personalizado: streamerempire.com

Esto es opcional y se hace después de que GitHub Pages ya funcione.

1. En GitHub, entra a `Settings` > `Pages`.
2. En `Custom domain`, escribe:
   `streamerempire.com`
3. Haz clic en `Save`.
4. En tu proveedor del dominio, configura los DNS hacia GitHub Pages.

No actives el dominio personalizado hasta que la página ya funcione con la URL de GitHub.
