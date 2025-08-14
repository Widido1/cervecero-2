"use server"
import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';

const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN 
});

export const createPreference = async (preferenceData) => {
  try {
    const preference = new Preference(client);
    const result = await preference.create({
         body:{
            items: preferenceData,
         }      
        });
    console.log("Preference created successfully:", result);
    if (!result.init_point) {
      throw new Error("No init_point returned from MercadoPago");
    }
    return result.init_point;
  } catch (error) {
    console.error("Error creating Mercado Pago preference:", error);
    throw new Error("Failed to create payment preference");
  }
};

export const getPaymentStatus = async (paymentId) => {
  try {
    const payment = new Payment(client);
    const result = await payment.get({ id: paymentId });
    console.log("Payment status fetched successfully:", result);
    return result;
  } catch (error) {
    console.error("Error fetching payment status:", error);
    throw new Error("Failed to fetch payment status");
  }
};
