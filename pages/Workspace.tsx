import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ContentType, GenerationHistory, PlanTier, User } from '../types';
import { generateContent } from '../services/geminiService';
import { Loader2, Send, Copy, Check, Lock, AlertTriangle, Sparkles } from 'lucide-react';

interface WorkspaceProps {
  user: User;
  onGenerate: (item: GenerationHistory) => void;
}

export const Workspace: React.FC<WorkspaceProps> = ({ user, onGenerate }) => {
  const [type, setType] = useState<ContentType>(ContentType.BLOG);
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('Professional');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Usage Limit Logic
  const FREE_WORD_LIMIT = 5000;
  const isFreePlan = user.plan === PlanTier.FREE;
  const isOverLimit = isFreePlan && user.usageThisMonth >= FREE_WORD_LIMIT;

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic || isOverLimit) return;

    setLoading(true);
    setResult('');
    
    try {
      const content = await generateContent(type, topic, tone);
      setResult(content);
      
      // Save to history via prop
      onGenerate({
        id: Date.now().toString(),
        type,
        topic,
        content,
        date: new Date().toISOString()
      });

    } catch (error) {
      setResult("Error generating content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full flex flex-col lg:flex-row gap-6">
      {/* Input Section */}
      <div className="w-full lg:w-1/3 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Create Content</h1>
          <p className="text-slate-500 text-sm">Configure your AI parameters.</p>
        </div>

        {/* Usage Limit Warning */}
        {isOverLimit && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-amber-900">Monthly Limit Reached</h3>
              <p className="text-sm text-amber-700 mt-1 mb-2">
                You've used {user.usageThisMonth.toLocaleString()} / {FREE_WORD_LIMIT.toLocaleString()} words.
              </p>
              <Link 
                to="/billing" 
                className="text-sm font-semibold text-amber-800 hover:text-amber-900 underline flex items-center gap-1"
              >
                Upgrade to Pro <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        )}

        <form onSubmit={handleGenerate} className={`bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6 transition-opacity duration-200 ${isOverLimit ? 'opacity-50 pointer-events-none' : ''}`}>
          <div className="group">
            <label className="block text-sm font-medium text-slate-700 mb-2 group-focus-within:text-indigo-600 transition-colors">Content Type</label>
            <select 
              value={type} 
              onChange={(e) => setType(e.target.value as ContentType)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white outline-none transition-all duration-200 ease-in-out"
            >
              {Object.values(ContentType).map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="group">
            <label className="block text-sm font-medium text-slate-700 mb-2 group-focus-within:text-indigo-600 transition-colors">Topic / Keywords</label>
            <textarea 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. The future of remote work..."
              rows={4}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white outline-none transition-all duration-200 ease-in-out resize-none"
            />
          </div>

          <div className="group">
            <label className="block text-sm font-medium text-slate-700 mb-2 group-focus-within:text-indigo-600 transition-colors">Tone</label>
            <select 
              value={tone} 
              onChange={(e) => setTone(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white outline-none transition-all duration-200 ease-in-out"
            >
              <option>Professional</option>
              <option>Casual</option>
              <option>Enthusiastic</option>
              <option>Witty</option>
              <option>Urgent</option>
            </select>
          </div>

          <button 
            type="submit" 
            disabled={loading || !topic || isOverLimit}
            className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98]"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : isOverLimit ? <Lock className="w-5 h-5" /> : <Send className="w-5 h-5" />}
            {loading ? 'Generating...' : isOverLimit ? 'Limit Reached' : 'Generate Content'}
          </button>
        </form>
      </div>

      {/* Output Section */}
      <div className="flex-1 h-[600px] lg:h-auto bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <span className="font-medium text-slate-700 flex items-center gap-2">
             <Sparkles className="w-4 h-4 text-indigo-500" /> Result
          </span>
          {result && (
            <button 
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors px-3 py-1.5 rounded-md hover:bg-indigo-50"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          )}
        </div>
        <div className="flex-1 p-6 overflow-y-auto bg-white">
          {loading ? (
            <div className="h-full flex flex-col pt-10 px-4 space-y-6 animate-pulse">
              <div className="h-4 bg-slate-200 rounded w-3/4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-slate-100 rounded"></div>
                <div className="h-4 bg-slate-100 rounded"></div>
                <div className="h-4 bg-slate-100 rounded w-5/6"></div>
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-slate-100 rounded"></div>
                <div className="h-4 bg-slate-100 rounded w-4/5"></div>
              </div>
            </div>
          ) : result ? (
            <div className="prose prose-slate max-w-none whitespace-pre-line text-slate-800 leading-relaxed animate-in fade-in duration-500 slide-in-from-bottom-2">
              {result}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 p-8 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-slate-300" />
              </div>
              <p className="text-lg font-medium text-slate-500 mb-1">Ready to create?</p>
              <p className="text-sm">Fill in the details on the left to generate your first draft.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};