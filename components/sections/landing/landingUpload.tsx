'use client';

import { downloadExcelFile, validateExcelData } from '@/lib/excel-utils';
import { Download, Eye, FileSpreadsheet, Loader2, Upload, X } from 'lucide-react';
import Image from 'next/image';

import { useState } from 'react';

export default function LandingUpload() {
  
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
      setExtractedData(null);
      
      // Crear preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setError(null);
      setExtractedData(null);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

    const processImage = async () => {
    if (!selectedFile) return;

    if (!privacyAccepted) {
      setError('Debes aceptar los términos y condiciones para continuar');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      console.log('Enviando imagen al servidor...');

      const response = await fetch('/api/extract', {
        method: 'POST',
        body: formData,
      });

      console.log('Respuesta del servidor:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.details || 'Error al procesar la imagen');
      }

      const result = await response.json();
      console.log('Datos extraídos:', result);

      if (!validateExcelData(result.data)) {
        throw new Error('Los datos extraídos no tienen el formato correcto');
      }

      setExtractedData(result.data);
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido al procesar la imagen');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadExcel = () => {
    if (!extractedData) return;

    try {
      downloadExcelFile(extractedData);
    } catch (err) {
      console.error('Error al generar Excel:', err);
      setError('Error al generar el archivo Excel');
    }
  };

  const resetUpload = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setExtractedData(null);
    setError(null);
    setPrivacyAccepted(false);
  };

  return (
    <section id="app" className="pt-24 pb-16 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl shadow-green-200/30 p-8 border-2 border-dashed border-green-300">
          {!selectedFile ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="relative"
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center py-16 cursor-pointer"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <Upload className="w-10 h-10 text-green-600" />
                </div>
                <p className="text-xl font-semibold text-slate-900 mb-2">
                  Arrastra tu captura aquí
                </p>
                <p className="text-slate-600">
                  o haz clic para seleccionar un archivo
                </p>
                <p className="text-sm text-slate-400 mt-4">
                  Formatos soportados: PNG, JPG, JPEG, WebP
                </p>
              </label>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="relative w-full max-h-96 aspect-video">
                {previewUrl && (
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    fill
                    className="object-contain rounded-lg border border-green-200"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}

                <button
                  onClick={resetUpload}
                  className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg z-10"
                  aria-label="Remove image"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!extractedData && !isProcessing && (
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <label className="flex items-start space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={privacyAccepted}
                      onChange={(e) => setPrivacyAccepted(e.target.checked)}
                      className="w-5 h-5 mt-0.5 text-green-600 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                    />
                    <span className="text-sm text-slate-700 leading-relaxed">
                      He leído y acepto los{' '}
                      <a 
                        href="/terms" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-700 underline font-medium"
                        onClick={(e) => e.stopPropagation()}
                      >
                        términos y condiciones
                      </a>
                      {' '}de uso. Entiendo que mis imágenes serán procesadas por servicios de IA de terceros.
                    </span>
                  </label>
                </div>
              )}

              {!extractedData && !isProcessing && (
                <button
                  onClick={processImage}
                  disabled={!privacyAccepted}
                  className={`w-full px-8 py-4 rounded-lg font-semibold text-lg transition-all ${
                    privacyAccepted
                      ? 'bg-green-600 text-white hover:bg-green-700 hover:shadow-lg hover:shadow-green-200'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Extraer datos
                </button>
              )}

              {isProcessing && (
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-3 py-4">
                    <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
                    <p className="text-lg font-semibold text-slate-900">
                      Procesando imagen con IA...
                    </p>
                  </div>
                  
                  <div className="w-full bg-green-100 rounded-full h-2 overflow-hidden">
                    <div className="h-full bg-green-600 animate-pulse" style={{ width: '100%' }}></div>
                  </div>

                  <div className="space-y-3 animate-pulse">
                    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-200 rounded w-full"></div>
                    <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                  </div>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-700 font-semibold">Error:</p>
                  <p className="text-red-600 text-sm mt-1">{error}</p>
                </div>
              )}

              {extractedData && (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-700 font-semibold flex items-center">
                      <FileSpreadsheet className="w-5 h-5 mr-2" />
                      ¡Datos extraídos exitosamente!
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-6 max-h-96 overflow-auto border border-green-200">
                    <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
                      <Eye className="w-5 h-5 mr-2 text-green-600" />
                      Vista previa de datos:
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="bg-green-100 border-b-2 border-green-300">
                            {Object.keys(extractedData).map((header, idx) => (
                              <th key={idx} className="text-left p-3 font-semibold text-green-900 border border-green-200">
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {(() => {
                            const headers = Object.keys(extractedData);
                            const maxLength = Math.max(...headers.map(h => extractedData[h]?.length || 0));
                            return Array.from({ length: Math.min(maxLength, 10) }, (_, i) => (
                              <tr key={i} className="border-b border-green-100 hover:bg-green-50">
                                {headers.map((header, idx) => (
                                  <td key={idx} className="p-3 text-slate-700 border border-green-100">
                                    {extractedData[header]?.[i] || '-'}
                                  </td>
                                ))}
                              </tr>
                            ));
                          })()}
                        </tbody>
                      </table>
                    </div>
                    {Object.keys(extractedData).length > 0 && 
                      extractedData[Object.keys(extractedData)[0]]?.length > 10 && (
                      <p className="text-sm text-slate-500 mt-4 text-center">
                        Mostrando las primeras 10 filas de {extractedData[Object.keys(extractedData)[0]].length}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={handleDownloadExcel}
                    className="w-full px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all hover:shadow-lg hover:shadow-green-200 font-semibold text-lg flex items-center justify-center space-x-2"
                  >
                    <Download className="w-6 h-6" />
                    <span>Descargar Excel</span>
                  </button>

                  <button
                    onClick={resetUpload}
                    className="w-full px-8 py-3 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors font-semibold"
                  >
                    Procesar otra imagen
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}