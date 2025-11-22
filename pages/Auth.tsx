import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Loader2, Mail, Lock, ArrowLeft, CheckCircle, Sparkles } from 'lucide-react';

// --- Main Auth Component (Login/Signup) ---
export const Auth: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usePassword, setUsePassword] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  const location = useLocation();
  const navigate = useNavigate();
  const isSignup = location.search.includes('signup');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      if (usePassword) {
        // Password-based Auth
        if (isSignup) {
          const { error } = await supabase.auth.signUp({ email, password });
          if (error) throw error;
          setMessage('Account created! Please check your email to verify.');
        } else {
          const { error } = await supabase.auth.signInWithPassword({ email, password });
          if (error) throw error;
          navigate('/dashboard');
        }
      } else {
        // Magic Link Auth
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        setMessage('Check your email for the magic link!');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            {isSignup ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-slate-500">
            {usePassword 
              ? (isSignup ? 'Sign up with email and password' : 'Log in with your password') 
              : 'Enter your email to sign in with a magic link'}
          </p>
        </div>
        
        {message ? (
          <div className="bg-green-50 text-green-700 p-4 rounded-lg flex flex-col items-center text-center mb-6">
            <CheckCircle className="w-8 h-8 mb-2" />
            <p className="font-medium">{message}</p>
            {!usePassword && <p className="text-sm mt-1">You can close this tab now.</p>}
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleAuth}>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                placeholder="name@company.com" 
                required 
              />
            </div>

            {usePassword && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                  placeholder="••••••••" 
                  required 
                />
                {!isSignup && (
                  <div className="flex justify-end mt-1">
                    <Link to="/forgot-password" className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">
                      Forgot password?
                    </Link>
                  </div>
                )}
              </div>
            )}
            
            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">
                {error}
              </div>
            )}

            <button 
              disabled={loading}
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : (usePassword ? 'Continue' : 'Send Magic Link')}
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">Or</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setUsePassword(!usePassword);
                setError('');
                setMessage('');
              }}
              className="w-full py-2.5 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors"
            >
              {usePassword ? 'Use Magic Link instead' : 'Use Password instead'}
            </button>
          </form>
        )}

        <div className="mt-6 text-center text-sm text-slate-500">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <Link 
            to={isSignup ? '/auth?mode=login' : '/auth?mode=signup'} 
            className="text-indigo-600 font-semibold hover:underline"
            onClick={() => {
              setError('');
              setMessage('');
            }}
          >
            {isSignup ? 'Log in' : 'Sign up'}
          </Link>
        </div>
      </div>
    </div>
  );
};

// --- Forgot Password Component ---
export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });

      if (error) throw error;
      setMessage('Check your email for the password reset link.');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 w-full max-w-md">
        <div className="mb-6">
          <Link to="/auth?mode=login" className="flex items-center text-sm text-slate-500 hover:text-slate-800 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Login
          </Link>
        </div>

        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
              <Lock className="w-6 h-6" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Forgot Password?</h1>
          <p className="text-slate-500">No worries, we'll send you reset instructions.</p>
        </div>

        {message ? (
          <div className="bg-green-50 text-green-700 p-4 rounded-lg flex flex-col items-center text-center mb-6">
            <Mail className="w-8 h-8 mb-2" />
            <p className="font-medium">{message}</p>
            <p className="text-sm mt-1">If an account exists for {email}, you will receive an email shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                placeholder="name@company.com" 
                required 
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">
                {error}
              </div>
            )}

            <button 
              disabled={loading}
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Reset Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

// --- Update Password Component (Reset Flow) ---
export const UpdatePassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
              <Lock className="w-6 h-6" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Set New Password</h1>
          <p className="text-slate-500">Your new password must be different from previously used passwords.</p>
        </div>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
              placeholder="••••••••" 
              minLength={6}
              required 
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">
              {error}
            </div>
          )}

          <button 
            disabled={loading}
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
};