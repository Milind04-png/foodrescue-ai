import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  Clock,
  MapPin,
  Flame,
  ShieldCheck,
  CheckCircle2,
  Filter,
  Sparkles,
  ArrowRight,
  Bike,
  Heart,
  Calendar,
  AlertTriangle,
  Building2,
  Tag,
} from 'lucide-react';

export default function NgoPortal() {
  const {
    donations,
    claimDonation,
    selectedNgo,
    setSelectedNgo,
    ngos,
    advanceDeliveryStep,
    setHandoverModalItem,
  } = useApp();

  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [distanceRadius, setDistanceRadius] = useState(5.0); // 5 km micro-logistics radius
  const [activeTab, setActiveTab] = useState('feed'); // 'feed' | 'shelter'

  // Available claimable listings within 5 km micro-radius
  const claimableListings = donations.filter((d) => {
    if (d.status === 'Delivered' || d.status === 'Diverted to Biogas') return false;
    if (categoryFilter !== 'ALL' && d.category !== categoryFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200">
              Verified Relief Partner Network
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs text-slate-500 font-semibold">
              5 km Micro-Logistics Radius Active
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 mt-1">
            {selectedNgo.name}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{selectedNgo.address}</span>
          </p>
        </div>

        {/* Shelter Capacity & NGO Switcher */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <select
              value={selectedNgo.id}
              onChange={(e) => {
                const found = ngos.find((n) => n.id === e.target.value);
                if (found) setSelectedNgo(found);
              }}
              className="text-xs font-semibold bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:ring-2 focus:ring-teal-500 cursor-pointer shadow-xs"
            >
              {ngos.map((n) => (
                <option key={n.id} value={n.id}>
                  Switch NGO: {n.name}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-sky-50 border border-sky-200/80 rounded-xl px-3 py-1.5 flex items-center gap-2">
            <Heart className="w-4 h-4 text-sky-600" />
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-sky-800">
                Shelter Strength
              </div>
              <div className="text-xs font-bold text-sky-900">
                {selectedNgo.shelterStrength} Residents
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Ribbon: 5 km Micro-Radius & Food Categories */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
            <Filter className="w-4 h-4 text-slate-400" />
            <span>Filters:</span>
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-700 focus:ring-2 focus:ring-teal-500 cursor-pointer"
          >
            <option value="ALL">All Food Categories</option>
            <option value="Cooked Meals">Cooked Meals (Gastronorms)</option>
            <option value="Raw Produce">Raw Produce / Salads</option>
            <option value="Baked Goods">Baked Goods / Loaves</option>
          </select>

          {/* Distance Filter Tag */}
          <span className="text-xs font-bold text-teal-800 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
            📍 Radius: &le; {distanceRadius} km (Micro-Logistics Guaranteed)
          </span>
        </div>

        <div className="text-xs text-slate-500">
          Showing <strong>{claimableListings.length}</strong> active institutional listings nearby
        </div>
      </div>

      {/* Hyperlocal Surplus Feed Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {claimableListings.length === 0 ? (
          <div className="col-span-full bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
            <div className="text-4xl">🎉</div>
            <h3 className="text-lg font-bold text-slate-900">
              All institutional surplus within 5 km is currently claimed!
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Campus cafeterias and corporate dining halls broadcast surplus in real-time right after lunch and dinner service.
            </p>
          </div>
        ) : (
          claimableListings.map((item) => {
            const hoursLeft = Math.floor(item.expiryMinutesRemaining / 60);
            const minsLeft = item.expiryMinutesRemaining % 60;
            const isUrgent = item.expiryMinutesRemaining <= 120;
            const isClaimed = item.status === 'Claimed by NGO' || item.status === 'In Transit';

            return (
              <div
                key={item.id}
                className={`bg-white rounded-3xl border transition-all duration-200 shadow-xs hover:shadow-md flex flex-col justify-between overflow-hidden ${
                  isUrgent
                    ? 'border-amber-300 ring-1 ring-amber-200'
                    : 'border-slate-200/90 hover:border-teal-300'
                }`}
              >
                {/* Urgent Shelf-Life Banner if < 2 hrs */}
                {isUrgent && (
                  <div className="bg-amber-500 text-white text-[11px] font-bold px-4 py-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 fill-current animate-pulse" />
                      <span>URGENT RESCUE WINDOW</span>
                    </span>
                    <span>&lt; 2 hrs remaining</span>
                  </div>
                )}

                <div className="p-5 space-y-4">
                  {/* Campus name & distance */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-teal-600" />
                        <span className="font-semibold text-slate-800">
                          {item.donorName}
                        </span>
                        <span>·</span>
                        <span className="text-teal-700 font-bold">1.8 km</span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 mt-1 leading-snug">
                        {item.title}
                      </h3>
                    </div>

                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 whitespace-nowrap">
                      {item.category}
                    </span>
                  </div>

                  {/* Quantity & Feeds Pill */}
                  <div className="grid grid-cols-2 gap-2 bg-slate-50 rounded-2xl p-3 border border-slate-100 text-center">
                    <div>
                      <div className="text-[11px] text-slate-400 font-medium">Batch Weight</div>
                      <div className="text-base font-black text-slate-800">
                        {item.quantityKg} kg
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-400 font-medium">Beneficiary Yield</div>
                      <div className="text-base font-black text-teal-700">
                        Feeds ~{item.portions} people
                      </div>
                    </div>
                  </div>

                  {/* Temperature Readout & Container Info */}
                  <div className="flex items-center justify-between text-xs bg-teal-50/60 rounded-xl p-2.5 border border-teal-100">
                    <span className="font-semibold text-slate-700 truncate max-w-[170px]">
                      {item.containerType}
                    </span>
                    <span className="font-mono text-teal-900 font-bold">
                      {item.temperatureC}°C (Hot Holding)
                    </span>
                  </div>

                  {/* Ticking Safe Window Countdown */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Shelf-Life Remaining</span>
                      </span>
                      <span
                        className={`font-mono font-bold ${
                          isUrgent ? 'text-amber-600' : 'text-slate-800'
                        }`}
                      >
                        {hoursLeft}h {minsLeft}m left
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        style={{
                          width: `${Math.min(
                            100,
                            Math.max(10, (item.expiryMinutesRemaining / (item.safeHours * 60)) * 100)
                          )}%`,
                        }}
                        className={`h-full rounded-full transition-all ${
                          isUrgent ? 'bg-amber-500' : 'bg-teal-600'
                        }`}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Claim / Handover Footer */}
                <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setHandoverModalItem(item)}
                    className="text-xs font-bold text-slate-600 hover:text-slate-900 underline"
                  >
                    e-Handover Slip
                  </button>

                  {isClaimed ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-sky-800 bg-sky-50 border border-sky-200 px-3 py-1.5 rounded-xl">
                        Claimed ({item.driver || 'Courier Assigned'})
                      </span>
                      <button
                        type="button"
                        onClick={() => advanceDeliveryStep(item.id)}
                        className="text-xs font-bold text-teal-800 bg-teal-100 hover:bg-teal-200 px-2.5 py-1.5 rounded-xl transition-colors"
                      >
                        Advance Step →
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => claimDonation(item.id, selectedNgo.id)}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-teal-700 hover:bg-teal-800 text-white shadow-xs transition-all flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>One-Click Claim & Dispatch</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
