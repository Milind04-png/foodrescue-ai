import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Scale,
  UtensilsCrossed,
  Cloud,
  Building,
  Sparkles,
  ArrowRight,
  Database,
  Brain,
  Target,
  GitFork,
  Navigation,
  ShieldCheck,
  BarChart3,
  CheckCircle2,
  Leaf,
  Clock,
  MapPin,
  TrendingDown,
  Award,
} from 'lucide-react';

export default function LandingPage() {
  const { metrics, setRole, donations } = useApp();

  const activeSurplusCount = donations.filter(
    (d) => d.status === 'Pending Match' || d.status === 'NGO Accepted'
  ).length;

  const pipelineStages = [
    {
      step: '01',
      title: 'Data Collection',
      desc: 'POS sales, menus, events and weather feeds stream in continuously.',
      icon: Database,
    },
    {
      step: '02',
      title: 'AI Demand Forecasting',
      desc: "Models predict tomorrow's covers so kitchens cook what's needed.",
      icon: Brain,
    },
    {
      step: '03',
      title: 'Surplus Detection',
      desc: 'Overproduction is flagged hours before it becomes waste.',
      icon: Target,
    },
    {
      step: '04',
      title: 'Smart Matching',
      desc: 'Listings are matched to NGOs by distance, need and portion size.',
      icon: GitFork,
    },
    {
      step: '05',
      title: 'Route Optimization',
      desc: 'Pickups are batched around traffic and spoilage windows.',
      icon: Navigation,
    },
    {
      step: '06',
      title: 'Food Safety Verification',
      desc: 'Temperature, packaging and shelf-life checks at every handover.',
      icon: ShieldCheck,
    },
    {
      step: '07',
      title: 'Impact Analytics',
      desc: 'Every kilo is tracked against SDG 2, 12 and 13 targets.',
      icon: BarChart3,
    },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section (Exact match to Screenshot 2) */}
      <section className="relative pt-10 sm:pt-14 pb-8 overflow-hidden">
        {/* Soft background ambient glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-100/60 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute top-10 left-10 w-72 h-72 bg-sky-100/50 rounded-full blur-3xl pointer-events-none -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7">
          {/* Top Live Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>{activeSurplusCount} surplus listings live right now</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15] max-w-4xl">
            Save Food · Feed People · Build a{' '}
            <span className="text-emerald-500 inline-block font-black">
              Sustainable Tomorrow
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl font-normal leading-relaxed">
            FoodRescue AI forecasts demand, spots surplus before it's wasted, and routes it to NGOs and food banks within the safe-to-eat window.
          </p>

          {/* Workflow Cycle Pills: Predict -> Rescue -> Redistribute -> Measure */}
          <div className="inline-flex items-center flex-wrap gap-2.5 bg-slate-100/90 border border-slate-200/80 rounded-full px-4 py-2 text-xs font-semibold text-slate-700">
            <span className="text-emerald-700 bg-white px-2.5 py-1 rounded-full shadow-2xs border border-emerald-100">Predict</span>
            <span className="text-slate-400">→</span>
            <span className="text-emerald-700 bg-white px-2.5 py-1 rounded-full shadow-2xs border border-emerald-100">Rescue</span>
            <span className="text-slate-400">→</span>
            <span className="text-emerald-700 bg-white px-2.5 py-1 rounded-full shadow-2xs border border-emerald-100">Redistribute</span>
            <span className="text-slate-400">→</span>
            <span className="text-emerald-700 bg-white px-2.5 py-1 rounded-full shadow-2xs border border-emerald-100">Measure</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setRole('donor')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all"
            >
              <span>Donate Surplus Food</span>
            </button>

            <button
              onClick={() => setRole('ngo')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-white text-slate-800 border border-slate-300 hover:bg-slate-50 hover:border-slate-400 shadow-xs transition-all"
            >
              <span>Register as NGO</span>
            </button>

            <button
              onClick={() => setRole('admin')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 transition-all"
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Explore Live Demo</span>
            </button>
          </div>

          {/* 4 Key Stat Cards (Matches Screenshot 2) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
            {/* Card 1: Food Rescued */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                <Scale className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {metrics.foodRescuedKg.toLocaleString('en-IN')} kg
              </div>
              <div className="text-xs font-medium text-slate-500 mt-1">Food rescued</div>
            </div>

            {/* Card 2: Meals Redistributed */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {metrics.mealsRedistributed.toLocaleString('en-IN')}
              </div>
              <div className="text-xs font-medium text-slate-500 mt-1">Meals redistributed</div>
            </div>

            {/* Card 3: CO2e Emissions Saved */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-3">
                <Cloud className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {metrics.co2eSavedKg.toLocaleString('en-IN')} kg
              </div>
              <div className="text-xs font-medium text-slate-500 mt-1">CO₂e emissions saved</div>
            </div>

            {/* Card 4: Active NGOs */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                <Building className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {metrics.activeNgos}
              </div>
              <div className="text-xs font-medium text-slate-500 mt-1">Active NGOs</div>
            </div>
          </div>
        </div>
      </section>

      {/* The 7-Stage Rescue Pipeline Section (Exact match to Screenshot 3) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            The 7–stage rescue pipeline
          </h2>
          <p className="text-base text-slate-500 mt-1">
            From the kitchen's forecast to the community's plate — every step is automated, verified and measured.
          </p>
        </div>

        {/* 8-Card Grid: 7 stages + 1 dark CTA card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pipelineStages.map((stage) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.step}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between h-48 group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-400 group-hover:text-emerald-600 transition-colors">
                    {stage.step}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {stage.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    {stage.desc}
                  </p>
                </div>
              </div>
            );
          })}

          {/* 8th Card: Dark CTA card (Screenshot 3) */}
          <div className="bg-[#051f18] text-white p-6 rounded-2xl shadow-md flex flex-col justify-between h-48 relative overflow-hidden group">
            {/* Subtle glow circle */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-emerald-500/20 rounded-full blur-xl pointer-events-none"></div>

            <div>
              <h3 className="text-lg font-bold leading-snug text-white">
                Ready to stop throwing food away?
              </h3>
            </div>

            <button
              onClick={() => setRole('donor')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 group-hover:translate-x-1 transition-all pt-4"
            >
              <span>Log your first surplus</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Stakeholder Deep Dive Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-emerald-50 via-white to-slate-50 rounded-3xl p-6 sm:p-10 border border-emerald-100/80 shadow-xs space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/60 px-2.5 py-1 rounded-md">
              Ecosystem Roles
            </span>
            <h3 className="text-2xl font-bold text-slate-900 mt-2">
              Empowering every stakeholder in the circular food loop
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Switch roles using the top navigation bar or jump directly below:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div
              onClick={() => setRole('donor')}
              className="bg-white p-5 rounded-xl border border-slate-200/80 hover:border-emerald-500 hover:shadow-sm transition-all cursor-pointer group"
            >
              <div className="text-2xl mb-2">🧑‍🍳</div>
              <h4 className="font-bold text-sm text-slate-900 group-hover:text-emerald-600 flex items-center justify-between">
                <span>Food Donor</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                AI kitchen demand forecast, surplus logging, FSSAI temperature checklist.
              </p>
            </div>

            <div
              onClick={() => setRole('ngo')}
              className="bg-white p-5 rounded-xl border border-slate-200/80 hover:border-emerald-500 hover:shadow-sm transition-all cursor-pointer group"
            >
              <div className="text-2xl mb-2">🤝</div>
              <h4 className="font-bold text-sm text-slate-900 group-hover:text-emerald-600 flex items-center justify-between">
                <span>NGO / Food Bank</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Real-time surplus feed, 1-click claim, expiry countdown timers, distribution log.
              </p>
            </div>

            <div
              onClick={() => setRole('delivery')}
              className="bg-white p-5 rounded-xl border border-slate-200/80 hover:border-emerald-500 hover:shadow-sm transition-all cursor-pointer group"
            >
              <div className="text-2xl mb-2">🚚</div>
              <h4 className="font-bold text-sm text-slate-900 group-hover:text-emerald-600 flex items-center justify-between">
                <span>Delivery Partner</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Interactive route dispatch map, cold-chain checks, OTP delivery handover.
              </p>
            </div>

            <div
              onClick={() => setRole('admin')}
              className="bg-white p-5 rounded-xl border border-slate-200/80 hover:border-emerald-500 hover:shadow-sm transition-all cursor-pointer group"
            >
              <div className="text-2xl mb-2">📊</div>
              <h4 className="font-bold text-sm text-slate-900 group-hover:text-emerald-600 flex items-center justify-between">
                <span>Command Center</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                SDG 2, 12, 13 KPI widgets, Section 80G CSR tax exemption certificate generator.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
