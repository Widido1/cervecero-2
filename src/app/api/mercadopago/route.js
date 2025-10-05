import { Payment } from "mercadopago";
import { revalidatePath } from "next/cache";
import { MercadoPagoConfig } from 'mercadopago';
import { sendEmail } from "@/app/actions/sendEmail";
import { customerEmail } from "@/app/actions/customerEmail";

// payment.payer.email esta es la variable de email

const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN 
});

export async function POST(request) {
  const body = await request.json();
   // Importa el hook de contexto del carrito

  const payment = await new Payment(client).get({ id: body.data.id });

  if (payment.status === "approved") {
    console.log("Payment status: ", payment.status);
    console.log("Payment ID: ", payment.id);  
    console.log("Payer Info: ",   payment.payer );
    console.log("Items purchased: ", payment.additional_info.items);
    console.log("Payment amount: ", payment.transaction_amount);    
    console.log("Payment date: ", payment.date_approved);

    let textoEnvio = ["Se retira en Local.","No se requiere envío."];
    if(payment.additional_info.items[payment.additional_info.items.length - 1].id === "shipping_cost") {
      textoEnvio = payment.additional_info.items[payment.additional_info.items.length - 1].description.split(",");
    }
    //email para el vendedor
    const paymentData = `
      ¡Hola! Se ha realizado una nueva compra exitosa en tu tienda:
      Información del pago:
      Productos comprados:
      ${payment.additional_info.items.map(item => `\t- ${item.title}: ${item.quantity}`).join("\n")}
      Total de la compra: ${payment.transaction_amount}$
      Fecha del pago: ${payment.date_approved}
      ID del pago: ${payment.id}

      Información del comprador:
      Nombre: ${payment.payer.first_name} ${payment.payer.last_name}
      Documento: ${payment.payer.identification.number}
      Tipo de documento: ${payment.payer.identification.type}
      Teléfono: ${payment.payer.phone.area_code} ${payment.payer.phone.number}
      Email del comprador: ${payment.payer.email}

      Información de envío:
      ${textoEnvio[0]}
      ${textoEnvio[1]}


    `;
    const paymentEmail = { 
      email: `${payment.payer.email}`,
      text: paymentData
    };
    sendEmail(paymentEmail);

    //email para el cliente
    const customerEmailText = `
      ¡Hola!
      Gracias por tu compra en nuestra tienda. Aquí tienes los detalles de tu pedido:
      Productos comprados:
      ${payment.additional_info.items.map(item => `\t- ${item.title}: ${item.quantity}`).join("\n")}
      Total de la compra: ${payment.transaction_amount}$
      Fecha del pago: ${payment.date_approved}
      ID del pago: ${payment.id}
      Enviaremos su pedido en los proximos días.
      Si tienes alguna pregunta, no dudes en contactarnos: ${process.env.EMAIL}
      ¡Gracias por elegirnos!
      Saludos cordiales,
      La Boutique del Cervecero
    `;
    const customerEmailData = { 
      email: `${payment.payer.email}`,
      text: customerEmailText
    };
    customerEmail(customerEmailData);
    
    revalidatePath("/");
  }

  return new Response(null, { status: 200 });
}