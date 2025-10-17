import nodemailer from 'nodemailer';

export function createTransporter() {
  // Validar que todas las variables estén presentes
  const requiredEnvVars = ['EMAIL_HOST', 'EMAIL_PORT', 'EMAIL_USER', 'EMAIL_PASSWORD'];
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    throw new Error(`Faltan variables de entorno: ${missingVars.join(', ')}`);
  }

  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_PORT === '465',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    // Configuración robusta para ambos entornos
    connectionTimeout: 30000,
    greetingTimeout: 30000,
    socketTimeout: 60000,
    // Mejorar confiabilidad
    pool: true,
    maxConnections: 3,
    maxMessages: 100,
    // Logs en desarrollo
    logger: process.env.NODE_ENV === 'development',
    debug: process.env.NODE_ENV === 'development',
  });
}

// Función para verificar la conexión SMTP
export async function verifySMTPConnection() {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('✅ Conexión SMTP verificada correctamente');
    return true;
  } catch (error) {
    console.error('❌ Error verificando SMTP:', error.message);
    return false;
  }
}