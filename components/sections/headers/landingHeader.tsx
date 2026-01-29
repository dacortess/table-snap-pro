'use client';

import { useState } from 'react';
import { scrollToSection } from "@/lib/navigation-utils";
import { FileSpreadsheet, Menu, X } from "lucide-react";

export default function LandingHeader() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-green-200">
            <nav className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-700 rounded-lg flex items-center justify-center">
                    <FileSpreadsheet className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-semibold text-slate-800">Table Snap Pro</span>
                </div>

                <div className="hidden md:flex items-center space-x-8">
                <a 
                    href="#app" 
                    onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('app', 100);
                    }}
                    className="text-slate-600 hover:text-green-600 transition-colors cursor-pointer"
                >
                    Aplicación
                </a>
                <a 
                    href="#caracteristicas"
                    onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('caracteristicas', 80);
                    }}
                    className="text-slate-600 hover:text-green-600 transition-colors cursor-pointer"
                >
                    Características
                </a>
                <a 
                    href="/about" 
                    className="text-slate-600 hover:text-green-600 transition-colors"
                    >
                    Acerca de
                </a>
                </div>

                <button
                onClick={toggleMenu}
                className="md:hidden p-2 text-slate-600 hover:text-green-600 transition-colors"
                aria-label="Toggle menu"
                >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {isMenuOpen && (
                <div className="md:hidden mt-4 pb-4 space-y-4 border-t border-green-200 pt-4">
                <a
                    href="#app"
                    onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('app', 100);
                    toggleMenu();
                    }}
                    className="block text-slate-600 hover:text-green-600 transition-colors cursor-pointer"
                >
                    Aplicación
                </a>
                <a
                    href="#caracteristicas"
                    onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('caracteristicas', 80);
                    toggleMenu();
                    }}
                    className="block text-slate-600 hover:text-green-600 transition-colors cursor-pointer"
                >
                    Características
                </a>
                <a 
                    href="/about" 
                    className="block text-slate-600 hover:text-green-600 transition-colors"
                    >
                    Acerca de
                </a>
                </div>
            )}
            </nav>
        </header>
    )
}