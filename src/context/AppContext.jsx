import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  INITIAL_METRICS,
  INSTITUTIONAL_DONORS,
  VERIFIED_NGOS,
  VOLUNTEER_FLEET,
  INITIAL_INSTITUTIONAL_DONATIONS,
  INSTITUTIONAL_LEADERBOARD,
  HISTORICAL_DEMAND_FORECAST,
} from '../data/mockData';
import { sounds } from '../utils/soundEffects';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Active stakeholder view: 'overview' | 'donor' | 'ngo' | 'delivery' | 'admin'
  const [role, setRole] = useState('overview');

  // Core entities
  const [metrics, setMetrics] = useState(INITIAL_METRICS);
  const [donations, setDonations] = useState(INITIAL_INSTITUTIONAL_DONATIONS);
  const [donors] = useState(INSTITUTIONAL_DONORS);
  const [selectedDonor, setSelectedDonor] = useState(INSTITUTIONAL_DONORS[0]);
  const [ngos] = useState(VERIFIED_NGOS);
  const [selectedNgo, setSelectedNgo] = useState(VERIFIED_NGOS[0]);
  const [drivers, setDrivers] = useState(VOLUNTEER_FLEET);
  const [leaderboard, setLeaderboard] = useState(INSTITUTIONAL_LEADERBOARD);
  const [forecast, setForecast] = useState(HISTORICAL_DEMAND_FORECAST);

  // Modals & UI helpers
  const [handoverModalItem, setHandoverModalItem] = useState(null);
  const [scannerModalOpen, setScannerModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Live countdown timer decrement and dynamic escalation tier transition
  useEffect(() => {
    const timer = setInterval(() => {
      setDonations((prev) =>
        prev.map((d) => {
          if (d.status === 'Delivered' || d.status === 'Diverted to Biogas') return d;
          const remaining = Math.max(0, (d.expiryMinutesRemaining || 180) - 1);

          // Dynamic 3-Tier Escalation rule:
          // Tier 1: > 240 mins (4–6 hrs) -> Flash Markdown
          // Tier 2: 120–240 mins (2–4 hrs) -> 1-Click NGO Micro-Rescue
          // Tier 3: < 120 mins (< 2 hrs) -> Automated dispatch to Biogas / Vermicompost
          let tier = d.escalationTier;
          if (remaining > 240) {
            tier = 'Tier 1: Flash Markdown';
          } else if (remaining > 120) {
            tier = 'Tier 2: NGO Micro-Rescue';
          } else {
            tier = 'Tier 3: Biogas Re-routing';
          }

          return {
            ...d,
            expiryMinutesRemaining: remaining,
            escalationTier: tier,
          };
        })
      );
    }, 15000); // ticks every 15s for dynamic simulation

    return () => clearInterval(timer);
  }, []);

  // Show Responsive Toast
  const showToast = (title, message, type = 'success') => {
    setToastMessage({ title, message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Add new institutional surplus donation (e.g. from AI vision scanner or manual form)
  const addDonation = (newDonationData) => {
    const newId = `ESC-${405 + donations.length}`;
    const qty = Number(newDonationData.quantityKg) || 18.5;
    const portions = Number(newDonationData.portions) || Math.round(qty * 2.5);
    const co2e = Number((qty * 2.5).toFixed(1));
    const water = Math.round(qty * 1000);
    const safeWindowHours = Number(newDonationData.safeHours) || 6;
    const remainingMins = safeWindowHours * 60;

    let initialTier = 'Tier 1: Flash Markdown';
    if (remainingMins <= 120) {
      initialTier = 'Tier 3: Biogas Re-routing';
    } else if (remainingMins <= 240) {
      initialTier = 'Tier 2: NGO Micro-Rescue';
    }

    const newDonation = {
      id: newId,
      donorId: selectedDonor.id,
      donorName: selectedDonor.name,
      title: newDonationData.title || 'Institutional Caterer Gastronorm Surplus',
      category: newDonationData.category || 'Cooked Meals',
      containerType: newDonationData.containerType || 'Gastronorm Pan 1/1 (150mm)',
      diet: newDonationData.diet || 'VEG',
      quantityKg: qty,
      portions: portions,
      preparedAt: newDonationData.preparedAt || new Date().toISOString(),
      safeHours: safeWindowHours,
      expiryMinutesRemaining: remainingMins,
      escalationTier: initialTier,
      pickupAddress: newDonationData.pickupAddress || selectedDonor.address,
      storageCondition: newDonationData.storageCondition || 'Insulated Hot Pan (> 65°C)',
      fssaiStatus: 'Verified Grade A',
      status: 'Pending Match',
      matchedNgo: null,
      driver: null,
      co2eSavedKg: co2e,
      waterSavedLiters: water,
      temperatureC: newDonationData.category === 'Cooked Meals' ? 68.2 : 4.6,
      flashSalePriceInr: initialTier === 'Tier 1: Flash Markdown' ? 49 : null,
      mysteryBoxesAvailable: initialTier === 'Tier 1: Flash Markdown' ? Math.floor(portions / 3) : 0,
      mysteryBoxesSold: 0,
      otpCode: Math.floor(1000 + Math.random() * 9000).toString(),
      qrToken: `FSSAI-${newId}-${selectedDonor.id}-VALID`,
      deliveryStep: 1, // Step 1: Arrive & Temp, Step 2: Seal & QR Scan, Step 3: Complete Dropoff
      notes: newDonationData.notes || 'Logged via FoodRescue AI Institutional fast-listing.',
    };

    setDonations((prev) => [newDonation, ...prev]);

    // Confetti celebration & audio
    try {
      sounds.playSuccess();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0F766E', '#10B981', '#34D399', '#F59E0B'],
      });
    } catch {
      // safe fallback
    }

    showToast(
      'Institutional Surplus Logged!',
      `Successfully queued ${newDonation.portions} meals (${newDonation.quantityKg} kg) under ${newDonation.escalationTier}. 5 km radius network alerted!`
    );

    return newDonation;
  };

  // Buy Tier 1 Flash Markdown Box (Internal student/staff purchase at 70% off)
  const buyFlashMarkdownBox = (donationId) => {
    setDonations((prev) =>
      prev.map((d) => {
        if (d.id === donationId && d.mysteryBoxesAvailable > 0) {
          const newSold = d.mysteryBoxesSold + 1;
          const newAvailable = d.mysteryBoxesAvailable - 1;
          return {
            ...d,
            mysteryBoxesSold: newSold,
            mysteryBoxesAvailable: newAvailable,
          };
        }
        return d;
      })
    );

    setMetrics((prev) => ({
      ...prev,
      flashMarkdownBoxesSold: prev.flashMarkdownBoxesSold + 1,
      mealsRedistributed: prev.mealsRedistributed + 3,
      foodRescuedKg: prev.foodRescuedKg + 1.2,
    }));

    try {
      sounds.playClaim();
      confetti({
        particleCount: 45,
        spread: 50,
        origin: { y: 0.65 },
        colors: ['#10B981', '#F59E0B'],
      });
    } catch {}

    showToast(
      'Mystery Box Reserved!',
      'Campus student/staff mystery meal purchased at 70% discount (₹49). Pick up at cafeteria counter.'
    );
  };

  // NGO Claims Donation within 5 km Micro-Logistics Radius
  const claimDonation = (donationId, ngoId = null) => {
    const ngo = ngos.find((n) => n.id === ngoId) || selectedNgo;
    const availableDriver = drivers.find((d) => d.status === 'AVAILABLE') || drivers[0];

    setDonations((prev) =>
      prev.map((d) => {
        if (d.id === donationId) {
          return {
            ...d,
            status: 'Claimed by NGO',
            matchedNgo: ngo.name,
            driver: `${availableDriver.name} (${availableDriver.vehicle.split(' ')[0]} EV)`,
            deliveryStep: 1, // Step 1: Arrive & Verify Temp
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
        particleCount: 65,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#0F766E', '#3B82F6', '#10B981'],
      });
    } catch {}

    showToast(
      'Surplus Claim Confirmed!',
      `Locked for ${ngo.name}. 2-Wheeler courier ${availableDriver.name} dispatched with insulated container.`
    );
  };

  // Advance 3-Step Driver Pickup Verification:
  // Step 1: Arrive & Verify Temp (>60°C or <7°C)
  // Step 2: Confirm Package Seal & QR Scan (Dual-key legal liability release)
  // Step 3: Complete Drop-off at Shelter (with OTP verification)
  const advanceDeliveryStep = (donationId) => {
    const item = donations.find((d) => d.id === donationId);
    if (!item) return;

    const currentStep = item.deliveryStep || 1;
    let nextStep = currentStep;
    let newStatus = item.status;
    let toastTitle = '';
    let toastDesc = '';

    if (currentStep === 1) {
      nextStep = 2;
      newStatus = 'In Transit';
      toastTitle = 'Core Temperature Verified!';
      toastDesc = `Measured at ${item.temperatureC}°C (Passed FSSAI HACCP threshold). Proceeding to Package Seal & QR verification.`;
    } else if (currentStep === 2) {
      nextStep = 3;
      toastTitle = 'Dual-Key QR Handover Signed';
      toastDesc = `Legal custody transferred. Donor released from liability under Good Samaritan guidelines. Heading to shelter.`;
    } else if (currentStep === 3) {
      newStatus = 'Delivered';
      toastTitle = 'Drop-off Completed!';
      toastDesc = `Verified by shelter OTP (${item.otpCode}). ${item.portions} nutritious meals delivered!`;

      // Update aggregate metrics
      setMetrics((prev) => ({
        ...prev,
        foodRescuedKg: prev.foodRescuedKg + item.quantityKg,
        mealsRedistributed: prev.mealsRedistributed + item.portions,
        co2eSavedKg: Number((prev.co2eSavedKg + item.co2eSavedKg).toFixed(1)),
        waterSavedLiters: prev.waterSavedLiters + item.waterSavedLiters,
      }));

      // Update institutional leaderboard points
      setLeaderboard((prev) =>
        prev.map((row) =>
          row.name === item.donorName
            ? {
                ...row,
                foodRescuedKg: row.foodRescuedKg + item.quantityKg,
                mealsDiverted: row.mealsDiverted + item.portions,
                co2ePreventedKg: row.co2ePreventedKg + item.co2eSavedKg,
              }
            : row
        )
      );

      try {
        sounds.playSuccess();
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#0F766E', '#10B981', '#F59E0B', '#34D399'],
        });
      } catch {}
    }

    setDonations((prev) =>
      prev.map((d) =>
        d.id === donationId
          ? { ...d, deliveryStep: nextStep, status: newStatus }
          : d
      )
    );

    if (toastTitle) {
      showToast(toastTitle, toastDesc);
    }
  };

  // Tier 3: Divert to Municipal Biogas & Vermicompost (100% Zero-Landfill Fail-Safe)
  const divertToBiogas = (donationId) => {
    setDonations((prev) =>
      prev.map((d) => {
        if (d.id === donationId) {
          return {
            ...d,
            status: 'Diverted to Biogas',
            escalationTier: 'Tier 3: Biogas Re-routing',
            notes: 'Exceeded safe consumption window: Automated dispatch to MCD Okhla Bio-Methanation digest plant.',
          };
        }
        return d;
      })
    );

    setMetrics((prev) => ({
      ...prev,
      biogasKwhGenerated: prev.biogasKwhGenerated + 45,
      foodRescuedKg: prev.foodRescuedKg + 15,
      co2eSavedKg: prev.co2eSavedKg + 37.5,
    }));

    showToast(
      '100% Zero-Landfill Re-route!',
      'Food diverted to MCD Okhla Bio-Methanation unit. Generating 45 kWh clean electricity and organic digestate fertilizer.',
      'info'
    );
  };

  // Reset demo state
  const resetDemoState = () => {
    setMetrics(INITIAL_METRICS);
    setDonations(INITIAL_INSTITUTIONAL_DONATIONS);
    setDrivers(VOLUNTEER_FLEET);
    setLeaderboard(INSTITUTIONAL_LEADERBOARD);
    setForecast(HISTORICAL_DEMAND_FORECAST);
    showToast('Reset Complete', 'Enterprise mock data restored to default.');
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
        leaderboard,
        forecast,
        setForecast,
        handoverModalItem,
        setHandoverModalItem,
        scannerModalOpen,
        setScannerModalOpen,
        toastMessage,
        showToast,
        addDonation,
        buyFlashMarkdownBox,
        claimDonation,
        advanceDeliveryStep,
        divertToBiogas,
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
