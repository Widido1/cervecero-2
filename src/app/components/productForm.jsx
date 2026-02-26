"use client"
import addProduct from "../actions/addProduct";
import { useRouter } from "next/navigation";
import updateProduct from "../actions/updateProduct";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import DeleteProduct from "../actions/deleteProduct";

// Definición de las opciones
const TIPO_A_OPTIONS = [
    { value: "Cerveza", label: "Cerveza" },
    { value: "Ingrediente", label: "Ingrediente" },
    { value: "Insumo", label: "Insumo" },
    { value: "Kit", label: "Kit" },
    { value: "Otro", label: "Otro" }
];

// Opciones para Tipo B según Tipo A seleccionado
const TIPO_B_OPTIONS = {
    "Cerveza": [
        { value: "APA", label: "APA" },
        { value: "Amber", label: "Amber" },
        { value: "Blonde", label: "Blonde" },
        { value: "Golden", label: "Golden" },
        { value: "Honey", label: "Honey" },
        { value: "IPA", label: "IPA" },
        { value: "Porter", label: "Porter" },
        { value: "Red", label: "Red" },
        { value: "Stout", label: "Stout" },
        { value: "Otro", label: "Otro" }
    ],
    "Ingrediente": [
        { value: "Malta", label: "Malta" },
        { value: "Levadura", label: "Levadura" },
        { value: "Lupulo", label: "Lúpulo" },
        { value: "Ingrediente", label: "Ingrediente" }
    ],
    "Insumo": [
        { value: "Elemento", label: "Elemento" },
        { value: "Envase", label: "Envase" },
        { value: "Instrumento", label: "Instrumento" },
        { value: "Limpieza", label: "Limpieza" },
        { value: "Pala", label: "Pala" }
    ],
    "Kit": [
        { value: "Kit", label: "Kit" }
    ],
    "Otro": [
        { value: "Otro", label: "Otro" }
    ]
};

