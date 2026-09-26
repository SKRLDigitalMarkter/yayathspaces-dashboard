"use client";
import React, { useState, useEffect } from 'react';
import {
  Settings,
  CreditCard,
  Users,
  Activity,
  Globe,
  Save,
  RefreshCcw
} from 'lucide-react';

const AdminSettings = () => {
  const [pricing, setPricing] = useState({
    "Hot Desk": "6,999",
    "Dedicated Desk": "9,999",
    "Private Cabin": "15,000",
    "Managed Office": "16,000",
    "Meeting Room": "800",
    "Event Space": "12,000",
  });
  const [syncStatus, setSyncStatus] = useState({
    googleAds: { status: 'online', lastSync: '2 mins ago' },
    metaAds: { status: 'online', lastSync: '5 mins ago' },
    googleSheets: { status: 'error', lastSync: '1 hour ago' },
  });

  const handlePriceChange = (type: string, value: string) => {
    setPricing(prev => ({ ...prev, [type]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#292a25] text-white p-6 hidden md:flex flex-col">
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-8 h-8 bg-gold-500 rounded flex items-center justify-center font-bold text-white">YP</div>
          <span className="font-serif font-bold">Admin Panel</span>
        </div>
        <nav className="space-y-2">
          <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-white/10 text-white font-medium">
            <Settings className="w-5 h-5" /> Pricing & Config
          </button>
          <button className="w-full flex items-center gap-3 p-3 rounded-lg text-gray-400 hover:bg-white/5 transition-colors">
            <Users className="w-5 h-5" /> Client Proposals
          </button>
          <button className="w-full flex items-center gap-3 p-3 rounded-lg text-gray-400 hover:bg-white/5 transition-colors">
            <Activity className="w-5 h-5" /> Lead Analytics
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 max-w-6xl mx-auto w-full">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-900">Agency Settings</h1>
            <p className="text-gray-500">Manage your workspace pricing and integration status</p>
          </div>
          <button className="flex items-center gap-2 bg-[#3B1E7C] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#2a165c] transition-all shadow-lg">
            <Save className="w-5 h-5" /> Save All Changes
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pricing Configuration */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-8 text-[#3B1E7C]">
                <CreditCard className="w-6 h-6" />
                <h2 className="text-xl font-bold font-serif">Pricing Management</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(pricing).map(([type, price]) => (
                  <div key={type} className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{type}</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
                      <input
                        type="text"
                        className="w-full pl-8 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all font-medium"
                        value={price}
                        onChange={e => handlePriceChange(type, e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Integration Status */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-8 text-[#3B1E7C]">
                <Globe className="w-6 h-6" />
                <h2 className="text-xl font-bold font-serif">Sync Status</h2>
              </div>
              <div className="space-y-4">
                {Object.entries(syncStatus).map(([key, data]) => (
                  <div key={key} className="p-4 rounded-2xl border border-gray-100 bg-gray-50 flex justify-between items-center">
                    <div>
                      <div className="font-bold text-sm text-gray-900 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                      <div className="text-xs text-gray-500">Last synced: {data.lastSync}</div>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${data.status === 'online' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]'}`} />
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 flex items-center justify-center gap-2 p-3 border-2 border-gray-100 rounded-xl text-gray-600 font-semibold hover:bg-gray-50 transition-all">
                <RefreshCcw className="w-4 h-4" /> Force Sync Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
