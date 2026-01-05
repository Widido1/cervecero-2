// update/extraer_simple.js
const XLSX = require('xlsx');
const fs = require('fs');

const workbook = XLSX.readFile('./precios.xls');
const rows = XLSX.utils.sheet_to_json(workbook.Sheets['Rep_articulos'], { header: 1 });

let csv = 'code,price\n';

for (let i = 11; i < rows.length; i++) {
  const codigo = rows[i][1];
  const precio = rows[i][5];
  
  if (codigo && precio !== undefined) {
    // "5,119.00" → quitar coma → "5119.00" → tomar parte entera → "5119"
    const precioStr = String(precio);
    const sinComas = precioStr.replace(/,/g, '');     // Quitar comas de miles
    const parteEntera = sinComas.split('.')[0];      // Tomar solo parte entera
    const precioEntero = parseInt(parteEntera, 10);
    
    if (!isNaN(precioEntero)) {
      csv += `${codigo},${precioEntero}\n`;
    }
  }
}

fs.writeFileSync('./precios.csv', csv);
console.log(`✅ CSV creado: ${csv.split('\n').length - 2} productos`);