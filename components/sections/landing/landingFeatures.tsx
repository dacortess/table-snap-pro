import Card from "@/components/ui/cards/card";
import { Code2, Eye, Zap } from "lucide-react";

export default function LandingFeatures() {
  return (
    <section id="caracteristicas" className="py-20 px-6 bg-white/70">
    <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Tecnología y características
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Construida con las últimas tecnologías web para ofrecerte la mejor experiencia
        </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
            <Card icon={<Code2 className="w-8 h-8 text-green-600" />} title="Next.js y TypeScript" detail="Desarrollada con Next.js, TypeScript para seguridad de tipos, Tailwind CSS para estilos, y XLSX para generación de archivos Excel." />
            <Card icon={<Zap className="w-8 h-8 text-green-600" />} title="Modelos IA gratuitos" detail="Utiliza OpenRouter con múltiples modelos de visión gratuitos (Gemini, Qwen, Llama) que se alternan automáticamente según disponibilidad y saturación." />
            <Card icon={<Eye className="w-8 h-8 text-green-600" />} title="Previsualización integrada" detail="Revisa los datos extraídos en una tabla interactiva antes de descargar. Verifica la precisión y formato antes de exportar tu archivo Excel." />
        </div>
        
    </div>
    </section>
  )
}