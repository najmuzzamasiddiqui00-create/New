import React from 'react';
import { User } from '../types';

interface SettingsProps {
  user: User;
}

export const Settings: React.FC<SettingsProps> = ({ user }) => {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Settings</h1>
        <p className="text-slate-500 text-sm">Manage your account preferences.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="font-semibold text-slate-900">Profile Information</h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-700">Full Name</label>
            <input type="text" defaultValue={user.name} className="w-full p-2 border border-slate-200 rounded-lg" />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-700">Email Address</label>
            <input type="email" defaultValue={user.email} className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-500" disabled />
          </div>
        </div>
        <div className="p-4 bg-slate-50 flex justify-end">
          <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700">Save Changes</button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
         <div className="p-6 border-b border-slate-100">
          <h3 className="font-semibold text-slate-900 text-red-600">Danger Zone</h3>
        </div>
        <div className="p-6">
            <p className="text-sm text-slate-600 mb-4">Permanently delete your account and all of your content.</p>
            <button className="px-4 py-2 border border-red-200 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50">Delete Account</button>
        </div>
      </div>
    </div>
  );
};