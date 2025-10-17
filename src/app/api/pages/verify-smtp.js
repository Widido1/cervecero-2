import { verifySMTPConnection } from '@/lib/email-config';
import { EmailService } from '@/lib/email-service';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    // Verificar conexión SMTP
    const smtpVerified = await verifySMTPConnection();
    
    // Información del entorno
    const envInfo = {
      entorno: process.env.NODE_ENV,
      host: process.env.EMAIL_HOST,
      usuario: process.env.EMAIL_USER ? '✅ Configurado' : '❌ Faltante',
      contraseña: process.env.EMAIL_PASSWORD ? '✅ Configurada' : '❌ Faltante',
      render: process.env.RENDER ? '✅ Sí' : '❌ No',
      hostinger: '✅ SMTP Configurado'
    };

    // Test de envío (opcional)
    let testEmailResult = null;
    if (smtpVerified && req.query.test === 'true') {
      const emailService = new EmailService();
      testEmailResult = await emailService.sendEmail(
        process.env.CONTACT_EMAIL,
        '🧪 Test SMTP desde ' + process.env.NODE_ENV,
        'Este es un email de prueba del sistema SMTP.\n\nEntorno: ' + process.env.NODE_ENV
      );
    }

    res.status(200).json({
      success: true,
      smtp: smtpVerified ? '✅ Conectado' : '❌ Error',
      entorno: envInfo,
      testEmail: testEmailResult,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      entorno: process.env.NODE_ENV
    });
  }
}