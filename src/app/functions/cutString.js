export function cutString(texto, maxCaracteres) {
    if (!texto || maxCaracteres <= 0) return "";
    if (texto.length <= maxCaracteres) return texto;
    
    const ultimoPunto = texto.lastIndexOf('.', maxCaracteres);
    
    if (ultimoPunto !== -1 && ultimoPunto <= maxCaracteres) {
        return texto.substring(0, ultimoPunto + 1);
    }
    
    const primerPuntoDespues = texto.indexOf('.', maxCaracteres);
    return primerPuntoDespues !== -1 
        ? texto.substring(0, primerPuntoDespues + 1)
        : texto.substring(0, maxCaracteres).concat('...');
}