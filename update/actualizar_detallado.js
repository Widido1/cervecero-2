// update/actualizar_simple.js
console.log('INICIANDO...');

const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

async function main() {
  console.log('1. Conectando BD...');
  const prisma = new PrismaClient();
  
  console.log('2. Leyendo CSV...');
  const csv = path.join(__dirname, 'precios.csv');
  
  if (!fs.existsSync(csv)) {
    console.log('ERROR: No hay precios.csv');
    await prisma.$disconnect();
    return;
  }
  
  const data = fs.readFileSync(csv, 'utf8');
  const lines = data.split('\n').filter(l => l.trim());
  
  console.log(`3. Procesando ${lines.length - 1} productos...`);
  
  let actualizados = 0;
  let errores = 0;
  
  // i = 1 para saltar el encabezado "code,price"
  for (let i = 1; i < lines.length; i++) {
    const [code, price] = lines[i].split(',').map(s => s.trim());
    
    if (!code || !price) continue;
    
    const priceNum = parseFloat(price);
    if (isNaN(priceNum)) continue;
    
    try {
      // ⚠️ CORRECCIÓN: Usa 'code' no 'codigo' y 'price' no 'precio'
      const resultado = await prisma.product.updateMany({
        where: { code: code },  // ← 'code' no 'codigo'
        data: { price: priceNum } // ← 'price' no 'precio'
      });
      
      if (resultado.count > 0) {
        console.log(`✅ ${code} -> ${priceNum}`);
        actualizados++;
      } else {
        console.log(`❌ ${code}: No encontrado en BD`);
        errores++;
      }
      
    } catch (error) {
      console.log(`⚠️  ${code}: Error - ${error.message}`);
      errores++;
    }
  }
  
  await prisma.$disconnect();
  console.log(`\n🎉 FIN - ${actualizados} actualizados, ${errores} errores`);
}

main().catch(error => {
  console.log('ERROR GLOBAL:', error.message);
});