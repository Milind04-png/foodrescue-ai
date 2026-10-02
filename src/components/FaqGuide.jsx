import React, { useState } from 'react';
import {
  HelpCircle,
  ChevronDown,
  ShieldCheck,
  Zap,
  Award,
  Sparkles,
  Recycle,
} from 'lucide-react';

export default function FaqGuide() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: 'How does the Pre-Cooking AI Demand Forecaster work?',
      a: 'FoodRescue AI integrates historical POS sales logs, weather forecasts (e.g., rainfall, monsoon footfall drops), and local event schedules with a Scikit-Learn Random Forest Regressor. Before kitchen staff starts prep, the system flags predicted overproduction (e.g., recommending a 20% cut in Thursday lunch covers) to eliminate waste before cooking begins.',
      icon: Sparkles,
    },
    {
      q: 'What is the FSSAI Microbial Thermal Danger Zone rule?',
      a: 'According to FSSAI HACCP standards, food in the temperature danger zone between 5°C and 60°C experiences rapid bacterial proliferation. FoodRescue AI enforces that cooked food must be maintained either above 63°C (hot holding) or below 5°C (refrigeration). An Arrhenius microbial decay engine dynamically computes remaining safe consumption minutes based on ambient room temperature.',
      icon: ShieldCheck,
    },
    {
      q: 'How does the 100% Zero-Landfill circular fail-safe work?',
      a: 'If surplus food reaches its safe consumption threshold before an NGO can distribute it, it is NEVER sent to landfills. The system automatically issues a diversion route to the nearest municipal bio-methanation facility (such as MCD Okhla Bio-Methanation) or Pusa Vermicompost facility, converting organic waste into clean electricity and organic bio-fertilizer.',
      icon: Recycle,
    },
    {
      q: 'How do hotels and restaurants claim Section 80G CSR tax benefits?',
      a: 'Every kilogram of edible food rescued and served to verified NGOs is logged onto our transparent sustainability ledger. Participating businesses can generate verified Section 80G CSR impact certificates featuring official audit hashes, verified kilograms, and meal equivalents for corporate audit and corporate social responsibility (CSR) compliance.',
      icon: Award,
    },
    {
      q: 'How does electric fleet routing reduce delivery carbon footprint?',
      a: 'Deliveries are assigned to clean electric two-wheelers and mini-vans (e.g. Ather 450X, Tata Ace EV) equipped with thermal-insulated containers. Multi-waypoint Dijkstra algorithms prioritize corridors with lower traffic congestion and shortest transit durations to preserve food temperature and maximize EV battery efficiency.',
      icon: Zap,
    },
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-6">
      <div className="flex items-center gap-2.5">
        <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            Platform Operational Guide & FAQs
          </h3>
          <p className="text-xs text-slate-500">
            FSSAI compliance rules, AI forecasting, and closed-loop circular redistribution
          </p>
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          const Icon = faq.icon;
          return (
            <div key={idx} className="py-3.5">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex items-center justify-between text-left gap-3 group"
              >
                <span className="flex items-center gap-2.5 text-sm font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors">
                  <Icon className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{faq.q}</span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-transform flex-shrink-0 ${
                    isOpen ? 'rotate-180 text-emerald-600' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <p className="text-xs text-slate-600 leading-relaxed mt-2.5 pl-6 animate-fadeIn">
                  {faq.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
