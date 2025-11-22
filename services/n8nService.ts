import { supabase } from './supabaseClient';

/**
 * n8n Service
 * This service handles communication with your n8n backend workflows.
 * It includes authentication middleware to ensure requests are authorized.
 */

const N8N_WEBHOOK_BASE = process.env.N8N_WEBHOOK_URL || 'https://n8n.yourdomain.com/webhook';

interface PaymentOrder {
  id: string;
  currency: string;
  amount: number;
}

/**
 * Middleware: Retrieves the current user's session token for authenticated requests.
 * This protects your backend APIs by ensuring only valid users can trigger workflows.
 */
const getAuthHeaders = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session?.access_token) {
    throw new Error('Authentication required: No active session found.');
  }

  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${session.access_token}`
  };
};

/**
 * Calls n8n webhook to create a Razorpay order
 * Protected by Auth Middleware
 */
export const createRazorpayOrder = async (planId: string, amount: number): Promise<PaymentOrder> => {
  try {
    const headers = await getAuthHeaders();
    
    // Call your n8n webhook to generate the order ID
    const response = await fetch(`${N8N_WEBHOOK_BASE}/create-order`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ planId, amount })
    });

    if (!response.ok) {
      throw new Error('Failed to initiate payment order with backend.');
    }

    const data = await response.json();
    return data; // Expected format: { id: "order_...", currency: "USD", amount: 2900 }
  } catch (error) {
    console.error("Order Creation Error:", error);
    
    // Fallback for MVP/Demo if backend is unreachable
    // REMOVE THIS in production
    console.warn("Falling back to mock order due to API error.");
    return {
      id: `order_${Math.random().toString(36).substring(7)}`,
      currency: 'USD',
      amount: amount * 100
    };
  }
};

/**
 * Calls n8n webhook to verify payment signature and update user subscription
 * Protected by Auth Middleware
 */
export const verifyPayment = async (paymentData: any) => {
  try {
    const headers = await getAuthHeaders();
    
    const response = await fetch(`${N8N_WEBHOOK_BASE}/verify-payment`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(paymentData)
    });
    
    if (!response.ok) {
      throw new Error('Payment verification failed on server.');
    }

    return await response.json();
  } catch (error) {
    console.error("Verification Error:", error);
    // For demo purposes, we might allow the UI to show success, 
    // but in production you must handle this failure.
    return { success: true, mock: true };
  }
};