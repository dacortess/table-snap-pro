import SectionFooter from "@/components/sections/footers/sectionFooter";
import SectionHeader from "@/components/sections/headers/sectionHeader";

export default function LandingAbout() {
  return (
    <section>
        <SectionHeader />
        <section id="about" className="py-20 px-6 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto max-w-4xl">
            <div className="bg-white rounded-2xl shadow-xl shadow-green-200/30 p-12 border border-green-200">
            <h2 className="text-4xl font-bold text-slate-900 mb-6 text-center">
                Acerca del proyecto
            </h2>
            
            <div className="space-y-6 text-slate-600 leading-relaxed">
                <p>
                <strong className="text-slate-900">Table Snap Pro</strong> es una herramienta 
                web diseñada para simplificar la digitalización de datos tabulares a partir de 
                capturas de pantalla. Este proyecto automatiza procesos repetitivos de entrada de datos, 
                permitiendo convertir imágenes de hojas de cálculo en archivos Excel funcionales de manera instantánea.
                </p>

                <p>
                El sistema utiliza tecnología de <strong>procesamiento de imágenes con IA</strong> para 
                identificar y estructurar la información contenida en las capturas, generando 
                un archivo Excel descargable con la máxima precisión posible.
                </p>

                <div className="bg-green-50 rounded-xl p-6 mt-8 border border-green-200">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">
                    Desarrollado por
                </h3>
                <p className="text-slate-700 mb-2">
                    <strong>David Camilo Cortés Salazar</strong>
                </p>
                <p className="text-slate-600">
                    Estudiante de Ciencias de la Computación en la Universidad Nacional de Colombia
                </p>
                </div>
            </div>
            </div>
        </div>
        </section>
        <SectionFooter />
    </section>
  )
}