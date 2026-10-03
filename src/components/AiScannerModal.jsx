import React, { useState, useRef } from 'react';
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
  RefreshCw,
  Image as ImageIcon,
  Cpu,
} from 'lucide-react';
import { AI_SCAN_PRESETS } from '../data/mockData';
import { analyzeFoodImage } from '../utils/computerVision';

export default function AiScannerModal() {
  const { scannerModalOpen, setScannerModalOpen, addDonation, showToast } = useApp();

  const [scanning, setScanning] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState(AI_SCAN_PRESETS[0]);
  const [customTitle, setCustomTitle] = useState('');
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [cvResult, setCvResult] = useState(null);
  const fileInputRef = useRef(null);

  if (!scannerModalOpen) return null;

  const handleRunPresetScan = async (preset) => {
    setSelectedPreset(preset);
    setScanning(true);

    try {
      // Create a canvas placeholder representing the container
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      // Draw background color representing food preset
      if (preset.name.includes('Rice')) {
        ctx.fillStyle = '#F8FAFC';
      } else if (preset.name.includes('Dal')) {
        ctx.fillStyle = '#D97706';
      } else {
        ctx.fillStyle = '#B45309';
      }
      ctx.fillRect(0, 0, 256, 256);
      const dataUrl = canvas.toDataURL();
      setImagePreviewUrl(dataUrl);

      const result = await analyzeFoodImage(dataUrl, preset.volumeLiters);
      setCvResult(result);
    } catch (err) {
      console.error('CV analysis error:', err);
    } finally {
      setScanning(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setScanning(true);
    const objectUrl = URL.createObjectURL(file);
    setImagePreviewUrl(objectUrl);

    try {
      const result = await analyzeFoodImage(file, selectedPreset.volumeLiters);
      setCvResult(result);
      showToast(
        'Edge Computer Vision Inference Complete!',
        `Identified ${result.detectedFood} with ${result.confidencePercent} confidence in ${result.latencyMs}ms.`,
        'success'
      );
    } catch (err) {
      showToast('Vision Error', 'Failed to analyze uploaded photo. Please try again.', 'warning');
    } finally {
      setScanning(false);
    }
  };

  const handleApplyToBroadcast = () => {
    const titleToUse =
      customTitle.trim() ||
      (cvResult ? cvResult.detectedFood : selectedPreset.itemTitle);
    const weightToUse = cvResult
      ? cvResult.netWeightKg
      : selectedPreset.calculatedWeightKg;
    const portionsToUse = cvResult
      ? cvResult.estimatedPortions
      : selectedPreset.portionYield;
    const categoryToUse = cvResult
      ? cvResult.category
      : selectedPreset.category;

    addDonation({
      title: titleToUse,
      category: categoryToUse,
      containerType: selectedPreset.name,
      diet: 'VEG',
      quantityKg: weightToUse,
      portions: portionsToUse,
      safeHours: categoryToUse === 'Cooked Meals' ? 6 : 12,
      notes: `Edge Computer Vision volumetric scan: ${titleToUse} (${weightToUse} kg / ~${portionsToUse} portions).`,
    });

    setScannerModalOpen(false);
  };

  const currentResult = cvResult || {
    detectedFood: selectedPreset.itemTitle,
    confidencePercent: `${selectedPreset.confidencePercent}%`,
    fillPercentage: '85%',
    netWeightKg: selectedPreset.calculatedWeightKg,
    estimatedPortions: selectedPreset.portionYield,
    latencyMs: 46,
    category: selectedPreset.category,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
              <Camera className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                AI Vision Volumetric Fast-Lister
              </h3>
              <p className="text-xs text-slate-500">
                Edge neural spectrum & Gastronorm container volumetric depth estimation
              </p>
            </div>
          </div>
          <button
            onClick={() => setScannerModalOpen(false)}
            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Real Photo Upload or Container Snapshots */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-emerald-500" />
                Select Standard Catering Pan or Upload Photo
              </label>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" /> Upload Food Photo
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {AI_SCAN_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleRunPresetScan(preset)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    selectedPreset.id === preset.id
                      ? 'border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                  }`}
                >
                  <div className="text-lg mb-1">{preset.previewEmoji}</div>
                  <div className="font-bold text-slate-900 text-xs truncate">
                    {preset.name}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {preset.volumeLiters}L · ~{preset.portionYield} Portions
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Camera / CV Neural Inference Canvas */}
          <div className="relative rounded-2xl bg-slate-950 overflow-hidden border border-slate-800 p-6 flex flex-col items-center justify-center min-h-[220px]">
            {imagePreviewUrl ? (
              <img
                src={imagePreviewUrl}
                alt="Captured food tray"
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
            ) : null}

            {/* Neural Bounding Box Target */}
            <div className="relative z-10 w-44 h-44 border-2 border-dashed border-emerald-400 rounded-2xl flex flex-col items-center justify-center p-3 text-center bg-slate-950/70 backdrop-blur-xs">
              {scanning ? (
                <div className="flex flex-col items-center gap-2">
                  <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin" />
                  <span className="text-xs font-mono font-bold text-emerald-300">
                    ANALYZING PIXELS...
                  </span>
                </div>
              ) : (
                <div className="space-y-1">
                  <Scan className="w-8 h-8 text-emerald-400 mx-auto animate-pulse" />
                  <div className="text-xs font-mono font-bold text-white">
                    {currentResult.detectedFood}
                  </div>
                  <span className="inline-block bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
                    {currentResult.confidencePercent} Confidence
                  </span>
                </div>
              )}
            </div>

            {/* Top Inference Telemetry Badges */}
            <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
              <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-slate-900/90 px-2 py-1 rounded-lg border border-slate-700">
                <Cpu className="w-3 h-3 text-emerald-400" />
                EDGE CV MODEL: v2.4
              </span>
              <span className="text-[10px] font-mono text-slate-300 bg-slate-900/90 px-2 py-1 rounded-lg border border-slate-700">
                LATENCY: {currentResult.latencyMs}ms
              </span>
            </div>
          </div>

          {/* Volumetric Mass & Portion Calculation Breakdown */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div>
              <span className="text-[10px] text-slate-500 font-bold block uppercase">
                Container Type
              </span>
              <strong className="text-xs text-slate-800 truncate block mt-0.5">
                {selectedPreset.name}
              </strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 font-bold block uppercase">
                Fill Depth Ratio
              </span>
              <strong className="text-xs text-emerald-700 font-mono block mt-0.5">
                {currentResult.fillPercentage}
              </strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 font-bold block uppercase">
                Calculated Mass
              </span>
              <strong className="text-sm text-slate-900 font-black font-mono block mt-0.5">
                {currentResult.netWeightKg} kg
              </strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 font-bold block uppercase">
                Portion Yield
              </span>
              <strong className="text-sm text-amber-600 font-black font-mono block mt-0.5">
                ~{currentResult.estimatedPortions} Portions
              </strong>
            </div>
          </div>

          {/* Optional Title Override */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Food Item Title (Optional Override)
            </label>
            <input
              type="text"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              placeholder={`Default: ${currentResult.detectedFood}`}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-emerald-500 outline-none"
            />
          </div>

          {/* Action Button */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setScannerModalOpen(false)}
              className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-800"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApplyToBroadcast}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Import AI Vision Results to Form</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
