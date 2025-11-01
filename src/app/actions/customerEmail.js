"use server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY);

export const customerEmail = async (data) => {
    const email = data.email;
    const message = data.text;

    await resend.emails.send({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "NUEVA COMPRA ",
        text: message,
        replyTo: process.env.EMAIL,
    });
}

/*
import { createTransporter } from '@/app/libs/email-config';

export const customerEmail = async (data) => {
  try {
    const transporter = createTransporter();
    
    await transporter.sendMail({
      from: `"Boutique del Cervecero" <${process.env.SMTP_USER}>`,
      to: data.email,
      subject: '✅ Confirmación de tu compra',
      text: data.text,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>¡Gracias por tu compra!</h2>
          <pre style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
            ${data.text}
          </pre>
          <p>Tu pedido está siendo procesado.</p>
        </div>
      `,
      replyTo: process.env.SMTP_USER,
    });

    return { success: true };
  } catch (error) {
    console.error('Error en customerEmail:', error);
    return { success: false, error: error.message };
  }
};
*/