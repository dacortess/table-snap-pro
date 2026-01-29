import { scrollToSection } from "@/lib/navigation-utils";
import { FileSpreadsheet, Github, Linkedin, Mail } from "lucide-react";

export default function LandingFooter() {
    return (
        <footer className="bg-slate-900 text-white py-12 px-6">
            <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div>
                <div className="flex items-center space-x-2 mb-4">
                    <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                    <FileSpreadsheet className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg font-semibold">Table Snap Pro</span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                    Convierte tus capturas de Excel en archivos procesados al instante con IA.
                </p>
                </div>

                <div>
                <h4 className="font-semibold mb-4">Enlaces</h4>
                <ul className="space-y-2 text-slate-400 text-sm">
                    <li>
                    <a 
                        href="#app"
                        onClick={(e) => {
                        e.preventDefault();
                        scrollToSection('app', 100);
                        }}
                        className="hover:text-green-400 transition-colors cursor-pointer"
                    >
                        Aplicación
                    </a>
                    </li>
                    <li>
                    <a 
                        href="#caracteristicas"
                        onClick={(e) => {
                        e.preventDefault();
                        scrollToSection('caracteristicas', 80);
                        }}
                        className="hover:text-green-400 transition-colors cursor-pointer"
                    >
                        Características
                    </a>
                    </li>
                    <li>
                    <a href="/about" className="hover:text-green-400 transition-colors"
                    >
                        Acerca de
                    </a>
                    </li>
                    <li>
                      <a 
                        href="/terms"
                        className="hover:text-green-400 transition-colors"
                      >
                        Términos y condiciones
                      </a>
                    </li>
                </ul>
                </div>

                <div>
                <h4 className="font-semibold mb-4">Contacto</h4>
                <div className="flex space-x-4">
                    <a
                    href="https://github.com/dacortess"
                    target="_blank"
                    className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors"
                    aria-label="GitHub"
                    >
                    <Github className="w-5 h-5" />
                    </a>
                    <a
                    href="https://www.linkedin.com/in/davidccortes/"
                    target="_blank"
                    className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors"
                    aria-label="LinkedIn"
                    >
                    <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                    href="mailto:dcortessalazar@gmail.com"
                    target="_blank"
                    className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors"
                    aria-label="Email"
                    >
                    <Mail className="w-5 h-5" />
                    </a>
                </div>
                </div>
            </div>

            <div className="border-t border-slate-800 pt-8 text-center text-slate-400 text-sm">
                <p>
                © {new Date().getFullYear()} Table Snap Pro. Desarrollado por David Camilo Cortés Salazar
                </p>
            </div>
            </div>
        </footer>
    );
}