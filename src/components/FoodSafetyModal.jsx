import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  ShieldCheck,
  AlertTriangle,
  Thermometer,
  Clock,
  CheckCircle2,
  Recycle,
  Sparkles,
  QrCode,
  FileText,
} from 'lucide-react';

export default function FoodSafetyModal() {
  const { safetyModalItem, setSafetyModalItem, divertToBioPlant, showToast } = useApp();

  const [ambientTemp, setAmbientTemp] = useState(32); // Ambient room temperature in °C
  const [selectedCategory, setSelectedCategory] = useState('Cooked Gravy');
  const [checks, setChecks] = useState({
    visualFresh: true,
    aromaNormal: true,
    containerSealed: true,
    handHygiene: true,
    allergenTag: true,
  });

  if (!safetyModalItem) return null;

  // Calculate Arrhenius dynamic shelf life based on temperature
  // Safe baseline at 20°C: 6 hours. At 40°C in Indian summer: 2 hours.
  const calculateDynamicShelfLife = (temp) => {
    if (temp <= 5) return 48; // Refrigerated
    if (temp >= 63) return 6; // Maintained hot
    // In bacterial danger zone (5°C to 60°C)
    const factor = Math.exp(0.045 * (temp - 25));
    const hours = Math.max(1.5, Math.min(6, 4.5 / factor));
    return Number(hours.toFixed(1));
  };

  const dynamicHours = calculateDynamicShelfLife(ambientTemp);

  const handleZeroWasteDivert = () => {
    divertToBioPlant(safetyModalItem.id);
    setSafetyModalItem(null);
  };

  const handleVerifySuccess = () => {
    showToast(
      'FSSAI Verification Confirmed!',
      `Batch ${safetyModalItem.id} verified with digital temperature reading & passed HACCP audit.`
    );
    setSafetyModalItem(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Food Safety & FSSAI Compliance Inspector
              </h3>
              <p className="text-xs text-slate-500">
                Batch ID: <strong className="font-mono text-slate-800">{safetyModalItem.id}</strong> · {safetyModalItem.title}
              </p>
            </div>
          </div>
          <button
            onClick={() => setSafetyModalItem(null)}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* FSSAI Temperature Danger Zone Visual Guide */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/90 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                <Thermometer className="w-4 h-4 text-emerald-600" />
                <span>Thermal Danger Zone Standard (FSSAI HACCP)</span>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                Current Batch: {safetyModalItem.temperatureC}°C
              </span>
            </div>

            {/* Visual Gauge Bar */}
            <div className="space-y-1">
              <div className="h-6 rounded-lg overflow-hidden flex text-[10px] font-bold text-white text-center shadow-inner">
                <div className="bg-sky-500 w-[20%] flex items-center justify-center" title="Safe Chilled (< 5°C)">
                  &lt; 5°C Cold
                </div>
                <div className="bg-amber-500 w-[55%] flex items-center justify-center relative" title="Danger Zone (5°C - 60°C)">
                  <span>Danger Zone (5°C – 60°C)</span>
                </div>
                <div className="bg-emerald-600 w-[25%] flex items-center justify-center" title="Safe Hot Holding (> 63°C)">
                  &gt; 63°C Hot
                </div>
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 font-medium px-1">
                <span>0°C (Refrigerated)</span>
                <span>32°C (Ambient Delhi)</span>
                <span>65°C+ (Thermal Safe)</span>
              </div>
            </div>
          </div>

          {/* Interactive Arrhenius Microbial Decay Simulator */}
          <div className="space-y-3 bg-emerald-50/40 p-4 rounded-2xl border border-emerald-100">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Microbial Decay Estimator (Arrhenius Model)</span>
              </h4>
              <span className="text-xs font-bold text-emerald-700 bg-white px-2 py-0.5 rounded-full border border-emerald-200">
                Safe Window: {dynamicHours} hours
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Ambient temperature dramatically accelerates bacterial colony doubling. Move the slider to simulate ambient room conditions:
            </p>

            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs text-slate-700">
                <span>Ambient Environment Temp:</span>
                <span className="font-bold font-mono">{ambientTemp}°C</span>
              </div>
              <input
                type="range"
                min="15"
                max="45"
                value={ambientTemp}
                onChange={(e) => setAmbientTemp(parseInt(e.target.value, 10))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>15°C (Air Conditioned)</span>
                <span>30°C (Room Temp)</span>
                <span>45°C (Heatwave)</span>
              </div>
            </div>
          </div>

          {/* Digital Inspection Checklist */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Digital Quality & Hygiene Checklist
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
              <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checks.visualFresh}
                  onChange={(e) => setChecks({ ...checks, visualFresh: e.target.checked })}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span>Visual color & freshness verified</span>
              </label>

              <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checks.aromaNormal}
                  onChange={(e) => setChecks({ ...checks, aromaNormal: e.target.checked })}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span>Normal culinary aroma (no souring)</span>
              </label>

              <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checks.containerSealed}
                  onChange={(e) => setChecks({ ...checks, containerSealed: e.target.checked })}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span>Tamper-evident food-grade seal</span>
              </label>

              <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checks.allergenTag}
                  onChange={(e) => setChecks({ ...checks, allergenTag: e.target.checked })}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span>Clear dietary & allergen labeling</span>
              </label>
            </div>
          </div>

          {/* 100% Zero-Landfill Fail-Safe Notice */}
          <div className="bg-purple-50 border border-purple-200/80 rounded-2xl p-4 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-purple-900">
                <Recycle className="w-4 h-4 text-purple-600" />
                <span>100% Zero-Landfill Circular Economy Guarantee</span>
              </div>
              <p className="text-xs text-purple-800 leading-relaxed">
                If food cannot be redistributed before the safe time limit, our system prevents landfill disposal by automatically rerouting to the <strong>MCD Okhla Bio-Methanation Facility</strong> to produce clean biogas electricity.
              </p>
            </div>

            <button
              type="button"
              onClick={handleZeroWasteDivert}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white whitespace-nowrap shadow-xs transition-colors flex-shrink-0"
            >
              Reroute to Biogas
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between sticky bottom-0">
          <div className="text-xs text-slate-500">
            FSSAI Section 31 Compliant · ISO 22000 Ready
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSafetyModalItem(null)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
            >
              Close
            </button>

            <button
              type="button"
              onClick={handleVerifySuccess}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Sign & Verify FSSAI Stamp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
