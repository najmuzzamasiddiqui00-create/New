import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { Workspace } from './pages/Workspace';
import { Billing } from './pages/Billing';
import { Settings } from './pages/Settings';
import { User, PlanTier, GenerationHistory } from './types';
import { Lock } from 'lucide-react';

// --- Fake Auth Component (Internal to save file count) ---
const AuthPage: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const location = useLocation();
  
  useEffect(() => {
    if(location.search.includes('signup')) setIsLogin(false);
    if(location.search.includes('login')) setIsLogin(true);
  }, [location]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
          <p className="text-slate-500">Enter your details to access ContentFlow.</p>
        </div>
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          {!isLogin && (
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input type="text" className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="John Doe" required />
             </div>
          )}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input type="email" className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="name@company.com" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input type="password" className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="••••••••" required />
          </div>
          <button className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-slate-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-indigo-600 font-medium hover:underline">
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </div>
      </div>
    </div>
  );
}

const App: React.FC = () => {
  // Auth State Simulation
  const [user, setUser] = useState<User | null>(null);
  const [history, setHistory] = useState<GenerationHistory[]>([]);

  const handleLogin = () => {
    // Simulate fetching user data
    setUser({
      id: '1',
      name: 'Demo User',
      email: 'demo@contentflow.ai',
      plan: PlanTier.FREE,
      credits: 500,
      usageThisMonth: 1250
    });
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleGenerate = (item: GenerationHistory) => {
    setHistory([item, ...history]);
    if (user) {
      setUser({
        ...user,
        credits: user.credits - 10, // Deduct credits
        usageThisMonth: user.usageThisMonth + item.content.split(' ').length // Estimate usage
      });
    }
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={!user ? <Landing /> : <Navigate to="/dashboard" />} />
        <Route path="/auth" element={!user ? <AuthPage onLogin={handleLogin} /> : <Navigate to="/dashboard" />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={
          user ? (
            <Layout user={user} onLogout={handleLogout}>
              <Dashboard user={user} history={history} />
            </Layout>
          ) : <Navigate to="/auth" />
        } />
        
        <Route path="/workspace" element={
          user ? (
            <Layout user={user} onLogout={handleLogout}>
              <Workspace onGenerate={handleGenerate} />
            </Layout>
          ) : <Navigate to="/auth" />
        } />

        <Route path="/billing" element={
          user ? (
            <Layout user={user} onLogout={handleLogout}>
              <Billing user={user} />
            </Layout>
          ) : <Navigate to="/auth" />
        } />

        <Route path="/settings" element={
          user ? (
            <Layout user={user} onLogout={handleLogout}>
              <Settings user={user} />
            </Layout>
          ) : <Navigate to="/auth" />
        } />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;