"use server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY);

export const customerEmailSC = async (data) => {
    const email = data.email;
    const message = data.text;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "SOLICITUD DE COMPRA REALIZADA ",
        text: message,
        replyTo: process.env.EMAIL,
    });
}