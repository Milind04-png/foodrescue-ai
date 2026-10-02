import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  CloudRain,
  ChevronDown,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MapPin,
  Camera,
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  Info,
  Download,
  Building2,
  Zap,
  Tag,
  ShoppingBag,
  Flame,
  Recycle,
  Layers,
  Thermometer,
} from 'lucide-react';
import { exportDonationsToCsv } from '../utils/exportUtils';

export default function DonorDashboard() {
  const {
    donations,
    addDonation,
    selectedDonor,
    setSelectedDonor,
    donors,
    advanceDeliveryStep,
    setHandoverModalItem,
    setScannerModalOpen,
    buyFlashMarkdownBox,
    divertToBiogas,
    forecast,
    setForecast,
  } = useApp();

  // Manual fast-listing form state
  const [category, setCategory] = useState('Cooked Meals');
  const [containerType, setContainerType] = useState('Gastronorm Pan 1/1 (150mm)');
  const [description, setDescription] = useState('');
  const [quantityKg, setQuantityKg] = useState('18.5');
  const [portions, setPortions] = useState('45');
  const [preparedAt, setPreparedAt] = useState(new Date().toISOString().slice(0, 16));
  const [safeWindow, setSafeWindow] = useState('6 hours');
  const [pickupAddress, setPickupAddress] = useState(selectedDonor.address);

  // Weather & Calendar context toggles
  const [activeFactor, setActiveFactor] = useState('none'); // 'none' | 'rain' | 'exams' | 'holiday'

  const categories = ['Cooked Meals', 'Raw Produce', 'Baked Goods', 'Dairy / Sweets'];
  const containerTypes = [
    'Gastronorm Pan 1/1 (150mm)',
    'Cambro Insulated Carrier',
    'Commercial Bakery Crates',
    'Chilled Polycarbonate Tub',
  ];

  // Active donations for this institutional donor
  const donorDonations = donations.filter(
    (d) => d.donorId === selectedDonor.id || d.donorName === selectedDonor.name
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) {
      alert('Please enter a description or food title.');
      return;
    }

    addDonation({
      title: description,
      category,
      containerType,
      diet: 'VEG',
      quantityKg: parseFloat(quantityKg) || 18.5,
      portions: parseInt(portions, 10) || 45,
      preparedAt,
      safeHours: parseInt(safeWindow, 10) || 6,
      pickupAddress,
    });

    setDescription('');
  };

  // Weather & Calendar context factor toggle handler
  const handleFactorChange = (factorKey) => {
    setActiveFactor(factorKey);

    let factorMultiplier = 1.0;
    if (factorKey === 'rain') factorMultiplier = 1.15; // Rain increases indoor mess footfall
    if (factorKey === 'exams') factorMultiplier = 0.80; // Exam week reduces dining
    if (factorKey === 'holiday') factorMultiplier = 0.65; // Long weekend cuts dining

    setForecast((prev) =>
      prev.map((item) => {
        const adjustedActual = Math.round(item.historicalPrep * factorMultiplier * 0.85);
        const adjustedSurplus = Math.max(0, item.historicalPrep - adjustedActual);
        return {
          ...item,
          actualConsumption: adjustedActual,
          predictedSurplus: adjustedSurplus,
          recommendedCut: Math.max(0, Math.round(adjustedSurplus * 0.85)),
        };
      })
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Institutional Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200">
              Institutional Donor Hub
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs text-slate-500 font-semibold">
              Daily Covers: {selectedDonor.dailyCovers.toLocaleString()} students/staff
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 mt-1">
            {selectedDonor.name}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{selectedDonor.address}</span>
          </p>
        </div>

        {/* Institution Switcher & FSSAI Verification */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <select
              value={selectedDonor.id}
              onChange={(e) => {
                const found = donors.find((d) => d.id === e.target.value);
                if (found) {
                  setSelectedDonor(found);
                  setPickupAddress(found.address);
                }
              }}
              className="text-xs font-semibold bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:ring-2 focus:ring-teal-500 cursor-pointer shadow-xs"
            >
              {donors.map((d) => (
                <option key={d.id} value={d.id}>
                  Campus: {d.name}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl px-3 py-1.5 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                FSSAI Certified
              </div>
              <div className="text-xs font-mono font-bold text-emerald-900">
                {selectedDonor.verifiedFssai}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic 3-Tier Escalation Overview Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-slate-950 text-white rounded-3xl p-6 shadow-md border border-teal-800/60 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              Automated Dynamic 3-Tier Escalation Protocol
            </span>
            <h2 className="text-lg font-bold text-white mt-1">
              Time-Decay Food Safeguard Engine
            </h2>
            <p className="text-xs text-slate-300">
              Guarantees 100% Zero-Landfill diversion by transitioning surplus batches across 3 timed safety gates:
            </p>
          </div>

          <button
            type="button"
            onClick={() => setScannerModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-md transition-all self-start md:self-auto"
          >
            <Camera className="w-4 h-4" />
            <span>Launch AI Camera Scanner</span>
          </button>
        </div>

        {/* 3 Tiers Visual Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Tier 1 */}
          <div className="bg-slate-800/80 rounded-2xl p-4 border border-teal-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-teal-400 bg-teal-950 px-2 py-0.5 rounded border border-teal-800">
                Tier 1 (4–6 hrs left)
              </span>
              <Tag className="w-4 h-4 text-teal-400" />
            </div>
            <h3 className="text-sm font-bold text-white">Campus Flash Markdown</h3>
            <p className="text-xs text-slate-300 leading-snug">
              Internal staff & students reserve mystery boxes at 70% off (₹49) directly on the campus portal.
            </p>
          </div>

          {/* Tier 2 */}
          <div className="bg-slate-800/80 rounded-2xl p-4 border border-amber-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                Tier 2 (2–4 hrs left)
              </span>
              <AlertTriangle className="w-4 h-4 text-amber-400" />
            </div>
            <h3 className="text-sm font-bold text-white">1-Click NGO Micro-Rescue</h3>
            <p className="text-xs text-slate-300 leading-snug">
              Surplus broadcasted across a 5 km micro-logistics radius to registered shelters and food banks.
            </p>
          </div>

          {/* Tier 3 */}
          <div className="bg-slate-800/80 rounded-2xl p-4 border border-purple-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-400 bg-purple-950 px-2 py-0.5 rounded border border-purple-800">
                Tier 3 (&lt; 2 hrs left)
              </span>
              <Recycle className="w-4 h-4 text-purple-400" />
            </div>
            <h3 className="text-sm font-bold text-white">Biogas Digest Partner</h3>
            <p className="text-xs text-slate-300 leading-snug">
              Sub-threshold batches route automatically to MCD Okhla Bio-Methanation for clean electricity.
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Form / Fast Listing + Forecaster & Active Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: AI Fast Listing & Manual Entry (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-sm">
                  🍱
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Log Institutional Surplus
                  </h3>
                  <p className="text-xs text-slate-500">
                    Fast Gastronorm & Pan Categorization
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setScannerModalOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-100 transition-colors"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>AI Camera</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Category Pills */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Food Category</label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold text-left transition-all ${
                        category === cat
                          ? 'bg-teal-50 text-teal-900 border-2 border-teal-600 shadow-2xs'
                          : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Standard Container Type */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Standard Container Format
                </label>
                <select
                  value={containerType}
                  onChange={(e) => setContainerType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-slate-50/60 focus:ring-2 focus:ring-teal-500"
                >
                  {containerTypes.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Title / Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Food Batch Title</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Basmati Jeera Rice & Dal Makhani Tub"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 bg-slate-50/60 focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              {/* Quantity (kg) & Portions */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Estimated Weight (kg)</label>
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    value={quantityKg}
                    onChange={(e) => {
                      setQuantityKg(e.target.value);
                      const n = parseFloat(e.target.value);
                      if (!isNaN(n)) setPortions(Math.round(n * 2.5).toString());
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-slate-50/60 focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Portion Yield</label>
                  <input
                    type="number"
                    min="1"
                    value={portions}
                    onChange={(e) => setPortions(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-slate-50/60 focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
              </div>

              {/* Safe Window & Prep Time */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Safe Shelf Life</label>
                  <select
                    value={safeWindow}
                    onChange={(e) => setSafeWindow(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 bg-slate-50/60 focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="4 hours">4 hours (Cooked Hot)</option>
                    <option value="6 hours">6 hours (Insulated Cambro)</option>
                    <option value="12 hours">12 hours (Chilled Salad)</option>
                    <option value="24 hours">24 hours (Bakery Crate)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Prep Timestamp</label>
                  <input
                    type="datetime-local"
                    value={preparedAt}
                    onChange={(e) => setPreparedAt(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 bg-slate-50/60 focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-teal-700 hover:bg-teal-800 text-white shadow-md shadow-teal-700/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Broadcast to 3-Tier Escalation Network</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: AI Forecaster Widget & Active Tracker (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* AI Kitchen Demand Forecaster Widget */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-teal-600" />
                <h3 className="text-base font-bold text-slate-900">
                  AI Kitchen Demand Forecaster
                </h3>
              </div>
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                Historical vs. Predicted Surplus
              </span>
            </div>

            {/* Context Factor Toggles (Weather & Calendar) */}
            <div className="flex flex-wrap items-center gap-2 pt-1 pb-2 text-xs">
              <span className="text-slate-400 font-semibold text-[11px]">Context Factor:</span>
              <button
                type="button"
                onClick={() => handleFactorChange('none')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  activeFactor === 'none'
                    ? 'bg-teal-700 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Standard
              </button>
              <button
                type="button"
                onClick={() => handleFactorChange('rain')}
                className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all ${
                  activeFactor === 'rain'
                    ? 'bg-sky-600 text-white'
                    : 'bg-sky-50 text-sky-800 border border-sky-200 hover:bg-sky-100'
                }`}
              >
                <span>🌧️ Monsoon Rain (+15% Mess)</span>
              </button>
              <button
                type="button"
                onClick={() => handleFactorChange('exams')}
                className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all ${
                  activeFactor === 'exams'
                    ? 'bg-amber-600 text-white'
                    : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
                }`}
              >
                <span>📚 Exam Week (-20% Dining)</span>
              </button>
              <button
                type="button"
                onClick={() => handleFactorChange('holiday')}
                className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all ${
                  activeFactor === 'holiday'
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-50 text-purple-800 border border-purple-200 hover:bg-purple-100'
                }`}
              >
                <span>🏖️ Long Weekend (-35%)</span>
              </button>
            </div>

            {/* Visual SVG Bar Comparison Chart */}
            <div className="pt-2">
              <div className="relative h-56 w-full">
                {/* Horizontal reference lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[10px] text-slate-400 font-mono">
                  <div className="border-b border-slate-100 pb-0.5">600</div>
                  <div className="border-b border-slate-100 pb-0.5">450</div>
                  <div className="border-b border-slate-100 pb-0.5">300</div>
                  <div className="border-b border-slate-100 pb-0.5">150</div>
                  <div className="border-b border-slate-200 pb-0.5">0</div>
                </div>

                {/* Bars container */}
                <div className="absolute inset-0 pl-7 pr-2 pt-2 pb-6 flex items-end justify-between">
                  {forecast.map((item) => {
                    const prepHeight = (item.historicalPrep / 600) * 100;
                    const consumedHeight = (item.actualConsumption / 600) * 100;
                    const surplusHeight = (item.predictedSurplus / 600) * 100;

                    return (
                      <div
                        key={item.day}
                        className="flex flex-col items-center flex-1 h-full justify-end group relative cursor-pointer"
                      >
                        {/* Tooltip on hover */}
                        <div className="absolute -top-16 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity bg-slate-900 text-white text-[11px] rounded-lg py-1 px-2.5 shadow-lg z-20 whitespace-nowrap">
                          <div className="font-bold text-teal-400">{item.day}</div>
                          <div>Prep: {item.historicalPrep} covers</div>
                          <div>Consumed: {item.actualConsumption} covers</div>
                          <div>Surplus Risk: {item.predictedSurplus} covers</div>
                        </div>

                        {/* Triplet bars */}
                        <div className="flex items-end gap-1 w-full justify-center">
                          {/* Historical Prep (Slate) */}
                          <div
                            style={{ height: `${prepHeight}%` }}
                            className="w-3 bg-slate-300 rounded-t-sm"
                            title={`Prep: ${item.historicalPrep}`}
                          ></div>
                          {/* Actual Consumed (Emerald) */}
                          <div
                            style={{ height: `${consumedHeight}%` }}
                            className="w-3 bg-teal-600 rounded-t-sm"
                            title={`Consumed: ${item.actualConsumption}`}
                          ></div>
                          {/* Predicted Surplus (Amber) */}
                          <div
                            style={{ height: `${Math.max(surplusHeight, 4)}%` }}
                            className="w-2.5 bg-amber-500 rounded-t-sm"
                            title={`Surplus Risk: ${item.predictedSurplus}`}
                          ></div>
                        </div>

                        <span className="text-xs font-semibold text-slate-500 mt-2">
                          {item.day}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Chart Legend */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-3 text-xs text-slate-600 border-t border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-slate-300 rounded-sm"></span>
                  <span>Historical Prep</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-teal-600 rounded-sm"></span>
                  <span>Actual Consumption</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-amber-500 rounded-sm"></span>
                  <span>Predicted Overproduction Risk</span>
                </div>
              </div>
            </div>

            {/* AI Kitchen Prep Cut Recommendation Banner */}
            <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>AI Kitchen Advisory</span>
                </div>
                <p className="text-xs text-amber-800">
                  {activeFactor === 'rain'
                    ? 'Monsoon rain alert: Mess dine-in expected +15%. Increase comfort khichdi/dal batch.'
                    : activeFactor === 'exams'
                    ? 'Exam week detected: Dining down ~20%. Cut dinner rice prep by ~75 covers to avoid 30 kg waste.'
                    : 'Weather & schedule indicate optimal efficiency. Stage batch 2 cooking 40 mins later.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleFactorChange('exams')}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-200 text-amber-900 hover:bg-amber-300 whitespace-nowrap transition-colors"
              >
                Apply AI Recipe Cut
              </button>
            </div>
          </div>

          {/* Active Institutional Escalation Tracker */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Active Escalation Tracker ({donorDonations.length})
                </h3>
                <p className="text-xs text-slate-500">
                  Live status across Flash Markdown, NGO Rescue & Biogas
                </p>
              </div>
              <button
                type="button"
                onClick={() => exportDonationsToCsv(donorDonations, selectedDonor.name)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Audit CSV</span>
              </button>
            </div>

            <div className="space-y-3.5">
              {donorDonations.map((item) => {
                const hours = Math.floor(item.expiryMinutesRemaining / 60);
                const mins = item.expiryMinutesRemaining % 60;
                const isUrgent = item.expiryMinutesRemaining < 120;

                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl border border-slate-200/90 hover:border-slate-300 bg-slate-50/40 space-y-3 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-slate-500">
                            {item.id}
                          </span>
                          <span className="text-sm font-bold text-slate-900">
                            {item.title}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          {item.quantityKg} kg · {item.portions} portions ·{' '}
                          <span className="font-semibold text-slate-700">{item.containerType}</span>
                        </div>
                      </div>

                      {/* Escalation Tier Tag */}
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${
                          item.escalationTier.includes('Tier 1')
                            ? 'bg-teal-50 text-teal-800 border-teal-200'
                            : item.escalationTier.includes('Tier 2')
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : 'bg-purple-50 text-purple-800 border-purple-200'
                        }`}
                      >
                        {item.escalationTier}
                      </span>
                    </div>

                    {/* Progress Bar for Safe Shelf-Life */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>Shelf-Life Remaining</span>
                        </span>
                        <span className={`font-mono font-bold ${isUrgent ? 'text-amber-600' : 'text-slate-800'}`}>
                          {hours}h {mins}m safe
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div
                          style={{ width: `${Math.min(100, Math.max(10, (item.expiryMinutesRemaining / 360) * 100))}%` }}
                          className={`h-full rounded-full transition-all ${
                            item.expiryMinutesRemaining < 120 ? 'bg-purple-600' : item.expiryMinutesRemaining < 240 ? 'bg-amber-500' : 'bg-teal-600'
                          }`}
                        ></div>
                      </div>
                    </div>

                    {/* Actions Row */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
                      {/* Tier 1 Flash Sale Demo Button */}
                      {item.escalationTier.includes('Tier 1') && item.mysteryBoxesAvailable > 0 && (
                        <button
                          type="button"
                          onClick={() => buyFlashMarkdownBox(item.id)}
                          className="px-3 py-1.5 rounded-xl font-bold bg-teal-100 hover:bg-teal-200 text-teal-900 transition-colors flex items-center gap-1.5"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Buy Student Mystery Box (₹49 · {item.mysteryBoxesAvailable} left)</span>
                        </button>
                      )}

                      {/* Tier 3 Biogas Re-routing */}
                      {item.status !== 'Delivered' && item.status !== 'Diverted to Biogas' && (
                        <button
                          type="button"
                          onClick={() => divertToBiogas(item.id)}
                          className="text-[11px] font-semibold text-purple-700 hover:text-purple-900 underline"
                        >
                          Trigger Biogas Digest
                        </button>
                      )}

                      <div className="flex items-center gap-2 ml-auto">
                        <button
                          type="button"
                          onClick={() => setHandoverModalItem(item)}
                          className="px-3 py-1.5 rounded-xl font-bold bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors flex items-center gap-1"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                          <span>e-Handover Slip</span>
                        </button>

                        {item.status !== 'Delivered' && item.status !== 'Diverted to Biogas' && (
                          <button
                            type="button"
                            onClick={() => advanceDeliveryStep(item.id)}
                            className="px-3 py-1.5 rounded-xl font-bold bg-teal-700 hover:bg-teal-800 text-white transition-colors"
                          >
                            Step {item.deliveryStep || 1}/3 →
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
