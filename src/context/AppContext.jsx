import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  INITIAL_METRICS,
  DONOR_PROFILES,
  NGO_PROFILES,
  FLEET_DRIVERS,
  INITIAL_DONATIONS,
  DISTRIBUTION_HISTORY,
  FORECAST_DATA,
} from '../data/mockData';
import { sounds } from '../utils/soundEffects';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Current active view: 'overview' | 'donor' | 'ngo' | 'delivery' | 'admin' | 'safety'
  const [role, setRole] = useState('overview');

  // Core entities
  const [metrics, setMetrics] = useState(INITIAL_METRICS);
  const [donations, setDonations] = useState(INITIAL_DONATIONS);
  const [donors] = useState(DONOR_PROFILES);
  const [selectedDonor, setSelectedDonor] = useState(DONOR_PROFILES[0]);
  const [ngos] = useState(NGO_PROFILES);
  const [selectedNgo, setSelectedNgo] = useState(NGO_PROFILES[0]);
  const [drivers, setDrivers] = useState(FLEET_DRIVERS);
  const [distributionHistory, setDistributionHistory] = useState(DISTRIBUTION_HISTORY);
  const [forecast, setForecast] = useState(FORECAST_DATA);

  // Modals & UI helpers
  const [safetyModalItem, setSafetyModalItem] = useState(null);
  const [scannerModalOpen, setScannerModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [activeDriverTask, setActiveDriverTask] = useState(null);

  // Real-time minute decrement simulation for expiry timers
  useEffect(() => {
    const timer = setInterval(() => {
      setDonations((prev) =>
        prev.map((d) => {
          if (d.status === 'Delivered') return d;
          const remaining = Math.max(0, (d.expiryMinutesRemaining || 180) - 1);
          return {
            ...d,
            expiryMinutesRemaining: remaining,
          };
        })
      );
    }, 15000); // ticks every 15s for lively simulation

    return () => clearInterval(timer);
  }, []);

  // Show Toast
  const showToast = (title, message, type = 'success') => {
    setToastMessage({ title, message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Add new surplus food donation
  const addDonation = (newDonationData) => {
    const newId = `D-${1043 + donations.length}`;
    const co2e = Number((newDonationData.quantityKg * 2.5).toFixed(1));
    const water = Math.round(newDonationData.quantityKg * 1000);
    const safeWindowHours = Number(newDonationData.safeHours) || 4;

    const newDonation = {
      id: newId,
      donorId: selectedDonor.id,
      donorName: selectedDonor.name,
      title: newDonationData.title || 'Assorted Gourmet Surplus',
      category: newDonationData.category || 'Cooked',
      diet: newDonationData.diet || 'VEG',
      quantityKg: Number(newDonationData.quantityKg) || 10,
      portions: Number(newDonationData.portions) || 30,
      preparedAt: newDonationData.preparedAt || new Date().toISOString(),
      safeHours: safeWindowHours,
      expiryMinutesRemaining: safeWindowHours * 60,
      pickupAddress: newDonationData.pickupAddress || selectedDonor.address,
      storageCondition: newDonationData.storageCondition || 'Insulated Hot Pan (> 65°C)',
      fssaiStatus: 'Verified Grade A',
      status: 'Pending Match',
      matchedNgo: null,
      driver: null,
      co2eSavedKg: co2e,
      waterSavedLiters: water,
      temperatureC: newDonationData.category === 'Cooked' ? 67.5 : 4.5,
      notes: newDonationData.notes || 'Logged via FoodRescue AI Donor Suite.',
    };

    setDonations((prev) => [newDonation, ...prev]);

    // Confetti & Audio celebration
    try {
      sounds.playSuccess();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10B981', '#34D399', '#059669', '#F59E0B'],
      });
    } catch {
      // safe fallback
    }

    showToast(
      'Surplus Broadcasted!',
      `Successfully logged ${newDonation.portions} portions (${newDonation.quantityKg} kg). AI matching is notifying nearby NGOs!`
    );

    return newDonation;
  };

  // NGO Claims Donation
  const claimDonation = (donationId, ngoId = null) => {
    const ngo = ngos.find((n) => n.id === ngoId) || selectedNgo;
    const availableDriver = drivers.find((d) => d.status === 'AVAILABLE') || drivers[0];

    setDonations((prev) =>
      prev.map((d) => {
        if (d.id === donationId) {
          return {
            ...d,
            status: 'NGO Accepted',
            matchedNgo: ngo.name,
            driver: `${availableDriver.name} (${availableDriver.vehicle.split(' ')[0]} EV)`,
          };
        }
        return d;
      })
    );

    // Update driver status
    setDrivers((prev) =>
      prev.map((drv) =>
        drv.id === availableDriver.id ? { ...drv, status: 'EN_ROUTE' } : drv
      )
    );

    try {
      sounds.playClaim();
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#3B82F6', '#10B981', '#60A5FA'],
      });
    } catch {
      // safe fallback
    }

    showToast(
      'Donation Claimed!',
      `Matched to ${ngo.name}. Driver ${availableDriver.name} dispatched for pickup.`
    );
  };

  // Advance donation status (Pending Match -> NGO Accepted -> Driver Dispatched -> Delivered)
  const advanceDonationStatus = (donationId) => {
    const item = donations.find((d) => d.id === donationId);
    if (!item) return;

    let nextStatus = item.status;
    let toastTitle = '';
    let toastDesc = '';

    if (item.status === 'Pending Match') {
      nextStatus = 'NGO Accepted';
      item.matchedNgo = item.matchedNgo || selectedNgo.name;
      item.driver = item.driver || `${drivers[0].name} (EV Cargo)`;
      toastTitle = 'NGO Matched & Confirmed';
      toastDesc = `Listing assigned to ${item.matchedNgo}.`;
    } else if (item.status === 'NGO Accepted') {
      nextStatus = 'Driver Dispatched';
      toastTitle = 'EV Courier En Route';
      toastDesc = `${item.driver || 'Driver'} is picking up from ${item.donorName}.`;
    } else if (item.status === 'Driver Dispatched') {
      nextStatus = 'Delivered';
      toastTitle = 'Delivery Completed!';
      toastDesc = `Successfully delivered ${item.portions} meals. Impact recorded on ledger.`;

      // Update aggregate metrics
      setMetrics((prev) => ({
        ...prev,
        foodRescuedKg: prev.foodRescuedKg + item.quantityKg,
        mealsRedistributed: prev.mealsRedistributed + item.portions,
        co2eSavedKg: Number((prev.co2eSavedKg + item.co2eSavedKg).toFixed(1)),
        waterSavedLiters: prev.waterSavedLiters + item.waterSavedLiters,
      }));

      // Add to distribution history
      setDistributionHistory((prev) => [
        {
          id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
          ngoName: item.matchedNgo || 'Akshaya Patra Foundation',
          donorName: item.donorName,
          foodItem: item.title,
          portions: item.portions,
          weightKg: item.quantityKg,
          timestamp: 'Just now',
          beneficiaries: 'Community Shelter & Children',
          driver: item.driver || 'Rajesh Kumar (EV)',
          fssaiVerified: true,
          rating: 5,
        },
        ...prev,
      ]);

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#10B981', '#059669', '#34D399', '#FBBF24'],
        });
      } catch {
        // safe
      }
    }

    setDonations((prev) =>
      prev.map((d) => (d.id === donationId ? { ...d, status: nextStatus } : d))
    );

    if (toastTitle) {
      showToast(toastTitle, toastDesc);
    }
  };

  // Divert expired or sub-standard food to Bio-Methanation (Zero Landfill)
  const divertToBioPlant = (donationId) => {
    setDonations((prev) =>
      prev.map((d) => {
        if (d.id === donationId) {
          return {
            ...d,
            status: 'Diverted to Biogas',
            notes: 'FSSAI time window lapsed: Re-routed to MCD Okhla Bio-Methanation facility for clean green electricity.',
          };
        }
        return d;
      })
    );

    showToast(
      '100% Zero-Landfill Diverted!',
      'Food safely rerouted to MCD Okhla Bio-Methanation plant for renewable biogas and organic fertilizer.',
      'info'
    );
  };

  // Reset demo state
  const resetDemoState = () => {
    setMetrics(INITIAL_METRICS);
    setDonations(INITIAL_DONATIONS);
    setDrivers(FLEET_DRIVERS);
    setDistributionHistory(DISTRIBUTION_HISTORY);
    setForecast(FORECAST_DATA);
    showToast('Reset Complete', 'Demo data restored to initial state.');
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        metrics,
        donations,
        donors,
        selectedDonor,
        setSelectedDonor,
        ngos,
        selectedNgo,
        setSelectedNgo,
        drivers,
        distributionHistory,
        forecast,
        setForecast,
        safetyModalItem,
        setSafetyModalItem,
        scannerModalOpen,
        setScannerModalOpen,
        toastMessage,
        showToast,
        activeDriverTask,
        setActiveDriverTask,
        addDonation,
        claimDonation,
        advanceDonationStatus,
        divertToBioPlant,
        resetDemoState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
