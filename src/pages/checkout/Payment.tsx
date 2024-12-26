import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../stores/cartStore';
import { useAuthStore } from '../../stores/authStore';
import { StripeCheckout } from '../../components/checkout/StripeCheckout';
import { createPaymentIntent } from '../../lib/stripe';
import toast from 'react-hot-toast';

export function Payment() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();
  const { items, total } = useCartStore();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/connexion');
      return;
    }

    if (items.length === 0) {
      navigate('/panier');
      return;
    }

    const initializePayment = async () => {
      try {
        const { clientSecret } = await createPaymentIntent(total * 100); // Convert to cents
        setClientSecret(clientSecret);
      } catch (error) {
        toast.error('Erreur lors de l\'initialisation du paiement');
      } finally {
        setLoading(false);
      }
    };

    initializePayment();
  }, [isLoggedIn, items, total, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Paiement</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Récapitulatif</h2>
          <div className="flex justify-between items-center">
            <span>Total</span>
            <span className="text-xl font-bold">{total.toFixed(2)} €</span>
          </div>
        </div>

        {clientSecret && <StripeCheckout clientSecret={clientSecret} />}
      </div>
    </div>
  );
}