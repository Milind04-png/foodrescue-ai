import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Building2,
  Users,
  Bike,
  ShieldCheck,
  Home,
  RotateCcw,
  Sparkles,
  Camera,
  ArrowRight,
  MapPin,
} from 'lucide-react';

export default function Navbar() {
  const {
    role,
    setRole,
    donations,
    selectedDonor,
    resetDemoState,
    setScannerModalOpen,
  } = useApp();

  // Active listings in either Pending Match or Claimed
  const activeCount = donations.filter(
    (d) => d.status === 'Pending Match' || d.status === 'Claimed by NGO'
  ).length;

  const navItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'donor', label: 'Institutional Donor', icon: Building2 },
    { id: 'ngo', label: 'NGO & Relief Partner', icon: Users },
    { id: 'delivery', label: 'Hyperlocal Logistics', icon: Bike },
    { id: 'admin', label: 'Admin & ESG Center', icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all duration-200 shadow-xs">
      {/* Top B2B Announcement Ribbon */}
      <div className="bg-teal-950 text-white px-4 py-1 text-xs border-b border-teal-800 flex items-center justify-between">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-teal-500 text-slate-950 uppercase tracking-wider">
              B2B Enterprise Engine
            </span>
            <span className="hidden sm:inline text-teal-200 font-medium">
              Institutional Surplus Management · 5 km Micro-Logistics Radius · FSSAI Regulated
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-900/80 text-teal-200 border border-teal-700">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {activeCount} Active Surplus Dispatches
            </span>
            <button
              onClick={resetDemoState}
              title="Reset Demo Data"
              className="text-teal-300 hover:text-white flex items-center gap-1 text-[11px] bg-teal-900/50 hover:bg-teal-800 border border-teal-700 px-2 py-0.5 rounded transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Reset Demo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Brand Logo & Tagline */}
          <div
            onClick={() => setRole('overview')}
            className="flex items-center gap-3 cursor-pointer group select-none flex-shrink-0"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-teal-600 to-emerald-700 flex items-center justify-center text-white shadow-md shadow-teal-700/20 group-hover:scale-105 transition-transform duration-200">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.93c-2.48.46-4.52-1.58-4.06-4.06.33-1.78 1.76-3.21 3.54-3.54 2.48-.46 4.52 1.58 4.06 4.06-.33 1.78-1.76 3.21-3.54 3.54z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-slate-900">
                  FoodRescue <span className="text-teal-600">AI</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
                  v2.5 Enterprise
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block font-medium">
                Predict · Rescue · Redistribute · Sustain
              </p>
            </div>
          </div>

          {/* Multi-Role Switcher (Header/Top Navigation) */}
          <nav className="flex items-center gap-1 sm:gap-1.5 bg-slate-100/90 p-1 rounded-2xl border border-slate-200/90 overflow-x-auto max-w-full">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = role === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setRole(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-white text-teal-900 shadow-sm border border-slate-200 scale-[1.02]'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-teal-600' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action: AI Camera Fast Scan */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={() => setScannerModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-teal-700 hover:bg-teal-800 text-white shadow-sm transition-all"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>AI Vision Scan</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
