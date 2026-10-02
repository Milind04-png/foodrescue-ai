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
  Zap,
  Tag,
  Recycle,
} from 'lucide-react';
import FaqGuide from './FaqGuide';

export default function LandingPage() {
  const { metrics, setRole, donations } = useApp();

  const activeCount = donations.filter(
    (d) => d.status === 'Pending Match' || d.status === 'Claimed by NGO'
  ).length;

  const pipelineStages = [
    {
      step: '01',
      title: 'Institutional Data Ingestion',
      desc: 'Campus mess POS, banquet bookings, and weather feeds stream in continuously.',
      icon: Database,
    },
    {
      step: '02',
      title: 'AI Kitchen Demand Forecaster',
      desc: 'Predicts student and staff dining covers to prevent overproduction before cooking.',
      icon: Brain,
    },
    {
      step: '03',
      title: 'AI Vision Volumetric Fast-Scan',
      desc: 'Computer vision scans gastronorm pans, estimating mass, portions, and FSSAI shelf life.',
      icon: Target,
    },
    {
      step: '04',
      title: 'Dynamic 3-Tier Escalation',
      desc: 'Flash Markdown (70% off) ➔ 1-Click NGO 5 km Rescue ➔ Biogas Digest partner.',
      icon: GitFork,
    },
    {
      step: '05',
      title: 'Hyperlocal 5 km Route Dispatch',
      desc: 'Pickups batched for 2-wheeler electric couriers with insulated thermal boxes.',
      icon: Navigation,
    },
    {
      step: '06',
      title: 'FSSAI Digital Handover Gate',
      desc: 'Core temperature probe check and dual-key QR transfer for Good Samaritan legal indemnity.',
      icon: ShieldCheck,
    },
    {
      step: '07',
      title: 'ESG & Section 80G Audit Ledger',
      desc: 'Verified tracking against UN SDGs 2, 12, 13 and corporate tax exemption receipts.',
      icon: BarChart3,
    },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative pt-10 sm:pt-14 pb-8 overflow-hidden">
        {/* Soft background ambient glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-100/60 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7">
          {/* Top Live Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200/80 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>B2B Institutional Platform · {activeCount} Live Surplus Dispatches in 5 km Radius</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.12] max-w-4xl">
            Predict · Rescue · Redistribute ·{' '}
            <span className="text-teal-700 inline-block">
              Sustain
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl font-normal leading-relaxed">
            AI-powered institutional surplus food management for campus cafeterias, corporate tech parks, hotels, and banquets. Features real-time computer vision, dynamic 3-tier escalation, and FSSAI-compliant regulatory safety handovers within a 5 km micro-logistics radius.
          </p>

          {/* Workflow Sequence */}
          <div className="inline-flex items-center flex-wrap gap-2.5 bg-slate-100/90 border border-slate-200/80 rounded-2xl px-4 py-2 text-xs font-bold text-slate-700">
            <span className="text-teal-900 bg-white px-3 py-1 rounded-xl shadow-2xs border border-teal-100">Predict Demand</span>
            <span className="text-slate-400">→</span>
            <span className="text-teal-900 bg-white px-3 py-1 rounded-xl shadow-2xs border border-teal-100">AI Vision Scan</span>
            <span className="text-slate-400">→</span>
            <span className="text-teal-900 bg-white px-3 py-1 rounded-xl shadow-2xs border border-teal-100">3-Tier Escalation</span>
            <span className="text-slate-400">→</span>
            <span className="text-teal-900 bg-white px-3 py-1 rounded-xl shadow-2xs border border-teal-100">FSSAI Legal Handover</span>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setRole('donor')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold bg-teal-700 text-white hover:bg-teal-800 shadow-md shadow-teal-700/20 hover:shadow-lg transition-all"
            >
              <span>Log Campus Surplus</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setRole('ngo')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold bg-white text-slate-800 border border-slate-300 hover:bg-slate-50 transition-all shadow-xs"
            >
              <span>Explore NGO 5 km Feed</span>
            </button>

            <button
              onClick={() => setRole('admin')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 transition-all"
            >
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>ESG & Campus Leaderboard</span>
            </button>
          </div>

          {/* 4 Primary Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
            <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mb-3">
                <Scale className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {metrics.foodRescuedKg.toLocaleString('en-IN')} kg
              </div>
              <div className="text-xs font-semibold text-slate-500 mt-1">Institutional Waste Diverted</div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mb-3">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {metrics.mealsRedistributed.toLocaleString('en-IN')}
              </div>
              <div className="text-xs font-semibold text-slate-500 mt-1">Meals Redistributed to Shelters</div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-700 flex items-center justify-center mb-3">
                <Cloud className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {metrics.co2eSavedKg.toLocaleString('en-IN')} kg
              </div>
              <div className="text-xs font-semibold text-slate-500 mt-1">CO₂e Emissions Abated</div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center mb-3">
                <Building className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {metrics.activeDonors}
              </div>
              <div className="text-xs font-semibold text-slate-500 mt-1">Campuses & Tech Parks Active</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Tier Dynamic Escalation Explainer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md">
              Automated Dynamic Escalation
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-2">
              The 3-Tier Time-Decay Safeguard Architecture
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Surplus moves autonomously across 3 escalation tiers based on food prep timestamps and FSSAI safe consumption limits:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl border border-teal-100 bg-teal-50/40 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-teal-800 bg-white px-2.5 py-1 rounded-lg border border-teal-200">
                  Tier 1: 4–6 hrs shelf life
                </span>
                <Tag className="w-4 h-4 text-teal-700" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Campus Flash Markdown</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Student and staff mystery box reservation at 70% discount (₹49) to recover food cost while food is piping hot.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-amber-100 bg-amber-50/40 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-800 bg-white px-2.5 py-1 rounded-lg border border-amber-200">
                  Tier 2: 2–4 hrs shelf life
                </span>
                <Zap className="w-4 h-4 text-amber-700" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">1-Click NGO Micro-Rescue</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automated broadcast to verified shelters within 5 km. 2-wheeler electric couriers dispatched with insulated thermal boxes.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-purple-100 bg-purple-50/40 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-800 bg-white px-2.5 py-1 rounded-lg border border-purple-200">
                  Tier 3: &lt; 2 hrs shelf life
                </span>
                <Recycle className="w-4 h-4 text-purple-700" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Municipal Biogas Partner</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Sub-threshold batches route directly to MCD Okhla Bio-Methanation facility, generating clean electricity and organic compost.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The 7-Stage Pipeline Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900">
            The 7–stage institutional rescue pipeline
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            From the university kitchen's forecast to the community shelter plate — automated, verified, and legally protected.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pipelineStages.map((stage) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.step}
                className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:border-teal-400 hover:shadow-md transition-all flex flex-col justify-between h-48 group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center group-hover:bg-teal-700 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-400 group-hover:text-teal-700 transition-colors">
                    {stage.step}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {stage.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                    {stage.desc}
                  </p>
                </div>
              </div>
            );
          })}

          {/* 8th Card: Dark Call to Action */}
          <div className="bg-[#052e25] text-white p-6 rounded-3xl shadow-md flex flex-col justify-between h-48 relative overflow-hidden group">
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-teal-500/20 rounded-full blur-xl pointer-events-none"></div>

            <div>
              <span className="text-[10px] font-bold text-teal-400 uppercase tracking-widest block mb-1">
                Zero Waste Campus
              </span>
              <h3 className="text-base font-bold leading-snug text-white">
                Ready to optimize your institutional dining waste?
              </h3>
            </div>

            <button
              onClick={() => setRole('donor')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-300 hover:text-white group-hover:translate-x-1 transition-all pt-4"
            >
              <span>Launch Institutional Command Center</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Stakeholder Jump Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-teal-50/70 via-white to-slate-50 rounded-3xl p-6 sm:p-10 border border-teal-100 shadow-xs space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-100/70 px-2.5 py-1 rounded-md">
              Ecosystem Roles
            </span>
            <h3 className="text-2xl font-black text-slate-900 mt-2">
              Empowering every stakeholder in the circular food loop
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div
              onClick={() => setRole('donor')}
              className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-teal-600 hover:shadow-sm transition-all cursor-pointer group"
            >
              <div className="text-2xl mb-2">🏛️</div>
              <h4 className="font-bold text-sm text-slate-900 group-hover:text-teal-700 flex items-center justify-between">
                <span>Institutional Donor</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                AI vision container scan, 3-tier escalation, kitchen demand forecasting.
              </p>
            </div>

            <div
              onClick={() => setRole('ngo')}
              className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-teal-600 hover:shadow-sm transition-all cursor-pointer group"
            >
              <div className="text-2xl mb-2">🤝</div>
              <h4 className="font-bold text-sm text-slate-900 group-hover:text-teal-700 flex items-center justify-between">
                <span>NGO & Relief Partner</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                5 km radius surplus feed, urgent countdown timers, 1-click claim allocation.
              </p>
            </div>

            <div
              onClick={() => setRole('delivery')}
              className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-teal-600 hover:shadow-sm transition-all cursor-pointer group"
            >
              <div className="text-2xl mb-2">🛵</div>
              <h4 className="font-bold text-sm text-slate-900 group-hover:text-teal-700 flex items-center justify-between">
                <span>Hyperlocal Logistics</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Interactive route map, 3-step pickup verification, dual-key QR handover.
              </p>
            </div>

            <div
              onClick={() => setRole('admin')}
              className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-teal-600 hover:shadow-sm transition-all cursor-pointer group"
            >
              <div className="text-2xl mb-2">📜</div>
              <h4 className="font-bold text-sm text-slate-900 group-hover:text-teal-700 flex items-center justify-between">
                <span>ESG & Compliance</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Campus Zero-Waste Leaderboard, Section 80G tax receipt, FSSAI audits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform FAQ & Operational Guide */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FaqGuide />
      </section>
    </div>
  );
}
