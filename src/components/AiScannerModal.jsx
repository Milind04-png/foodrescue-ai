import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Camera,
  Sparkles,
  CheckCircle2,
  Scan,
  RefreshCw,
} from 'lucide-react';

export default function AiScannerModal() {
  const { scannerModalOpen, setScannerModalOpen, addDonation, showToast } = useApp();

  const [scanning, setScanning] = useState(false);
  const [selectedScan, setSelectedScan] = useState(null);

  if (!scannerModalOpen) return null;

  const mockScanScenarios = [
    {
      id: 'sc-1',
      title: 'Commercial Steam Tray — Veg Biryani & Salan',
      category: 'Cooked',
      portions: 35,
      weightKg: 12,
      confidence: 97.4,
      freshness: 'Optimal Hot Holding (69°C)',
      fssaiGrade: 'Grade A Verified',
      previewEmoji: '🥘',
    },
    {
      id: 'sc-2',
      title: 'Bakery Batch — Brioche Buns & Croissants',
      category: 'Bakery',
      portions: 40,
      weightKg: 8,
      confidence: 96.1,
      freshness: 'Fresh Bake (< 4 hrs old)',
      fssaiGrade: 'Grade A Verified',
      previewEmoji: '🥐',
    },
    {
      id: 'sc-3',
      title: 'Buffet Salad Bar — Mixed Garden Greens',
      category: 'Raw',
      portions: 25,
      weightKg: 10,
      confidence: 94.8,
      freshness: 'Chilled Crisp (< 4°C)',
      fssaiGrade: 'Grade A Verified',
      previewEmoji: '🥗',
    },
  ];

  const handleRunScan = (scenario) => {
    setSelectedScan(scenario);
    setScanning(true);

    setTimeout(() => {
      setScanning(false);
    }, 1200);
  };

  const handleApplyToDonation = () => {
    if (!selectedScan) return;

    addDonation({
      title: selectedScan.title,
      category: selectedScan.category,
      diet: 'VEG',
      quantityKg: selectedScan.weightKg,
      portions: selectedScan.portions,
      safeHours: selectedScan.category === 'Cooked' ? 4 : 12,
    });

    setScannerModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                AI Vision Food Scanner & Volume Estimator
              </h3>
              <p className="text-xs text-slate-500">
                Simulated Computer Vision (YOLOv8 + FSSAI Thermal Model)
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

        {/* Body */}
        <div className="p-6 space-y-5">
          <p className="text-xs text-slate-600">
            Select a simulated kitchen food camera feed to detect volume, classify category, and estimate portions automatically:
          </p>

          {/* Scenario Selection Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {mockScanScenarios.map((sc) => {
              const isSelected = selectedScan?.id === sc.id;
              return (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => handleRunScan(sc)}
                  className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50/50 shadow-xs ring-1 ring-emerald-400'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50/40'
                  }`}
                >
                  <div className="text-3xl mb-2">{sc.previewEmoji}</div>
                  <div className="text-xs font-bold text-slate-900 line-clamp-1">
                    {sc.category}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {sc.weightKg} kg · {sc.portions} portions
                  </div>
                </button>
              );
            })}
          </div>

          {/* Scanning Animation / Scan Results Box */}
          {selectedScan && (
            <div className="bg-slate-900 text-white rounded-2xl p-5 relative overflow-hidden space-y-4">
              {scanning ? (
                <div className="py-8 text-center space-y-3">
                  <Scan className="w-10 h-10 text-emerald-400 mx-auto animate-spin" />
                  <div className="text-sm font-semibold text-emerald-300">
                    Running Neural Contour Detection & Thermal Profiling...
                  </div>
                  <div className="text-xs text-slate-400">
                    Estimating cubic volume, moisture index, and FSSAI shelf life
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 font-bold">
                      <Sparkles className="w-4 h-4" />
                      AI Scan Complete · {selectedScan.confidence}% Confidence
                    </span>
                    <span className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded">
                      {selectedScan.fssaiGrade}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Detected Item:</span>
                      <strong className="text-white text-sm">{selectedScan.title}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Thermal Status:</span>
                      <strong className="text-emerald-400">{selectedScan.freshness}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Calculated Mass:</span>
                      <strong className="text-white text-sm">{selectedScan.weightKg} kg</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Portion Yield:</span>
                      <strong className="text-emerald-400 text-sm">~{selectedScan.portions} portions</strong>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
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
            disabled={!selectedScan || scanning}
            onClick={handleApplyToDonation}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedScan && !scanning
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Apply AI Scan & Broadcast</span>
          </button>
        </div>
      </div>
    </div>
  );
}
