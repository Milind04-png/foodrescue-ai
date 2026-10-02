import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Building2,
  Clock,
  MapPin,
  Flame,
  ShieldCheck,
  CheckCircle2,
  Filter,
  Sparkles,
  ArrowRight,
  Truck,
  Heart,
  Calendar,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';

export default function NgoPortal() {
  const {
    donations,
    claimDonation,
    selectedNgo,
    setSelectedNgo,
    ngos,
    distributionHistory,
    setSafetyModalItem,
    advanceDonationStatus,
  } = useApp();

  // Filters
  const [distanceFilter, setDistanceFilter] = useState('ALL');
  const [urgencyFilter, setUrgencyFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [activeTab, setActiveTab] = useState('feed'); // 'feed' | 'history'

  // Filter available / claimable donations
  const availableListings = donations.filter((d) => {
    if (d.status === 'Delivered') return false;

    // Category filter
    if (categoryFilter !== 'ALL' && d.category !== categoryFilter) return false;

    // Urgency filter
    if (urgencyFilter === 'URGENT' && d.expiryMinutesRemaining > 120) return false;
    if (urgencyFilter === 'MODERATE' && (d.expiryMinutesRemaining <= 120 || d.expiryMinutesRemaining > 300)) return false;

    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            NGO / Food Bank Portal
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-semibold text-slate-700">
              {selectedNgo.name}
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-sm text-slate-500">{selectedNgo.type}</span>

            {/* Switcher */}
            <div className="relative inline-block ml-2">
              <select
                value={selectedNgo.id}
                onChange={(e) => {
                  const found = ngos.find((n) => n.id === e.target.value);
                  if (found) setSelectedNgo(found);
                }}
                className="text-xs bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-emerald-500 cursor-pointer"
              >
                {ngos.map((n) => (
                  <option key={n.id} value={n.id}>
                    Switch: {n.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Capacity / NGO Stats */}
        <div className="flex items-center gap-3">
          <div className="bg-sky-50 border border-sky-200/80 rounded-xl px-3.5 py-1.5 flex items-center gap-2">
            <Heart className="w-4 h-4 text-sky-600" />
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-sky-800">
                Daily Shelter Capacity
              </div>
              <div className="text-xs font-bold text-sky-900">
                {selectedNgo.dailyCapacity} Meals / Day
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl px-3.5 py-1.5 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                Section 80G Certified
              </div>
              <div className="text-xs font-bold text-emerald-900">
                Tax Exemption Active
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Live Feed vs Distribution Log */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('feed')}
          className={`pb-3 px-4 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'feed'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>Real-Time Surplus Feed</span>
          <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
            {availableListings.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`pb-3 px-4 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'history'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>Community Distribution Log</span>
          <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-bold">
            {distributionHistory.length}
          </span>
        </button>
      </div>

      {/* TAB 1: Real-Time Surplus Feed */}
      {activeTab === 'feed' && (
        <div className="space-y-5">
          {/* Filters Bar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <span>Filters:</span>
              </div>

              {/* Category Filter */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="ALL">All Categories</option>
                <option value="Cooked">Cooked Meals</option>
                <option value="Raw">Raw Produce</option>
                <option value="Bakery">Bakery & Breads</option>
                <option value="Packaged">Packaged Goods</option>
              </select>

              {/* Urgency Filter */}
              <select
                value={urgencyFilter}
                onChange={(e) => setUrgencyFilter(e.target.value)}
                className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="ALL">All Urgencies</option>
                <option value="URGENT">Urgent (&lt; 2 hrs remaining)</option>
                <option value="MODERATE">Moderate (2–5 hrs)</option>
              </select>
            </div>

            <div className="text-xs text-slate-500">
              Showing <strong>{availableListings.length}</strong> active food listings nearby
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {availableListings.length === 0 ? (
              <div className="col-span-full bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
                <div className="text-4xl">🎉</div>
                <h3 className="text-lg font-bold text-slate-900">
                  All surplus is currently claimed or routed!
                </h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  New surplus listings from hotels and restaurants will pop up here in real time as soon as they are logged.
                </p>
              </div>
            ) : (
              availableListings.map((item) => {
                const hoursLeft = Math.floor(item.expiryMinutesRemaining / 60);
                const minsLeft = item.expiryMinutesRemaining % 60;
                const isUrgent = item.expiryMinutesRemaining <= 120;
                const isAlreadyClaimed = item.status !== 'Pending Match';

                return (
                  <div
                    key={item.id}
                    className={`bg-white rounded-2xl border transition-all duration-200 shadow-xs hover:shadow-md flex flex-col justify-between overflow-hidden ${
                      isUrgent
                        ? 'border-amber-300 ring-1 ring-amber-200'
                        : 'border-slate-200/90 hover:border-emerald-300'
                    }`}
                  >
                    {/* Top urgent banner if expiring within 2 hours */}
                    {isUrgent && (
                      <div className="bg-amber-500 text-white text-[11px] font-bold px-3 py-1 flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Flame className="w-3.5 h-3.5 fill-current animate-pulse" />
                          <span>URGENT RESCUE REQUIRED</span>
                        </span>
                        <span>Safe window closing</span>
                      </div>
                    )}

                    <div className="p-5 space-y-4">
                      {/* Donor info & distance */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            <span>2.4 km away</span>
                            <span>·</span>
                            <span className="font-semibold text-slate-700">
                              {item.donorName}
                            </span>
                          </div>
                          <h3 className="text-base font-bold text-slate-900 mt-1 leading-snug">
                            {item.title}
                          </h3>
                        </div>

                        {/* Category Pill */}
                        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                          {item.category}
                        </span>
                      </div>

                      {/* Quantity & Portions stats */}
                      <div className="grid grid-cols-2 gap-2 bg-slate-50 rounded-xl p-3 border border-slate-100 text-center">
                        <div>
                          <div className="text-xs text-slate-400 font-medium">Quantity</div>
                          <div className="text-base font-extrabold text-slate-800">
                            {item.quantityKg} kg
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-400 font-medium">Yield</div>
                          <div className="text-base font-extrabold text-emerald-700">
                            {item.portions} portions
                          </div>
                        </div>
                      </div>

                      {/* Safety & Temperature Readout */}
                      <div className="flex items-center justify-between text-xs text-slate-600 bg-emerald-50/50 rounded-lg p-2.5 border border-emerald-100">
                        <div className="flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-emerald-600" />
                          <span className="font-medium">{item.fssaiStatus}</span>
                        </div>
                        <span className="font-mono text-emerald-800 font-bold">
                          {item.temperatureC}°C
                        </span>
                      </div>

                      {/* Live Spoilage Countdown Timer */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span>Estimated Time-to-Spoil</span>
                          </span>
                          <span
                            className={`font-mono font-bold ${
                              isUrgent ? 'text-amber-600' : 'text-slate-700'
                            }`}
                          >
                            {hoursLeft}h {minsLeft}m left
                          </span>
                        </div>
                        {/* Progress line */}
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div
                            style={{
                              width: `${Math.min(
                                100,
                                Math.max(10, (item.expiryMinutesRemaining / (item.safeHours * 60)) * 100)
                              )}%`,
                            }}
                            className={`h-full rounded-full transition-all ${
                              isUrgent ? 'bg-amber-500' : 'bg-emerald-500'
                            }`}
                          ></div>
                        </div>
                      </div>

                      {/* AI Match compatibility */}
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-1">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                        <span>
                          <strong>98% AI Match</strong> with {selectedNgo.name} hunger profile
                        </span>
                      </div>
                    </div>

                    {/* Claim Button / Status Action */}
                    <div className="p-4 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => setSafetyModalItem(item)}
                        className="text-xs font-semibold text-slate-600 hover:text-slate-900 underline"
                      >
                        Safety Report
                      </button>

                      {isAlreadyClaimed ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-sky-700 bg-sky-50 border border-sky-200 px-3 py-1 rounded-lg">
                            Claimed ({item.status})
                          </span>
                          <button
                            type="button"
                            onClick={() => advanceDonationStatus(item.id)}
                            className="text-xs font-semibold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 px-2.5 py-1 rounded-lg transition-colors"
                          >
                            Deliver →
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => claimDonation(item.id, selectedNgo.id)}
                          className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>One-Click Claim Request</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* TAB 2: Community Distribution Log */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-200/80 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Distribution History & Audit Trail
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Verifiable record of surplus meals received and distributed across partner communities.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              100% Zero Food Spoiled
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Log ID</th>
                  <th className="py-3 px-4">Food Item</th>
                  <th className="py-3 px-4">Donor Source</th>
                  <th className="py-3 px-4">Portions / Mass</th>
                  <th className="py-3 px-4">Beneficiary Community</th>
                  <th className="py-3 px-4">Delivery Dispatch</th>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">FSSAI Audit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {distributionHistory.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-semibold text-slate-900">
                      {row.id}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {row.foodItem}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {row.donorName}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-emerald-700 font-bold">{row.portions} meals</span>
                      <span className="text-slate-400"> ({row.weightKg} kg)</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700">
                      {row.beneficiaries}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      <span className="inline-flex items-center gap-1">
                        <Truck className="w-3 h-3 text-emerald-600" />
                        <span>{row.driver}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {row.timestamp}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Passed</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
