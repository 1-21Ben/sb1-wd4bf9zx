import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../stores/cartStore';
import { useAuthStore } from '../../stores/authStore';
import { PolarCheckout } from './PolarCheckout';
import { usePolarPayment } from '../../hooks/payments/usePolarPayment';
import toast from 'react-hot-toast';

export function Checkout() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();
  const { items, total } = useCartStore();
  const { createPayment, loading } = usePolarPayment();
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    if (items.length === 0) {
      navigate('/cart');
      return;
    }

    const initializePayment = async () => {
      try {
        const intent = await createPayment(Math.round(total * 100)); // Convert to cents
        setClientSecret(intent.clientSecret);
      } catch (error) {
        toast.error('Failed to initialize payment');
        navigate('/cart');
      }
    };

    initializePayment();
  }, [isLoggedIn, items, total, navigate, createPayment]);

  if (loading || !clientSecret) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
          <div className="space-y-4">
            {items.map(item => (
              <div key={item.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                </div>
                <p className="font-medium">{(item.price * item.quantity).toFixed(2)} €</p>
              </div>
            ))}
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center font-bold">
                <span>Total</span>
                <span>{total.toFixed(2)} €</span>
              </div>
            </div>
          </div>
        </div>

        <PolarCheckout clientSecret={clientSecret} amount={Math.round(total * 100)} />
      </div>
    </div>
  );
}