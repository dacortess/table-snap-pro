# Table Snap Pro

**Table Snap Pro** es una aplicación web que permite extraer tablas estructuradas a partir de imágenes y convertirlas automáticamente en archivos Excel (.xlsx) mediante modelos de visión artificial con Inteligencia Artificial.

Está diseñada para agilizar la digitalización de datos provenientes de fotografías, documentos escaneados o capturas de pantalla, eliminando la necesidad de transcripción manual.

**Aplicación en producción:**
[https://tablesnappro.dacortess.com](https://tablesnappro.dacortess.com)

---

## Características principales

* Carga segura de imágenes en formatos estándar (JPG, PNG, WebP) con validación automática.
* Monitoreo en tiempo real de la disponibilidad de modelos gratuitos de visión por computador vía OpenRouter.
* Detección y extracción automática de tablas mediante modelos de visión artificial basados en IA.
* Arquitectura multi-modelo con failover automático, que garantiza continuidad del servicio ante fallos de un modelo.
* Vista previa de la imagen antes de iniciar el procesamiento para verificación del usuario.
* Seguimiento visual del flujo de extracción mediante indicadores de progreso y estados confirmados.
* Previsualización estructurada de la tabla resultante a partir de los datos extraídos.
* Generación y descarga de archivos Excel (.xlsx) listos para su uso o análisis.
* Interfaz totalmente responsiva, optimizada para dispositivos móviles y de escritorio.
---

## Procesamiento con Inteligencia Artificial

### Sistema de selección dinámica de modelos

Table Snap Pro implementa un sistema inteligente que:

* Consulta en tiempo real los modelos disponibles en **OpenRouter API**.
* Filtra automáticamente modelos con capacidad **multimodal (imagen + texto)**.
* Selecciona únicamente modelos de proveedores reconocidos:

  * OpenAI
  * Google
  * Anthropic
  * Meta
  * Qwen
* Utiliza exclusivamente **modelos gratuitos disponibles públicamente**.
* Ordena los modelos por **capacidad de contexto**, priorizando los más robustos.
* Prueba automáticamente múltiples modelos hasta encontrar uno operativo.

> **Modelos variables:**
> Los modelos específicos pueden cambiar según la disponibilidad en tiempo real.
> El sistema siempre selecciona el **modelo gratuito con mayor capacidad disponible** en el momento de la solicitud.

---

### Proveedores de modelos

Dependiendo de la disponibilidad en OpenRouter, las imágenes pueden ser procesadas por modelos de:

* **OpenAI** – GPT-4 Vision, GPT-4o y variantes
* **Google** – Gemini y Gemma con capacidades de visión
* **Anthropic** – Claude 3/4 con soporte multimodal
* **Meta** – Llama Vision y modelos multimodales
* **Qwen** – Qwen VL y modelos de visión

---

## Tecnologías utilizadas

### Frontend & Desarrollo

* **Next.js 16**
* **React 19**
* **TypeScript**
* **Tailwind CSS**

### Inteligencia Artificial

* **OpenRouter API** (modelos de visión multimodal)

### Procesamiento de datos

* **SheetJS (xlsx)**

---

## Instalación local

### Clonar el repositorio

```bash
git clone https://github.com/dacortess/table-snap-pro.git
cd table-snap-pro
```

### Instalar dependencias

```bash
pnpm install
```

### Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
OPENROUTER_API_KEY=tu_api_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Ejecutar en entorno de desarrollo

```bash
pnpm dev
```

La aplicación estará disponible en:

```
http://localhost:3000
```

---

## Licencia

Este proyecto se distribuye bajo la licencia
**Apache License 2.0**
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)
