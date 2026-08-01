# PARCHE DE LINKTREE Y LINKEDIN — STREAMER EMPIRE

Este parche realiza solamente estos cambios en la sección **Contactos y redes**:

1. Agrega Linktree:
   `https://linktr.ee/streamerempire`

2. Coloca Linktree antes que todas las demás redes.

3. Agrega LinkedIn inmediatamente después:
   `https://www.linkedin.com/company/streamerempire/`

4. Conserva sin cambios Instagram, TikTok, YouTube, Facebook, Twitch y el resto de la página.

## ARCHIVO

Sube este archivo al repositorio:

`streamer-social-links-patch.js`

Debe quedar en la carpeta principal, al mismo nivel que `index.html`.

## PASOS EN GITHUB

1. Abre el repositorio de Streamer Empire.
2. Pulsa **Add file**.
3. Selecciona **Upload files**.
4. Sube `streamer-social-links-patch.js`.
5. En el mensaje del cambio escribe:

   `Add Linktree and LinkedIn to contact social links`

6. Pulsa **Commit changes**.

## ACTIVAR EL PARCHE EN INDEX.HTML

1. Abre `index.html`.
2. Pulsa el icono del lápiz.
3. Ve al final del archivo.
4. Justo antes de `</body>`, agrega:

```html
<script src="streamer-social-links-patch.js"></script>
```

Si ya instalaste el parche anterior, las dos líneas deben quedar así:

```html
<script src="streamer-content-patch.js"></script>
<script src="streamer-social-links-patch.js"></script>
</body>
</html>
```

5. Pulsa **Commit changes**.
6. Usa este mensaje:

   `Activate Linktree and LinkedIn social links patch`

## COMPROBACIÓN

1. Espera de 1 a 5 minutos.
2. Abre `https://www.streamerempire.com/`.
3. Presiona `Ctrl + F5`.
4. Baja a **Contactos y redes**.
5. Verifica este orden:

   1. Linktree
   2. LinkedIn
   3. Las redes que ya existían

Este parche no cambia textos, idiomas, formularios, imágenes, estilos ni ninguna otra sección.
