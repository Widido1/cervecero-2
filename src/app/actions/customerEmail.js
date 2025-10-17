"use server"
import { EmailService } from '@/app/libs/email-service';

export const customerEmail = async (data) => {
  try {
    const emailService = new EmailService();
    const email = data.email;
    const message = data.text;

    // Extraer información del mensaje
    const lines = message.split('\n');
    const nombreMatch = message.match(/¡Hola (.+)!/);
    const nombre = nombreMatch ? nombreMatch[1] : 'Cliente';

    // Encontrar productos
    const productosIndex = lines.findIndex(line => line.includes('Productos solicitados:'));
    const totalIndex = lines.findIndex(line => line.includes('Total del pedido:'));
    const productos = productosIndex !== -1 && totalIndex !== -1 
      ? lines.slice(productosIndex + 1, totalIndex).filter(line => line.trim().startsWith('-'))
      : [];

    const total = lines.find(line => line.includes('Total del pedido:'))?.replace('Total del pedido:', '').trim() || '0';

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
            max-width: 600px; 
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
            background: #28a745;
            color: white;
            padding: 25px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
          }
          .content {
            padding: 25px;
          }
          .confirmation-alert {
            background: #d1ecf1;
            border-left: 4px solid #17a2b8;
            padding: 15px;
            margin: 20px 0;
            border-radius: 5px;
          }
          .products-section {
            margin: 20px 0;
          }
          .product-item {
            background: #f8f9fa;
            padding: 10px;
            margin: 8px 0;
            border-radius: 5px;
            border-left: 3px solid #6c757d;
          }
          .total-section {
            background: #fff3cd;
            padding: 15px;
            border-radius: 5px;
            text-align: center;
            margin: 20px 0;
          }
          .next-steps {
            background: #e2e3e5;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
          }
          .contact-info {
            background: #d4edda;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
            text-align: center;
          }
          .footer {
            background: #343a40;
            color: white;
            padding: 20px;
            text-align: center;
          }
          .highlight {
            color: #28a745;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ SOLICITUD RECIBIDA</h1>
            <p>Boutique del Cervecero</p>
          </div>
          
          <div class="content">
            <h2>¡Hola <span class="highlight">${nombre}</span>!</h2>
            <p>Hemos recibido tu solicitud de compra correctamente.</p>
            
            <div class="confirmation-alert">
              <h3>📞 ¡Próximo Paso!</h3>
              <p>Nos pondremos en contacto contigo <strong>dentro de las próximas 24 horas</strong> para confirmar disponibilidad y coordinar el método de pago y envío.</p>
            </div>

            <div class="products-section">
              <h3>🛍️ Resumen de tu Pedido</h3>
              ${productos.map(producto => `
                <div class="product-item">
                  ✅ ${producto.replace('-', '').trim()}
                </div>
              `).join('')}
            </div>

            <div class="total-section">
              <h3>💰 Total del Pedido: <span class="highlight">${total}</span></h3>
            </div>

            <div class="next-steps">
              <h4>📋 Próximos Pasos:</h4>
              <ol>
                <li>Te contactaremos para confirmar disponibilidad</li>
                <li>Coordinaremos método de pago</li>
                <li>Acordaremos fecha y método de envío/retiro</li>
                <li>¡Disfrutas de tus productos! 🍻</li>
              </ol>
            </div>

            <div class="contact-info">
              <h4>📞 ¿Tienes preguntas?</h4>
              <p>Puedes responder a este email o contactarnos directamente:</p>
              <p><strong>📧 ${process.env.EMAIL || process.env.CONTACT_EMAIL}</strong></p>
            </div>
          </div>

          <div class="footer">
            <p>🍻 <strong>¡Gracias por elegir La Boutique del Cervecero!</strong></p>
            <p>📍 Av. Gral. Paz 7826, Santa Fe</p>
            <p>🕒 ${new Date().toLocaleString('es-AR')}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const result = await emailService.sendEmail(
      email,
      '✅ Confirmación de Solicitud - Boutique del Cervecero',
      message,
      htmlContent
    );

    if (!result.success) {
      throw new Error(result.error);
    }

    return { success: true, messageId: result.messageId };

  } catch (error) {
    console.error('❌ Error en customerEmail:', error);
    throw new Error(`No se pudo enviar la confirmación al cliente: ${error.message}`);
  }
};