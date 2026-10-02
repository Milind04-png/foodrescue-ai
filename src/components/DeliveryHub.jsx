import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Bike,
  Navigation,
  Clock,
  BatteryCharging,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Flame,
  Thermometer,
  QrCode,
  KeyRound,
  FileText,
  MapPin,
} from 'lucide-react';

export default function DeliveryHub() {
  const {
    donations,
    drivers,
    advanceDeliveryStep,
    setHandoverModalItem,
    showToast,
  } = useApp();

  const [trafficCondition, setTrafficCondition] = useState('Green Corridor');
  const etaMinutes = trafficCondition === 'Green Corridor' ? 11 : trafficCondition === 'Moderate Traffic' ? 16 : 22;

  // Active tasks for couriers
  const deliveryTasks = donations.filter(
    (d) => d.status === 'Claimed by NGO' || d.status === 'In Transit' || d.status === 'Pending Match'
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200">
              Hyperlocal Logistics & Field Dispatch
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs text-slate-500 font-semibold">
              5 km Micro-Radius Rapid Dispatch
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 mt-1">
            2-Wheeler Green Courier Network
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Insulated Thermal Transport · 3-Step Legal Custody Handover · Zero Emission
          </p>
        </div>

        {/* Fleet telemetry pill */}
        <div className="flex items-center gap-3">
          <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl px-4 py-2 flex items-center gap-2.5">
            <Zap className="w-5 h-5 text-emerald-600 fill-emerald-600" />
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                100% Electric EV Couriers
              </div>
              <div className="text-xs font-bold text-emerald-900">
                3 Insulated 2-Wheelers Online
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Map + 3-Step Driver Task Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Micro-Route Map (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
            {/* Map Header */}
            <div className="p-4 border-b border-slate-200/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-teal-600" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Live Micro-Logistics Map (5 km Radius)
                </h3>
              </div>

              {/* Traffic Condition Selector */}
              <div className="flex items-center gap-2 text-xs">
                <select
                  value={trafficCondition}
                  onChange={(e) => setTrafficCondition(e.target.value)}
                  className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1 text-slate-700 cursor-pointer focus:ring-1 focus:ring-teal-500"
                >
                  <option value="Green Corridor">🌿 Green Corridor (Optimal)</option>
                  <option value="Moderate Traffic">🟡 Moderate Ring Road Traffic</option>
                  <option value="Peak Congestion">🔴 Peak City Congestion</option>
                </select>
              </div>
            </div>

            {/* Interactive Vector Map Canvas */}
            <div className="relative h-96 bg-slate-100 overflow-hidden select-none">
              {/* Map background grid */}
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              ></div>

              {/* Simulated Map Road Networks (SVG) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <path d="M 40 180 Q 200 140 380 200 T 700 170" stroke="#CBD5E1" strokeWidth="8" fill="none" />
                <path d="M 120 40 Q 220 220 340 350" stroke="#CBD5E1" strokeWidth="6" fill="none" />
                <path d="M 380 60 Q 420 240 580 340" stroke="#CBD5E1" strokeWidth="6" fill="none" />

                {/* Active AI-Optimized Route (Glowing Emerald Line) */}
                <path
                  d="M 160 140 C 240 160, 320 180, 480 220"
                  stroke="#0F766E"
                  strokeWidth="4"
                  strokeDasharray="6 4"
                  fill="none"
                  className="animate-pulse"
                />
              </svg>

              {/* Pin 1: Donor Node (IIT Delhi Central Mess) */}
              <div className="absolute top-[120px] left-[140px] transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10">
                <div className="w-8 h-8 rounded-full bg-teal-700 border-2 border-white shadow-md flex items-center justify-center text-white text-xs font-bold group-hover:scale-110 transition-transform">
                  🏛️
                </div>
                <div className="absolute top-9 left-1/2 -translate-x-1/2 bg-white/95 px-2 py-0.5 rounded shadow-xs text-[10px] font-bold text-slate-800 whitespace-nowrap border border-slate-200">
                  IIT Delhi Dining Hall
                </div>
              </div>

              {/* Pin 2: Recipient NGO Shelter (Akshaya Patra) */}
              <div className="absolute top-[210px] left-[470px] transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10">
                <div className="w-8 h-8 rounded-full bg-sky-600 border-2 border-white shadow-md flex items-center justify-center text-white text-xs font-bold group-hover:scale-110 transition-transform">
                  🤝
                </div>
                <div className="absolute top-9 left-1/2 -translate-x-1/2 bg-white/95 px-2 py-0.5 rounded shadow-xs text-[10px] font-bold text-slate-800 whitespace-nowrap border border-slate-200">
                  Akshaya Patra Shelter
                </div>
              </div>

              {/* Pin 3: Moving 2-Wheeler EV Courier */}
              <div className="absolute top-[175px] left-[310px] transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20">
                <div className="w-9 h-9 rounded-full bg-amber-500 border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold animate-bounce">
                  🛵
                </div>
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-2 py-0.5 rounded text-[10px] font-semibold whitespace-nowrap shadow-sm">
                  Rajesh (Ather EV) · ETA {etaMinutes}m
                </div>
              </div>

              {/* Pin 4: Zero-Landfill Biogas Plant (Okhla) */}
              <div className="absolute top-[290px] left-[560px] transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10">
                <div className="w-7 h-7 rounded-full bg-purple-600 border-2 border-white shadow-md flex items-center justify-center text-white text-[11px] font-bold">
                  ♻️
                </div>
                <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white/95 px-2 py-0.5 rounded shadow-xs text-[9px] font-semibold text-slate-700 whitespace-nowrap border border-slate-200">
                  MCD Biogas Unit
                </div>
              </div>

              {/* Map Telematics Overlay Card */}
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs p-3.5 rounded-2xl border border-slate-200 shadow-md text-xs space-y-1 z-20 max-w-xs">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span className="text-teal-700 flex items-center gap-1 font-bold">
                    <Zap className="w-3.5 h-3.5 fill-teal-600" />
                    {trafficCondition}
                  </span>
                  <span>2.8 km · {etaMinutes} mins</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Insulated thermal box holding core temperature at <strong>66.5°C</strong>.
                </p>
                <div className="pt-1 text-[10px] text-emerald-800 font-bold">
                  <span>EV Carbon Averted: 1.4 kg CO₂e</span>
                </div>
              </div>
            </div>

            {/* Courier Fleet Telematics */}
            <div className="p-4 bg-slate-50/70 border-t border-slate-200/80">
              <h4 className="text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
                Active 2-Wheeler Volunteers
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {drivers.map((drv) => (
                  <div key={drv.id} className="bg-white p-3 rounded-2xl border border-slate-200 text-xs space-y-1.5">
                    <div className="flex items-center justify-between font-bold text-slate-800">
                      <span>{drv.name}</span>
                      <span className="text-emerald-700 font-mono flex items-center gap-1 text-[11px]">
                        <BatteryCharging className="w-3.5 h-3.5" />
                        {drv.battery}%
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">{drv.vehicle}</div>
                    <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[10px]">
                      <span className="text-slate-400">{drv.tripsCompleted} trips</span>
                      <span className={`font-bold ${drv.status === 'AVAILABLE' ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {drv.status === 'AVAILABLE' ? '● Ready for Dispatch' : '● In Transit'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 3-Step Driver Pickup Task Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-5">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900">
                  Driver Pickup Task Queue
                </h3>
                <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                  {deliveryTasks.length} Active
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Execute 3-Step Legal Custody Handover Protocol
              </p>
            </div>

            <div className="space-y-4">
              {deliveryTasks.map((task) => {
                const currentStep = task.deliveryStep || 1;

                return (
                  <div
                    key={task.id}
                    className="p-4 rounded-2xl border border-slate-200 hover:border-slate-300 bg-slate-50/50 space-y-4 transition-all"
                  >
                    {/* Title & Batch ID */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="font-mono text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                          {task.id}
                        </span>
                        <h4 className="font-bold text-sm text-slate-900 mt-1">
                          {task.title}
                        </h4>
                        <div className="text-xs text-slate-500 mt-0.5">
                          {task.donorName} ➔ {task.matchedNgo || 'Nearest Registered Shelter'}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-black text-slate-900 block">{task.quantityKg} kg</span>
                        <span className="text-[11px] text-slate-500">~{task.portions} meals</span>
                      </div>
                    </div>

                    {/* Visual 3-Step Progress Indicators */}
                    <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-bold">
                      <div
                        className={`p-2 rounded-xl border transition-all ${
                          currentStep >= 1
                            ? 'bg-teal-700 text-white border-teal-700'
                            : 'bg-white text-slate-400 border-slate-200'
                        }`}
                      >
                        <div>Step 1</div>
                        <div className="truncate">Verify Temp</div>
                      </div>

                      <div
                        className={`p-2 rounded-xl border transition-all ${
                          currentStep >= 2
                            ? 'bg-teal-700 text-white border-teal-700'
                            : 'bg-white text-slate-400 border-slate-200'
                        }`}
                      >
                        <div>Step 2</div>
                        <div className="truncate">QR Custody</div>
                      </div>

                      <div
                        className={`p-2 rounded-xl border transition-all ${
                          currentStep >= 3
                            ? 'bg-teal-700 text-white border-teal-700'
                            : 'bg-white text-slate-400 border-slate-200'
                        }`}
                      >
                        <div>Step 3</div>
                        <div className="truncate">Drop-off OTP</div>
                      </div>
                    </div>

                    {/* Step Details & Action */}
                    <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs space-y-2">
                      {currentStep === 1 && (
                        <div className="space-y-1">
                          <span className="text-slate-700 font-bold block flex items-center gap-1.5">
                            <Thermometer className="w-3.5 h-3.5 text-teal-600" />
                            Step 1: Arrive & Verify Temperature
                          </span>
                          <p className="text-[11px] text-slate-500">
                            Insert thermal probe into container. Must measure &gt; 60°C for cooked foods.
                          </p>
                        </div>
                      )}

                      {currentStep === 2 && (
                        <div className="space-y-1">
                          <span className="text-slate-700 font-bold block flex items-center gap-1.5">
                            <QrCode className="w-3.5 h-3.5 text-teal-600" />
                            Step 2: Package Seal & QR Handshake
                          </span>
                          <p className="text-[11px] text-slate-500">
                            Scan donor's digital handover QR to release legal liability under Good Samaritan guidelines.
                          </p>
                        </div>
                      )}

                      {currentStep === 3 && (
                        <div className="space-y-1">
                          <span className="text-slate-700 font-bold block flex items-center gap-1.5">
                            <KeyRound className="w-3.5 h-3.5 text-teal-600" />
                            Step 3: Complete Drop-off & Verify OTP
                          </span>
                          <p className="text-[11px] text-slate-500">
                            Shelter manager confirms receipt with 4-digit OTP: <strong className="font-mono text-teal-800">{task.otpCode}</strong>.
                          </p>
                        </div>
                      )}

                      {/* Interactive Step Trigger */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => setHandoverModalItem(task)}
                          className="text-[11px] font-bold text-teal-700 hover:text-teal-900 underline"
                        >
                          View e-Slip
                        </button>

                        <button
                          type="button"
                          onClick={() => advanceDeliveryStep(task.id)}
                          className="px-4 py-2 rounded-xl text-xs font-bold bg-teal-700 hover:bg-teal-800 text-white shadow-xs transition-colors flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>
                            {currentStep === 1
                              ? 'Pass Temp Check (> 60°C) →'
                              : currentStep === 2
                              ? 'Sign QR Custody →'
                              : 'Verify OTP & Complete Delivery'}
                          </span>
                        </button>
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
