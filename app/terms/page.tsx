import Link from 'next/link';
import { ArrowLeft, Shield, Database, Brain, Code, AlertTriangle, RefreshCw } from 'lucide-react';
import SectionHeader from '@/components/sections/headers/sectionHeader';
import SectionFooter from '@/components/sections/footers/sectionFooter';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100">
      <SectionHeader /> 
      <main className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl shadow-green-200/30 p-8 md:p-12 border border-green-200">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Términos y Condiciones de Uso
            </h1>
            <p className="text-slate-600">
              Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-6 mb-8">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-amber-900 mb-2">
                  Aviso importante sobre privacidad
                </h3>
                <p className="text-sm text-amber-800">
                  Al utilizar este servicio, tus imágenes serán procesadas por modelos de inteligencia artificial de terceros 
                  seleccionados dinámicamente. Lee detenidamente estos términos antes de usar la aplicación.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <section>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  1. Procesamiento con Inteligencia Artificial
                </h2>
              </div>
              
              <div className="pl-13 space-y-4 text-slate-700">
                <h3 className="font-semibold text-slate-900">1.1. Sistema de selección dinámica de modelos</h3>
                <p>
                  Table Snap Pro utiliza un <strong>sistema inteligente de selección de modelos</strong> que:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Consulta en tiempo real los modelos disponibles en <strong>OpenRouter API</strong></li>
                  <li>Filtra automáticamente modelos con capacidad de <strong>visión multimodal</strong> (imagen + texto)</li>
                  <li>Selecciona solo modelos de empresas reconocidas: <strong>OpenAI, Google, Anthropic, Meta y Qwen</strong></li>
                  <li>Utiliza únicamente modelos <strong>gratuitos</strong> disponibles públicamente</li>
                  <li>Ordena los modelos por <strong>tamaño de contexto</strong> (mayor capacidad primero)</li>
                  <li>Prueba automáticamente con diferentes modelos hasta encontrar uno disponible</li>
                </ul>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <div className="flex items-start space-x-2">
                    <RefreshCw className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-blue-900 font-semibold mb-1">Modelos variables</p>
                      <p className="text-blue-800 text-sm">
                        Los modelos específicos utilizados pueden cambiar según la disponibilidad en tiempo real. 
                        El sistema siempre elegirá el modelo gratuito con mayor capacidad de contexto disponible 
                        en el momento de tu solicitud.
                      </p>
                    </div>
                  </div>
                </div>

                <h3 className="font-semibold text-slate-900 mt-6">1.2. Proveedores de modelos potenciales</h3>
                <p>
                  Dependiendo de la disponibilidad, tu imagen podría ser procesada por modelos de:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li><strong>OpenAI</strong> - GPT-4 Vision, GPT-4o y variantes</li>
                  <li><strong>Google</strong> - Gemini, Gemma con capacidades de visión</li>
                  <li><strong>Anthropic</strong> - Claude 3/4 con visión</li>
                  <li><strong>Meta</strong> - Llama Vision y variantes multimodales</li>
                  <li><strong>Qwen</strong> - Qwen VL y modelos de visión</li>
                </ul>
                <p className="text-sm text-slate-600 italic mt-2">
                  Nota: La lista exacta de modelos cambia constantemente según las actualizaciones de OpenRouter.
                </p>

                <h3 className="font-semibold text-slate-900 mt-6">1.3. Almacenamiento y uso de datos por parte de los proveedores</h3>
                <p>
                  Al procesar tu imagen a través de estos servicios, <strong>los proveedores de IA pueden</strong>:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Almacenar temporalmente o permanentemente las imágenes subidas</li>
                  <li>Analizar el contenido de las imágenes para mejorar sus modelos</li>
                  <li>Utilizar los datos para entrenar futuras versiones de sus sistemas de IA</li>
                  <li>Aplicar sus propias políticas de privacidad y retención de datos</li>
                </ul>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
                  <p className="text-red-800 font-semibold">
                    ⚠️ NO subas imágenes que contengan:
                  </p>
                  <ul className="list-disc list-inside mt-2 text-red-700 space-y-1">
                    <li>Información personal identificable (nombres, direcciones, números de identidad)</li>
                    <li>Datos financieros sensibles (números de tarjetas, cuentas bancarias)</li>
                    <li>Información médica o de salud</li>
                    <li>Documentos confidenciales o con información propietaria</li>
                    <li>Cualquier dato que consideres privado o sensible</li>
                  </ul>
                </div>

                <h3 className="font-semibold text-slate-900 mt-6">1.4. Enlaces a políticas de privacidad</h3>
                <p>
                  Te recomendamos revisar las políticas de privacidad de los proveedores:
                </p>
                <ul className="space-y-2 pl-4 mt-2">
                  <li>
                    <Link 
                      href="https://openrouter.ai/privacy" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-700 underline"
                    >
                      Política de privacidad de OpenRouter
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="https://openai.com/policies/privacy-policy" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-700 underline"
                    >
                      Política de privacidad de OpenAI
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="https://policies.google.com/privacy" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-700 underline"
                    >
                      Política de privacidad de Google
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="https://www.anthropic.com/legal/privacy" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-700 underline"
                    >
                      Política de privacidad de Anthropic
                    </Link>
                  </li>
                </ul>
              </div>
            </section>

            <section className="border-t border-green-200 pt-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Database className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  2. Manejo de Datos en Table Snap Pro
                </h2>
              </div>
              
              <div className="pl-13 space-y-4 text-slate-700">
                <h3 className="font-semibold text-slate-900">2.1. Procesamiento sin almacenamiento</h3>
                <p>
                  Table Snap Pro está diseñada con un enfoque de privacidad primero:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li><strong>No almacenamos tus imágenes</strong> en nuestros servidores</li>
                  <li><strong>No guardamos bases de datos</strong> con información de usuarios</li>
                  <li><strong>No recopilamos datos personales</strong> más allá de lo necesario para el funcionamiento</li>
                  <li><strong>No compartimos información</strong> con terceros excepto los proveedores de IA mencionados</li>
                  <li><strong>No registramos</strong> qué modelos fueron utilizados para cada usuario</li>
                </ul>

                <h3 className="font-semibold text-slate-900 mt-6">2.2. Flujo de datos</h3>
                <p>
                  El procesamiento de tu imagen sigue estos pasos:
                </p>
                <ol className="list-decimal list-inside space-y-2 pl-4">
                  <li>Subes la imagen desde tu navegador</li>
                  <li>El sistema consulta los modelos disponibles en OpenRouter</li>
                  <li>Filtra y ordena los modelos por capacidad de contexto</li>
                  <li>La imagen se convierte temporalmente a formato base64 en el servidor</li>
                  <li>Se envía a OpenRouter API (y de ahí al modelo de IA seleccionado)</li>
                  <li>Si un modelo falla, se intenta automáticamente con el siguiente</li>
                  <li>Recibimos los datos extraídos en formato JSON</li>
                  <li>Te mostramos una vista previa de los datos y el progreso detallado</li>
                  <li>Generas el archivo Excel <strong>localmente en tu navegador</strong></li>
                  <li><strong>Eliminamos todos los datos temporales</strong> una vez completada la operación</li>
                </ol>

                <h3 className="font-semibold text-slate-900 mt-6">2.3. Retención de datos</h3>
                <p>
                  <strong>Tiempo de retención: 0 segundos después del procesamiento.</strong>
                </p>
                <p className="mt-2">
                  Table Snap Pro no mantiene ninguna copia de tus imágenes o datos extraídos después de que 
                  la sesión termina. Cada procesamiento es completamente independiente y no se guarda historial.
                </p>
              </div>
            </section>

            <section className="border-t border-green-200 pt-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Code className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  3. Transparencia del Código
                </h2>
              </div>
              
              <div className="pl-13 space-y-4 text-slate-700">
                <h3 className="font-semibold text-slate-900">3.1. Funcionamiento interno</h3>
                <p>
                  El código de Table Snap Pro utiliza las siguientes tecnologías:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li><strong>Next.js</strong> - Framework de React para aplicaciones web</li>
                  <li><strong>TypeScript</strong> - Lenguaje tipado para mayor seguridad</li>
                  <li><strong>Server-Sent Events (SSE)</strong> - Para actualizaciones en tiempo real del progreso</li>
                  <li><strong>SheetJS (XLSX)</strong> - Librería para generar archivos Excel en el navegador</li>
                  <li><strong>OpenRouter API</strong> - Cliente para comunicación con APIs de IA</li>
                </ul>

                <h3 className="font-semibold text-slate-900 mt-6">3.2. Sistema de selección inteligente</h3>
                <p>
                  El sistema de selección de modelos realiza:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Consulta dinámica del endpoint <code className="bg-slate-100 px-2 py-1 rounded">/v1/models</code> de OpenRouter</li>
                  <li>Filtrado por modalidad (solo modelos multimodales con visión)</li>
                  <li>Filtrado por empresa (OpenAI, Google, Anthropic, Meta, Qwen)</li>
                  <li>Filtrado por precio (solo modelos gratuitos: $0.00)</li>
                  <li>Ordenamiento por <code className="bg-slate-100 px-2 py-1 rounded">context_length</code> descendente</li>
                  <li>Reintentos automáticos con fallback a otros modelos</li>
                </ul>

                <h3 className="font-semibold text-slate-900 mt-6">3.3. Generación de Excel</h3>
                <p>
                  La generación del archivo Excel ocurre completamente <strong>en tu navegador</strong> 
                  usando la librería XLSX. Esto significa que:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Los datos extraídos nunca salen de tu dispositivo después de recibirse</li>
                  <li>El archivo Excel se crea localmente en tu computadora</li>
                  <li>No hay transmisión adicional de información a servidores externos</li>
                </ul>

                <h3 className="font-semibold text-slate-900 mt-6">3.4. Seguimiento del progreso</h3>
                <p>
                  La interfaz muestra en tiempo real:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Consulta de modelos disponibles</li>
                  <li>Filtrado por capacidades de visión</li>
                  <li>Filtrado por empresas seleccionadas</li>
                  <li>Filtrado por modelos gratuitos</li>
                  <li>Intentos con cada modelo (con spinners que se convierten en checkmarks)</li>
                  <li>Procesamiento de la respuesta</li>
                  <li>Finalización exitosa o errores</li>
                </ul>

                <h3 className="font-semibold text-slate-900 mt-6">3.5. Ubicación del código relevante</h3>
                <p>
                  Las partes principales del código incluyen:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li><code className="bg-slate-100 px-2 py-1 rounded">app/api/extract/route.ts</code> - Sistema de selección y comunicación con IA</li>
                  <li><code className="bg-slate-100 px-2 py-1 rounded">lib/excel-utils.ts</code> - Utilidades para generar Excel localmente</li>
                  <li><code className="bg-slate-100 px-2 py-1 rounded">components/sections/landing/landingUpload.tsx</code> - Interfaz con seguimiento en tiempo real</li>
                </ul>
              </div>
            </section>

            <section className="border-t border-green-200 pt-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  4. Responsabilidades del Usuario
                </h2>
              </div>
              
              <div className="pl-13 space-y-4 text-slate-700">
                <p>
                  Al usar Table Snap Pro, tú como usuario aceptas:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Ser el único responsable del contenido de las imágenes que subas</li>
                  <li>No subir contenido ilegal, ofensivo o que viole derechos de terceros</li>
                  <li>Entender que los datos pueden ser vistos y procesados por servicios de IA de terceros variables</li>
                  <li>Asumir el riesgo de subir información sensible o confidencial</li>
                  <li>Verificar la precisión de los datos extraídos antes de usarlos en contextos críticos</li>
                  <li>Comprender que el modelo específico utilizado puede variar en cada solicitud</li>
                </ul>
              </div>
            </section>

            <section className="border-t border-green-200 pt-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-amber-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  5. Limitaciones de Responsabilidad
                </h2>
              </div>
              
              <div className="pl-13 space-y-4 text-slate-700">
                <p>
                  Table Snap Pro se proporciona "tal cual" sin garantías de ningún tipo:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li><strong>Precisión:</strong> No garantizamos que la extracción de datos sea 100% precisa</li>
                  <li><strong>Disponibilidad:</strong> Los modelos de IA pueden estar saturados o no disponibles</li>
                  <li><strong>Modelos variables:</strong> No controlamos qué modelos específicos estarán disponibles en cada momento</li>
                  <li><strong>Privacidad de terceros:</strong> No controlamos las políticas de los proveedores de IA</li>
                  <li><strong>Pérdida de datos:</strong> No somos responsables por pérdida o mal uso de información</li>
                  <li><strong>Uso comercial:</strong> Este es un proyecto educativo y de portafolio</li>
                  <li><strong>Cambios en OpenRouter:</strong> La disponibilidad y capacidades pueden cambiar sin previo aviso</li>
                </ul>
              </div>
            </section>

            <section className="border-t border-green-200 pt-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                6. Modificaciones a los Términos
              </h2>
              
              <div className="space-y-4 text-slate-700">
                <p>
                  Nos reservamos el derecho de modificar estos términos en cualquier momento. 
                  Los cambios serán efectivos inmediatamente al publicarse en esta página. 
                  Te recomendamos revisar estos términos periódicamente, especialmente cuando 
                  se actualice el sistema de selección de modelos.
                </p>
              </div>
            </section>

            <section className="border-t border-green-200 pt-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                7. Contacto
              </h2>
              
              <div className="space-y-4 text-slate-700">
                <p>
                  Si tienes preguntas sobre estos términos o sobre el manejo de datos:
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                  <p className="font-semibold text-slate-900">David Camilo Cortés Salazar</p>
                  <p className="text-slate-700">Estudiante de Ciencias de la Computación</p>
                  <p className="text-slate-700">Universidad Nacional de Colombia</p>
                  <p className="text-slate-600 text-sm mt-2">Proyecto de portafolio educativo</p>
                </div>
              </div>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-green-200">
            <Link 
              href="/"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Volver a la aplicación</span>
            </Link>
          </div>
        </div>
      </main>
      <SectionFooter />
    </div>
  );
}