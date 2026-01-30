'use client';

import { useState, useEffect } from 'react';
import { scrollToSection } from "@/lib/navigation-utils";
import { FileSpreadsheet, Menu, X } from "lucide-react";
import Link from 'next/link';

interface ModelStatus {
  available: number;
  checking: boolean;
  lastCheck: Date | null;
}

export default function LandingHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [modelStatus, setModelStatus] = useState<ModelStatus>({
    available: 0,
    checking: true,
    lastCheck: null
  });

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const checkModelAvailability = async () => {
    setModelStatus(prev => ({ ...prev, checking: true }));

    try {
      const response = await fetch('/api/models/check');
      if (response.ok) {
        const data = await response.json();
        setModelStatus({
          available: data.availableModels || 0,
          checking: false,
          lastCheck: new Date()
        });
      } else {
        setModelStatus(prev => ({ ...prev, checking: false }));
      }
    } catch {
      setModelStatus(prev => ({ ...prev, checking: false }));
    }
  };

  useEffect(() => {
    checkModelAvailability();
    const interval = setInterval(checkModelAvailability, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getStatusText = () => {
    if (modelStatus.checking) return 'Verificando';
    if (modelStatus.available === 0) return 'Sin modelos';
    return `${modelStatus.available} disponibles`;
  };

  const getStatusDot = () => {
    if (modelStatus.checking) return 'bg-slate-400 animate-pulse';
    if (modelStatus.available === 0) return 'bg-red-500';
    if (modelStatus.available < 3) return 'bg-amber-500';
    return 'bg-green-500';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-green-200">
      <nav className="container mx-auto px-6 py-4">

        <div className="flex items-center justify-between md:grid md:grid-cols-3 md:items-center">
          <Link href="#inicio" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('inicio', 100);
              }}
              className="flex items-center gap-4"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-700 rounded-lg flex items-center justify-center shrink-0">
              <FileSpreadsheet className="w-6 h-6 text-white" />
            </div>
            <span className="text-base md:text-lg font-semibold text-slate-800 whitespace-nowrap">
              Table Snap Pro
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 justify-self-center">
            <Link
              href="#app"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('app', 100);
              }}
              className="font-semibold text-slate-700 hover:text-green-600 transition-colors"
            >
              Aplicación
            </Link>

            <Link
              href="#caracteristicas"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('caracteristicas', 80);
              }}
              className="font-semibold text-slate-700 hover:text-green-600 transition-colors"
            >
              Características
            </Link>

            <Link
              href="/about"
              className="font-semibold text-slate-700 hover:text-green-600 transition-colors"
            >
              Acerca de
            </Link>
          </div>

          <div className="hidden md:flex justify-self-end">
            <div
              className="flex items-center gap-2 h-9 px-3 rounded-full border bg-green-50 border-green-200 text-green-700 text-xs font-medium"
              title={
                modelStatus.lastCheck
                  ? `Última verificación: ${modelStatus.lastCheck.toLocaleTimeString()}`
                  : 'Verificando disponibilidad...'
              }
            >
              <span className={`w-2 h-2 rounded-full ${getStatusDot()}`} />
              <span>Modelos IA: {getStatusText()}</span>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 text-slate-600 hover:text-green-600 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-green-200 space-y-4">
            <Link
              href="#app"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('app', 100);
                toggleMenu();
              }}
              className="block font-semibold text-slate-700 hover:text-green-600 transition-colors"
            >
              Aplicación
            </Link>

            <Link
              href="#caracteristicas"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('caracteristicas', 80);
                toggleMenu();
              }}
              className="block font-semibold text-slate-700 hover:text-green-600 transition-colors"
            >
              Características
            </Link>

            <Link
              href="/about"
              className="block font-semibold text-slate-700 hover:text-green-600 transition-colors"
            >
              Acerca de
            </Link>

            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50 border border-green-200 text-sm font-medium text-green-700">
              <span className={`w-2 h-2 rounded-full ${getStatusDot()}`} />
              <span>Modelos IA: {getStatusText()}</span>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}