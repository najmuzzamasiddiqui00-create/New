import React from 'react';
import { CheckCircle, Shield } from 'lucide-react';
import { User, PlanTier } from '../types';

interface BillingProps {
  user: User;
}

export const Billing: React.FC<BillingProps> = ({ user }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Billing & Usage</h1>
        <p className="text-slate-500 text-sm">Manage your subscription and limits.</p>
      </div>

      {/* Current Status */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-sm text-slate-500 mb-1">Current Plan</p>
          <h2 className="text-2xl font-bold text-slate-900">{user.plan} Tier</h2>
        </div>
        <div className="flex-1 w-full md:w-auto md:px-8">
          <div className="flex justify-between text-sm mb-2">
             <span className="text-slate-600">Usage: {user.usageThisMonth} words</span>
             <span className="text-slate-400">Limit: 5,000</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full">
            <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '35%' }}></div>
          </div>
        </div>
        <button className="px-4 py-2 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50">
          Manage Subscription
        </button>
      </div>

      {/* Plans */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border-2 border-transparent shadow-sm hover:border-slate-200 transition-all">
          <div className="flex justify-between items-start mb-4">
            <div>
                <h3 className="font-bold text-lg text-slate-900">Free</h3>
                <p className="text-slate-500 text-sm">For hobbyists</p>
            </div>
            <h3 className="font-bold text-2xl">$0</h3>
          </div>
          <ul className="space-y-3 mb-6">
            <li className="flex items-center gap-2 text-sm text-slate-600"><CheckCircle className="w-4 h-4 text-green-500" /> 5,000 words/mo</li>
            <li className="flex items-center gap-2 text-sm text-slate-600"><CheckCircle className="w-4 h-4 text-green-500" /> Basic templates</li>
          </ul>
          <button className="w-full py-2 bg-slate-100 text-slate-600 font-medium rounded-lg" disabled>Current Plan</button>
        </div>

        <div className="bg-white p-6 rounded-xl border-2 border-indigo-500 shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">RECOMMENDED</div>
          <div className="flex justify-between items-start mb-4">
            <div>
                <h3 className="font-bold text-lg text-slate-900">Pro</h3>
                <p className="text-slate-500 text-sm">For creators</p>
            </div>
            <h3 className="font-bold text-2xl">$29</h3>
          </div>
          <ul className="space-y-3 mb-6">
            <li className="flex items-center gap-2 text-sm text-slate-600"><CheckCircle className="w-4 h-4 text-indigo-500" /> Unlimited words</li>
            <li className="flex items-center gap-2 text-sm text-slate-600"><CheckCircle className="w-4 h-4 text-indigo-500" /> Priority Support</li>
            <li className="flex items-center gap-2 text-sm text-slate-600"><CheckCircle className="w-4 h-4 text-indigo-500" /> Advanced Models</li>
          </ul>
          <button className="w-full py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 shadow-lg shadow-indigo-200">Upgrade to Pro</button>
        </div>
      </div>

      <div className="flex items-center gap-3 justify-center p-4 bg-slate-50 rounded-lg text-slate-500 text-sm">
        <Shield className="w-4 h-4" /> Secure payment processing via Stripe/Razorpay
      </div>
    </div>
  );
};