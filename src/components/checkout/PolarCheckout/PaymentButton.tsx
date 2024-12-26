import React from 'react';

interface PaymentButtonProps {
  processing: boolean;
  amount: number;
  disabled?: boolean;
}

export function PaymentButton({ processing, amount, disabled }: PaymentButtonProps) {
  return (
    <button
      type="submit"
      disabled={processing || disabled}
      className="w-full flex items-center justify-center px-6 py-3 rounded-lg text-white transition-all disabled:opacity-50"
      style={{
        background: 'linear-gradient(45deg, #2563eb, #ef4444)',
        backgroundSize: '200% 200%',
        animation: 'gradient 5s ease infinite',
      }}
    >
      {processing ? "Traitement..." : `Payer ${(amount / 100).toFixed(2)} €`}
    </button>
  );
}