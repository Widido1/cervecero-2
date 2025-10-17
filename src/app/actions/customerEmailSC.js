"use server"
import { EmailService } from '@/app/libs/email-service';

export async function customerEmailSC(emailData) {
  const emailService = new EmailService();
  
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #28a745; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1>✅ Solicitud Recibida</h1>
        <p>Boutique del Cervecero</p>
      </div>
      
      <div style="padding: 20px; background: white; border: 1px solid #ddd;">
        <h2>¡Hola ${emailData.text.match(/¡Hola (.+)!/)?.[1] || 'Cliente'}!</h2>
        <p>Hemos recibido tu solicitud de compra correctamente.</p>
        
        <div style="background: #fff3cd; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <p><strong>📞 Nos pondremos en contacto contigo pronto</strong></p>
          <p>Para confirmar disponibilidad y coordinar el método de pago y envío.</p>
        </div>
        
        <p>Si tienes alguna pregunta, no dudes en responderme a este email.</p>
      </div>
      
      <div style="background: #333; color: white; padding: 15px; text-align: center; border-radius: 0 0 10px 10px;">
        <p>¡Gracias por elegir <strong>La Boutique del Cervecero</strong>!</p>
        <p>📍 Av. Gral. Paz 7826, Santa Fe</p>
      </div>
    </div>
  `;

  return await emailService.sendEmail(
    emailData.email,
    '✅ Confirmación de Solicitud - Boutique del Cervecero',
    emailData.text,
    htmlContent
  );
}