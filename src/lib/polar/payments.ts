import { polarClient } from './client';

export async function createPaymentIntent(amount: number, currency: string = 'EUR') {
  const intent = await polarClient.payments.create({
    amount,
    currency,
    capture_method: 'automatic'
  });
  return intent;
}

export async function confirmPayment(paymentIntentId: string, paymentMethod: any) {
  return polarClient.payments.confirm(paymentIntentId, {
    payment_method: paymentMethod,
    return_url: `${window.location.origin}/payment/success`
  });
}