import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  ShieldCheck,
  QrCode,
  KeyRound,
  CheckCircle2,
  AlertTriangle,
  Thermometer,
  FileText,
  Lock,
  Printer,
  Sparkles,
} from 'lucide-react';

export default function HandoverGateModal() {
  const { handoverModalItem, setHandoverModalItem, advanceDeliveryStep, showToast } = useApp();

  const [enteredOtp, setEnteredOtp] = useState('');
  const [coreTemp, setCoreTemp] = useState(
    handoverModalItem ? handoverModalItem.temperatureC : 66.5
  );
  const [qrScanned, setQrScanned] = useState(false);
  const [signatureSigned, setSignatureSigned] = useState(false);

  if (!handoverModalItem) return null;

  const isHotFood = handoverModalItem.category === 'Cooked Meals';
  // Hot food must be > 60°C; Cold food must be < 7°C
  const tempValid = isHotFood ? coreTemp >= 60 : coreTemp <= 7.0;

  const handleQrScanSimulation = () => {
    setQrScanned(true);
    setEnteredOtp(handoverModalItem.otpCode);
    showToast(
      'Dual-Key QR Handshake Validated!',
      `Digital signature verified with donor node ${handoverModalItem.donorId}. Legal custody transferred.`
    );
  };

  const handleCompleteHandover = () => {
    if (!tempValid) {
      alert('Temperature violation: Hot food must be >= 60°C or chilled <= 7°C to clear FSSAI handover gate.');
      return;
    }

    advanceDeliveryStep(handoverModalItem.id);
    showToast(
      'Good Samaritan Custody Transferred!',
      `Batch ${handoverModalItem.id} released under Section 31 FSSAI regulations. Full donor liability indemnity active.`
    );
    setHandoverModalItem(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                FSSAI Digital Safety & Handover Gate
              </h3>
              <p className="text-xs text-slate-500">
                Good Samaritan Liability Shield · Dual-Key Custody Transfer
              </p>
            </div>
          </div>
          <button
            onClick={() => setHandoverModalItem(null)}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Good Samaritan Protection Banner */}
          <div className="bg-emerald-50 border border-emerald-200/90 rounded-2xl p-4 flex items-start gap-3">
            <Lock className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-900 leading-relaxed">
              <strong className="block font-bold mb-0.5">
                Statutory Good Samaritan Legal Indemnity:
              </strong>
              Under the FSSAI Surplus Food Regulations and Good Samaritan Guidelines, institutional donors are protected from civil and criminal liability once digital core temperature and dual-key custody are signed off.
            </div>
          </div>

          {/* Core Temperature Probe Verification */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Thermometer className="w-4 h-4 text-teal-600" />
                <span>Handover Core Temperature Probe</span>
              </span>
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                  tempValid
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : 'bg-red-100 text-red-800 border-red-300'
                }`}
              >
                {tempValid ? '✓ FSSAI TEMPERATURE PASS' : '⚠️ OUT OF SAFE RANGE'}
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>Calibrated Probe Readout:</span>
                <span className="font-mono text-base font-black text-slate-900">
                  {coreTemp.toFixed(1)}°C
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="85"
                step="0.5"
                value={coreTemp}
                onChange={(e) => setCoreTemp(parseFloat(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>0°C (Cold &lt; 7°C)</span>
                <span>25°C (Danger Zone)</span>
                <span>60°C (Hot Holding Minimum)</span>
                <span>85°C (Piping Hot)</span>
              </div>
            </div>
          </div>

          {/* Dual-Key Verification (QR Code + OTP Simulation) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Donor QR Code display */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 text-center space-y-2.5">
              <div className="text-xs font-bold text-slate-700">Donor Handover QR</div>
              <div className="w-36 h-36 mx-auto bg-slate-50 rounded-xl border border-slate-200 p-2 flex flex-col items-center justify-center relative">
                {/* Simulated SVG QR Matrix */}
                <QrCode className="w-24 h-24 text-slate-800" />
                <span className="text-[9px] font-mono text-slate-500 mt-1">
                  {handoverModalItem.id}
                </span>
              </div>
              <button
                type="button"
                onClick={handleQrScanSimulation}
                className="w-full py-1.5 rounded-lg text-xs font-bold bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 transition-colors"
              >
                {qrScanned ? '✓ QR Handshake Verified' : 'Simulate Recipient QR Scan'}
              </button>
            </div>

            {/* Recipient 4-Digit Handover OTP */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 flex flex-col justify-between space-y-3">
              <div>
                <div className="text-xs font-bold text-slate-700">Dual-Key Recipient OTP</div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Recipient NGO driver enters 4-digit token to seal custody:
                </p>
                <div className="mt-3 flex items-center justify-center gap-2">
                  <span className="font-mono text-2xl font-black text-teal-800 tracking-widest bg-teal-50 px-4 py-2 rounded-xl border border-teal-200">
                    {handoverModalItem.otpCode}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <input
                  type="text"
                  maxLength="4"
                  value={enteredOtp}
                  onChange={(e) => setEnteredOtp(e.target.value)}
                  placeholder="Enter 4-digit OTP"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-center font-mono text-sm tracking-widest focus:ring-2 focus:ring-teal-500"
                />
                <span className="text-[10px] text-slate-400 block text-center">
                  Matched against cryptographic custody ledger
                </span>
              </div>
            </div>
          </div>

          {/* Official e-Handover Slip Preview */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs space-y-2">
            <div className="flex items-center justify-between font-bold text-slate-800 border-b border-slate-200 pb-2">
              <span className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-teal-700" />
                <span>FSSAI Form-IX e-Handover Slip</span>
              </span>
              <span className="font-mono text-[11px] text-slate-500">
                BATCH #{handoverModalItem.id}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-slate-600 pt-1">
              <div>Donor: <strong>{handoverModalItem.donorName}</strong></div>
              <div>Recipient: <strong>{handoverModalItem.matchedNgo || 'Akshaya Patra Hub'}</strong></div>
              <div>Mass / Yield: <strong>{handoverModalItem.quantityKg} kg ({handoverModalItem.portions} meals)</strong></div>
              <div>Core Temp: <strong>{coreTemp}°C</strong></div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between sticky bottom-0">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Legal Slip</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setHandoverModalItem(null)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={!tempValid}
              onClick={handleCompleteHandover}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                tempValid
                  ? 'bg-teal-700 hover:bg-teal-800 text-white'
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Sign & Authorize Legal Handover</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
