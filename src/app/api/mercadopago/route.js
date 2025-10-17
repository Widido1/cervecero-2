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
  try {
    const body = await request.json();
    
    // Validar que tenemos el ID del pago
    if (!body.data || !body.data.id) {
      return new Response(JSON.stringify({ error: "ID de pago no proporcionado" }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const payment = await new Payment(client).get({ id: body.data.id });

    if (payment.status === "approved") {
      console.log("✅ Payment approved - ID:", payment.id);
      console.log("📧 Payer Email:", payment.payer.email);
      console.log("💰 Amount:", payment.transaction_amount);
      console.log("🛒 Items:", payment.additional_info.items.length);

      // Procesar información de envío
      let textoEnvio = ["📍 Se retira en Local.", "🚚 No se requiere envío."];
      let costoEnvio = 0;
      
      // Verificar si hay costo de envío en los items
      const shippingItem = payment.additional_info.items.find(item => 
        item.id === "shipping_cost" || item.title === "Envío"
      );
      
      if (shippingItem) {
        costoEnvio = shippingItem.unit_price;
        if (shippingItem.description) {
          textoEnvio = shippingItem.description.split(",").map(desc => desc.trim());
        }
      }

      // Filtrar solo productos (excluir envío si existe)
      const productos = payment.additional_info.items.filter(item => 
        item.id !== "shipping_cost" && item.title !== "Envío"
      );

      // EMAIL PARA EL VENDEDOR
      const paymentData = `
        🛒 NUEVA COMPRA EXITOSA - Boutique del Cervecero

        💰 INFORMACIÓN DEL PAGO:
        ID del pago: ${payment.id}
        Total de la compra: $${payment.transaction_amount}
        Fecha del pago: ${new Date(payment.date_approved).toLocaleString('es-AR')}
        Estado: ${payment.status}

        👤 INFORMACIÓN DEL COMPRADOR:
        Nombre: ${payment.payer.first_name} ${payment.payer.last_name}
        Documento: ${payment.payer.identification?.number || 'No proporcionado'} (${payment.payer.identification?.type || 'N/A'})
        Teléfono: ${payment.payer.phone?.area_code || ''} ${payment.payer.phone?.number || 'No proporcionado'}
        Email: ${payment.payer.email}

        🚚 INFORMACIÓN DE ENVÍO:
        ${textoEnvio[0] || '📍 Retiro en local'}
        ${textoEnvio[1] || '🚚 Sin envío requerido'}
        ${costoEnvio > 0 ? `Costo de envío: $${costoEnvio}` : ''}

        🛍️ PRODUCTOS COMPRADOS:
        ${productos.map(item => 
          `• ${item.title} - Cantidad: ${item.quantity} - $${item.unit_price} c/u`
        ).join('\n')}

        📦 TOTAL DE PRODUCTOS: ${productos.reduce((acc, item) => acc + item.quantity, 0)}
        💵 SUBTOTAL: $${productos.reduce((acc, item) => acc + (item.unit_price * item.quantity), 0)}
        🚚 ENVÍO: $${costoEnvio}
        💰 TOTAL: $${payment.transaction_amount}

        ⚡ ACCIÓN REQUERIDA: Preparar pedido y contactar al cliente si es necesario.
      `;

      const paymentEmail = { 
        email: process.env.EMAIL || process.env.CONTACT_EMAIL,
        text: paymentData
      };

      // EMAIL PARA EL CLIENTE
      const customerEmailText = `
        ¡Hola ${payment.payer.first_name}!

        🎉 ¡Gracias por tu compra en La Boutique del Cervecero!

        📋 DETALLES DE TU PEDIDO:
        ID de pedido: ${payment.id}
        Fecha: ${new Date(payment.date_approved).toLocaleString('es-AR')}
        Estado: Aprobado

        🛍️ PRODUCTOS:
        ${productos.map(item => 
          `• ${item.title} - Cantidad: ${item.quantity} - $${item.unit_price} c/u`
        ).join('\n')}

        💰 RESUMEN DE PAGO:
        Subtotal: $${productos.reduce((acc, item) => acc + (item.unit_price * item.quantity), 0)}
        ${costoEnvio > 0 ? `Envío: $${costoEnvio}` : 'Envío: Gratis (Retiro en local)'}
        Total: $${payment.transaction_amount}

        🚚 INFORMACIÓN DE ENTREGA:
        ${textoEnvio[0] || '📍 Retiro en local - Av. Gral. Paz 7826, Santa Fe'}
        ${textoEnvio[1] || '📞 Te contactaremos para coordinar'}

        ⏰ PRÓXIMOS PASOS:
        1. Estamos preparando tu pedido
        2. ${textoEnvio[0]?.includes('Local') ? 
            'Puedes retirar en 24-48 horas hábiles' : 
            'Coordinaremos el envío contigo'}
        3. Te notificaremos cuando esté listo

        📞 CONTACTO:
        Si tienes alguna pregunta, no dudes en contactarnos:
        Email: ${process.env.EMAIL || 'contacto@boutiquedelcervecero.com'}
        Teléfono: [Agrega aquí el teléfono de contacto]

        ¡Gracias por elegir La Boutique del Cervecero! 🍻

        Saludos cordiales,
        El equipo de La Boutique del Cervecero
        📍 Av. Gral. Paz 7826, Santa Fe
      `;

      const customerEmailData = { 
        email: payment.payer.email,
        text: customerEmailText
      };

      // ENVIAR EMAILS EN PARALELO
      console.log("📧 Enviando emails de confirmación...");
      
      const [vendedorResult, clienteResult] = await Promise.allSettled([
        sendEmail(paymentEmail),
        customerEmail(customerEmailData)
      ]);

      // Verificar resultados
      if (vendedorResult.status === 'fulfilled') {
        console.log("✅ Email al vendedor enviado correctamente");
      } else {
        console.error("❌ Error enviando email al vendedor:", vendedorResult.reason);
      }

      if (clienteResult.status === 'fulfilled') {
        console.log("✅ Email al cliente enviado correctamente");
      } else {
        console.error("❌ Error enviando email al cliente:", clienteResult.reason);
      }

      // Revalidar cache si es necesario
      revalidatePath("/");
      
      console.log("🎉 Proceso de webhook completado exitosamente");

      return new Response(JSON.stringify({ 
        success: true, 
        message: "Pago procesado y emails enviados",
        paymentId: payment.id,
        emails: {
          vendedor: vendedorResult.status === 'fulfilled' ? 'enviado' : 'error',
          cliente: clienteResult.status === 'fulfilled' ? 'enviado' : 'error'
        }
      }), { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });

    } else {
      console.log("ℹ️ Payment status no es 'approved':", payment.status);
      
      return new Response(JSON.stringify({ 
        success: true, 
        message: "Webhook recibido pero pago no aprobado",
        status: payment.status 
      }), { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

  } catch (error) {
    console.error("❌ Error en webhook:", error);
    
    return new Response(JSON.stringify({ 
      error: "Error procesando el webhook",
      message: error.message 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

/*export async function POST(request) {
  const body = await request.json();
   // Importa el hook de contexto del carrito
  
  if (!body.data || !body.data.id) {
    return new Response(JSON.stringify({ error: "ID de pago no proporcionado" }), { 
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const payment = await new Payment(client).get({ id: body.data.id });

  if (payment.status === "approved") {
    console.log("✅ Payment approved - ID:", payment.id);
    console.log("📧 Payer Email:", payment.payer.email);
    console.log("💰 Amount:", payment.transaction_amount);
    console.log("🛒 Items:", payment.additional_info.items.length);

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
}*/