'use client';

import { useRef, useState } from 'react';
import { actualizarPrecios } from "../actions/uploadCSV";
import { redirect } from 'next/navigation';

export default function SubirCSV() {
  const fileInputRef = useRef(null);
  const [procesando, setProcesando] = useState(false);
  const [estado, setEstado] = useState('');

  const subirArchivo = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setProcesando(true);
    setEstado('📖 Leyendo archivo...');
    
    try {
      const texto = await file.text();
      const lineas = texto.split('\n').filter(line => line.trim());
      
      const productos = lineas
        .map(linea => {
          const [codigo, precio] = linea.split(',');
          return { codigo, precio: Number(precio) };
        })
        .filter(p => p.codigo && !isNaN(p.precio));
      
      setEstado(`⚙️ Procesando ${productos.length} productos...`);
      
      const result = await actualizarPrecios(productos);
      
      if (result.success) {
        setEstado(`✅ ${productos.length} productos procesados`);
        setTimeout(() => {
          setProcesando(false);
          setEstado('');
          redirect('/cervecero');
        }, 3000);
      } else {
        setEstado(`❌ Error: ${result.error}`);
        setTimeout(() => {
          setProcesando(false);
          setEstado('');
        }, 5000);
      }
      
    } catch (error) {
      setEstado(`❌ ${error.message}`);
      setTimeout(() => {
        setProcesando(false);
        setEstado('');
      }, 5000);
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleButtonClick = () => {
    if (!procesando) {
      fileInputRef.current.click();
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".csv,.txt"
        onChange={subirArchivo}
        ref={fileInputRef}
        style={{ display: 'none' }}
        disabled={procesando}
      />
      
      <button 
        onClick={handleButtonClick}
        className={`
          py-2 px-4 rounded-md font-bold my-2 
          flex items-center justify-center gap-2 min-w-[200px]
          transition-all duration-300
          ${!procesando ? 'theme2' : 
            estado.includes('✅') ? 'bg-green-600 text-white' :
            estado.includes('❌') ? 'bg-red-600 text-white' :
            'theme2'}
        `}
        disabled={procesando}
      >
        {procesando && !estado.includes('✅') && !estado.includes('❌') && (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
        )}
        {procesando ? estado : '📁 Subir archivo CSV'}
      </button>
    </div>
  );
}