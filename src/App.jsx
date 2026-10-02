import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import DonorDashboard from './components/DonorDashboard';
import NgoPortal from './components/NgoPortal';
import DeliveryHub from './components/DeliveryHub';
import ImpactAnalytics from './components/ImpactAnalytics';
import FoodSafetyModal from './components/FoodSafetyModal';
import AiScannerModal from './components/AiScannerModal';
import { CheckCircle2, Info, AlertCircle, Heart } from 'lucide-react';

function AppContent() {
  const { role, toastMessage, setRole } = useApp();

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Navbar with Multi-Role Switcher */}
      <Navbar />

      {/* Main View Router based on active role */}
      <main className="flex-1">
        {role === 'overview' && <LandingPage />}
        {role === 'donor' && <DonorDashboard />}
        {role === 'ngo' && <NgoPortal />}
        {role === 'delivery' && <DeliveryHub />}
        {role === 'admin' && <ImpactAnalytics />}
      </main>

      {/* Global Modals */}
      <FoodSafetyModal />
      <AiScannerModal />

      {/* Real-time Reactive Toast Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className="bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700/80 flex items-start gap-3 max-w-md">
            <div className="text-emerald-400 mt-0.5">
              {toastMessage.type === 'info' ? (
                <Info className="w-5 h-5 text-sky-400" />
              ) : toastMessage.type === 'warning' ? (
                <AlertCircle className="w-5 h-5 text-amber-400" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              )}
            </div>
            <div>
              <div className="text-xs font-bold text-slate-100">{toastMessage.title}</div>
              <div className="text-xs text-slate-300 mt-0.5 leading-snug">{toastMessage.message}</div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm">
                🌱
              </div>
              <div>
                <span className="font-extrabold text-slate-900 tracking-tight text-base">
                  FoodRescue <span className="text-emerald-500">AI</span>
                </span>
                <p className="text-xs text-slate-500">
                  Save Food · Feed People · Build a Sustainable Tomorrow
                </p>
              </div>
            </div>

            {/* Quick Stakeholder Switch Links */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600">
              <button onClick={() => setRole('overview')} className="hover:text-emerald-600 transition-colors">
                Overview
              </button>
              <span>·</span>
              <button onClick={() => setRole('donor')} className="hover:text-emerald-600 transition-colors">
                Food Donor
              </button>
              <span>·</span>
              <button onClick={() => setRole('ngo')} className="hover:text-emerald-600 transition-colors">
                NGO Portal
              </button>
              <span>·</span>
              <button onClick={() => setRole('delivery')} className="hover:text-emerald-600 transition-colors">
                Delivery Fleet
              </button>
              <span>·</span>
              <button onClick={() => setRole('admin')} className="hover:text-emerald-600 transition-colors">
                Command Center
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            <div>
              FoodRescue AI Ecosystem · Developed by{' '}
              <strong className="text-slate-600 font-semibold">TECH TITANS</strong>
            </div>
            <div className="flex items-center gap-1.5 text-slate-500">
              <span>Aligned with UN SDGs 2, 12, 13 & FSSAI Guidelines</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
