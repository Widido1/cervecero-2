"use server"
import { createTransporter } from '@/app/libs/email-config';

export const sendEmailSC = async (emailData) => {
  try {
    const transporter = createTransporter();
    
    await transporter.sendMail({
      from: `"Boutique del Cervecero" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER, // Email del vendedor
      subject: '🛒 NUEVA SOLICITUD DE COMPRA',
      text: emailData.text,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Nueva solicitud de compra</h2>
          <pre style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
            ${emailData.text}
          </pre>
        </div>
      `
    });

    return { success: true };
  } catch (error) {
    console.error('Error en sendEmailSC:', error);
    return { success: false, error: error.message };
  }
};