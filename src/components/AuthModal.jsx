import React, { useState } from 'react';
import {
  X,
  Lock,
  Mail,
  ShieldCheck,
  Building,
  KeyRound,
  UserCheck,
  Sparkles,
  ArrowRight,
  LogOut,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AuthModal({ isOpen, onClose }) {
  const { authUser, setAuthUser, setRole, showToast } = useApp();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [roleSelection, setRoleSelection] = useState('donor');
  const [orgName, setOrgName] = useState('');
  const [fssaiLicense, setFssaiLicense] = useState('');

  if (!isOpen) return null;

  const demoAccounts = [
    {
      role: 'donor',
      title: 'IIT Delhi Main Dining Hall',
      email: 'chef.iitd@foodrescue.ai',
      name: 'Chef Rajesh Sharma',
      badge: 'Institutional Donor',
      targetRole: 'donor',
    },
    {
      role: 'donor',
      title: 'Microsoft CyberCity Food Court',
      email: 'foodcourt@microsoft.cybercity.ai',
      name: 'Priya Nair',
      badge: 'Corporate Donor',
      targetRole: 'donor',
    },
    {
      role: 'ngo',
      title: 'Robin Hood Army Central Hub',
      email: 'vikas@robinhoodarmy.org',
      name: 'Vikas Malhotra',
      badge: 'Verified Relief NGO',
      targetRole: 'ngo',
    },
    {
      role: 'delivery',
      title: 'Delhi Green EV Logistics Fleet',
      email: 'courier.amit@foodrescue.ai',
      name: 'Amit Kumar (EV Rider #4)',
      badge: 'Green Transport Courier',
      targetRole: 'delivery',
    },
    {
      role: 'admin',
      title: 'FSSAI ESG & Regulatory Command',
      email: 'audit@fssai.gov.in',
      name: 'Dr. Shalini Verma',
      badge: 'Compliance Chief Auditor',
      targetRole: 'admin',
    },
  ];

  const handleQuickDemoLogin = (account) => {
    const mockUser = {
      id: `U-${account.targetRole.toUpperCase()}-DEMO`,
      email: account.email,
      name: account.name,
      role: account.targetRole,
      organization_name: account.title,
      fssai_license: '10021011000452',
      token: `jwt-token-${Date.now()}`,
    };

    localStorage.setItem('foodrescue_user', JSON.stringify(mockUser));
    setAuthUser(mockUser);
    setRole(account.targetRole);
    showToast(
      'Authenticated Successfully!',
      `Logged in as ${account.name} (${account.badge}). Role-based permissions granted.`,
      'success'
    );
    onClose();
  };

  const handleEmailAuth = (e) => {
    e.preventDefault();
    const mockUser = {
      id: `U-CUSTOM-${Date.now()}`,
      email: email || 'user@foodrescue.ai',
      name: name || (email.split('@')[0] || 'Authorized Representative'),
      role: roleSelection,
      organization_name: orgName || 'Registered Enterprise Partner',
      fssai_license: fssaiLicense || '10022011000999',
      token: `jwt-token-${Date.now()}`,
    };

    localStorage.setItem('foodrescue_user', JSON.stringify(mockUser));
    setAuthUser(mockUser);
    setRole(roleSelection);
    showToast(
      isRegister ? 'Account Registered & Verified!' : 'Sign In Successful!',
      `Welcome ${mockUser.name}. Authenticated session active under RBAC policy.`,
      'success'
    );
    onClose();
  };

  const handleLogout = () => {
    localStorage.removeItem('foodrescue_user');
    setAuthUser(null);
    setRole('overview');
    showToast('Signed Out', 'You have been logged out of your session.');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                Identity & Access Governance (RBAC)
              </h3>
              <p className="text-xs text-slate-500">
                JWT Authentication & Role-Based Permissions
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Active Session Status */}
          {authUser ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                  {authUser.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    {authUser.name}
                    <span className="bg-emerald-600 text-white text-[10px] font-mono px-2 py-0.5 rounded-full uppercase">
                      {authUser.role}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    {authUser.organization_name} · {authUser.email}
                  </div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-bold py-2 px-3.5 rounded-xl transition-all flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : null}

          {/* 1-Click Fast Stakeholder Demo Logins */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                1-Click Stakeholder Demo Profiles
              </span>
              <span className="text-[11px] text-slate-400">Instant RBAC Context</span>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {demoAccounts.map((account, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickDemoLogin(account)}
                  className="w-full text-left bg-slate-50 hover:bg-emerald-50/70 border border-slate-200 hover:border-emerald-300 p-3 rounded-2xl transition-all group flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <strong className="text-xs text-slate-900 font-bold group-hover:text-emerald-800">
                        {account.name}
                      </strong>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                        {account.badge}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500">{account.title}</div>
                  </div>

                  <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Launch <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="relative border-t border-slate-200 pt-4">
            <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Or Custom Sign In
            </span>
          </div>

          {/* Custom Credential Form */}
          <form onSubmit={handleEmailAuth} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Stakeholder Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. supervisor@campus-dining.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-emerald-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-emerald-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Assigned Stakeholder Role (RBAC)
              </label>
              <select
                value={roleSelection}
                onChange={(e) => setRoleSelection(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:border-emerald-500"
              >
                <option value="donor">🏢 Food Donor (Cafeterias & Hotels)</option>
                <option value="ngo">🤝 NGO & Food Bank Partner</option>
                <option value="delivery">🚚 Hyperlocal EV Delivery Fleet</option>
                <option value="admin">📊 ESG & FSSAI Compliance Officer</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4 text-emerald-400" />
              <span>Authenticate with JWT Token</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
