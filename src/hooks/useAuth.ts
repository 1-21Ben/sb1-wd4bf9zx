import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../stores/authStore';
import { getCurrentUser } from '../services/userService';
import toast from 'react-hot-toast';

export function useAuth() {
  const navigate = useNavigate();
  const { login: setLoggedIn, logout: setLoggedOut } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN') {
          setLoggedIn();
          const user = await getCurrentUser();
          if (user) {
            toast.success('Connexion réussie');
          }
        }
        if (event === 'SIGNED_OUT') {
          setLoggedOut();
          toast.success('Déconnexion réussie');
        }
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      navigate('/');
    } catch (error) {
      toast.error('Erreur de connexion');
      throw error;
    }
  };

  const signUp = async (email: string, password: string, metadata = {}) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      });
      if (error) throw error;
      toast.success('Compte créé avec succès');
      navigate('/');
    } catch (error) {
      toast.error('Erreur lors de la création du compte');
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/');
    } catch (error) {
      toast.error('Erreur lors de la déconnexion');
      throw error;
    }
  };

  return {
    signIn,
    signUp,
    signOut,
    loading,
  };
}