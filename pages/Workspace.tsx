import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ContentType, GenerationHistory, PlanTier, User } from '../types';
import { generateContent } from '../services/geminiService';
import { Loader2, Send, Copy, Check, Lock, AlertTriangle } from 'lucide-react';

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
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
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

        <form onSubmit={handleGenerate} className={`bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6 ${isOverLimit ? 'opacity-50 pointer-events-none' : ''}`}>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Content Type</label>
            <select 
              value={type} 
              onChange={(e) => setType(e.target.value as ContentType)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            >
              {Object.values(ContentType).map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Topic / Keywords</label>
            <textarea 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. The future of remote work..."
              rows={4}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Tone</label>
            <select 
              value={tone} 
              onChange={(e) => setTone(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
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
            className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : isOverLimit ? <Lock className="w-5 h-5" /> : <Send className="w-5 h-5" />}
            {loading ? 'Generating...' : isOverLimit ? 'Limit Reached' : 'Generate Content'}
          </button>
        </form>
      </div>

      {/* Output Section */}
      <div className="flex-1 h-[600px] lg:h-auto bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <span className="font-medium text-slate-700">Result</span>
          {result && (
            <button 
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          )}
        </div>
        <div className="flex-1 p-6 overflow-y-auto bg-white">
          {loading ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
              <p>AI is thinking...</p>
            </div>
          ) : result ? (
            <div className="prose prose-slate max-w-none whitespace-pre-line text-slate-800 leading-relaxed">
              {result}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-400">
              <p>Fill in the form to generate your first draft.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};