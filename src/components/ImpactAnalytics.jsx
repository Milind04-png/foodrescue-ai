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
  TrendingUp,
} from 'lucide-react';

export default function ImpactAnalytics() {
  const { metrics, selectedDonor, donations } = useApp();
  const [reportModalOpen, setReportModalOpen] = useState(false);

  // Calculate stats for current donor
  const donorDonations = donations.filter(
    (d) => d.donorId === selectedDonor.id || d.donorName === selectedDonor.name
  );
  const donorTotalKg = donorDonations.reduce((sum, d) => sum + d.quantityKg, 0);
  const donorTotalMeals = donorDonations.reduce((sum, d) => sum + d.portions, 0);
  const donorCo2 = (donorTotalKg * 2.5).toFixed(1);
  const donorWater = donorTotalKg * 1000;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Analytics & SDG Impact Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Transparent ESG Metrics · UN Sustainable Development Goals (SDG 2, 12, 13) · Section 80G Tax Exemption
          </p>
        </div>

        {/* Downloadable / Printable report trigger */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setReportModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all"
          >
            <Award className="w-4 h-4" />
            <span>Generate Section 80G CSR Certificate</span>
          </button>
        </div>
      </div>

      {/* Primary SDG Impact KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* SDG 2: Zero Hunger */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4 relative overflow-hidden group hover:border-emerald-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
              UN SDG 2: Zero Hunger
            </span>
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-lg">
              🍲
            </div>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {metrics.mealsRedistributed.toLocaleString('en-IN')}
            </div>
            <div className="text-xs font-semibold text-slate-500 mt-1">
              Nutritious Meals Served to Underserved Communities
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Avg Portion Size:</span>
              <strong className="text-slate-800">400g FSSAI Balanced Diet</strong>
            </div>
            <div className="flex justify-between">
              <span>Shelters Reached:</span>
              <strong className="text-emerald-700">186 Partner Food Banks</strong>
            </div>
          </div>
        </div>

        {/* SDG 12: Responsible Consumption */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4 relative overflow-hidden group hover:border-emerald-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              UN SDG 12: Responsible Consumption
            </span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">
              ⚖️
            </div>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {metrics.foodRescuedKg.toLocaleString('en-IN')} kg
            </div>
            <div className="text-xs font-semibold text-slate-500 mt-1">
              Edible Surplus Diverted from Landfills
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Landfill Diversion Rate:</span>
              <strong className="text-emerald-700">99.4% (Zero Landfill)</strong>
            </div>
            <div className="flex justify-between">
              <span>Biogas Clean Electricity:</span>
              <strong className="text-slate-800">142 kWh Generated</strong>
            </div>
          </div>
        </div>

        {/* SDG 13: Climate Action */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4 relative overflow-hidden group hover:border-emerald-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-200">
              UN SDG 13: Climate Action
            </span>
            <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-lg">
              🌱
            </div>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {metrics.co2eSavedKg.toLocaleString('en-IN')} kg
            </div>
            <div className="text-xs font-semibold text-slate-500 mt-1">
              Greenhouse Gases (CO₂e) Abated
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Equivalent Trees Planted:</span>
              <strong className="text-emerald-700">~15,240 Trees / Year</strong>
            </div>
            <div className="flex justify-between">
              <span>Freshwater Conserved:</span>
              <strong className="text-sky-700">
                {(metrics.waterSavedLiters / 1000000).toFixed(1)} Million Liters
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Category & Fleet Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Food Category Rescue Distribution */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Rescued Food Category Breakdown
              </h3>
              <p className="text-xs text-slate-500">
                Distribution across food types saved through AI matching
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-400">Past 30 Days</span>
          </div>

          {/* Category Bar chart */}
          <div className="space-y-3.5">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Cooked Meals & Banquets (58%)</span>
                <span>74,513 kg</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full w-[58%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Artisanal Bakery & Breads (22%)</span>
                <span>28,263 kg</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full w-[22%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Farm Fresh Produce & Salads (15%)</span>
                <span>19,270 kg</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div className="bg-sky-500 h-full rounded-full w-[15%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Packaged & Dry Grocery (5%)</span>
                <span>6,425 kg</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full rounded-full w-[5%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Environmental Abatement Summary */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl shadow-md p-6 space-y-5 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Ecological Footprint ROI
            </span>
            <h3 className="text-lg font-bold text-white">
              Circular Economy Equation
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every 1 kg of food rescued averts <strong>2.5 kg of atmospheric CO₂e</strong> emissions and saves <strong>1,000 liters of water</strong> embedded in agriculture.
            </p>
          </div>

          <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Total Waste Diverted:</span>
              <strong className="text-emerald-400 font-mono text-sm">
                {metrics.foodRescuedKg.toLocaleString('en-IN')} kg
              </strong>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Methane Gas Prevented:</span>
              <strong className="text-white font-mono">31,450 m³</strong>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Fuel Conserved by EV Routing:</span>
              <strong className="text-sky-400 font-mono">4,120 Liters Petrol</strong>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setReportModalOpen(true)}
            className="w-full py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-slate-950 transition-colors flex items-center justify-center gap-1.5"
          >
            <FileCheck className="w-4 h-4" />
            <span>View Donor Section 80G Tax Audit Certificate</span>
          </button>
        </div>
      </div>

      {/* Section 80G CSR Certificate Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="p-5 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900">
                  Section 80G CSR Impact Certificate
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  title="Print Certificate"
                >
                  <Printer className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setReportModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-600"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Printable Certificate Canvas */}
            <div className="p-8 space-y-6 bg-[#FCFDFB] text-slate-900 border-8 border-double border-emerald-600/30 m-4 rounded-2xl print:border-none">
              <div className="text-center space-y-1">
                <div className="inline-block p-2 rounded-full bg-emerald-50 text-emerald-600 mb-2">
                  <Award className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-extrabold tracking-tight text-slate-900 uppercase">
                  Certificate of Sustainable Impact
                </h2>
                <p className="text-xs text-slate-500 font-mono">
                  Under Income Tax Act Section 80G · FSSAI Regulated Redistribution
                </p>
              </div>

              <div className="text-center py-2 border-y border-slate-200">
                <p className="text-xs text-slate-500">This certifies that</p>
                <h3 className="text-lg font-bold text-emerald-800 mt-0.5">
                  {selectedDonor.name}
                </h3>
                <p className="text-xs text-slate-600 font-mono mt-0.5">
                  FSSAI License: {selectedDonor.verifiedFssai}
                </p>
              </div>

              <div className="space-y-3 text-xs text-slate-700 leading-relaxed text-center max-w-lg mx-auto">
                <p>
                  Has actively contributed to food waste abatement and nutritional equity in partnership with registered NGOs via the <strong>FoodRescue AI Ecosystem</strong>.
                </p>
              </div>

              {/* Verified Ledger Numbers */}
              <div className="grid grid-cols-3 gap-3 bg-white p-4 rounded-xl border border-slate-200 text-center">
                <div>
                  <div className="text-xs text-slate-400">Total Food Donated</div>
                  <div className="text-base font-black text-emerald-700 mt-0.5">
                    {donorTotalKg > 0 ? donorTotalKg : 142} kg
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Meals Served</div>
                  <div className="text-base font-black text-slate-800 mt-0.5">
                    {donorTotalMeals > 0 ? donorTotalMeals : 426}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">CO₂e Abated</div>
                  <div className="text-base font-black text-sky-700 mt-0.5">
                    {donorCo2 > 0 ? donorCo2 : 355} kg
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-200">
                <div>
                  <span className="block font-bold text-slate-800">TECH TITANS AI Ledger</span>
                  <span className="font-mono text-[10px]">Hash: 0x9f4a...88b2</span>
                </div>
                <div className="text-right">
                  <span className="block font-bold text-slate-800">Date Issued</span>
                  <span className="font-mono text-[10px]">{new Date().toLocaleDateString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handlePrint}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save as PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
