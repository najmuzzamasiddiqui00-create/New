import React, { useState } from 'react';
import { CheckCircle, Shield, Loader2 } from 'lucide-react';
import { User } from '../types';
import { loadRazorpay } from '../services/razorpayService';
import { createRazorpayOrder, verifyPayment } from '../services/n8nService';

interface BillingProps {
  user: User;
}

export const Billing: React.FC<BillingProps> = ({ user }) => {
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      // 1. Load Razorpay SDK
      const isLoaded = await loadRazorpay();
      if (!isLoaded) {
        alert('Razorpay SDK failed to load. Are you online?');
        return;
      }

      // 2. Create Order via n8n Backend
      // This calls your n8n webhook to securely generate an order ID
      const order = await createRazorpayOrder('pro_monthly', 29);

      // 3. Initialize Razorpay Options
      const options = {
        key: process.env.RAZORPAY_KEY_ID || 'rzp_test_1234567890', // Use env variable for production key
        amount: order.amount,
        currency: order.currency,
        name: "ContentFlow AI",
        description: "Pro Plan Subscription",
        order_id: order.id,
        handler: async function (response: any) {
          try {
            // 4. Verify Payment via n8n Backend
            // We send the signature to n8n to verify authenticity
            await verifyPayment(response);
            
            alert("Payment Successful! Your plan has been upgraded.");
            
            // Reload to fetch updated user plan data from Supabase
            window.location.reload();
          } catch (err) {
            console.error("Verification failed", err);
            alert("Payment processed, but verification failed. Please contact support.");
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#4F46E5",
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
          }
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error("Payment Init Error:", error);
      alert("Something went wrong initializing payment. Please try again.");
      setLoading(false);
    }
  };

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
             <span className="text-slate-600">Usage: {user.usageThisMonth.toLocaleString()} words</span>
             <span className="text-slate-400">Limit: {user.plan === 'Free' ? '5,000' : 'Unlimited'}</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full">
            <div className="bg-indigo-500 h-2 rounded-full" style={{ width: user.plan === 'Free' ? `${Math.min((user.usageThisMonth / 5000) * 100, 100)}%` : '100%' }}></div>
          </div>
        </div>
        <button className="px-4 py-2 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50">
          Manage Subscription
        </button>
      </div>

      {/* Plans */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Free Plan */}
        <div className={`bg-white p-6 rounded-xl border-2 shadow-sm transition-all ${user.plan === 'Free' ? 'border-slate-300' : 'border-transparent hover:border-slate-200'}`}>
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
          <button 
            className="w-full py-2 bg-slate-100 text-slate-600 font-medium rounded-lg cursor-default"
            disabled
          >
            {user.plan === 'Free' ? 'Current Plan' : 'Downgrade'}
          </button>
        </div>

        {/* Pro Plan */}
        <div className={`bg-white p-6 rounded-xl border-2 shadow-md relative overflow-hidden ${user.plan === 'Pro' ? 'border-green-500' : 'border-indigo-500'}`}>
          {user.plan !== 'Pro' && (
            <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">RECOMMENDED</div>
          )}
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
          
          {user.plan === 'Pro' ? (
             <button className="w-full py-2 bg-green-50 text-green-700 font-medium rounded-lg border border-green-200 cursor-default">
               Active Plan
             </button>
          ) : (
            <button 
              onClick={handleUpgrade}
              disabled={loading}
              className="w-full py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {loading ? 'Processing...' : 'Upgrade to Pro'}
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 justify-center p-4 bg-slate-50 rounded-lg text-slate-500 text-sm">
        <Shield className="w-4 h-4" /> Secure payment processing via Razorpay
      </div>
    </div>
  );
};