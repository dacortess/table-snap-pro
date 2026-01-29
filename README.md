# Table Snap Pro

Table Snap Pro es una aplicación web que permite extraer tablas desde imágenes y convertirlas automáticamente en archivos Excel utilizando modelos de visión con inteligencia artificial. Está pensada para facilitar la digitalización de datos capturados en fotos, escaneos o capturas de pantalla.

URL: https://tablesnappro.dacortess.com


---

## Funcionalidades

- Carga de imágenes en formatos comunes (JPG, PNG, WebP).
- Detección y extracción automática de tablas con IA.
- Sistema multi-modelo con respaldo automático si un modelo falla.
- Vista previa de la imagen antes de procesar.
- Generación y descarga de archivos Excel (.xlsx).
- Interfaz responsiva.

---

## Tecnologías utilizadas

Desarrollo:
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS

Inteligencia Artificial:
- OpenRouter API (modelos de visión)

Procesamiento de datos:
- Sheets JS

---

## Modelos de IA utilizados

La aplicación prueba los siguientes modelos en orden:

1. google/gemini-2.0-flash-exp:free
2. qwen/qwen-2-vl-7b-instruct:free
3. meta-llama/llama-3.2-11b-vision-instruct:free

Si un modelo no responde correctamente, se intenta con el siguiente automáticamente.

Los modelos utilizados son modelos gratuitos que no consumen creditos de OpenRouter.

---

## Instalación local

### Clonar repositorio

```bash
git clone https://github.com/dacortess/table-snap-pro.git
cd table-snap-pro
````

### Instalar dependencias

```bash
pnpm install
```

### Configurar variables de entorno

```env
OPENROUTER_API_KEY=tu_api_key
NEXT_PUBLIC_SITE_URL=localhost:3000
```

### Ejecutar en desarrollo

```bash
pnpm run dev
```

La aplicación estará disponible en:

```
http://localhost:3000
```


## Licencia

Este proyecto está bajo la licencia [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0).
