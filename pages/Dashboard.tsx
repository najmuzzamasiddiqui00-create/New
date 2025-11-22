import React from 'react';
import { User, GenerationHistory } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FileText, Zap, Calendar, ArrowUpRight } from 'lucide-react';

interface DashboardProps {
  user: User;
  history: GenerationHistory[];
}

const data = [
  { name: 'Mon', words: 400 },
  { name: 'Tue', words: 300 },
  { name: 'Wed', words: 900 },
  { name: 'Thu', words: 200 },
  { name: 'Fri', words: 1200 },
  { name: 'Sat', words: 100 },
  { name: 'Sun', words: 0 },
];

export const Dashboard: React.FC<DashboardProps> = ({ user, history }) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <span className="text-sm text-slate-500">Last updated: Just now</span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500">Total Generations</h3>
            <FileText className="w-5 h-5 text-indigo-500" />
          </div>
          <div className="text-3xl font-bold text-slate-900">{history.length}</div>
          <div className="mt-2 text-xs text-green-600 flex items-center gap-1">
             <ArrowUpRight className="w-3 h-3" /> +12% from last month
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500">Words Generated</h3>
            <Zap className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-3xl font-bold text-slate-900">{user.usageThisMonth.toLocaleString()}</div>
          <div className="mt-2 text-xs text-slate-400">
             Reset in 14 days
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500">Remaining Credits</h3>
            <Calendar className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-slate-900">{user.credits.toLocaleString()}</div>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-3">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
          </div>
        </div>
      </div>

      {/* Charts & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Usage Overview</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748B'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B'}} />
                <Tooltip 
                  cursor={{fill: '#F1F5F9'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="words" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity List */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {history.length === 0 ? (
              <p className="text-slate-500 text-sm">No generations yet.</p>
            ) : (
              history.slice(0, 4).map((item) => (
                <div key={item.id} className="flex items-start gap-3 pb-4 border-b border-slate-100 last:border-0">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 line-clamp-1">{item.topic}</p>
                    <p className="text-xs text-slate-500">{item.type} • {new Date(item.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};