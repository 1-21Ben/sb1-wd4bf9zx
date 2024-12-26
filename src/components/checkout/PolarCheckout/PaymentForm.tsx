import React from 'react';
import { PolarPaymentElement } from '@polar-sh/react';

interface PaymentFormProps {
  onSubmit: (event: React.FormEvent) => Promise<void>;
  error: string | null;
  processing: boolean;
  amount: number;
}

export function PaymentForm({ onSubmit, error, processing, amount }: PaymentFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <PolarPaymentElement />

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={processing}
        className="w-full flex items-center justify-center px-6 py-3 rounded-lg text-white transition-all disabled:opacity-50"
        style={{
          background: 'linear-gradient(45deg, #2563eb, #ef4444)',
          backgroundSize: '200% 200%',
          animation: 'gradient 5s ease infinite',
        }}
      >
        {processing ? "Traitement..." : `Payer ${(amount / 100).toFixed(2)} €`}
      </button>
    </form>
  );
}