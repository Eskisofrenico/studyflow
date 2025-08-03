'use client'
import { useState, useEffect } from 'react';
import { User } from '../types';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true, // Empezamos con loading true para verificar localStorage
    error: null
  });

  // Verificar localStorage al inicializar
  useEffect(() => {
    const savedUser = localStorage.getItem('studyflow_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setState(prev => ({ ...prev, user, loading: false }));
      } catch {
        localStorage.removeItem('studyflow_user');
        setState(prev => ({ ...prev, loading: false }));
      }
    } else {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email === 'demo@studyflow.com' && password === 'demo123') {
        const demoUser: User = {
          id: '1',
          name: 'Usuario Demo',
          email: 'demo@studyflow.com',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        // Guardar en localStorage
        localStorage.setItem('studyflow_user', JSON.stringify(demoUser));
        
        setState(prev => ({ 
          ...prev, 
          user: demoUser, 
          loading: false 
        }));
      } else {
        throw new Error('Credenciales inválidas');
      }
    } catch (error: unknown) {
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: error instanceof Error ? error.message : 'Error desconocido'
      }));
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('studyflow_user');
    setState({ user: null, loading: false, error: null });
  };

  return {
    user: state.user,
    login,
    logout,
    loading: state.loading,
    error: state.error
  };
}