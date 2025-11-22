import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, CheckCircle, Zap, Shield, ArrowRight, BarChart } from 'lucide-react';

export const Landing: React.FC = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-2xl text-indigo-600">
            <Sparkles className="w-6 h-6" /> ContentFlow
          </div>
          <div className="flex items-center gap-4">
            <Link to="/auth?mode=login" className="text-slate-600 hover:text-slate-900 font-medium">Log in</Link>
            <Link to="/auth?mode=signup" className="bg-indigo-600 text-white px-5 py-2 rounded-full font-medium hover:bg-indigo-700 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 font-medium text-sm mb-8">
            <Zap className="w-4 h-4" /> Powered by Gemini 2.5 Flash
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 tracking-tight">
            Generate content <br />
            <span className="text-indigo-600">10x faster</span> with AI.
          </h1>
          <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto">
            Stop staring at a blank cursor. Create high-converting blogs, emails, and social posts in seconds using advanced AI models.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/auth?mode=signup" className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2">
              Start for free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="#features" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-semibold text-lg hover:bg-slate-50 transition-all">
              View Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything you need to scale</h2>
            <p className="text-slate-500 text-lg">Simple, powerful tools for modern content creators.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: "AI Writer",
                desc: "Generate SEO-optimized blogs, tweets, and emails instantly."
              },
              {
                icon: BarChart,
                title: "Usage Analytics",
                desc: "Track your token usage and content history in real-time."
              },
              {
                icon: Shield,
                title: "Secure & Private",
                desc: "Your data is encrypted. We never train models on your content."
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-6">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Simple, transparent pricing</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Starter</h3>
              <div className="text-4xl font-bold text-slate-900 mb-6">$0<span className="text-lg text-slate-500 font-normal">/mo</span></div>
              <ul className="space-y-4 mb-8">
                {['5,000 words per month', 'Basic templates', 'Email support'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-600">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <Link to="/auth?mode=signup" className="block w-full py-3 text-center border-2 border-slate-900 text-slate-900 rounded-lg font-semibold hover:bg-slate-50">
                Get Started
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-900 text-white relative">
              <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">POPULAR</div>
              <h3 className="text-xl font-bold mb-2">Pro Creator</h3>
              <div className="text-4xl font-bold mb-6">$29<span className="text-lg text-slate-400 font-normal">/mo</span></div>
              <ul className="space-y-4 mb-8">
                {['Unlimited words', 'Advanced AI Models', 'Priority Support', 'Early access features'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-300">
                    <CheckCircle className="w-5 h-5 text-indigo-400 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <Link to="/auth?mode=signup" className="block w-full py-3 text-center bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700">
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-bold text-xl text-slate-900">
            <Sparkles className="w-5 h-5 text-indigo-600" /> ContentFlow
          </div>
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-slate-900">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900">Terms of Service</a>
            <a href="#" className="hover:text-slate-900">Contact</a>
          </div>
          <div className="text-sm text-slate-400">
            © 2025 ContentFlow AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};