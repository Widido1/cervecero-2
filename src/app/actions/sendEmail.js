"use server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (data) => {
    const email = data.email;
    const message = data.text;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: process.env.EMAIL,
        subject: "NUEVA COMPRA ",
        text: message,
        replyTo: email,
    });
}