export default function ProductForm({ product }) {
    const router = useRouter();
    const act = product?.id ? updateProduct : addProduct;
    const editar = product?.id ? true : false;
    
    // Estado para la previsualización de imagen
    const [imageUrl, setImageUrl] = useState(product?.imageUrl || "");
    const [imageError, setImageError] = useState(false);
    const [isImageLoading, setIsImageLoading] = useState(false);
    
    // Estado para Tipo A y Tipo B
    const [tipoA, setTipoA] = useState(product?.productType || "Cerveza");
    const [tipoB, setTipoB] = useState(product?.type || "");
    const [tipoBOptions, setTipoBOptions] = useState(TIPO_B_OPTIONS[tipoA] || []);
    
    const imageTimeoutRef = useRef(null);

    // Inicializar tipos cuando cambia el producto
    useEffect(() => {
        if (product) {
            setTipoA(product.productType || "Cerveza");
            setTipoB(product.type || "");
            setImageUrl(product.imageUrl || "");
            setImageError(false);
        }
    }, [product]);

    // Actualizar opciones de Tipo B cuando cambia Tipo A
    useEffect(() => {
        const newOptions = TIPO_B_OPTIONS[tipoA] || [];
        setTipoBOptions(newOptions);
        
        // Si el Tipo B actual no está en las nuevas opciones, resetearlo
        if (tipoB && !newOptions.find(opt => opt.value === tipoB)) {
            setTipoB(newOptions[0]?.value || "");
        }
    }, [tipoA, tipoB]);

    // Manejar cambios en la URL de la imagen
    const handleImageUrlChange = (e) => {
        const url = e.target.value;
        setImageUrl(url);
        setImageError(false);
        
        if (imageTimeoutRef.current) {
            clearTimeout(imageTimeoutRef.current);
        }
        
        if (!url.trim()) {
            setIsImageLoading(false);
            return;
        }
        
        // Si es "no-imagen", no validamos como URL
        if (url.toLowerCase().trim() === "no-imagen") {
            setImageError(false);
            setIsImageLoading(false);
            return;
        }
        
        // Solo validar como URL si no es "no-imagen"
        try {
            new URL(url);
        } catch {
            setImageError(true);
            setIsImageLoading(false);
            return;
        }
        
        setIsImageLoading(true);
        imageTimeoutRef.current = setTimeout(() => {
            const img = new Image();
            img.onload = () => {
                setImageError(false);
                setIsImageLoading(false);
            };
            img.onerror = () => {
                setImageError(true);
                setIsImageLoading(false);
            };
            img.src = url;
        }, 500);
    };

    // Limpiar timeout al desmontar
    useEffect(() => {
        return () => {
            if (imageTimeoutRef.current) {
                clearTimeout(imageTimeoutRef.current);
            }
        };
    }, []);

    // Manejar envío del formulario
    const handleSubmit = async (formData) => {
        // Añadir los valores de los selects al FormData
        formData.append("productType", tipoA);
        formData.append("type", tipoB);
        
        if (imageError && imageUrl.trim() && imageUrl.toLowerCase().trim() !== "no-imagen") {
            const confirmSubmit = window.confirm(
                "La URL de la imagen parece no ser válida. ¿Desea continuar de todos modos?"
            );
            if (!confirmSubmit) return;
        }
        
        await act(formData);
        router.push("/cervecero/");
    };

    return (
        <div className="min-h-screen theme1 p-4">
            {/* Header */}
            <div className="max-w-6xl mx-auto mb-8">
                <div className="text-center theme2 rounded-xl p-6 shadow-lg">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                        {product?.id ? "Editar Producto" : "Nuevo Producto"}
                    </h1>
                    <p className=" text-sm sm:text-base">
                        Completa todos los campos requeridos para {product?.id ? "actualizar" : "agregar"} el producto
                    </p>
                </div>
            </div>

            {/* Formulario */}
            <form 
                className="max-w-6xl mx-auto bg-stone-50 rounded-xl shadow-xl overflow-hidden border border-gray-200"
                action={handleSubmit}
            >
                {/* Campos del formulario */}
                <div className="p-6 md:p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Columna Izquierda - Información básica */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input type="hidden" name="id" value={product?.id} />
                                
                                {/* Nombre */}
                                <div className="space-y-2 md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700">
                                        Nombre del Producto *
                                    </label>
                                    <input 
                                        name="name" 
                                        className="w-full px-4 py-3 border bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-[--color2] focus:border-[--color2] outline-none transition-all text-gray-800 placeholder-gray-400"
                                        placeholder="Ingrese el nombre del producto" 
                                        required 
                                        defaultValue={product?.name}
                                    />
                                </div>

                                {/* Código */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">
                                        Código *
                                    </label>
                                    <input 
                                        name="code" 
                                        className="w-full px-4 py-3 border bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-[--color2] focus:border-[--color2] outline-none transition-all text-gray-800 placeholder-gray-400"
                                        placeholder="Ej: PROD-001" 
                                        required 
                                        defaultValue={product?.code}
                                    />
                                </div>

                                {/* Tipo A */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">
                                        Tipo A *
                                    </label>
                                    <select
                                        name="productType"
                                        value={tipoA}
                                        onChange={(e) => setTipoA(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--color2] focus:border-[--color2] outline-none transition-all text-gray-800 bg-white appearance-none cursor-pointer"
                                        required
                                    >
                                        {TIPO_A_OPTIONS.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="text-xs text-gray-500 flex items-center">
                                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Seleccione la categoría principal
                                    </div>
                                </div>

                                {/* Tipo B */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">
                                        Tipo B *
                                    </label>
                                    <select
                                        name="type"
                                        value={tipoB}
                                        onChange={(e) => setTipoB(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--color2] focus:border-[--color2] outline-none transition-all text-gray-800 bg-white appearance-none cursor-pointer"
                                        required
                                        disabled={tipoBOptions.length === 0}
                                    >
                                        {tipoBOptions.length === 0 ? (
                                            <option value="">Seleccione primero Tipo A</option>
                                        ) : (
                                            <>
                                                {tipoBOptions.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </>
                                        )}
                                    </select>
                                    <div className="text-xs text-gray-500 flex items-center">
                                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Depende de Tipo A seleccionado
                                    </div>
                                </div>

                            </div>

                            {/* Descripción */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">
                                    Descripción *
                                </label>
                                <textarea 
                                    name="description" 
                                    className="w-full px-4 py-3 border bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-[--color2] focus:border-[--color2] outline-none transition-all text-gray-800 placeholder-gray-400 resize-none"
                                    placeholder="Ingrese una descripción detallada del producto..." 
                                    rows="5"
                                    required 
                                    defaultValue={product?.description}
                                />
                            </div>
                        </div>

                        {/* Columna Derecha - Imagen y precios */}
                        <div className="space-y-6">
                            {/* Previsualización de Imagen */}
                            <div className="space-y-4">
                                <label className="block text-sm font-semibold text-gray-700">
                                    Vista Previa de la Imagen
                                </label>
                                
                                <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 bg-gray-50">
                                    {/* Estado de carga */}
                                    {isImageLoading && (
                                        <div className="flex flex-col items-center justify-center h-48">
                                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                                            <p className="mt-4 text-gray-500">Cargando imagen...</p>
                                        </div>
                                    )}
                                    
                                    {/* Imagen cargada */}
                                    {!isImageLoading && imageUrl && !imageError && imageUrl.toLowerCase().trim() !== "no-imagen" && (
                                        <div className="relative">
                                            <img 
                                                src={imageUrl} 
                                                alt="Vista previa" 
                                                className="w-full h-48 object-cover rounded-lg shadow-md"
                                                onError={() => setImageError(true)}
                                            />
                                            <div className="mt-2 text-xs text-gray-500 text-center">
                                                {imageUrl.length > 50 ? imageUrl.substring(0, 50) + '...' : imageUrl}
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* Error de imagen */}
                                    {!isImageLoading && imageUrl && imageError && imageUrl.toLowerCase().trim() !== "no-imagen" && (
                                        <div className="flex flex-col items-center justify-center h-48">
                                            <div className="text-red-500 mb-2">
                                                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                                </svg>
                                            </div>
                                            <p className="text-red-600 font-medium">Error al cargar la imagen</p>
                                            <p className="text-gray-500 text-sm text-center mt-1">
                                                La URL no apunta a una imagen válida
                                            </p>
                                        </div>
                                    )}
                                    
                                    {/* No imagen (valor "no-imagen") */}
                                    {!isImageLoading && imageUrl && imageUrl.toLowerCase().trim() === "no-imagen" && (
                                        <div className="flex flex-col items-center justify-center h-48">
                                            <div className="text-blue-500 mb-2">
                                                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <p className="text-blue-600 font-medium">Sin imagen personalizada</p>
                                            <p className="text-gray-500 text-sm text-center mt-1">
                                                Se usará una imagen por defecto para este producto
                                            </p>
                                            <p className="text-xs text-blue-400 mt-2">
                                                Valor actual: "{imageUrl}"
                                            </p>
                                        </div>
                                    )}
                                    
                                    {/* Sin imagen (campo vacío) */}
                                    {!isImageLoading && !imageUrl && (
                                        <div className="flex flex-col items-center justify-center h-48">
                                            <div className="text-gray-400 mb-2">
                                                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <p className="text-gray-500 text-center">
                                                La vista previa aparecerá aquí cuando ingreses una URL de imagen válida
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Campo de URL de imagen */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">
                                        URL de la Imagen *
                                    </label>
                                    <div className="relative">
                                        <input 
                                            name="imageUrl" 
                                            type="text"
                                            value={imageUrl}
                                            onChange={handleImageUrlChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[--color2] focus:border-[--color2] outline-none transition-all text-gray-800 placeholder-gray-400 pr-10 ${
                                                imageError && imageUrl && imageUrl.toLowerCase().trim() !== "no-imagen" ? 'border-red-500 bg-red-50' : 
                                                !imageError && imageUrl && imageUrl.toLowerCase().trim() !== "no-imagen" ? 'border-green-500 bg-green-50' : 
                                                imageUrl.toLowerCase().trim() === "no-imagen" ? 'border-blue-500 bg-blue-50' :
                                                'border-gray-300'
                                            }`}
                                            placeholder="https://ejemplo.com/imagen.jpg o 'no-imagen'" 
                                            required 
                                        />
                                        {/* Indicador de estado */}
                                        <div className="absolute right-3 top-3">
                                            {isImageLoading && (
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                                            )}
                                            {!isImageLoading && imageUrl && !imageError && imageUrl.toLowerCase().trim() !== "no-imagen" && (
                                                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                            {!isImageLoading && imageUrl && imageError && imageUrl.toLowerCase().trim() !== "no-imagen" && (
                                                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                            {!isImageLoading && imageUrl && imageUrl.toLowerCase().trim() === "no-imagen" && (
                                                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center text-xs text-gray-500">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Ingrese URL de imagen o "no-imagen" para usar imagen por defecto
                                    </div>
                                </div>
                            </div>

                            {/* Precio, Stock y Prioridad */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                                {/* Precio */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">
                                        Precio *
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-3 text-gray-500">$</span>
                                        <input 
                                            name="price" 
                                            type="number"
                                            step="1"
                                            min="0"
                                            className="w-full pl-8 pr-3 py-3 border bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-[--color2] focus:border-[--color2] outline-none transition-all text-gray-800 placeholder-gray-400"
                                            placeholder="0.00" 
                                            required 
                                            defaultValue={product?.price}
                                        />
                                    </div>
                                </div>

                                {/* Stock */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">
                                        Stock *
                                    </label>
                                    <input 
                                        name="stock" 
                                        type="number"
                                        min="0"
                                        className="w-full px-3 py-3 border bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-[--color2] focus:border-[--color2] outline-none transition-all text-gray-800 placeholder-gray-400"
                                        placeholder="0" 
                                        required 
                                        defaultValue={product?.stock}
                                    />
                                </div>

                                {/* Prioridad */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">
                                        Prioridad *
                                    </label>
                                    <input 
                                        name="priority" 
                                        type="number"
                                        min="0"
                                        className="w-full px-3 py-3 border bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-[--color2] focus:border-[--color2] outline-none transition-all text-gray-800 placeholder-gray-400"
                                        placeholder="0" 
                                        required 
                                        defaultValue={product?.priority}
                                    />
                                </div>
                            </div>

                            {/* Resumen del Tipo */}
                            <div className="bg-white rounded-lg p-4 border border-gray-200">
                                <h3 className="text-sm font-semibold text-gray-700 mb-2">Resumen de Clasificación</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Tipo A:</span>
                                        <span className="font-medium text-blue-700">{tipoA}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Tipo B:</span>
                                        <span className="font-medium text-green-700">{tipoB || "No seleccionado"}</span>
                                    </div>
                                    <div className="pt-2 border-t border-gray-200">
                                        <p className="text-xs text-gray-500">
                                            Esta clasificación ayuda a organizar y filtrar los productos en la tienda.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Botones de acción */}
                <div className="px-6 md:px-8 py-6 bg-gray-50 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                        <div className="text-sm text-gray-500 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                            * Campos obligatorios
                        </div>

                        
                        <div className="flex space-x-4">
                        {
                            editar ? (
                                <button className="bg-[--color4] text-[--color2] font-bold px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"                                    type="button"
                                    onClick={async () => {
                                        const confirmDelete = window.confirm("¿Está seguro de que desea borrar este producto?");
                                        if (confirmDelete) {
                                            await DeleteProduct(product.id);
                                        }
                                    }}
                                >
                                    Borrar Producto
                                </button>
                            ) : null
                        }
                            <Link href="/cervecero/">
                                <button 
                                    type="button"
                                    className="px-6 py-3 border theme1 font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors min-w-[120px]"
                                >
                                    Cancelar
                                </button>
                            </Link>
                            <button 
                                type="submit"
                                className="px-6 py-3 theme2 font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all shadow-md hover:shadow-lg min-w-[120px]"
                            >
                                {product?.id ? "Actualizar Producto" : "Crear Producto"}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}