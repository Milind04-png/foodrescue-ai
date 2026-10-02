import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Camera,
  Sparkles,
  CheckCircle2,
  Scan,
  Layers,
  Upload,
  Zap,
} from 'lucide-react';
import { AI_SCAN_PRESETS } from '../data/mockData';

export default function AiScannerModal() {
  const { scannerModalOpen, setScannerModalOpen, addDonation, showToast } = useApp();

  const [scanning, setScanning] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState(AI_SCAN_PRESETS[0]);
  const [customTitle, setCustomTitle] = useState('');

  if (!scannerModalOpen) return null;

  const handleRunScan = (preset) => {
    setSelectedPreset(preset);
    setScanning(true);

    setTimeout(() => {
      setScanning(false);
    }, 1000);
  };

  const handleApplyToBroadcast = () => {
    if (!selectedPreset) return;

    addDonation({
      title: customTitle.trim() || selectedPreset.itemTitle,
      category: selectedPreset.category,
      containerType: selectedPreset.name,
      diet: 'VEG',
      quantityKg: selectedPreset.calculatedWeightKg,
      portions: selectedPreset.portionYield,
      safeHours: selectedPreset.category === 'Cooked Meals' ? 6 : 12,
      notes: `AI Vision volume estimated from ${selectedPreset.name} with ${selectedPreset.confidencePercent}% confidence.`,
    });

    setScannerModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                AI Vision Fast-Listing Tool
              </h3>
              <p className="text-xs text-slate-500">
                Gastronorm Container Volumetric & Portions Estimator
              </p>
            </div>
          </div>
          <button
            onClick={() => setScannerModalOpen(false)}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Select Container Snapshot / Tray:
            </span>
            <span className="text-xs text-teal-700 font-semibold bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
              YOLOv8 Contours + Depth Estimation
            </span>
          </div>

          {/* 4 Preset Container Scenarios */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {AI_SCAN_PRESETS.map((sc) => {
              const isSelected = selectedPreset?.id === sc.id;
              return (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => handleRunScan(sc)}
                  className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                    isSelected
                      ? 'border-teal-600 bg-teal-50/50 shadow-xs ring-1 ring-teal-500'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50/40'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-3xl">{sc.imagePreviewEmoji}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                      {sc.confidencePercent}% Match
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-900 mt-2 line-clamp-1">
                    {sc.name}
                  </div>
                  <div className="text-[11px] text-slate-600 font-medium mt-0.5">
                    {sc.itemTitle}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-teal-800 font-bold mt-2">
                    <span>{sc.calculatedWeightKg} kg</span>
                    <span>·</span>
                    <span>~{sc.portionYield} portions</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Neural Vision Scanning Box */}
          {selectedPreset && (
            <div className="bg-slate-950 text-white rounded-2xl p-5 relative overflow-hidden space-y-4 border border-slate-800">
              {scanning ? (
                <div className="py-6 text-center space-y-3">
                  <Scan className="w-10 h-10 text-teal-400 mx-auto animate-spin" />
                  <div className="text-sm font-semibold text-teal-300">
                    Computing Container Geometry & Volumetric Yield...
                  </div>
                  <div className="text-xs text-slate-400">
                    Standard Gastronorm depth detected. Calculating bulk density and thermal decay index.
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs font-mono text-teal-400 flex items-center gap-1.5 font-bold">
                      <Sparkles className="w-4 h-4" />
                      AI Vision Inference Succeeded · {selectedPreset.confidencePercent}% Confidence
                    </span>
                    <span className="text-xs bg-teal-950 text-teal-300 border border-teal-800 px-2.5 py-0.5 rounded-full font-bold">
                      {selectedPreset.recommendedTier}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Detected Item:</span>
                      <strong className="text-white text-sm">{selectedPreset.itemTitle}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Core Thermal Status:</span>
                      <strong className="text-teal-400 text-sm">{selectedPreset.tempC}°C (Optimal)</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Calculated Mass:</span>
                      <strong className="text-white text-sm">{selectedPreset.calculatedWeightKg} kg</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Standard Servings:</span>
                      <strong className="text-teal-400 text-sm">~{selectedPreset.portionYield} portions</strong>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setScannerModalOpen(false)}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={!selectedPreset || scanning}
            onClick={handleApplyToBroadcast}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedPreset && !scanning
                ? 'bg-teal-700 hover:bg-teal-800 text-white shadow-sm'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Apply AI Estimate & Broadcast</span>
          </button>
        </div>
      </div>
    </div>
  );
}
