import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, CheckCircle, Zap, Shield, ArrowRight, BarChart, Globe, Layout, Lock } from 'lucide-react';
import { SEO } from '../components/SEO';

export const Landing: React.FC = () => {
  return (
    <div className="bg-white min-h-screen font-sans selection:bg-indigo-100 selection:text-indigo-700">
      <SEO 
        title="ContentFlow AI - Automate Your Content Creation"
        description="Generate high-quality blog posts, social media threads, and marketing emails 10x faster with ContentFlow AI. The all-in-one workspace for modern creators."
        keywords="AI writing assistant, content generation, automated blogging, GPT-4 wrapper, marketing tools, SaaS"
        url="https://contentflow.ai" 
      />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            ContentFlow
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-slate-900 transition-colors">Pricing</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Testimonials</a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/auth?mode=login" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              Log in
            </Link>
            <Link to="/auth?mode=signup" className="text-sm font-medium bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold uppercase tracking-wide mb-8 border border-indigo-100">
            <Zap className="w-3 h-3" /> New: Gemini 2.5 Flash Model
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight mb-6 leading-tight">
            Create content <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">10x faster</span>
            <br /> without the burnout.
          </h1>
          
          <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            The all-in-one AI workspace for creators. Generate blog posts, social threads, and emails that sound just like you.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Link to="/auth?mode=signup" className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 flex items-center justify-center gap-2">
              Start Writing for Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="#demo" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-semibold text-lg hover:bg-slate-50 transition-all">
              View Pricing
            </Link>
          </div>

          {/* Dashboard Preview Mockup */}
          <div className="relative max-w-5xl mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-20"></div>
            <div className="relative bg-slate-900 rounded-xl ring-1 ring-slate-900/5 shadow-2xl overflow-hidden aspect-[16/9] flex flex-col">
              {/* Mockup Header */}
              <div className="h-10 bg-slate-800 border-b border-slate-700 flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="mx-auto bg-slate-900 px-3 py-1 rounded text-xs text-slate-500 font-mono">contentflow.app/workspace</div>
              </div>
              {/* Mockup Body */}
              <div className="flex-1 flex">
                <div className="w-64 bg-slate-900 border-r border-slate-800 p-4 hidden md:block">
                   <div className="space-y-4">
                      <div className="h-8 w-3/4 bg-slate-800 rounded"></div>
                      <div className="h-4 w-full bg-slate-800 rounded opacity-50"></div>
                      <div className="h-4 w-5/6 bg-slate-800 rounded opacity-50"></div>
                      <div className="h-4 w-4/6 bg-slate-800 rounded opacity-50"></div>
                   </div>
                </div>
                <div className="flex-1 bg-slate-900 p-8">
                  <div className="max-w-2xl mx-auto space-y-6">
                     <div className="flex gap-4">
                       <div className="h-32 w-full bg-slate-800 rounded-lg animate-pulse"></div>
                     </div>
                     <div className="space-y-3">
                       <div className="h-4 w-full bg-slate-800 rounded animate-pulse delay-75"></div>
                       <div className="h-4 w-full bg-slate-800 rounded animate-pulse delay-100"></div>
                       <div className="h-4 w-3/4 bg-slate-800 rounded animate-pulse delay-150"></div>
                     </div>
                     <div className="flex gap-2 pt-4">
                        <div className="h-10 w-32 bg-indigo-600 rounded-lg opacity-80"></div>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-10 border-y border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6">Trusted by content teams at</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale">
             <div className="text-xl font-bold text-slate-900 flex items-center gap-2"><Globe className="w-5 h-5" /> Acme Corp</div>
             <div className="text-xl font-bold text-slate-900 flex items-center gap-2"><Layout className="w-5 h-5" /> Stratos</div>
             <div className="text-xl font-bold text-slate-900 flex items-center gap-2"><Zap className="w-5 h-5" /> Bolt.new</div>
             <div className="text-xl font-bold text-slate-900 flex items-center gap-2"><Shield className="w-5 h-5" /> SecureAI</div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Everything you need to scale</h2>
            <p className="text-slate-500 text-lg">Stop juggling multiple tools. ContentFlow brings your entire workflow into one intelligent dashboard.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: "AI Writer",
                desc: "Generate SEO-optimized blogs, tweets, and emails instantly using Gemini 2.5."
              },
              {
                icon: BarChart,
                title: "Smart Analytics",
                desc: "Track your token usage and see what content performs best in real-time."
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                desc: "Your data is encrypted at rest and in transit. We never train models on your data."
              },
              {
                icon: Globe,
                title: "Multi-language",
                desc: "Expand your reach. Generate content in over 25+ languages effortlessly."
              },
              {
                icon: Layout,
                title: "Templates",
                desc: "50+ pre-built templates for every use case, from cold emails to viral threads."
              },
              {
                icon: Lock,
                title: "Role-Based Access",
                desc: "Collaborate with your team securely with advanced permission settings."
              }
            ].map((feature, i) => (
              <div key={i} className="group bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all duration-300">
                <div className="w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center text-indigo-600 mb-6 shadow-sm group-hover:scale-110 transition-transform">
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
      <section id="pricing" className="py-24 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Simple, transparent pricing</h2>
            <p className="text-slate-500 text-lg">Start for free, upgrade when you're ready to scale.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Starter</h3>
                <p className="text-slate-500 text-sm mb-6">Perfect for testing the waters.</p>
                <div className="text-5xl font-bold text-slate-900 tracking-tight">$0<span className="text-lg text-slate-500 font-normal">/mo</span></div>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {['5,000 words per month', 'Access to standard templates', 'Community support', 'Export to Markdown'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-600">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <Link to="/auth?mode=signup" className="block w-full py-4 text-center border-2 border-slate-200 text-slate-700 rounded-xl font-semibold hover:border-slate-900 hover:text-slate-900 transition-all">
                Get Started
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-900 text-white relative shadow-2xl transform md:-translate-y-4 flex flex-col">
              <div className="absolute top-0 right-0 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-lg rounded-tr-lg tracking-wide">POPULAR</div>
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">Pro Creator</h3>
                <p className="text-slate-400 text-sm mb-6">For serious content machines.</p>
                <div className="text-5xl font-bold mb-6">$29<span className="text-lg text-slate-400 font-normal">/mo</span></div>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {['Unlimited word generation', 'Access to Gemini 2.5 Pro models', 'Priority email support', 'Early access to new features', 'Custom tone calibration'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-300">
                    <CheckCircle className="w-5 h-5 text-indigo-400 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <Link to="/auth?mode=signup" className="block w-full py-4 text-center bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-900/50">
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto bg-indigo-600 rounded-3xl overflow-hidden relative shadow-2xl">
          {/* Abstract Shapes */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-indigo-500 opacity-50 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-purple-600 opacity-50 blur-3xl"></div>

          <div className="relative z-10 px-8 py-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to automate your content?</h2>
            <p className="text-indigo-100 text-lg mb-10 max-w-2xl mx-auto">
              Join 10,000+ creators saving hours every week. No credit card required to start.
            </p>
            <Link to="/auth?mode=signup" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-all">
              Get Started Now <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 pt-16 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 font-bold text-xl text-slate-900 mb-4">
                <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center text-white">
                   <Sparkles className="w-3 h-3" />
                </div>
                ContentFlow
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Empowering creators with AI-driven tools to build better content, faster.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a href="#" className="hover:text-indigo-600">Features</a></li>
                <li><a href="#" className="hover:text-indigo-600">Pricing</a></li>
                <li><a href="#" className="hover:text-indigo-600">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a href="#" className="hover:text-indigo-600">About</a></li>
                <li><a href="#" className="hover:text-indigo-600">Blog</a></li>
                <li><a href="#" className="hover:text-indigo-600">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a href="#" className="hover:text-indigo-600">Privacy</a></li>
                <li><a href="#" className="hover:text-indigo-600">Terms</a></li>
                <li><a href="#" className="hover:text-indigo-600">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
            <p>© 2025 ContentFlow AI. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-slate-600">Twitter</a>
              <a href="#" className="hover:text-slate-600">GitHub</a>
              <a href="#" className="hover:text-slate-600">Discord</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};