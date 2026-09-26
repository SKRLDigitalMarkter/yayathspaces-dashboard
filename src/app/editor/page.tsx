"use client";
import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Eye,
  Send,
  Save,
  FileText,
  User,
  DollarSign
} from 'lucide-react';
import { WorkspaceType, Proposal } from '@/lib/types';

const WORKSPACE_PRICING: Record<WorkspaceType, { price: string; desc: string }> = {
  "Hot Desk": { price: "6,999", desc: "Flexible seating for freelancers" },
  "Dedicated Desk": { price: "9,999", desc: "Reserved workstation with storage" },
  "Private Cabin": { price: "14,999", desc: "Secure enclosed offices for teams" },
  "Managed Office": { price: "15,000", desc: "Fully customized branded workspace" },
  "Meeting Room": { price: "800", desc: "AV-enabled conference spaces" },
  "Event Space": { price: "12,000", desc: "Versatile venue for workshops" },
};

const ProposalEditor = () => {
  const [client, setClient] = useState({ name: '', email: '', phone: '' });
  const [items, setItems] = useState<{ type: WorkspaceType; qty: number; price: string }[]>([]);
  const [previewMode, setPreviewMode] = useState(false);

  const addWorkspace = (type: WorkspaceType) => {
    const existing = items.find(i => i.type === type);
    if (existing) {
      setItems(items.map(i => i.type === type ? { ...i, qty: i.qty + 1 } : i));
    } else {
      setItems([...items, { type, qty: 1, price: WORKSPACE_PRICING[type].price }]);
    }
  };

  const removeWorkspace = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateQty = (index: number, qty: number) => {
    const newItems = [...items];
    newItems[index].qty = Math.max(1, qty);
    setItems(newItems);
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => {
      return sum + (parseInt(item.price.replace(/,/g, '')) * item.qty);
    }, 0).toLocaleString('en-IN');
  };

  if (previewMode) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100">
          <div className="bg-[#3B1E7C] p-12 text-white text-center">
            <h1 className="text-4xl font-serif font-bold mb-4">Business Proposal</h1>
            <p className="text-xl opacity-80">Prepared for {client.name || 'Valued Client'}</p>
          </div>
          <div className="p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              <div>
                <h3 className="text-gold-600 uppercase tracking-widest text-xs font-bold mb-4">Client Details</h3>
                <p className="text-lg font-semibold">{client.name || 'N/A'}</p>
                <p className="text-gray-500">{client.email || 'N/A'}</p>
                <p className="text-gray-500">{client.phone || 'N/A'}</p>
              </div>
              <div className="text-right">
                <h3 className="text-gold-600 uppercase tracking-widest text-xs font-bold mb-4">Proposal Date</h3>
                <p className="text-lg font-semibold">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-serif font-bold mb-6 border-b pb-2">Selected Workspaces</h3>
              {items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div>
                    <span className="font-bold text-gray-900">{item.type}</span>
                    <span className="ml-3 text-sm text-gray-500">x{item.qty}</span>
                  </div>
                  <span className="font-semibold text-gray-700">₹{item.price} / seat</span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-8 mt-8 border-t-2 border-gray-100">
                <span className="text-2xl font-serif font-bold">Total Investment</span>
                <span className="text-3xl font-bold text-[#3B1E7C]">₹{calculateTotal()}</span>
              </div>
            </div>
            <div className="mt-12 text-center">
              <button
                onClick={() => setPreviewMode(false)}
                className="bg-gray-200 text-gray-800 px-6 py-2 rounded-full font-medium hover:bg-gray-300 transition-colors"
              >
                Back to Editor
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-white border-b px-8 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#3B1E7C] rounded flex items-center justify-center text-white font-bold">YP</div>
          <h1 className="text-xl font-bold font-serif">Proposal Editor</h1>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setPreviewMode(true)}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Eye className="w-4 h-4" /> Preview
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#3B1E7C] text-white rounded-lg hover:bg-[#2a165c] transition-colors shadow-md">
            <Send className="w-4 h-4" /> Send Proposal
          </button>
        </div>
      </nav>

      <div className="flex-1 p-8 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Client Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6 text-[#3B1E7C]">
              <User className="w-5 h-5" />
              <h2 className="font-bold uppercase tracking-wider text-sm">Client Information</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Full Name</label>
                <input
                  type="text"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                  placeholder="e.g. Rahul Sharma"
                  value={client.name}
                  onChange={e => setClient({...client, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Email Address</label>
                <input
                  type="email"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                  placeholder="rahul@company.com"
                  value={client.email}
                  onChange={e => setClient({...client, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Phone Number</label>
                <input
                  type="text"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                  placeholder="+91 ..."
                  value={client.phone}
                  onChange={e => setClient({...client, phone: e.target.value})}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Workspace Selector */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6 text-[#3B1E7C]">
              <FileText className="w-5 h-5" />
              <h2 className="font-bold uppercase tracking-wider text-sm">Select Workspaces</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {(Object.keys(WORKSPACE_PRICING) as WorkspaceType[]).map(type => (
                <button
                  key={type}
                  onClick={() => addWorkspace(type)}
                  className="p-4 text-left border border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all group"
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-gray-900">{type}</span>
                    <Plus className="w-4 h-4 text-gray-400 group-hover:text-purple-600" />
                  </div>
                  <p className="text-xs text-gray-500">{WORKSPACE_PRICING[type].desc}</p>
                </button>
              ))}
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-700 mb-4">Proposal Items</h3>
              {items.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400">
                  Add workspaces to build your proposal
                </div>
              ) : (
                items.map((item, javaIndex) => (
                  <div key={javaIndex} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="bg-white p-2 rounded-lg border border-gray-200">
                        <Trash2
                          className="w-4 h-4 text-red-500 cursor-pointer hover:text-red-700"
                          onClick={() => removeWorkspace(javaIndex)}
                        />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{item.type}</div>
                        <div className="text-xs text-gray-500">₹{item.price} per seat</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQty(javaIndex, item.qty - 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-white transition-colors"
                      >
                        -
                      </button>
                      <span className="font-bold w-4 text-center">{item.qty}</span>
                      <button
                        onClick={() => updateQty(javaIndex, item.qty + 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-white transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-[#3B1E7C] text-white p-8 rounded-2xl shadow-xl flex justify-between items-center">
            <div>
              <div className="text-sm opacity-70 uppercase tracking-widest mb-1">Total Investment</div>
              <div className="text-4xl font-bold font-serif">₹{calculateTotal()}</div>
            </div>
            <button className="bg-gold-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-gold-600 transition-all shadow-lg">
              Finalize Proposal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalEditor;
