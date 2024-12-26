import React from 'react';

interface PaymentStatusProps {
  error: string | null;
  processing: boolean;
}

export function PaymentStatus({ error, processing }: PaymentStatusProps) {
  if (!error && !processing) return null;

  return (
    <div className={`p-4 rounded-lg ${error ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'}`}>
      {error || 'Processing payment...'}
    </div>
  );
}