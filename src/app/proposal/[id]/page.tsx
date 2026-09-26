"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import { CheckCircle2, ArrowLeft, Calendar, Mail, Phone } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';

const ClientProposalView = () => {
  const params = useParams();
  const proposalId = params.id;

  // In a real app, this would fetch from the API using the proposalId
  const proposalData = {
    clientName: "Rahul Sharma",
    clientEmail: "rahul@techstartup.com",
    clientPhone: "+91 98765 43210",
    items: [
      { type: "Private Cabin", qty: 2, price: "15,000" },
      { type: "Meeting Room", qty: 1, price: "800" },
    ],
    total: "30,800",
    status: "sent"
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Top Navigation */}
      <nav className="bg-white border-b px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#3B1E7C] rounded flex items-center justify-center text-white font-bold">YP</div>
          <span className="font-serif font-bold text-lg">Yayath Spaces</span>
        </div>
        <button className="bg-[#3B1E7C] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#2a165c] transition-all shadow-md">
          Accept Proposal
        </button>
      </nav>

      <main className="max-w-4xl mx-auto mt-12 px-6">
        {/* Hero Section */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-12">
          <div className="bg-gradient-to-r from-[#3B1E7C] to-[#5a36b5] p-12 text-white text-center">
            <h1 className="text-4xl font-serif font-bold mb-4">Exclusive Workspace Proposal</h1>
            <p className="text-xl opacity-90">Customized for {proposalData.clientName}</p>
          </div>
          <div className="p-12 grid grid-cols-1 md:grid-cols-2 gap-12 border-b border-gray-100">
            <div>
              <h3 className="text-gold-600 uppercase tracking-widest text-xs font-bold mb-4">Prepared For</h3>
              <p className="text-xl font-semibold">{proposalData.clientName}</p>
              <div className="flex items-center gap-2 text-gray-500 mt-2">
                <Mail className="w-4 h-4" /> {proposalData.clientEmail}
              </div>
              <div className="flex items-center gap-2 text-gray-500 mt-1">
                <Phone className="w-4 h-4" /> {proposalData.clientPhone}
              </div>
            </div>
            <div className="text-right">
              <h3 className="text-gold-600 uppercase tracking-widest text-xs font-bold mb-4">Proposal Date</h3>
              <div className="flex items-center justify-end gap-2 text-gray-900 font-semibold text-lg">
                <Calendar className="w-5 h-5 text-gold-600" />
                {new Date().toLocaleDateString()}
              </div>
              <p className="text-sm text-gray-400 mt-2">Valid for 14 days</p>
            </div>
          </div>
        </div>

        {/* Selected Solutions */}
        <div className="mb-12">
          <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-3">
            <CheckCircle2 className="text-gold-600" />
            Your Tailored Workspace Solution
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {proposalData.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center font-bold">
                    {item.type[0]}
                  </div>
                  <div>
                    <div className="font-bold text-lg text-gray-900">{item.type}</div>
                    <div className="text-sm text-gray-500">Quantity: {item.qty} seats</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-xl text-gray-900">₹{item.price}</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">Per Unit</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Total Investment */}
        <div className="bg-[#3B1E7C] rounded-3xl p-12 text-white text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl" />
          <div className="relative z-10">
            <h3 className="text-xl opacity-80 mb-4 uppercase tracking-widest font-medium">Total Investment</h3>
            <div className="text-6xl font-serif font-bold mb-8">₹{proposalData.total}</div>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <button className="bg-gold-500 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-gold-600 transition-all shadow-lg">
                Accept Proposal Now
              </button>
              <button className="bg-white/10 backdrop-blur-sm text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all">
                Request Modification
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClientProposalView;
