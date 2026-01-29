import * as XLSX from 'xlsx';

export function convertToExcelRows(data: Record<string, any[]>): any[] {
  if (!data || Object.keys(data).length === 0) {
    return [];
  }

  const headers = Object.keys(data);
  const maxLength = Math.max(...headers.map(h => data[h]?.length || 0));
  const rows = [];

  for (let i = 0; i < maxLength; i++) {
    const row: any = {};
    headers.forEach(header => {
      row[header] = data[header]?.[i] || '';
    });
    rows.push(row);
  }

  return rows;
}

export function downloadExcelFile(
  data: Record<string, any[]>,
  filename: string = 'table-snap-export.xlsx'
): void {
  try {
    const wb = XLSX.utils.book_new();
    
    const rows = convertToExcelRows(data);
    
    const ws = XLSX.utils.json_to_sheet(rows);

    const columnWidths = Object.keys(data).map(header => {
      const maxLength = Math.max(
        header.length,
        ...data[header].map(cell => String(cell).length)
      );
      return { wch: Math.min(maxLength + 2, 50) };
    });
    ws['!cols'] = columnWidths;

    XLSX.utils.book_append_sheet(wb, ws, 'Datos extraídos');

    XLSX.writeFile(wb, filename);
  } catch (error) {
    console.error('Error al generar Excel:', error);
    throw new Error('Error al generar el archivo Excel');
  }
}

export function validateExcelData(data: any): boolean {
  if (!data || typeof data !== 'object') {
    return false;
  }

  const keys = Object.keys(data);
  if (keys.length === 0) {
    return false;
  }

  return keys.every(key => Array.isArray(data[key]));
}