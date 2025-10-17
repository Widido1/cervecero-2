"use server"
import { EmailService } from '@/app/libs/email-service';

export const sendEmail = async (data) => {
  try {
    const emailService = new EmailService();
    const message = data.text;

    // Extraer información del mensaje para crear HTML más atractivo
    const lines = message.split('\n');
    const nombre = lines.find(line => line.includes('Nombre:'))?.replace('Nombre:', '').trim() || 'No proporcionado';
    const emailCliente = lines.find(line => line.includes('Email del comprador:'))?.replace('Email del comprador:', '').trim() || 'No proporcionado';
    const telefono = lines.find(line => line.includes('Teléfono:'))?.replace('Teléfono:', '').trim() || 'No proporcionado';
    const localidad = lines.find(line => line.includes('Localidad:'))?.replace('Localidad:', '').trim() || 'No proporcionada';

    // Encontrar productos
    const productosIndex = lines.findIndex(line => line.includes('Productos solicitados:'));
    const totalIndex = lines.findIndex(line => line.includes('Total de la compra:'));
    const productos = productosIndex !== -1 && totalIndex !== -1 
      ? lines.slice(productosIndex + 1, totalIndex).filter(line => line.trim().startsWith('-'))
      : [];

    const total = lines.find(line => line.includes('Total de la compra:'))?.replace('Total de la compra:', '').trim() || '0';

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { 
            font-family: 'Arial', sans-serif; 
            line-height: 1.6; 
            color: #333; 
            max-width: 700px; 
            margin: 0 auto; 
            padding: 20px;
            background: #f5f5f5;
          }
          .container {
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          .header {
            background: #dc3545;
            color: white;
            padding: 25px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
          }
          .urgent-alert {
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin: 20px;
            border-radius: 5px;
          }
          .customer-info {
            background: #e9ecef;
            padding: 20px;
            margin: 0 20px;
            border-radius: 5px;
          }
          .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-top: 10px;
          }
          .info-item {
            background: white;
            padding: 10px;
            border-radius: 5px;
            border-left: 3px solid #007bff;
          }
          .products-section {
            margin: 20px;
          }
          .product-item {
            background: #f8f9fa;
            padding: 12px;
            margin: 8px 0;
            border-radius: 5px;
            border-left: 3px solid #28a745;
          }
          .total-section {
            background: #d4edda;
            padding: 20px;
            margin: 20px;
            border-radius: 5px;
            text-align: center;
          }
          .action-section {
            background: #cce5ff;
            padding: 20px;
            margin: 20px;
            border-radius: 5px;
            text-align: center;
          }
          .footer {
            background: #343a40;
            color: white;
            padding: 20px;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🛒 NUEVA SOLICITUD DE COMPRA</h1>
            <p>Boutique del Cervecero - Sistema Web</p>
          </div>
          
          <div class="urgent-alert">
            <h3>⚠️ ACCIÓN REQUERIDA - CONTACTAR CLIENTE</h3>
            <p>Se ha recibido una nueva solicitud de compra. Contacta al cliente dentro de las próximas 24 horas.</p>
          </div>

          <div class="customer-info">
            <h3>📋 INFORMACIÓN DEL CLIENTE</h3>
            <div class="info-grid">
              <div class="info-item">
                <strong>👤 Nombre:</strong><br>
                ${nombre}
              </div>
              <div class="info-item">
                <strong>📧 Email:</strong><br>
                ${emailCliente}
              </div>
              <div class="info-item">
                <strong>📞 Teléfono:</strong><br>
                ${telefono}
              </div>
              <div class="info-item">
                <strong>📍 Localidad:</strong><br>
                ${localidad}
              </div>
            </div>
          </div>

          <div class="products-section">
            <h3>🛍️ PRODUCTOS SOLICITADOS</h3>
            ${productos.map(producto => `
              <div class="product-item">
                ✅ ${producto.replace('-', '').trim()}
              </div>
            `).join('')}
          </div>

          <div class="total-section">
            <h2>💰 TOTAL DE LA COMPRA: <strong>${total}</strong></h2>
          </div>

          <div class="action-section">
            <h3>📞 CONTACTO INMEDIATO REQUERIDO</h3>
            <p><strong>Email:</strong> ${emailCliente}</p>
            <p><strong>Teléfono:</strong> ${telefono}</p>
            <p style="margin-top: 15px;">
              <a href="mailto:${emailCliente}" style="
                background: #007bff; 
                color: white; 
                padding: 10px 20px; 
                text-decoration: none; 
                border-radius: 5px;
                display: inline-block;
              ">📧 Enviar Email al Cliente</a>
            </p>
          </div>

          <div class="footer">
            <p>🍻 <strong>Boutique del Cervecero</strong></p>
            <p>📍 Av. Gral. Paz 7826, Santa Fe</p>
            <p>🕒 ${new Date().toLocaleString('es-AR')}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const result = await emailService.sendEmail(
      process.env.EMAIL || process.env.CONTACT_EMAIL,
      '🛒 NUEVA COMPRA - Boutique del Cervecero',
      message,
      htmlContent
    );

    if (!result.success) {
      throw new Error(result.error);
    }

    return { success: true, messageId: result.messageId };

  } catch (error) {
    console.error('❌ Error en sendEmail:', error);
    throw new Error(`No se pudo enviar la notificación al vendedor: ${error.message}`);
  }
};