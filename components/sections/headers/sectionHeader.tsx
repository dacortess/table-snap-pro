'use client';

import { ArrowLeft, FileSpreadsheet } from "lucide-react";
import Link from "next/link";

export default function SectionHeader() {
    return (
      <header className="bg-white/90 backdrop-blur-md border-b border-green-200">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-700 rounded-lg flex items-center justify-center">
                <FileSpreadsheet className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-semibold text-slate-800">Table Snap Pro</span>
            </Link>
            
            <Link 
              href="/"
              className="flex items-center space-x-2 text-slate-600 hover:text-green-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Volver</span>
            </Link>
          </div>
        </nav>
      </header>
    )
}