import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../stores/authStore';
import { LoginForm } from '../components/auth/LoginForm';
import { SocialLoginButtons } from '../components/auth/SocialLoginButtons';
import toast from 'react-hot-toast';

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      login();
      toast.success('Connexion réussie');
      navigate('/');
    } catch (error) {
      toast.error('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: 'github' | 'google' | 'apple' | 'azure' | 'linkedin') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
    } catch (error) {
      toast.error('Erreur de connexion');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full">
        <div className="flex justify-center space-x-4 mb-8">
          <Link
            to="/connexion"
            className="flex-1 py-3 px-4 text-center font-medium text-[#0074A9] border-b-2 border-[#0074A9]"
          >
            Se connecter
          </Link>
          <Link
            to="/inscription"
            className="flex-1 py-3 px-4 text-center font-medium text-gray-500 hover:text-gray-700 border-b-2 border-transparent hover:border-gray-300 transition-colors"
          >
            Créer un compte
          </Link>
        </div>

        <div className="bg-white shadow-xl rounded-lg p-8 space-y-8">
          <LoginForm
            email={email}
            password={password}
            loading={loading}
            onEmailChange={(e) => setEmail(e.target.value)}
            onPasswordChange={(e) => setPassword(e.target.value)}
            onSubmit={handleEmailSignIn}
          />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Ou connexion rapide avec
              </span>
            </div>
          </div>

          <SocialLoginButtons onOAuthSignIn={handleOAuthSignIn} />
        </div>
      </div>
    </div>
  );
}