import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { Workspace } from './pages/Workspace';
import { Billing } from './pages/Billing';
import { Settings } from './pages/Settings';
import { Auth, ForgotPassword, UpdatePassword } from './pages/Auth';
import { User, PlanTier, GenerationHistory } from './types';
import { supabase } from './services/supabaseClient';
import { Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [history, setHistory] = useState<GenerationHistory[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize Auth
  useEffect(() => {
    const initializeAuth = async () => {
      // 1. Check active session
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        mapSessionToUser(session);
      } else {
        setLoading(false);
      }

      // 2. Listen for auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_OUT') {
          setUser(null);
          setLoading(false);
        } else if (session) {
          mapSessionToUser(session);
        } else {
          setLoading(false);
        }
      });

      return () => subscription.unsubscribe();
    };

    initializeAuth();
  }, []);

  // Helper to map Supabase session to App User
  const mapSessionToUser = (session: any) => {
    setUser({
      id: session.user.id,
      name: session.user.email?.split('@')[0] || 'User',
      email: session.user.email || '',
      plan: PlanTier.FREE, // Default for MVP
      credits: 500,
      usageThisMonth: 0
    });
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const handleGenerate = (item: GenerationHistory) => {
    setHistory([item, ...history]);
    if (user) {
      setUser({
        ...user,
        credits: user.credits - 10, 
        usageThisMonth: user.usageThisMonth + item.content.split(' ').length
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={!user ? <Landing /> : <Navigate to="/dashboard" />} />
        <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/dashboard" />} />
        <Route path="/forgot-password" element={!user ? <ForgotPassword /> : <Navigate to="/dashboard" />} />
        <Route path="/update-password" element={<UpdatePassword />} />

        {/* Protected Routes using Middleware Component */}
        <Route path="/dashboard" element={
          <ProtectedRoute user={user}>
            <Layout user={user!} onLogout={handleLogout}>
              <Dashboard user={user!} history={history} />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/workspace" element={
          <ProtectedRoute user={user}>
            <Layout user={user!} onLogout={handleLogout}>
              <Workspace user={user!} onGenerate={handleGenerate} />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/billing" element={
          <ProtectedRoute user={user}>
            <Layout user={user!} onLogout={handleLogout}>
              <Billing user={user!} />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/settings" element={
          <ProtectedRoute user={user}>
            <Layout user={user!} onLogout={handleLogout}>
              <Settings user={user!} />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;