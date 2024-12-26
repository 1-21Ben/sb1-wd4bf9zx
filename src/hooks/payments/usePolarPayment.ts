import { useState } from 'react';
import { polarClient } from '../../lib/polar/client';
import { PaymentError, PaymentErrorCodes } from '../../utils/payments/errors';
import { validateAmount, validateCurrency } from '../../utils/payments/validation';
import type { PaymentIntent } from '../../utils/payments/types';

export function usePolarPayment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createPayment = async (amount: number, currency: string = 'EUR'): Promise<PaymentIntent> => {
    setLoading(true);
    setError(null);

    try {
      if (!validateAmount(amount)) {
        throw new PaymentError('Invalid amount', PaymentErrorCodes.INVALID_AMOUNT);
      }

      if (!validateCurrency(currency)) {
        throw new PaymentError('Invalid currency', PaymentErrorCodes.INVALID_CURRENCY);
      }

      const intent = await polarClient.payments.create({
        amount,
        currency,
        capture_method: 'automatic'
      });

      return intent;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Payment failed');
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    createPayment,
    loading,
    error
  };
}