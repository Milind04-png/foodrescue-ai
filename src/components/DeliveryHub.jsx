import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Truck,
  MapPin,
  Navigation,
  Clock,
  BatteryCharging,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Leaf,
  Layers,
  Phone,
  Flame,
  ArrowRight,
} from 'lucide-react';

export default function DeliveryHub() {
  const {
    donations,
    drivers,
    advanceDonationStatus,
    setSafetyModalItem,
    showToast,
  } = useApp();

  const [selectedRoute, setSelectedRoute] = useState('active-1');
  const [filterMode, setFilterMode] = useState('ALL');
  const [trafficCondition, setTrafficCondition] = useState('Green Corridor');

  const etaMinutes = trafficCondition === 'Green Corridor' ? 14 : trafficCondition === 'Moderate Traffic' ? 19 : 27;

  // Filter tasks that need pickup or transit
  const deliveryTasks = donations.filter(
    (d) => d.status === 'NGO Accepted' || d.status === 'Driver Dispatched' || d.status === 'Pending Match'
  );

  const completedTasks = donations.filter((d) => d.status === 'Delivered');

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Delivery & Logistics Hub
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            AI-Optimized Route Dispatch · Clean EV Fleet · Cold-Chain Temperature Monitoring
          </p>
        </div>

        {/* EV Fleet summary pill */}
        <div className="flex items-center gap-3">
          <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl px-3.5 py-1.5 flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-600 fill-emerald-600" />
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                100% Zero-Emission Fleet
              </div>
              <div className="text-xs font-bold text-emerald-900">
                3 EV Couriers Active
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Route Dispatch Map + Task List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Simulated Interactive Map View (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            {/* Map Header & Controls */}
            <div className="p-4 border-b border-slate-200/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Live Dispatch & Waypoint Routing
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <select
                  value={trafficCondition}
                  onChange={(e) => setTrafficCondition(e.target.value)}
                  className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-700 cursor-pointer focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="Green Corridor">🌿 Green Corridor (Optimal)</option>
                  <option value="Moderate Traffic">🟡 Moderate Traffic</option>
                  <option value="Peak Congestion">🔴 Peak Congestion</option>
                </select>
                <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                  GPS Live
                </span>
              </div>
            </div>

            {/* Interactive Vector Map Canvas */}
            <div className="relative h-96 bg-slate-100 overflow-hidden select-none">
              {/* Map grid pattern */}
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              ></div>

              {/* Simulated Map Road Networks (SVG paths) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {/* Major Arterial Roads */}
                <path
                  d="M 40 180 Q 200 140 380 200 T 700 170"
                  stroke="#CBD5E1"
                  strokeWidth="8"
                  fill="none"
                />
                <path
                  d="M 120 40 Q 220 220 340 350"
                  stroke="#CBD5E1"
                  strokeWidth="6"
                  fill="none"
                />
                <path
                  d="M 380 60 Q 420 240 580 340"
                  stroke="#CBD5E1"
                  strokeWidth="6"
                  fill="none"
                />

                {/* Active AI-Optimized Route (Glowing Emerald Line) */}
                <path
                  d="M 160 140 C 240 160, 320 180, 480 220"
                  stroke="#10B981"
                  strokeWidth="4"
                  strokeDasharray="6 4"
                  fill="none"
                  className="animate-pulse"
                />

                {/* Alternative Higher-Traffic Route (Dashed gray) */}
                <path
                  d="M 160 140 C 220 260, 390 280, 480 220"
                  stroke="#94A3B8"
                  strokeWidth="2.5"
                  strokeDasharray="4 4"
                  fill="none"
                />
              </svg>

              {/* Pin 1: Donor Location (The Grand Orchid Hotel) */}
              <div
                className="absolute top-[120px] left-[140px] transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10"
                title="Donor: The Grand Orchid Hotel"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-600 border-2 border-white shadow-md flex items-center justify-center text-white text-xs font-bold group-hover:scale-110 transition-transform">
                  🏨
                </div>
                <div className="absolute top-9 left-1/2 -translate-x-1/2 bg-white/95 px-2 py-0.5 rounded shadow-xs text-[10px] font-bold text-slate-800 whitespace-nowrap border border-slate-200">
                  Grand Orchid Hotel
                </div>
              </div>

              {/* Pin 2: NGO Beneficiary (Akshaya Patra Central Hub) */}
              <div
                className="absolute top-[210px] left-[470px] transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10"
                title="NGO: Akshaya Patra Hub"
              >
                <div className="w-8 h-8 rounded-full bg-sky-600 border-2 border-white shadow-md flex items-center justify-center text-white text-xs font-bold group-hover:scale-110 transition-transform">
                  🤝
                </div>
                <div className="absolute top-9 left-1/2 -translate-x-1/2 bg-white/95 px-2 py-0.5 rounded shadow-xs text-[10px] font-bold text-slate-800 whitespace-nowrap border border-slate-200">
                  Akshaya Patra Hub
                </div>
              </div>

              {/* Pin 3: Moving EV Courier on Route */}
              <div
                className="absolute top-[175px] left-[310px] transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20"
                title="Courier: Rajesh Kumar (Ather 450X EV)"
              >
                <div className="w-9 h-9 rounded-full bg-amber-500 border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold animate-bounce">
                  🛵
                </div>
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-2 py-0.5 rounded text-[10px] font-semibold whitespace-nowrap shadow-sm">
                  Rajesh (EV) · ETA 14m
                </div>
              </div>

              {/* Pin 4: Zero-Waste Bio-Methanation Plant (Okhla) */}
              <div
                className="absolute top-[290px] left-[560px] transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10"
                title="MCD Okhla Bio-Methanation Facility (Zero Landfill)"
              >
                <div className="w-7 h-7 rounded-full bg-purple-600 border-2 border-white shadow-md flex items-center justify-center text-white text-[11px] font-bold group-hover:scale-110 transition-transform">
                  ♻️
                </div>
                <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white/95 px-2 py-0.5 rounded shadow-xs text-[9px] font-semibold text-slate-700 whitespace-nowrap border border-slate-200">
                  Bio-Biogas Plant
                </div>
              </div>

              {/* Map Info Overlay Card (Bottom-Left) */}
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs p-3 rounded-xl border border-slate-200 shadow-md text-xs space-y-1 z-20 max-w-xs">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span className="text-emerald-700 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 fill-emerald-600" />
                    {trafficCondition}
                  </span>
                  <span>4.2 km · {etaMinutes} mins</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  {trafficCondition === 'Green Corridor'
                    ? 'Avoiding Ring Road congestion; cold-chain box temp maintained at 64.2°C.'
                    : 'Dynamic AI re-routing active to avoid bottleneck delay and protect safe window.'}
                </p>
                <div className="pt-1 flex items-center gap-2 text-[10px] text-emerald-800 font-semibold">
                  <span>EV Carbon Saved: 1.85 kg CO₂e</span>
                </div>
              </div>
            </div>

            {/* Drivers Status Bar */}
            <div className="p-4 bg-slate-50/70 border-t border-slate-200/80">
              <h4 className="text-xs font-bold text-slate-700 mb-2">
                Available Volunteer Fleet
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {drivers.map((drv) => (
                  <div
                    key={drv.id}
                    className="bg-white p-3 rounded-xl border border-slate-200 text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between font-bold text-slate-800">
                      <span>{drv.name}</span>
                      <span className="text-emerald-700 font-mono flex items-center gap-1 text-[11px]">
                        <BatteryCharging className="w-3 h-3" />
                        {drv.battery}%
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">
                      {drv.vehicle}
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[10px]">
                      <span className="text-slate-400">{drv.deliveriesCount} trips</span>
                      <span
                        className={`font-semibold ${
                          drv.status === 'AVAILABLE' ? 'text-emerald-600' : 'text-amber-600'
                        }`}
                      >
                        {drv.status === 'AVAILABLE' ? '● Ready' : '● In Transit'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Delivery Task List (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Active Dispatch Tasks
                </h3>
                <p className="text-xs text-slate-500">
                  {deliveryTasks.length} active delivery tasks queued
                </p>
              </div>

              {/* Status counter */}
              <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
                {deliveryTasks.length} Pending
              </span>
            </div>

            {/* Task Cards */}
            <div className="space-y-3">
              {deliveryTasks.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs">
                  No pending pickup tasks. Check back when NGOs accept food donations!
                </div>
              ) : (
                deliveryTasks.map((task) => {
                  const isHotCooked = task.category === 'Cooked';

                  return (
                    <div
                      key={task.id}
                      className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-all bg-slate-50/40 space-y-3"
                    >
                      {/* Priority Tag & Title */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1.5">
                            {isHotCooked ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                                <Flame className="w-3 h-3 text-amber-600 fill-amber-500" />
                                Urgent Hot Holding
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-sky-100 text-sky-800">
                                Standard Courier
                              </span>
                            )}
                            <span className="font-mono text-xs text-slate-400 font-semibold">
                              {task.id}
                            </span>
                          </div>
                          <h4 className="font-bold text-sm text-slate-900 mt-1">
                            {task.title}
                          </h4>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-extrabold text-slate-800 block">
                            {task.quantityKg} kg
                          </span>
                          <span className="text-[11px] text-slate-500">
                            {task.portions} portions
                          </span>
                        </div>
                      </div>

                      {/* Route Details: Pickup -> Drop */}
                      <div className="space-y-1.5 text-xs text-slate-600 bg-white p-2.5 rounded-lg border border-slate-100">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0"></div>
                          <span className="font-medium text-slate-800 truncate">
                            Pickup: {task.donorName}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-sky-500 flex-shrink-0"></div>
                          <span className="font-medium text-slate-800 truncate">
                            Drop: {task.matchedNgo || 'Awaiting NGO confirmation'}
                          </span>
                        </div>
                      </div>

                      {/* Handling Alert */}
                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span className="flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Insulated temp: <strong>{task.temperatureC}°C</strong></span>
                        </span>
                        <span className="text-amber-700 font-medium">
                          {Math.floor(task.expiryMinutesRemaining / 60)}h window
                        </span>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => setSafetyModalItem(task)}
                          className="text-xs font-semibold text-slate-600 hover:text-slate-900 underline"
                        >
                          Verify Checklist
                        </button>

                        <button
                          type="button"
                          onClick={() => advanceDonationStatus(task.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs ${
                            task.status === 'Driver Dispatched'
                              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                              : 'bg-slate-900 hover:bg-slate-800 text-white'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>
                            {task.status === 'Driver Dispatched'
                              ? 'Mark as Delivered (OTP Verified)'
                              : 'Confirm Pickup & Dispatch'}
                          </span>
                        </button>
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
