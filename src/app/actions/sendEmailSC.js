"use server"
import { EmailService } from '@/app/libs/email-service';

export async function sendEmailSC(emailData) {
  const emailService = new EmailService();
  
  // Extraer información del texto plano para el HTML
  const lines = emailData.text.split('\n');
  const productosMatch = emailData.text.match(/Productos solicitados:([\s\S]*?)Total de la compra:/);
  const productos = productosMatch ? productosMatch[1].trim() : 'No se pudieron cargar los productos';
  
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #dc3545; color: white; padding: 20px; text-align: center;">
        <h1>🛒 NUEVA SOLICITUD DE COMPRA</h1>
        <p>Boutique del Cervecero</p>
      </div>
      
      <div style="padding: 20px; background: #fff3cd; margin: 15px 0; border-radius: 5px;">
        <h3>⚠️ ACCIÓN REQUERIDA</h3>
        <p>Contacta al cliente para confirmar disponibilidad y coordinar pago/envío.</p>
      </div>
      
      <div style="background: #e9ecef; padding: 15px; border-radius: 5px; margin: 15px 0;">
        <h3>📋 Información del Cliente</h3>
        <p><strong>Nombre:</strong> ${lines.find(line => line.includes('Nombre:'))?.replace('Nombre:', '').trim() || 'No proporcionado'}</p>
        <p><strong>Localidad:</strong> ${lines.find(line => line.includes('Localidad:'))?.replace('Localidad:', '').trim() || 'No proporcionada'}</p>
        <p><strong>Teléfono:</strong> ${lines.find(line => line.includes('Teléfono:'))?.replace('Teléfono:', '').trim() || 'No proporcionado'}</p>
        <p><strong>Email:</strong> ${lines.find(line => line.includes('Email del comprador:'))?.replace('Email del comprador:', '').trim() || 'No proporcionado'}</p>
      </div>
      
      <div style="margin: 15px 0;">
        <h3>🛍️ Productos Solicitados</h3>
        <div style="background: #f8f9fa; padding: 15px; border-radius: 5px;">
          ${productos.split('\n').map(item => 
            `<div style="padding: 8px 0; border-bottom: 1px solid #ddd;">📦 ${item.trim()}</div>`
          ).join('')}
        </div>
      </div>
      
      <div style="background: #d4edda; padding: 15px; border-radius: 5px; margin-top: 20px;">
        <h3>💰 Total de la Compra: <strong>${lines.find(line => line.includes('Total de la compra:'))?.replace('Total de la compra:', '').trim() || '0'}</strong></h3>
      </div>
    </div>
  `;

  return await emailService.sendEmail(
    process.env.CONTACT_EMAIL,
    '🛒 Nueva Solicitud de Compra - Boutique del Cervecero',
    emailData.text,
    htmlContent
  );
}