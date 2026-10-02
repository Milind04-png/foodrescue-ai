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
} from 'lucide-react';

export default function DonorDashboard() {
  const {
    donations,
    addDonation,
    selectedDonor,
    setSelectedDonor,
    donors,
    advanceDonationStatus,
    setSafetyModalItem,
    setScannerModalOpen,
    forecast,
    setForecast,
  } = useApp();

  // Form state
  const [category, setCategory] = useState('Cooked');
  const [description, setDescription] = useState('');
  const [quantityKg, setQuantityKg] = useState('10');
  const [portions, setPortions] = useState('30');
  const [preparedAt, setPreparedAt] = useState(
    new Date().toISOString().slice(0, 16)
  );
  const [safeWindow, setSafeWindow] = useState('4 hours');
  const [pickupAddress, setPickupAddress] = useState(selectedDonor.address);
  const [checklistOpen, setChecklistOpen] = useState(false);
  const [checklist, setChecklist] = useState({
    tempSafe: true,
    sanitizedPacks: true,
    cleanHandling: true,
    allergensMarked: true,
  });

  // Weather simulation toggle
  const [weatherAlertActive, setWeatherAlertActive] = useState(true);

  // Filter donations belonging to this donor
  const donorDonations = donations.filter(
    (d) => d.donorId === selectedDonor.id || d.donorName === selectedDonor.name
  );

  const categories = ['Cooked', 'Raw', 'Bakery', 'Packaged'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) {
      alert('Please enter a description for the surplus food.');
      return;
    }

    addDonation({
      title: description,
      category,
      diet: 'VEG',
      quantityKg: parseFloat(quantityKg) || 10,
      portions: parseInt(portions, 10) || 30,
      preparedAt,
      safeHours: parseInt(safeWindow, 10) || 4,
      pickupAddress,
    });

    setDescription('');
  };

  // Preset quick fill for demo convenience
  const applyPreset = (presetName) => {
    if (presetName === 'biryani') {
      setCategory('Cooked');
      setDescription('Royal Dum Veg Biryani with Mirchi Salan');
      setQuantityKg('14');
      setPortions('45');
      setSafeWindow('4 hours');
    } else if (presetName === 'bakery') {
      setCategory('Bakery');
      setDescription('Artisanal Croissants & Focaccia Loaves');
      setQuantityKg('8');
      setPortions('24');
      setSafeWindow('24 hours');
    } else if (presetName === 'raw') {
      setCategory('Raw');
      setDescription('Farm Fresh Cucumbers & Bell Peppers');
      setQuantityKg('20');
      setPortions('50');
      setSafeWindow('12 hours');
    }
  };

  // Adjust Thursday prep based on AI recommendation
  const applyAiOptimization = () => {
    setForecast((prev) =>
      prev.map((day) =>
        day.day === 'Thu'
          ? {
              ...day,
              plannedProduction: 255,
              predictedOverproduction: 8,
              alert: 'Optimized: Waste risk cut by 88%',
            }
          : day
      )
    );
  };

  // Chart metrics scaling helper
  const maxBarValue = 600;

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Header section matching Screenshot 1 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Donor Dashboard
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-semibold text-slate-700">
              {selectedDonor.name}
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-sm text-slate-500">{selectedDonor.type}</span>

            {/* Quick donor switcher dropdown */}
            <div className="relative inline-block ml-2">
              <select
                value={selectedDonor.id}
                onChange={(e) => {
                  const found = donors.find((d) => d.id === e.target.value);
                  if (found) {
                    setSelectedDonor(found);
                    setPickupAddress(found.address);
                  }
                }}
                className="text-xs bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-emerald-500 cursor-pointer"
              >
                {donors.map((d) => (
                  <option key={d.id} value={d.id}>
                    Switch: {d.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* FSSAI Verified License Badge */}
        <div className="flex items-center gap-2">
          <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl px-3 py-1.5 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                FSSAI License Active
              </div>
              <div className="text-xs font-mono font-medium text-emerald-900">
                {selectedDonor.verifiedFssai}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Form + Right Forecast & Tracker (Exact Screenshot 1 layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Log Surplus Food (Screenshot 1) */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">
                  🌱
                </div>
                <h2 className="text-lg font-bold text-slate-900">
                  Log Surplus Food
                </h2>
              </div>

              {/* AI Camera Vision Scan Trigger */}
              <button
                type="button"
                onClick={() => setScannerModalOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors"
                title="Use AI Camera to estimate volume & food category"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>AI Vision Scan</span>
              </button>
            </div>

            {/* Quick Demo Pre-fill Pills */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500 overflow-x-auto pb-1">
              <span className="text-[11px] text-slate-400 whitespace-nowrap">Presets:</span>
              <button
                type="button"
                onClick={() => applyPreset('biryani')}
                className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 whitespace-nowrap text-[11px]"
              >
                + Biryani
              </button>
              <button
                type="button"
                onClick={() => applyPreset('bakery')}
                className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 whitespace-nowrap text-[11px]"
              >
                + Croissants
              </button>
              <button
                type="button"
                onClick={() => applyPreset('raw')}
                className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 whitespace-nowrap text-[11px]"
              >
                + Fresh Veggies
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Food Category Selector (Screenshot 1) */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Food category
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {categories.map((cat) => {
                    const isSelected = category === cat;
                    return (
                      <button
                        type="button"
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`py-2 px-3 rounded-full text-xs font-semibold text-center transition-all ${
                          isSelected
                            ? 'bg-emerald-50 text-emerald-800 border-2 border-emerald-500 shadow-2xs'
                            : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200/70'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Description Input (Screenshot 1) */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Description
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Veg biryani & raita"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all bg-slate-50/50"
                  required
                />
              </div>

              {/* Quantity (kg) & Portions (Screenshot 1) */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Quantity (kg)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    value={quantityKg}
                    onChange={(e) => {
                      setQuantityKg(e.target.value);
                      // Roughly 3 portions per kg
                      const num = parseFloat(e.target.value);
                      if (!isNaN(num)) setPortions(Math.round(num * 3).toString());
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all bg-slate-50/50 font-medium"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Portions
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={portions}
                    onChange={(e) => setPortions(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all bg-slate-50/50 font-medium"
                    required
                  />
                </div>
              </div>

              {/* Prepared at & Safe-to-eat window (Screenshot 1) */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-700">
                      Prepared at
                    </label>
                    <button
                      type="button"
                      onClick={() => setPreparedAt(new Date().toISOString().slice(0, 16))}
                      className="text-[10px] text-emerald-600 hover:underline"
                    >
                      Now
                    </button>
                  </div>
                  <input
                    type="datetime-local"
                    value={preparedAt}
                    onChange={(e) => setPreparedAt(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all bg-slate-50/50"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Safe-to-eat window
                  </label>
                  <div className="relative">
                    <select
                      value={safeWindow}
                      onChange={(e) => setSafeWindow(e.target.value)}
                      className="w-full appearance-none px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all bg-slate-50/50 cursor-pointer pr-8"
                    >
                      <option value="2 hours">2 hours (High Perishable)</option>
                      <option value="4 hours">4 hours (Cooked Hot)</option>
                      <option value="6 hours">6 hours (Chilled)</option>
                      <option value="12 hours">12 hours (Raw Produce)</option>
                      <option value="24 hours">24 hours (Bakery / Dry)</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Pickup Address (Screenshot 1) */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Pickup address
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                    placeholder="MG Road, Sector 4"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all bg-slate-50/50 pl-9"
                    required
                  />
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              {/* Food Safety Checklist (Accordion/Checkboxes) */}
              <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 space-y-2.5">
                <button
                  type="button"
                  onClick={() => setChecklistOpen(!checklistOpen)}
                  className="w-full flex items-center justify-between text-xs font-semibold text-slate-800 hover:text-emerald-700"
                >
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Food safety checklist ({Object.values(checklist).filter(Boolean).length}/4)</span>
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-500 transition-transform ${
                      checklistOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {checklistOpen && (
                  <div className="space-y-2 pt-2 border-t border-slate-200 text-xs text-slate-600">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={checklist.tempSafe}
                        onChange={(e) =>
                          setChecklist({ ...checklist, tempSafe: e.target.checked })
                        }
                        className="rounded text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>Maintained &gt; 63°C (hot) or &lt; 5°C (chilled)</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={checklist.sanitizedPacks}
                        onChange={(e) =>
                          setChecklist({ ...checklist, sanitizedPacks: e.target.checked })
                        }
                        className="rounded text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>Clean, sanitized, food-grade containers</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={checklist.cleanHandling}
                        onChange={(e) =>
                          setChecklist({ ...checklist, cleanHandling: e.target.checked })
                        }
                        className="rounded text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>Hygienic gloves & hairnets observed during packing</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={checklist.allergensMarked}
                        onChange={(e) =>
                          setChecklist({ ...checklist, allergensMarked: e.target.checked })
                        }
                        className="rounded text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>Major allergens marked (Dairy / Nuts / Gluten)</span>
                    </label>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Broadcast Surplus Food</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: AI Forecast + Active Tracker (Screenshot 1) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card 1: AI Demand & Surplus Forecast (Exact visual match to Screenshot 1) */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 text-emerald-600">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  AI Demand & Surplus Forecast
                </h3>
              </div>

              {/* Weather Alert Pill (Screenshot 1: "Rain Wed-Thu lowers footfall") */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-800 border border-sky-200/80">
                <CloudRain className="w-3.5 h-3.5 text-sky-600" />
                <span>Rain Wed–Thu lowers footfall</span>
              </div>
            </div>

            {/* Custom SVG Bar & Line Chart representing Mon - Sun */}
            <div className="pt-2">
              <div className="relative h-56 w-full">
                {/* Background horizontal grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[10px] text-slate-400 font-mono">
                  <div className="border-b border-slate-100 flex items-center justify-between pb-0.5">
                    <span>600</span>
                  </div>
                  <div className="border-b border-slate-100 flex items-center justify-between pb-0.5">
                    <span>450</span>
                  </div>
                  <div className="border-b border-slate-100 flex items-center justify-between pb-0.5">
                    <span>300</span>
                  </div>
                  <div className="border-b border-slate-100 flex items-center justify-between pb-0.5">
                    <span>150</span>
                  </div>
                  <div className="border-b border-slate-200 flex items-center justify-between pb-0.5">
                    <span>0</span>
                  </div>
                </div>

                {/* Bars & Line container */}
                <div className="absolute inset-0 pl-6 pr-2 pt-2 pb-6 flex items-end justify-between">
                  {forecast.map((item, idx) => {
                    const demandHeight = (item.expectedDemand / maxBarValue) * 100;
                    const overHeight = (item.predictedOverproduction / maxBarValue) * 100;

                    return (
                      <div
                        key={item.day}
                        className="flex flex-col items-center flex-1 h-full justify-end group relative cursor-pointer"
                      >
                        {/* Interactive Tooltip on hover */}
                        <div className="absolute -top-16 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity bg-slate-900 text-white text-[11px] rounded-lg py-1 px-2.5 shadow-lg z-20 whitespace-nowrap">
                          <div className="font-bold text-emerald-400">{item.day}</div>
                          <div>Expected: {item.expectedDemand} covers</div>
                          <div>Surplus Risk: {item.predictedOverproduction} covers</div>
                          <div>Planned: {item.plannedProduction} covers</div>
                        </div>

                        {/* Bars: Green demand bar + Amber overproduction bar */}
                        <div className="flex items-end gap-1 w-full justify-center">
                          {/* Green expected demand bar */}
                          <div
                            style={{ height: `${demandHeight}%` }}
                            className="w-5 sm:w-7 bg-emerald-500 rounded-t-sm group-hover:bg-emerald-600 transition-all"
                            title={`Expected: ${item.expectedDemand}`}
                          ></div>

                          {/* Amber predicted overproduction bar */}
                          <div
                            style={{ height: `${Math.max(overHeight, 4)}%` }}
                            className="w-3 sm:w-4 bg-amber-500 rounded-t-sm group-hover:bg-amber-600 transition-all"
                            title={`Predicted Surplus: ${item.predictedOverproduction}`}
                          ></div>
                        </div>

                        {/* Day label */}
                        <span className="text-xs font-medium text-slate-500 mt-2">
                          {item.day}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Overlay SVG for Planned Production line (Blue Line) */}
                <svg className="absolute inset-0 pl-6 pr-2 pt-2 pb-6 w-full h-full pointer-events-none overflow-visible">
                  <polyline
                    fill="none"
                    stroke="#0284C7"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={forecast
                      .map((d, i) => {
                        const xPercent = (i + 0.5) / forecast.length;
                        const yPercent = 1 - d.plannedProduction / maxBarValue;
                        return `${xPercent * 100}%,${Math.max(yPercent * 100, 2)}%`;
                      })
                      .join(' ')}
                  />
                  {forecast.map((d, i) => {
                    const xPercent = (i + 0.5) / forecast.length;
                    const yPercent = 1 - d.plannedProduction / maxBarValue;
                    return (
                      <circle
                        key={i}
                        cx={`${xPercent * 100}%`}
                        cy={`${Math.max(yPercent * 100, 2)}%`}
                        r="3.5"
                        fill="#0284C7"
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                      />
                    );
                  })}
                </svg>
              </div>

              {/* Chart Legend (Screenshot 1) */}
              <div className="flex flex-wrap items-center justify-center gap-5 pt-3 text-xs text-slate-600 border-t border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span>Expected demand (covers)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <span>Predicted overproduction</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-sky-600"></span>
                  <span>Planned production</span>
                </div>
              </div>
            </div>

            {/* AI Tip Banner (Screenshot 1: "Cut Thursday prep by ~65 covers (-20%) to avoid an estimated 22 kg surplus.") */}
            <div className="bg-amber-50/80 border border-amber-200/90 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <span className="text-amber-800 font-bold text-xs whitespace-nowrap">
                  AI tip:
                </span>
                <span className="text-xs text-amber-900 leading-snug">
                  Cut Thursday prep by ~65 covers (-20%) to avoid an estimated 22 kg surplus due to rain forecast.
                </span>
              </div>
              <button
                type="button"
                onClick={applyAiOptimization}
                className="text-xs font-semibold text-amber-900 bg-amber-200/70 hover:bg-amber-200 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors"
              >
                Apply AI Batch Cut
              </button>
            </div>
          </div>

          {/* Card 2: Active Donation Tracker (Screenshot 1) */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">
                Active Donation Tracker
              </h3>
              <span className="text-xs font-medium text-slate-500">
                {donorDonations.length} total entries
              </span>
            </div>

            <div className="space-y-3">
              {donorDonations.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-sm">
                  No active donations yet. Use the form on the left to broadcast surplus food!
                </div>
              ) : (
                donorDonations.map((item) => {
                  const getStatusBadge = (st) => {
                    if (st === 'Pending Match') {
                      return {
                        bg: 'bg-amber-50 text-amber-800 border-amber-200',
                        dot: 'bg-amber-500',
                        text: 'Pending Match',
                      };
                    }
                    if (st === 'NGO Accepted') {
                      return {
                        bg: 'bg-sky-50 text-sky-800 border-sky-200',
                        dot: 'bg-sky-500',
                        text: 'NGO Accepted',
                      };
                    }
                    if (st === 'Driver Dispatched') {
                      return {
                        bg: 'bg-indigo-50 text-indigo-800 border-indigo-200',
                        dot: 'bg-indigo-500',
                        text: 'Driver Dispatched',
                      };
                    }
                    return {
                      bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
                      dot: 'bg-emerald-500',
                      text: 'Delivered',
                    };
                  };

                  const badge = getStatusBadge(item.status);

                  return (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl border border-slate-200/90 hover:border-slate-300 transition-all bg-slate-50/30 space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs text-slate-500 font-semibold">
                              {item.id}
                            </span>
                            <span className="font-bold text-sm text-slate-900">
                              {item.title}
                            </span>
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">
                            {item.quantityKg} kg · {item.portions} portions ·{' '}
                            <span className="font-medium text-slate-700">{item.category}</span>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${badge.bg}`}
                          >
                            <span className={`w-2 h-2 rounded-full ${badge.dot}`}></span>
                            <span>{badge.text}</span>
                          </span>
                        </div>
                      </div>

                      {/* Details row: expiry, matched recipient, driver, and stepper */}
                      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 pt-2 border-t border-slate-100">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1 text-slate-500">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            <span>
                              {item.status === 'Delivered'
                                ? 'Delivered successfully'
                                : `Safe window: ${Math.floor(item.expiryMinutesRemaining / 60)}h ${
                                    item.expiryMinutesRemaining % 60
                                  }m remaining`}
                            </span>
                          </span>

                          {item.matchedNgo && (
                            <span className="text-emerald-700 font-medium">
                              NGO: {item.matchedNgo}
                            </span>
                          )}
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setSafetyModalItem(item)}
                            className="px-2.5 py-1 rounded-lg text-[11px] font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
                          >
                            Safety Stamp
                          </button>

                          {item.status !== 'Delivered' && (
                            <button
                              type="button"
                              onClick={() => advanceDonationStatus(item.id)}
                              className="px-2.5 py-1 rounded-lg text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors"
                            >
                              Advance Step →
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
