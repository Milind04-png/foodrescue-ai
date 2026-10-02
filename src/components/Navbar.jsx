import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Store,
  Building2,
  Truck,
  LayoutDashboard,
  Home,
  ShieldCheck,
  RotateCcw,
  Bell,
  ArrowRight,
} from 'lucide-react';

export default function Navbar() {
  const {
    role,
    setRole,
    donations,
    selectedDonor,
    resetDemoState,
  } = useApp();

  // Active surplus listings count (pending match)
  const activeSurplusCount = donations.filter(
    (d) => d.status === 'Pending Match' || d.status === 'NGO Accepted'
  ).length;

  const navItems = [
    { id: 'overview', label: 'Overview', icon: Home, highlight: false },
    { id: 'donor', label: 'Food Donor', icon: Store, highlight: false },
    { id: 'ngo', label: 'NGO / Food Bank', icon: Building2, highlight: false },
    { id: 'delivery', label: 'Delivery Partner', icon: Truck, highlight: false },
    { id: 'admin', label: 'Command Center', icon: LayoutDashboard, highlight: false },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all duration-200 shadow-xs">
      {/* Top live network announcement banner */}
      <div className="bg-emerald-50/70 border-b border-emerald-100/60 px-4 py-1 text-xs text-slate-600 flex items-center justify-between">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-600 text-white shadow-2xs">
              Live Network
            </span>
            <span className="hidden sm:inline text-slate-600 font-medium">
              AI-Powered Smart Food Waste Reduction & Sustainable Redistribution
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {activeSurplusCount} surplus listings live right now
            </span>
            <button
              onClick={resetDemoState}
              title="Reset Demo Data to Initial State"
              className="text-slate-500 hover:text-slate-800 flex items-center gap-1 text-[11px] bg-white border border-slate-200 hover:bg-slate-50 px-2 py-0.5 rounded-md transition-colors"
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
          {/* Logo & Brand */}
          <div
            onClick={() => setRole('overview')}
            className="flex items-center gap-2.5 cursor-pointer group select-none flex-shrink-0"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200">
              {/* Stylized leaf logo matching screenshot */}
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.93c-2.48.46-4.52-1.58-4.06-4.06.33-1.78 1.76-3.21 3.54-3.54 2.48-.46 4.52 1.58 4.06 4.06-.33 1.78-1.76 3.21-3.54 3.54z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-slate-900">
                  FoodRescue <span className="text-emerald-500">AI</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block leading-none -mt-0.5">
                Save Food · Feed People · Build a Sustainable Tomorrow
              </p>
            </div>
          </div>

          {/* Multi-Role Switcher (Header/Top Navigation) matching screenshots */}
          <nav className="flex items-center gap-1 sm:gap-1.5 bg-slate-100/90 p-1 rounded-full border border-slate-200/90 overflow-x-auto max-w-full">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = role === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setRole(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80 scale-[1.02]'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-600' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick Context Chip / Action */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={() => setRole('donor')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm transition-all"
            >
              <span>+ Log Surplus</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
