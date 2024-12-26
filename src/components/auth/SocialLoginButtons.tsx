import React from 'react';
import { Apple, Mail, Linkedin, Windows } from 'lucide-react';
import { Provider } from '@supabase/supabase-js';
import { signInWithProvider } from '../../lib/supabase/auth';
import toast from 'react-hot-toast';

const PROVIDERS = [
  { id: 'apple' as Provider, icon: Apple, label: 'Apple' },
  { id: 'google' as Provider, icon: Mail, label: 'Google' },
  { id: 'azure' as Provider, icon: Windows, label: 'Microsoft' },
  { id: 'linkedin' as Provider, icon: Linkedin, label: 'LinkedIn' },
];

export function SocialLoginButtons() {
  const handleLogin = async (provider: Provider) => {
    try {
      await signInWithProvider(provider);
    } catch (error) {
      toast.error('Failed to login with provider');
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {PROVIDERS.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => handleLogin(id)}
          className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <Icon className="h-5 w-5 mr-2" />
          {label}
        </button>
      ))}
    </div>
  );
}