import React from 'react';
import { PolarElements } from '@polar-sh/react';
import { PaymentForm } from './PaymentForm';
import { polarClient } from '../../../lib/polar/client';

interface PolarCheckoutProps {
  clientSecret: string;
  amount: number;
}

export function PolarCheckout({ clientSecret, amount }: PolarCheckoutProps) {
  const [error, setError] = React.useState<string | null>(null);
  const [processing, setProcessing] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setProcessing(true);

    try {
      const result = await polarClient.payments.confirm(clientSecret);
      if (result.status === 'succeeded') {
        window.location.href = '/payment/success';
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <PolarElements clientSecret={clientSecret}>
      <PaymentForm
        onSubmit={handleSubmit}
        error={error}
        processing={processing}
        amount={amount}
      />
    </PolarElements>
  );
}