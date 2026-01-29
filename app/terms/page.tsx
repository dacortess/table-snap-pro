import Link from 'next/link';
import { ArrowLeft, Shield, Database, Brain, Code, AlertTriangle } from 'lucide-react';
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
                  Al utilizar este servicio, tus imágenes serán procesadas por modelos de inteligencia artificial de terceros. 
                  Lee detenidamente estos términos antes de usar la aplicación.
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
                <h3 className="font-semibold text-slate-900">1.1. Servicios de terceros</h3>
                <p>
                  Table Snap Pro utiliza <strong>OpenRouter API</strong> como intermediario para acceder a modelos 
                  de inteligencia artificial de visión computacional. Actualmente, los modelos utilizados incluyen:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li><strong>Google Gemini 2.0 Flash</strong> - Proveedor: Google AI</li>
                  <li><strong>Qwen 2 VL 7B</strong> - Proveedor: Alibaba Cloud</li>
                  <li><strong>Meta Llama 3.2 11B Vision</strong> - Proveedor: Meta AI</li>
                </ul>

                <h3 className="font-semibold text-slate-900 mt-6">1.2. Almacenamiento y uso de datos por parte de los proveedores</h3>
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

                <h3 className="font-semibold text-slate-900 mt-6">1.3. Enlaces a políticas de privacidad</h3>
                <p>
                  Te recomendamos revisar las políticas de privacidad de los proveedores:
                </p>
                <ul className="space-y-2 pl-4 mt-2">
                  <li>
                    <a 
                      href="https://openrouter.ai/privacy" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-700 underline"
                    >
                      Política de privacidad de OpenRouter
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://policies.google.com/privacy" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-700 underline"
                    >
                      Política de privacidad de Google
                    </a>
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
                <h3 className="font-semibold text-slate-900">2.1. Procesamiento local</h3>
                <p>
                  Table Snap Pro está diseñada con un enfoque de privacidad primero:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li><strong>No almacenamos tus imágenes</strong> en nuestros servidores</li>
                  <li><strong>No guardamos bases de datos</strong> con información de usuarios</li>
                  <li><strong>No recopilamos datos personales</strong> más allá de lo necesario para el funcionamiento</li>
                  <li><strong>No compartimos información</strong> con terceros excepto los proveedores de IA mencionados</li>
                </ul>

                <h3 className="font-semibold text-slate-900 mt-6">2.2. Flujo de datos</h3>
                <p>
                  El procesamiento de tu imagen sigue estos pasos:
                </p>
                <ol className="list-decimal list-inside space-y-2 pl-4">
                  <li>Subes la imagen desde tu navegador</li>
                  <li>La imagen se convierte temporalmente a formato base64 en el servidor</li>
                  <li>Se envía a OpenRouter API (y de ahí al modelo de IA correspondiente)</li>
                  <li>Recibimos los datos extraídos en formato JSON</li>
                  <li>Te mostramos una vista previa de los datos</li>
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
                  El código de Table Snap Pro está disponible para revisión y utiliza las siguientes tecnologías:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li><strong>Next.js</strong> - Framework de React para aplicaciones web</li>
                  <li><strong>TypeScript</strong> - Lenguaje tipado para mayor seguridad</li>
                  <li><strong>SheetJS (XLSX)</strong> - Librería para generar archivos Excel en el navegador</li>
                  <li><strong>OpenRouter SDK</strong> - Cliente para comunicación con APIs de IA</li>
                </ul>

                <h3 className="font-semibold text-slate-900 mt-6">3.2. Generación de Excel</h3>
                <p>
                  La generación del archivo Excel ocurre completamente <strong>en tu navegador</strong> 
                  usando la librería XLSX. Esto significa que:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Los datos extraídos nunca salen de tu dispositivo después de recibirse</li>
                  <li>El archivo Excel se crea localmente en tu computadora</li>
                  <li>No hay transmisión adicional de información a servidores externos</li>
                </ul>

                <h3 className="font-semibold text-slate-900 mt-6">3.3. Ubicación del código relevante</h3>
                <p>
                  Las partes principales del código incluyen:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li><code className="bg-slate-100 px-2 py-1 rounded">app/api/extract/route.ts</code> - Manejo de la API y comunicación con IA</li>
                  <li><code className="bg-slate-100 px-2 py-1 rounded">lib/excel-utils.ts</code> - Utilidades para generar Excel localmente</li>
                  <li><code className="bg-slate-100 px-2 py-1 rounded">app/page.tsx</code> - Interfaz de usuario y manejo de estado</li>
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
                  <li>Entender que los datos pueden ser vistos y procesados por servicios de IA de terceros</li>
                  <li>Asumir el riesgo de subir información sensible o confidencial</li>
                  <li>Verificar la precisión de los datos extraídos antes de usarlos en contextos críticos</li>
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
                  <li><strong>Privacidad de terceros:</strong> No controlamos las políticas de los proveedores de IA</li>
                  <li><strong>Pérdida de datos:</strong> No somos responsables por pérdida o mal uso de información</li>
                  <li><strong>Uso comercial:</strong> Este es un proyecto educativo y de portafolio</li>
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
                  Te recomendamos revisar estos términos periódicamente.
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