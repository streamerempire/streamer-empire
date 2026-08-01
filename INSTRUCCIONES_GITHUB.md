# PARCHE STREAMER EMPIRE — GANANCIAS Y 10 FOTOGRAFÍAS

Este parche hace tres cambios sin reemplazar el diseño ni los formularios del sitio:

1. En todas las menciones del rango de ganancias muestra, según el idioma:
   - Sin experiencia ni requisitos escolares.
   - Ganancias de USD 1,000 a USD 3,000 mensuales o mucho más.
   - Aclara que dependen de la actividad de la audiencia, las donaciones y las horas.

2. Cambia las instrucciones de “al menos 3 fotos” por:
   - Español: “Sube al menos 10 fotos tuyas.”
   - Y su traducción profesional en todos los idiomas del sitio.

3. En formularios HTML propios, impide enviar una carga de imágenes con menos de 10 archivos.
   Si el formulario está alojado dentro de Google Forms, la validación numérica también debe configurarse dentro de Google Forms porque el navegador no permite modificar el contenido interno de un iframe externo.

## ARCHIVO QUE DEBES SUBIR

`streamer-content-patch.js`

Debe quedar en la carpeta principal del repositorio, al mismo nivel que `index.html`.

## PASOS EN GITHUB

1. Entra en GitHub y abre el repositorio de Streamer Empire.
2. Pulsa **Add file**.
3. Selecciona **Upload files**.
4. Arrastra el archivo `streamer-content-patch.js`.
5. En **Commit changes**, escribe:
   `Update earnings and require 10 streamer photos`
6. Pulsa **Commit changes**.

## ACTIVAR EL PARCHE EN INDEX.HTML

1. En el repositorio, abre `index.html`.
2. Pulsa el icono del lápiz: **Edit this file**.
3. Ve casi hasta el final del archivo.
4. Justo antes de `</body>`, agrega esta línea:

```html
<script src="streamer-content-patch.js"></script>
```

Debe quedar parecido a esto:

```html
<script src="assets/js/main.js"></script>
<script src="streamer-content-patch.js"></script>
</body>
</html>
```

5. Pulsa **Commit changes**.
6. Escribe:
   `Activate earnings and photo-count patch`
7. Confirma con **Commit changes**.

## COMPROBACIÓN

GitHub Pages suele reflejar el cambio en 1 a 5 minutos.

Después:

1. Abre `https://www.streamerempire.com/`.
2. Presiona `Ctrl + F5` para evitar que el navegador use una versión anterior.
3. Revisa los nueve idiomas.
4. Confirma que ya no aparezca ninguna instrucción de 3 fotos.
5. Confirma que el texto de ganancias muestre USD 1,000–3,000 o mucho más y la condición sobre audiencia, donaciones y horas.

## IMPORTANTE SOBRE GOOGLE FORMS

Este parche modifica la página web y sus formularios HTML propios. Si el texto “Sube al menos 3 fotos” está dentro de un formulario de Google incrustado, también debes editar esa pregunta directamente en Google Forms y cambiarla por:

`Sube al menos 10 fotos tuyas.`

Además, Google Forms debe permitir cargar por lo menos 10 archivos en esa pregunta.
