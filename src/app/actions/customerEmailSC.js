"use server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY);

export const customerEmailSC = async (data) => {
    const email = data.email;
    const message = data.text;

    await resend.emails.send({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "SOLICITUD DE COMPRA REALIZADA ",
        text: message,
        replyTo: email,
    });
}

/*
import { createTransporter } from '@/app/libs/email-config';

export const customerEmailSC = async (emailData) => {
  try {
    const transporter = createTransporter();
    
    await transporter.sendMail({
      from: `"Boutique del Cervecero" <${process.env.SMTP_USER}>`,
      to: emailData.email, // Email del cliente
      subject: '✅ Confirmación de solicitud',
      text: emailData.text,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>¡Gracias por tu solicitud!</h2>
          <pre style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
            ${emailData.text}
          </pre>
          <p>Nos pondremos en contacto contigo pronto.</p>
        </div>
      `
    });

    return { success: true };
  } catch (error) {
    console.error('Error en customerEmailSC:', error);
    return { success: false, error: error.message };
  }
};
*/