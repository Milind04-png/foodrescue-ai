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
import InteractiveMap from './InteractiveMap';

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
            {/* Real Geospatial Leaflet Map */}
            <InteractiveMap />

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
