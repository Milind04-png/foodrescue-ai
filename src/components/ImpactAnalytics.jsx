import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Award,
  Download,
  Printer,
  Scale,
  UtensilsCrossed,
  Cloud,
  Droplets,
  Building2,
  FileCheck,
  CheckCircle2,
  Share2,
  Sparkles,
  Trophy,
  Zap,
  Recycle,
  ShieldCheck,
} from 'lucide-react';

export default function ImpactAnalytics() {
  const { metrics, selectedDonor, donations, leaderboard } = useApp();
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [activeLeaderboardCategory, setActiveLeaderboardCategory] = useState('ALL');

  // Filter leaderboard
  const filteredLeaderboard = leaderboard.filter((item) => {
    if (activeLeaderboardCategory === 'ALL') return true;
    if (activeLeaderboardCategory === 'CAMPUS') return item.category.includes('University');
    if (activeLeaderboardCategory === 'CORP') return item.category.includes('Corporate');
    if (activeLeaderboardCategory === 'HOSP') return item.category.includes('Hospitality') || item.category.includes('Banqueting');
    return true;
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200">
              Regulatory Compliance & ESG Center
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs text-slate-500 font-semibold">
              FSSAI Section 31 & Section 80G Certified
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 mt-1">
            Institutional ESG & Zero-Waste Impact
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Transparent Audit Ledger · Landfill Methane Avoidance · Campus Sustainability Ranking
          </p>
        </div>

        {/* Certificate Generator Trigger */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setReportModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold bg-teal-700 hover:bg-teal-800 text-white shadow-sm transition-all"
          >
            <Award className="w-4 h-4" />
            <span>Generate Campus Section 80G Certificate</span>
          </button>
        </div>
      </div>

      {/* Primary ESG Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {/* KPI 1: Meals Diverted */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-5 space-y-3 hover:border-teal-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
              UN SDG 2: Zero Hunger
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
              🍲
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-900 tracking-tight">
              {metrics.mealsRedistributed.toLocaleString('en-IN')}
            </div>
            <div className="text-xs font-medium text-slate-500 mt-1">
              Meals Diverted to Beneficiaries
            </div>
          </div>
          <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-600 flex justify-between">
            <span>Flash Boxes: <strong>{metrics.flashMarkdownBoxesSold} sold</strong></span>
            <span className="text-teal-700 font-bold">214 Shelters</span>
          </div>
        </div>

        {/* KPI 2: Food Waste Diverted */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-5 space-y-3 hover:border-teal-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200">
              UN SDG 12: Consumption
            </span>
            <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-sm">
              ⚖️
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-900 tracking-tight">
              {metrics.foodRescuedKg.toLocaleString('en-IN')} kg
            </div>
            <div className="text-xs font-medium text-slate-500 mt-1">
              Total Food Waste Diverted
            </div>
          </div>
          <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-600 flex justify-between">
            <span>Diversion Rate:</span>
            <strong className="text-teal-700">99.6% Zero-Landfill</strong>
          </div>
        </div>

        {/* KPI 3: CO2e Emissions Avoided */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-5 space-y-3 hover:border-teal-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-md border border-sky-200">
              UN SDG 13: Climate
            </span>
            <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center font-bold text-sm">
              🌱
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-900 tracking-tight">
              {metrics.co2eSavedKg.toLocaleString('en-IN')} kg
            </div>
            <div className="text-xs font-medium text-slate-500 mt-1">
              Metric Tons of CO₂e Prevented
            </div>
          </div>
          <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-600 flex justify-between">
            <span>Methane Prevented:</span>
            <strong className="text-sky-800">36,800 m³</strong>
          </div>
        </div>

        {/* KPI 4: Biogas & Water Savings */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-5 space-y-3 hover:border-teal-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-md border border-purple-200">
              Circular Clean Energy
            </span>
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-sm">
              ⚡
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-900 tracking-tight">
              {metrics.biogasKwhGenerated.toLocaleString('en-IN')} kWh
            </div>
            <div className="text-xs font-medium text-slate-500 mt-1">
              Clean Biogas Electricity Created
            </div>
          </div>
          <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-600 flex justify-between">
            <span>Water Conserved:</span>
            <strong className="text-purple-700">148.9M Liters</strong>
          </div>
        </div>
      </div>

      {/* Institutional Waste Prevention Leaderboard */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Institutional Waste Prevention Leaderboard
              </h3>
              <p className="text-xs text-slate-500">
                Ranked comparison of participating campuses and dining facilities based on minimization efficiency
              </p>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 text-xs">
            <button
              onClick={() => setActiveLeaderboardCategory('ALL')}
              className={`px-3 py-1 rounded-xl font-bold transition-colors ${
                activeLeaderboardCategory === 'ALL'
                  ? 'bg-teal-700 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Categories
            </button>
            <button
              onClick={() => setActiveLeaderboardCategory('CAMPUS')}
              className={`px-3 py-1 rounded-xl font-bold transition-colors ${
                activeLeaderboardCategory === 'CAMPUS'
                  ? 'bg-teal-700 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Campuses
            </button>
            <button
              onClick={() => setActiveLeaderboardCategory('CORP')}
              className={`px-3 py-1 rounded-xl font-bold transition-colors ${
                activeLeaderboardCategory === 'CORP'
                  ? 'bg-teal-700 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Tech Parks
            </button>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Institution / Campus</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Food Rescued (kg)</th>
                <th className="py-3 px-4">Meals Diverted</th>
                <th className="py-3 px-4">CO₂e Prevented</th>
                <th className="py-3 px-4">Diversion Efficiency</th>
                <th className="py-3 px-4">Honor Badge</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredLeaderboard.map((row) => (
                <tr key={row.rank} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-black text-slate-900">
                    <span
                      className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                        row.rank === 1
                          ? 'bg-amber-400 text-slate-950 shadow-2xs'
                          : row.rank === 2
                          ? 'bg-slate-300 text-slate-900'
                          : row.rank === 3
                          ? 'bg-amber-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {row.rank}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {row.name}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    {row.category}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                    {row.foodRescuedKg.toLocaleString()} kg
                  </td>
                  <td className="py-3.5 px-4 font-bold text-teal-800">
                    {row.mealsDiverted.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-sky-700">
                    {row.co2ePreventedKg.toLocaleString()} kg
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div
                          style={{ width: `${row.diversionEfficiency}%` }}
                          className="bg-teal-600 h-full rounded-full"
                        ></div>
                      </div>
                      <span className="font-bold text-slate-800 font-mono">
                        {row.diversionEfficiency}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                      <ShieldCheck className="w-3 h-3 text-teal-600" />
                      <span>{row.badge}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 80G Certificate Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="p-5 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-teal-700" />
                <h3 className="text-base font-bold text-slate-900">
                  Campus Zero Food-Waste & Section 80G CSR Certificate
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                >
                  <Printer className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setReportModalOpen(false)}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-600"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Certificate Canvas */}
            <div className="p-8 space-y-6 bg-[#FCFDFB] text-slate-900 border-8 border-double border-teal-700/30 m-4 rounded-2xl print:border-none">
              <div className="text-center space-y-1">
                <div className="inline-block p-2 rounded-2xl bg-teal-50 text-teal-700 mb-2">
                  <Award className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-black tracking-tight text-slate-900 uppercase">
                  Institutional Zero Food-Waste Certificate
                </h2>
                <p className="text-xs text-slate-500 font-mono">
                  Compliant with Income Tax Act Section 80G & FSSAI Surplus Regulations
                </p>
              </div>

              <div className="text-center py-2 border-y border-slate-200">
                <p className="text-xs text-slate-500">Awarded to Institutional Entity</p>
                <h3 className="text-lg font-black text-teal-800 mt-0.5">
                  {selectedDonor.name}
                </h3>
                <p className="text-xs text-slate-600 font-mono mt-0.5">
                  FSSAI License: {selectedDonor.verifiedFssai}
                </p>
              </div>

              <div className="text-xs text-slate-700 leading-relaxed text-center max-w-lg mx-auto">
                <p>
                  This certifies that the recipient has instituted automated time-decay 3-tier escalation and diverted surplus catering meals from municipal landfills to verified relief NGOs and bio-methanation energy facilities.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 bg-white p-4 rounded-2xl border border-slate-200 text-center">
                <div>
                  <div className="text-xs text-slate-400">Total Food Diverted</div>
                  <div className="text-base font-black text-teal-800 mt-0.5">
                    {selectedDonor.donationsCount * 45} kg
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Meals Served</div>
                  <div className="text-base font-black text-slate-900 mt-0.5">
                    {selectedDonor.donationsCount * 115}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Diversion Efficiency</div>
                  <div className="text-base font-black text-sky-700 mt-0.5">
                    {selectedDonor.diversionEfficiency}%
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-200">
                <div>
                  <span className="block font-bold text-slate-800">Verifiable Audit Hash</span>
                  <span className="font-mono text-[10px]">SHA256: 0x8f4d...33a1</span>
                </div>
                <div className="text-right">
                  <span className="block font-bold text-slate-800">Date Issued</span>
                  <span className="font-mono text-[10px]">{new Date().toLocaleDateString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handlePrint}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-teal-700 hover:bg-teal-800 text-white shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Section 80G Receipt</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
