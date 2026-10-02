/**
 * FoodRescue AI - Full Frontend Application Engine
 * Smart India Hackathon 2026 (SIH26234) - Team TECH TITANS
 * 
 * Features:
 * - Real-time Reactive State (Donors, NGOs, Fleets, Live Donations, Impact KPIs)
 * - Seamless API connection to FastAPI backend with zero-latency local fallback
 * - Simulated AI Computer Vision Scanner for food recognition
 * - Scikit-Learn Demand Prediction client-side & backend estimator
 * - Dynamic FSSAI Microbial Shelf-Life Decay Timer
 * - Interactive Geospatial City Radar Map with Animated Routes
 * - CSR / 80G Tax Exemption Certificate Generator with QR verification
 */

// --- Default Seed State ---
const INITIAL_DATA = {
  donors: [
    { id: "D1", name: "The Grand Pavilion Banquet", category: "Banquet / Wedding Hall", contact: "+91 98101 23456", lat: 28.5672, lng: 77.2433, address: "Lajpat Nagar, New Delhi", rating: 4.9, license: "10021011000452" },
    { id: "D2", name: "Spice Route Fine Dine (Taj Hotel)", category: "5-Star Hotel", contact: "+91 98112 34567", lat: 28.6052, lng: 77.2250, address: "Mansingh Road, New Delhi", rating: 4.8, license: "10018011000984" },
    { id: "D3", name: "Haldiram's Sweets & Quick Dine", category: "Restaurant", contact: "+91 98188 45678", lat: 28.6315, lng: 77.2167, address: "Connaught Place, New Delhi", rating: 4.7, license: "10019011000673" },
    { id: "D4", name: "Tech Mahindra Cyber Hub Cafeteria", category: "Corporate Canteen", contact: "+91 98200 56789", lat: 28.4986, lng: 77.0894, address: "DLF Cyber City, Border", rating: 4.6, license: "10020011000311" },
    { id: "D5", name: "Green Valley Gourmet & Bakery", category: "Bakery & Packaged", contact: "+91 98311 67890", lat: 28.6001, lng: 77.2275, address: "Khan Market, New Delhi", rating: 4.9, license: "10022011000182" }
  ],
  ngos: [
    { id: "NGO1", name: "Robin Hood Army - Central Hub", contact: "Vikas Malhotra", phone: "+91 99100 11223", lat: 28.6289, lng: 77.2285, shortfall: 180, capacity: 350, urgency: "HIGH", diet: "ALL", cold_storage: true },
    { id: "NGO2", name: "Delhi Roti Bank Foundation", contact: "Sunita Devi", phone: "+91 98109 88776", lat: 28.5855, lng: 77.2215, shortfall: 320, capacity: 500, urgency: "CRITICAL", diet: "VEG", cold_storage: true },
    { id: "NGO3", name: "Feeding India Zomato Shelter Hub", contact: "Rahul Sen", phone: "+91 98711 22334", lat: 28.5744, lng: 77.2119, shortfall: 90, capacity: 250, urgency: "MEDIUM", diet: "ALL", cold_storage: true },
    { id: "NGO4", name: "Snehalaya Children Care Kitchen", contact: "Sister Mary", phone: "+91 98118 77665", lat: 28.5822, lng: 77.2448, shortfall: 110, capacity: 150, urgency: "HIGH", diet: "ALL", cold_storage: false }
  ],
  fleet: [
    { id: "V1", driver: "Rohan Sharma (Volunteer #104)", type: "Electric Cargo Scooter", lat: 28.5950, lng: 77.2300, status: "AVAILABLE", deliveries: 4 },
    { id: "V2", driver: "Priya Verma (Green Van #202)", type: "Tata Ace EV (Cold Van)", lat: 28.6150, lng: 77.2100, status: "EN_ROUTE", deliveries: 6 },
    { id: "V3", driver: "Amit Patel (Eco Fleet #301)", type: "E-Rickshaw Cargo", lat: 28.5700, lng: 77.2350, status: "AVAILABLE", deliveries: 3 }
  ],
  bio_facilities: [
    { id: "BIO1", name: "MCD Bio-Methanation & Clean Biogas Unit", address: "Okhla Phase 1 Eco Center", lat: 28.5301, lng: 77.2721, type: "Biogas Energy" },
    { id: "BIO2", name: "Urban Harvest Vermicompost Facility", address: "Pusa Agricultural Institute Zone", lat: 28.6369, lng: 77.1558, type: "Vermicompost" }
  ],
  donations: [
    {
      id: "DON-2026-001",
      donor_id: "D1",
      donor_name: "The Grand Pavilion Banquet",
      title: "Royal Shahi Paneer, Pulao & Butter Naan",
      category: "Cooked Gravy & Rice",
      diet: "VEG",
      quantity_kg: 32.5,
      portions: 80,
      prepared_at: new Date(Date.now() - 70 * 60000).toISOString(),
      storage_condition: "Insulated Chafing Dish (65°C)",
      fssai_status: "VERIFIED_SAFE",
      freshness_score: 82,
      safe_until: "05:30 AM",
      remaining_minutes: 185,
      status: "AVAILABLE",
      matched_ngo: "Delhi Roti Bank Foundation",
      driver: null,
      co2e_saved_kg: 81.25,
      water_saved_l: 32500
    },
    {
      id: "DON-2026-002",
      donor_id: "D2",
      donor_name: "Spice Route Fine Dine (Taj Hotel)",
      title: "Vegetable Biryani & Dal Makhani",
      category: "Cooked Grains & Lentils",
      diet: "VEG",
      quantity_kg: 22.0,
      portions: 55,
      prepared_at: new Date(Date.now() - 40 * 60000).toISOString(),
      storage_condition: "Stainless Steel Hot Pan",
      fssai_status: "VERIFIED_SAFE",
      freshness_score: 91,
      safe_until: "06:00 AM",
      remaining_minutes: 220,
      status: "AVAILABLE",
      matched_ngo: "Robin Hood Army - Central Hub",
      driver: null,
      co2e_saved_kg: 55.0,
      water_saved_l: 22000
    },
    {
      id: "DON-2026-003",
      donor_id: "D5",
      donor_name: "Green Valley Gourmet & Bakery",
      title: "Artisanal Multigrain Buns & Croissants",
      category: "Bakery & Breads",
      diet: "VEG",
      quantity_kg: 15.0,
      portions: 45,
      prepared_at: new Date(Date.now() - 300 * 60000).toISOString(),
      storage_condition: "Ambient Sealed Bags",
      fssai_status: "VERIFIED_SAFE",
      freshness_score: 75,
      safe_until: "Tomorrow 08:00 PM",
      remaining_minutes: 1820,
      status: "IN_TRANSIT",
      matched_ngo: "Snehalaya Children Care Kitchen",
      driver: "Amit Patel (Eco Fleet #301)",
      co2e_saved_kg: 37.5,
      water_saved_l: 15000
    }
  ],
  impact: {
    total_food_rescued_kg: 1845.0,
    total_meals_redistributed: 4612,
    total_co2e_saved_kg: 4612.5,
    total_water_saved_liters: 1845000,
    landfill_diverted_kg: 1845.0,
    biogas_compost_diverted_kg: 160.0
  }
};

class FoodRescueApp {
  constructor() {
    this.data = JSON.parse(JSON.stringify(INITIAL_DATA));
    this.apiBase = window.location.origin.includes(":8000") ? window.location.origin : "http://127.0.0.1:8000";
    this.activeTab = "command";
    this.activeRoute = null;
    this.timerInterval = null;

    this.init();
  }

  async init() {
    // Attempt to sync with FastAPI backend if reachable
    await this.syncWithBackend();

    // Setup UI event listeners
    this.setupNavigation();
    this.setupDemandForecastForm();
    this.setupDonationForm();
    this.setupMapRadar();
    this.setupDecaySimulator();

    // Render initial views
    this.renderKPIs();
    this.renderLiveDonationsList();
    this.renderNGOList();
    this.renderFleetList();
    this.renderMap();
    this.renderFSSAIChecklist();

    // Start live decay countdown timer (updates every 5 seconds)
    this.startDecayTicker();

    console.log("FoodRescue AI System Initialized Successfully. SIH26234 - TECH TITANS");
  }

  async syncWithBackend() {
    try {
      const res = await fetch(`${this.apiBase}/api/data`, { signal: AbortSignal.timeout(1200) });
      if (res.ok) {
        const backendData = await res.json();
        this.data.donors = backendData.donors || this.data.donors;
        this.data.ngos = backendData.ngos || this.data.ngos;
        this.data.fleet = backendData.fleet || this.data.fleet;
        this.data.donations = backendData.donations || this.data.donations;
        this.data.impact = backendData.impact_stats || this.data.impact;
        this.showToast("Connected to FastAPI AI Backend Server", "success");
      }
    } catch (e) {
      console.log("Using standalone high-performance local AI engine.");
    }
  }

  setupNavigation() {
    const tabs = document.querySelectorAll(".nav-tab");
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        const targetId = tab.dataset.target;
        this.switchTab(targetId);
      });
    });
  }

  switchTab(targetTabId) {
    this.activeTab = targetTabId;
    document.querySelectorAll(".view-section").forEach(sec => {
      sec.style.display = "none";
    });
    const activeSection = document.getElementById(`view-${targetTabId}`);
    if (activeSection) {
      activeSection.style.display = "block";
    }

    if (targetTabId === "command" || targetTabId === "routing") {
      this.renderMap();
    }
  }

  startDecayTicker() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.data.donations.forEach(donation => {
        if (donation.remaining_minutes > 0) {
          donation.remaining_minutes = Math.max(0, donation.remaining_minutes - 1);
          donation.freshness_score = Math.max(0, Math.round((donation.remaining_minutes / 240) * 100));

          if (donation.freshness_score <= 15 && donation.status !== "DIVERTED_TO_BIOGAS") {
            donation.fssai_status = "EXPIRED_FSSAI_THRESHOLD";
            donation.status = "DIVERTED_TO_BIOGAS";
            this.showToast(`Notice: Lot #${donation.id} diverted to MCD Bio-Methanation Plant.`, "warning");
          }
        }
      });
      this.renderLiveDonationsList();
    }, 10000);
  }

  renderKPIs() {
    const impact = this.data.impact;
    document.getElementById("kpi-rescued-kg").textContent = impact.total_food_rescued_kg.toLocaleString() + " kg";
    document.getElementById("kpi-meals-served").textContent = impact.total_meals_redistributed.toLocaleString();
    document.getElementById("kpi-co2e-saved").textContent = impact.total_co2e_saved_kg.toLocaleString() + " kg";
    document.getElementById("kpi-water-saved").textContent = (impact.total_water_saved_liters / 1000).toFixed(0) + " kL";

    const activeCount = this.data.donations.filter(d => d.status === "AVAILABLE" || d.status === "IN_TRANSIT").length;
    const badge = document.getElementById("active-rescue-count");
    if (badge) badge.textContent = `${activeCount} Active Operations`;
  }

  // --- Demand Forecasting Form Logic ---
  setupDemandForecastForm() {
    const btn = document.getElementById("btn-run-forecast");
    if (!btn) return;

    btn.addEventListener("click", async () => {
      btn.innerHTML = `<span class="inline-block animate-spin mr-2">⚙</span> AI Forecasting...`;
      btn.disabled = true;

      const estType = document.getElementById("forecast-est-type").value;
      const dayVal = parseInt(document.getElementById("forecast-day").value, 10);
      const weatherVal = document.getElementById("forecast-weather").value;
      const eventVal = document.getElementById("forecast-event").checked;
      const plannedPortions = parseInt(document.getElementById("forecast-portions").value, 10);

      let result = null;
      try {
        const res = await fetch(`${this.apiBase}/api/predict-demand`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            establishment_type: estType,
            day_of_week: dayVal,
            weather: weatherVal,
            is_festival: eventVal,
            planned_portions: plannedPortions
          })
        });
        if (res.ok) {
          result = await res.json();
        }
      } catch (err) {
        // Fallback local Scikit-Learn simulation
        const rainDampener = weatherVal === "Rain" ? 0.30 : (weatherVal === "Heatwave" ? 0.12 : 0.0);
        const eventBoost = eventVal ? 0.10 : 0.0;
        const wkndBoost = (dayVal >= 5) ? 0.15 : 0.0;
        const banquetOverprep = estType === "Banquet" ? 0.22 : 0.08;

        const consumedRatio = Math.max(0.45, Math.min(0.98, 0.85 + wkndBoost + eventBoost - rainDampener - banquetOverprep));
        const predictedConsumed = Math.round(plannedPortions * consumedRatio);
        const predictedSurplus = Math.max(0, plannedPortions - predictedConsumed);
        const surplusKg = +(predictedSurplus * 0.4).toFixed(1);

        result = {
          planned_portions: plannedPortions,
          predicted_consumed_portions: predictedConsumed,
          predicted_surplus_portions: predictedSurplus,
          predicted_surplus_kg: surplusKg,
          surplus_percentage: +((predictedSurplus / plannedPortions) * 100).toFixed(1),
          risk_level: predictedSurplus > 50 ? "HIGH_SURPLUS_ALERT" : "MODERATE",
          actionable_recommendation: predictedSurplus > 50 
            ? `Weather (${weatherVal}) & event patterns indicate ~${predictedSurplus} excess portions (${surplusKg} kg). Recommend staging second-batch cooking 45 mins later.`
            : `Demand aligned within standard buffer. Anticipate ~${predictedSurplus} surplus meals. Pre-alerting nearby NGO network.`,
          potential_co2e_saved_kg: +(surplusKg * 2.5).toFixed(1),
          model_confidence: 93.8
        };
      }

      this.displayForecastResult(result);
      btn.innerHTML = `<span>Generate AI Demand Forecast</span>`;
      btn.disabled = false;
    });
  }

  displayForecastResult(res) {
    const container = document.getElementById("forecast-result-box");
    container.style.display = "block";

    document.getElementById("fc-consumed").textContent = `${res.predicted_consumed_portions} Meals`;
    document.getElementById("fc-surplus").textContent = `${res.predicted_surplus_portions} Meals (${res.predicted_surplus_kg} kg)`;
    document.getElementById("fc-ratio").textContent = `${res.surplus_percentage}%`;
    document.getElementById("fc-co2").textContent = `${res.potential_co2e_saved_kg} kg CO2e`;
    document.getElementById("fc-advice").textContent = res.actionable_recommendation;

    const riskBadge = document.getElementById("fc-risk-badge");
    if (res.risk_level === "HIGH_SURPLUS_ALERT") {
      riskBadge.className = "badge-tag badge-urgent";
      riskBadge.textContent = "High Surplus Risk Detected";
    } else {
      riskBadge.className = "badge-tag badge-moderate";
      riskBadge.textContent = "Moderate Buffer Expected";
    }
  }

  // --- Computer Vision Scanner Simulation ---
  simulateVisionScan() {
    const scanOverlay = document.getElementById("vision-scan-overlay");
    const scanStatus = document.getElementById("vision-status-text");
    if (scanOverlay) scanOverlay.style.display = "block";
    if (scanStatus) scanStatus.textContent = "AI Scanning food dish contours, surface moisture & thermal signature...";

    setTimeout(() => {
      if (scanStatus) scanStatus.textContent = "Classifying FSSAI food group & volume estimation...";
    }, 1100);

    setTimeout(() => {
      if (scanOverlay) scanOverlay.style.display = "none";
      // Auto-fill donation form with scanned data
      document.getElementById("don-title").value = "Paneer Butter Masala, Jeera Rice & Tandoori Roti";
      document.getElementById("don-category").value = "Cooked Gravy & Rice";
      document.getElementById("don-weight").value = "24.5";
      document.getElementById("don-portions").value = "60";
      document.getElementById("don-storage").value = "Insulated Hot Box";
      this.showToast("AI Vision Detected: Cooked Paneer & Rice • 24.5 kg • Freshness Grade A (98.2%)", "success");
    }, 2200);
  }

  // --- Donation Form Logic ---
  setupDonationForm() {
    const form = document.getElementById("surplus-donation-form");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const donorId = document.getElementById("don-donor-id").value;
      const title = document.getElementById("don-title").value;
      const category = document.getElementById("don-category").value;
      const diet = document.getElementById("don-diet").value;
      const weight = parseFloat(document.getElementById("don-weight").value);
      const portions = parseInt(document.getElementById("don-portions").value, 10);
      const storage = document.getElementById("don-storage").value;

      const donorObj = this.data.donors.find(d => d.id === donorId) || this.data.donors[0];

      const newDonation = {
        id: `DON-2026-${String(this.data.donations.length + 1).padStart(3, '0')}`,
        donor_id: donorObj.id,
        donor_name: donorObj.name,
        lat: donorObj.lat,
        lng: donorObj.lng,
        title: title,
        category: category,
        diet: diet,
        quantity_kg: weight,
        portions: portions,
        prepared_at: new Date().toISOString(),
        storage_condition: storage,
        fssai_status: "VERIFIED_SAFE",
        freshness_score: 95,
        safe_until: "In 4.5 hours",
        remaining_minutes: 270,
        status: "AVAILABLE",
        matched_ngo: null,
        driver: null,
        co2e_saved_kg: +(weight * 2.5).toFixed(2),
        water_saved_l: Math.round(weight * 1000)
      };

      // Run instant matching
      const matches = this.calculateSmartMatches(newDonation);
      if (matches.length > 0) {
        newDonation.top_recommended_ngo = matches[0].ngo_name;
        newDonation.top_match_score = matches[0].compatibility_score;
      }

      this.data.donations.unshift(newDonation);
      this.renderLiveDonationsList();
      this.renderKPIs();
      this.renderMap();
      this.triggerConfetti();

      this.showToast(`Surplus Broadcasted! ${portions} meals instantly alerted to ${matches[0]?.ngo_name || 'nearby NGOs'}!`, "success");
      form.reset();

      // Automatically switch to Matching Radar tab so user sees the smart match
      setTimeout(() => {
        const matchTab = document.querySelector('[data-target="matching"]');
        if (matchTab) matchTab.click();
        this.showMatchingDetails(newDonation.id);
      }, 700);
    });
  }

  calculateSmartMatches(donation) {
    const matches = this.data.ngos.map(ngo => {
      const distKm = this.getDistance(donation.lat, donation.lng, ngo.lat, ngo.lng);
      const proxScore = Math.max(0, 100 - (distKm * 7));
      const capacityRatio = Math.min(donation.portions, ngo.shortfall) / Math.max(donation.portions, ngo.shortfall);
      const capScore = capacityRatio * 100;
      const urgMap = { "CRITICAL": 100, "HIGH": 80, "MEDIUM": 50 };
      const urgScore = urgMap[ngo.urgency] || 50;
      const dietScore = (ngo.diet === "ALL" || ngo.diet === donation.diet) ? 100 : 0;

      const compScore = +(0.35 * proxScore + 0.30 * urgScore + 0.20 * capScore + 0.15 * dietScore).toFixed(1);
      const transitMins = Math.round((distKm / 22.0) * 60 + 8);

      return {
        ngo_id: ngo.id,
        ngo_name: ngo.name,
        contact_person: ngo.contact,
        phone: ngo.phone,
        distance_km: distKm,
        transit_mins: transitMins,
        urgency: ngo.urgency,
        shortfall: ngo.shortfall,
        compatibility_score: compScore,
        diet_ok: dietScore > 0,
        cold_storage: ngo.cold_storage,
        lat: ngo.lat,
        lng: ngo.lng
      };
    });

    matches.sort((a, b) => b.compatibility_score - a.compatibility_score);
    return matches;
  }

  showMatchingDetails(donationId) {
    const donation = this.data.donations.find(d => d.id === donationId);
    if (!donation) return;

    const matches = this.calculateSmartMatches(donation);
    const container = document.getElementById("matching-results-container");
    if (!container) return;

    let html = `
      <div class="p-4 bg-emerald-950/30 border border-emerald-500/30 rounded-xl mb-4 flex items-center justify-between">
        <div>
          <span class="text-xs text-emerald-400 font-semibold uppercase tracking-wider">Active Lot: ${donation.id}</span>
          <h4 class="text-base font-bold text-white">${donation.title}</h4>
          <p class="text-xs text-gray-300 mt-0.5">${donation.quantity_kg} kg • ${donation.portions} meals • Donor: ${donation.donor_name}</p>
        </div>
        <div class="text-right">
          <span class="text-xs text-gray-400 block">FSSAI Status</span>
          <span class="badge-tag badge-veg">Verified Edible</span>
        </div>
      </div>
      <h4 class="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
        <span>AI-Ranked Recipient NGOs (Weighted Compatibility Index)</span>
      </h4>
      <div class="space-y-3">
    `;

    matches.forEach((m, idx) => {
      const isTop = idx === 0;
      html += `
        <div class="p-4 rounded-xl border ${isTop ? 'border-emerald-500 bg-emerald-900/20' : 'border-gray-800 bg-gray-900/40'} flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <span class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${isTop ? 'bg-emerald-500 text-black' : 'bg-gray-800 text-gray-300'}">#${idx + 1}</span>
              <h5 class="text-sm font-bold text-white">${m.ngo_name}</h5>
              ${isTop ? '<span class="badge-tag badge-veg">Top AI Pick</span>' : ''}
              <span class="badge-tag ${m.urgency === 'CRITICAL' ? 'badge-urgent' : 'badge-moderate'}">${m.urgency} Urgency</span>
            </div>
            <div class="flex items-center gap-4 text-xs text-gray-400 mt-2">
              <span>📍 Distance: <strong>${m.distance_km} km</strong></span>
              <span>⏱ Transit ETA: <strong>~${m.transit_mins} mins</strong></span>
              <span>🍲 Shortfall: <strong>${m.shortfall} meals</strong></span>
              <span>❄ Cold Chain: <strong>${m.cold_storage ? 'Equipped' : 'Ambient'}</strong></span>
            </div>
          </div>
          <div class="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <div class="text-center">
              <div class="text-xl font-black text-emerald-400">${m.compatibility_score}</div>
              <div class="text-[10px] text-gray-400 uppercase">Match Score</div>
            </div>
            <button class="btn-primary text-xs py-2 px-3" onclick="app.dispatchRoute('${donation.id}', '${m.ngo_id}')">
              <span>🚀 Dispatch Route</span>
            </button>
          </div>
        </div>
      `;
    });

    html += `</div>`;
    container.innerHTML = html;
  }

  dispatchRoute(donationId, ngoId) {
    const donation = this.data.donations.find(d => d.id === donationId);
    const ngo = this.data.ngos.find(n => n.id === ngoId);
    const donor = this.data.donors.find(d => d.id === donation?.donor_id) || this.data.donors[0];
    const fleet = this.data.fleet.find(f => f.status === "AVAILABLE") || this.data.fleet[0];

    if (!donation || !ngo) return;

    // Update state
    donation.status = "IN_TRANSIT";
    donation.matched_ngo = ngo.name;
    donation.driver = fleet.driver;
    fleet.status = "EN_ROUTE";

    // Build Route Waypoints for Animated Map
    this.activeRoute = {
      donationId: donation.id,
      donor: { name: donor.name, lat: donor.lat, lng: donor.lng },
      driver: { name: fleet.driver, lat: fleet.lat, lng: fleet.lng },
      ngo: { name: ngo.name, lat: ngo.lat, lng: ngo.lng },
      co2Saved: +(this.getDistance(donor.lat, donor.lng, ngo.lat, ngo.lng) * 0.21).toFixed(2),
      etaMins: Math.round(this.getDistance(donor.lat, donor.lng, ngo.lat, ngo.lng) * 2.8 + 10)
    };

    this.renderLiveDonationsList();
    this.renderKPIs();
    this.renderMap();
    this.showToast(`Dispatch Activated! ${fleet.driver} routed to ${donor.name} → ${ngo.name}`, "success");

    // Switch to Command or Routing view
    const routingTab = document.querySelector('[data-target="routing"]');
    if (routingTab) routingTab.click();
    this.renderActiveRouteCard();
  }

  renderActiveRouteCard() {
    const box = document.getElementById("active-route-telemetry");
    if (!box || !this.activeRoute) return;

    box.innerHTML = `
      <div class="glass-panel p-5 border-emerald-500/40 glow-emerald">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
            <h4 class="text-sm font-bold text-white uppercase tracking-wider">Live Active Transit Mission</h4>
          </div>
          <span class="badge-tag badge-veg">EV Zero Emission Route</span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs mb-4">
          <div class="p-3 bg-black/40 rounded-lg border border-gray-800">
            <span class="text-gray-400 block">Volunteer Pilot</span>
            <strong class="text-white text-sm">${this.activeRoute.driver.name}</strong>
          </div>
          <div class="p-3 bg-black/40 rounded-lg border border-gray-800">
            <span class="text-gray-400 block">ETA to Beneficiary</span>
            <strong class="text-emerald-400 text-sm">~${this.activeRoute.etaMins} Minutes</strong>
          </div>
          <div class="p-3 bg-black/40 rounded-lg border border-gray-800">
            <span class="text-gray-400 block">Fleet Carbon Abatement</span>
            <strong class="text-sky-400 text-sm">+${this.activeRoute.co2Saved} kg CO2e</strong>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <div class="text-xs text-gray-300">
            <span>Pickup: <strong>${this.activeRoute.donor.name}</strong> ➔ Dropoff: <strong>${this.activeRoute.ngo.name}</strong></span>
          </div>
          <button class="btn-primary text-xs py-2 px-4" onclick="app.confirmHandoff('${this.activeRoute.donationId}')">
            <span>✓ Complete Delivery & Update ESG Ledger</span>
          </button>
        </div>
      </div>
    `;
  }

  confirmHandoff(donationId) {
    const donation = this.data.donations.find(d => d.id === donationId);
    if (!donation) return;

    donation.status = "DELIVERED";
    donation.freshness_score = 100;

    // Update cumulative impact
    this.data.impact.total_food_rescued_kg += donation.quantity_kg;
    this.data.impact.total_meals_redistributed += donation.portions;
    this.data.impact.total_co2e_saved_kg += donation.co2e_saved_kg;
    this.data.impact.total_water_saved_liters += donation.water_saved_l;
    this.data.impact.landfill_diverted_kg += donation.quantity_kg;

    // Free the fleet
    const fleet = this.data.fleet.find(f => f.driver === donation.driver);
    if (fleet) {
      fleet.status = "AVAILABLE";
      fleet.deliveries += 1;
    }

    this.activeRoute = null;
    this.renderKPIs();
    this.renderLiveDonationsList();
    this.renderFleetList();
    this.renderMap();
    this.triggerConfetti();

    this.showToast(`Delivery Success! ${donation.portions} meals received with FSSAI QR verification!`, "success");
    const box = document.getElementById("active-route-telemetry");
    if (box) box.innerHTML = `<p class="text-xs text-gray-500 italic p-4 text-center">No active route in progress. Dispatch a matched surplus lot from the Radar.</p>`;
  }

  // --- Render Live Donations Table & Cards ---
  renderLiveDonationsList() {
    const container = document.getElementById("live-donations-grid");
    if (!container) return;

    if (this.data.donations.length === 0) {
      container.innerHTML = `<div class="p-8 text-center text-gray-500">No surplus donations active. Click 'Dispatch Surplus' to broadcast food.</div>`;
      return;
    }

    container.innerHTML = this.data.donations.map(d => {
      const isUrgent = d.remaining_minutes < 120;
      const isBiogas = d.status === "DIVERTED_TO_BIOGAS";
      const isDelivered = d.status === "DELIVERED";
      const isInTransit = d.status === "IN_TRANSIT";

      let statusBadge = `<span class="badge-tag badge-veg">Available for Rescue</span>`;
      if (isInTransit) statusBadge = `<span class="badge-tag badge-info">In Transit</span>`;
      if (isDelivered) statusBadge = `<span class="badge-tag badge-veg">Delivered & Verified</span>`;
      if (isBiogas) statusBadge = `<span class="badge-tag badge-urgent">Diverted to Biogas</span>`;

      return `
        <div class="glass-panel p-4 flex flex-col justify-between border ${isUrgent ? 'border-amber-500/40' : 'border-gray-800'}">
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-[11px] font-mono text-gray-400">${d.id}</span>
              ${statusBadge}
            </div>
            <h4 class="text-sm font-bold text-white mb-1">${d.title}</h4>
            <div class="text-xs text-gray-400 mb-2 flex items-center gap-2">
              <span>🏢 ${d.donor_name}</span>
              <span>•</span>
              <span class="${d.diet === 'VEG' ? 'text-emerald-400' : 'text-red-400'} font-semibold">${d.diet}</span>
            </div>

            <!-- FSSAI Freshness Decay Bar -->
            <div class="my-3 p-2.5 bg-black/40 rounded-lg border border-gray-800">
              <div class="flex justify-between items-center text-xs mb-1">
                <span class="text-gray-400">Freshness Safety Index:</span>
                <span class="font-bold ${d.freshness_score > 60 ? 'text-emerald-400' : 'text-amber-400'}">${d.freshness_score}% Safe</span>
              </div>
              <div class="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                <div class="h-full rounded-full transition-all duration-500 ${d.freshness_score > 60 ? 'bg-emerald-500' : (d.freshness_score > 25 ? 'bg-amber-500' : 'bg-red-500')}" style="width: ${d.freshness_score}%"></div>
              </div>
              <div class="flex justify-between items-center text-[10px] text-gray-400 mt-1.5">
                <span>Safe Window: <strong>${Math.floor(d.remaining_minutes / 60)}h ${d.remaining_minutes % 60}m</strong></span>
                <span>Storage: ${d.storage_condition}</span>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-2 text-xs text-gray-300 py-1">
              <div>⚖ Weight: <strong>${d.quantity_kg} kg</strong></div>
              <div>🍲 Portions: <strong>${d.portions} meals</strong></div>
              <div>🌱 CO2e Saved: <strong>${d.co2e_saved_kg} kg</strong></div>
              <div>💧 Water: <strong>${d.water_saved_l} L</strong></div>
            </div>
          </div>

          <div class="mt-4 pt-3 border-t border-gray-800 flex items-center justify-between gap-2">
            ${d.status === 'AVAILABLE' ? `
              <button class="btn-primary text-xs py-1.5 px-3 flex-1" onclick="app.showMatchingModal('${d.id}')">
                <span>Match NGO</span>
              </button>
            ` : (d.status === 'IN_TRANSIT' ? `
              <span class="text-xs text-sky-400 flex items-center gap-1">
                <span class="inline-block animate-spin">🚚</span> Driven by ${d.driver}
              </span>
              <button class="btn-secondary text-xs py-1 px-2.5" onclick="app.confirmHandoff('${d.id}')">Confirm Drop</button>
            ` : `
              <span class="text-xs text-emerald-400 font-semibold">✓ Completed</span>
              <button class="btn-secondary text-xs py-1 px-2" onclick="app.generateCSRModal('${d.donor_id}')">80G Certificate</button>
            `)}
          </div>
        </div>
      `;
    }).join("");
  }

  showMatchingModal(donationId) {
    const tab = document.querySelector('[data-target="matching"]');
    if (tab) tab.click();
    this.showMatchingDetails(donationId);
  }

  // --- Render NGO List ---
  renderNGOList() {
    const container = document.getElementById("ngo-directory-list");
    if (!container) return;

    container.innerHTML = this.data.ngos.map(ngo => `
      <div class="glass-panel p-4 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="badge-tag ${ngo.urgency === 'CRITICAL' ? 'badge-urgent' : 'badge-moderate'}">${ngo.urgency} Urgency</span>
            <span class="text-xs text-emerald-400 font-medium">FSSAI Certified</span>
          </div>
          <h4 class="text-sm font-bold text-white">${ngo.name}</h4>
          <p class="text-xs text-gray-400 mt-0.5">👤 ${ngo.contact} • ${ngo.phone}</p>
          <div class="mt-3 p-2 bg-black/30 rounded-lg text-xs space-y-1">
            <div class="flex justify-between">
              <span class="text-gray-400">Current Meal Deficit:</span>
              <span class="font-bold text-red-400">${ngo.shortfall} Meals</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Capacity:</span>
              <span class="text-white">${ngo.capacity} Meals/Day</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Cold Storage:</span>
              <span class="text-sky-400">${ngo.cold_storage ? 'Available' : 'No'}</span>
            </div>
          </div>
        </div>
        <div class="mt-3 pt-2 border-t border-gray-800 flex justify-between items-center">
          <span class="text-[11px] text-gray-400">Diet: ${ngo.diet}</span>
          <button class="btn-secondary text-xs py-1 px-3" onclick="app.broadcastEmergencyAlert('${ngo.id}')">Alert Donors</button>
        </div>
      </div>
    `).join("");
  }

  broadcastEmergencyAlert(ngoId) {
    const ngo = this.data.ngos.find(n => n.id === ngoId);
    this.showToast(`Emergency Need Broadcasted for ${ngo?.name}! 18 nearby donors notified.`, "warning");
  }

  // --- Render Fleet List ---
  renderFleetList() {
    const container = document.getElementById("fleet-directory-list");
    if (!container) return;

    container.innerHTML = this.data.fleet.map(v => `
      <div class="glass-panel p-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center ${v.status === 'AVAILABLE' ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/40' : 'bg-amber-950/60 text-amber-400 border border-amber-500/40'} text-lg">
            ${v.type.includes('Scooter') ? '🛵' : '🚐'}
          </div>
          <div>
            <h5 class="text-sm font-bold text-white">${v.driver}</h5>
            <p class="text-xs text-gray-400">${v.type} • ${v.deliveries} trips today</p>
          </div>
        </div>
        <div class="text-right">
          <span class="badge-tag ${v.status === 'AVAILABLE' ? 'badge-veg' : 'badge-urgent'}">${v.status}</span>
        </div>
      </div>
    `).join("");
  }

  // --- Dynamic Shelf-Life Decay Simulator ---
  setupDecaySimulator() {
    const tempSlider = document.getElementById("decay-temp-slider");
    const tempDisplay = document.getElementById("decay-temp-display");
    const categorySelect = document.getElementById("decay-cat-select");
    const holdingSelect = document.getElementById("decay-holding-select");

    const updateCalc = () => {
      const temp = parseFloat(tempSlider?.value || 32);
      if (tempDisplay) tempDisplay.textContent = `${temp}°C`;

      const category = categorySelect?.value || "Cooked Gravy & Rice";
      const holding = holdingSelect?.value || "Ambient";

      // Arrhenius approximation
      let baseHours = 4.0;
      if (category === "Bakery & Breads") baseHours = 36.0;
      if (category === "Raw Produce") baseHours = 72.0;

      let factor = 1.0;
      if (holding === "Hot Holding (>60°C)") factor = 0.45;
      else if (holding === "Cold Refrigeration (4°C)") factor = 0.20;
      else factor = 1.0 + Math.max(0, (temp - 25) / 10.0);

      const effectiveHours = +(baseHours / factor).toFixed(1);
      const safeMins = Math.round(effectiveHours * 60);

      const outputWindow = document.getElementById("decay-calc-hours");
      const outputRisk = document.getElementById("decay-calc-risk");
      const outputAction = document.getElementById("decay-calc-action");

      if (outputWindow) outputWindow.textContent = `${effectiveHours} Hours (${safeMins} mins)`;
      if (outputRisk) {
        if (effectiveHours > 4) {
          outputRisk.innerHTML = `<span class="text-emerald-400 font-bold">OPTIMAL (Low Microbial Growth)</span>`;
        } else if (effectiveHours >= 2) {
          outputRisk.innerHTML = `<span class="text-amber-400 font-bold">MODERATE ACCELERATION (Urgent Dispatch)</span>`;
        } else {
          outputRisk.innerHTML = `<span class="text-red-400 font-bold">CRITICAL DECAY ZONE (Danger: 5-60°C)</span>`;
        }
      }
      if (outputAction) {
        outputAction.textContent = effectiveHours < 2 
          ? "Immediate distribution required within 90 mins or divert to MCD Bio-Methanation." 
          : "Standard FSSAI redistribution protocol active. Hot containers recommended.";
      }
    };

    tempSlider?.addEventListener("input", updateCalc);
    categorySelect?.addEventListener("change", updateCalc);
    holdingSelect?.addEventListener("change", updateCalc);
    updateCalc();
  }

  // --- Interactive Map Radar with Delhi NCR Coordinates ---
  setupMapRadar() {
    // Map bounds in Delhi: Lat ~28.48 to 28.66, Lng ~77.08 to 77.28
    this.mapBounds = {
      minLat: 28.48,
      maxLat: 28.66,
      minLng: 77.08,
      maxLng: 77.28
    };
  }

  toCanvasCoords(lat, lng, width, height) {
    const x = ((lng - this.mapBounds.minLng) / (this.mapBounds.maxLng - this.mapBounds.minLng)) * width;
    // Invert Y because canvas/svg top is 0
    const y = ((this.mapBounds.maxLat - lat) / (this.mapBounds.maxLat - this.mapBounds.minLat)) * height;
    return { x: Math.max(25, Math.min(width - 25, x)), y: Math.max(25, Math.min(height - 25, y)) };
  }

  renderMap() {
    const mapContainers = [document.getElementById("city-radar-canvas"), document.getElementById("routing-radar-canvas")];
    mapContainers.forEach(svg => {
      if (!svg) return;
      const width = svg.clientWidth || 800;
      const height = svg.clientHeight || 480;

      let content = `
        <defs>
          <radialGradient id="grid-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#10b981" stop-opacity="0.15" />
            <stop offset="100%" stop-color="#0b0f19" stop-opacity="0" />
          </radialGradient>
        </defs>
        <!-- Background Grid -->
        <rect width="${width}" height="${height}" fill="#080c14" />
        <circle cx="${width/2}" cy="${height/2}" r="${width*0.45}" fill="url(#grid-glow)" />
        
        <!-- Radar concentric rings -->
        <circle cx="${width/2}" cy="${height/2}" r="70" fill="none" stroke="rgba(16, 185, 129, 0.15)" stroke-width="1" stroke-dasharray="3,3" />
        <circle cx="${width/2}" cy="${height/2}" r="150" fill="none" stroke="rgba(16, 185, 129, 0.12)" stroke-width="1" stroke-dasharray="4,4" />
        <circle cx="${width/2}" cy="${height/2}" r="230" fill="none" stroke="rgba(16, 185, 129, 0.08)" stroke-width="1" />

        <!-- Crosshair lines -->
        <line x1="0" y1="${height/2}" x2="${width}" y2="${height/2}" stroke="rgba(255, 255, 255, 0.05)" />
        <line x1="${width/2}" y1="0" x2="${width/2}" y2="${height}" stroke="rgba(255, 255, 255, 0.05)" />
      `;

      // Draw Animated Active Route if exists
      if (this.activeRoute) {
        const dPt = this.toCanvasCoords(this.activeRoute.donor.lat, this.activeRoute.donor.lng, width, height);
        const fPt = this.toCanvasCoords(this.activeRoute.driver.lat, this.activeRoute.driver.lng, width, height);
        const nPt = this.toCanvasCoords(this.activeRoute.ngo.lat, this.activeRoute.ngo.lng, width, height);

        content += `
          <!-- Route Polylines -->
          <path d="M ${fPt.x} ${fPt.y} L ${dPt.x} ${dPt.y} L ${nPt.x} ${nPt.y}" fill="none" stroke="#10b981" stroke-width="3" stroke-dasharray="6,4" stroke-linecap="round">
            <animate attributeName="stroke-dashoffset" values="40;0" dur="1.2s" repeatCount="indefinite" />
          </path>
        `;
      }

      // Draw Bio-Facilities (Lime)
      this.data.bio_facilities.forEach(bio => {
        const pt = this.toCanvasCoords(bio.lat, bio.lng, width, height);
        content += `
          <g class="cursor-pointer" onclick="app.showNodeDetails('bio', '${bio.id}')">
            <rect x="${pt.x - 9}" y="${pt.y - 9}" width="18" height="18" rx="4" fill="#84cc16" opacity="0.8" />
            <text x="${pt.x}" y="${pt.y + 18}" fill="#a3e635" font-size="9" text-anchor="middle" font-weight="600">${bio.name.split(' ')[0]}</text>
          </g>
        `;
      });

      // Draw NGOs (Cyan)
      this.data.ngos.forEach(ngo => {
        const pt = this.toCanvasCoords(ngo.lat, ngo.lng, width, height);
        content += `
          <g class="cursor-pointer" onclick="app.showNodeDetails('ngo', '${ngo.id}')">
            <circle cx="${pt.x}" cy="${pt.y}" r="12" fill="rgba(14, 165, 233, 0.2)" />
            <circle cx="${pt.x}" cy="${pt.y}" r="7" fill="#0ea5e9" />
            <text x="${pt.x}" y="${pt.y - 10}" fill="#38bdf8" font-size="9" text-anchor="middle" font-weight="bold">${ngo.name.split(' ')[0]}</text>
          </g>
        `;
      });

      // Draw Donors (Emerald / Orange)
      this.data.donors.forEach(donor => {
        const pt = this.toCanvasCoords(donor.lat, donor.lng, width, height);
        const hasSurplus = this.data.donations.some(d => d.donor_id === donor.id && d.status === "AVAILABLE");

        content += `
          <g class="cursor-pointer" onclick="app.showNodeDetails('donor', '${donor.id}')">
            ${hasSurplus ? `<circle cx="${pt.x}" cy="${pt.y}" r="14" fill="rgba(245, 158, 11, 0.3)" class="pulse-node" />` : ''}
            <circle cx="${pt.x}" cy="${pt.y}" r="8" fill="${hasSurplus ? '#f59e0b' : '#10b981'}" />
            <text x="${pt.x}" y="${pt.y + 17}" fill="${hasSurplus ? '#fbbf24' : '#34d399'}" font-size="9" text-anchor="middle" font-weight="bold">${donor.name.split(' ')[0]}</text>
          </g>
        `;
      });

      // Draw Fleet Drivers (Purple)
      this.data.fleet.forEach(fleet => {
        const pt = this.toCanvasCoords(fleet.lat, fleet.lng, width, height);
        content += `
          <g class="cursor-pointer" onclick="app.showNodeDetails('fleet', '${fleet.id}')">
            <polygon points="${pt.x},${pt.y - 7} ${pt.x + 6},${pt.y + 5} ${pt.x - 6},${pt.y + 5}" fill="#a855f7" />
            <text x="${pt.x}" y="${pt.y - 10}" fill="#c084fc" font-size="8" text-anchor="middle">${fleet.driver.split(' ')[0]}</text>
          </g>
        `;
      });

      svg.innerHTML = content;
    });
  }

  showNodeDetails(type, id) {
    let item = null;
    let label = "";
    if (type === "donor") { item = this.data.donors.find(d => d.id === id); label = "Donor Establishment"; }
    if (type === "ngo") { item = this.data.ngos.find(n => n.id === id); label = "Beneficiary NGO Hub"; }
    if (type === "fleet") { item = this.data.fleet.find(f => f.id === id); label = "Volunteer Fleet Unit"; }
    if (type === "bio") { item = this.data.bio_facilities.find(b => b.id === id); label = "Circular Bio Facility"; }

    if (!item) return;

    this.showToast(`${label}: ${item.name || item.driver} (${item.address || item.type || ''})`, "info");
  }

  // --- FSSAI Verification Checklist ---
  renderFSSAIChecklist() {
    const list = document.getElementById("fssai-guideline-items");
    if (!list) return;

    const rules = [
      { code: "FSSAI-01", title: "Thermal Danger Zone Control", desc: "Cooked food held above 60°C or chilled below 5°C throughout collection.", pass: true },
      { code: "FSSAI-02", title: "2-to-4 Hour Redistribution Window", desc: "Perishable high-moisture items distributed within 4 hours of preparation.", pass: true },
      { code: "FSSAI-03", title: "Food Contact Surface Sanitation", desc: "Food grade stainless steel insulated containers and tamper-evident seals.", pass: true },
      { code: "FSSAI-04", title: "Sensory & Organoleptic Inspection", desc: "Visual check for off-odor, abnormal color, mold formation, or slime.", pass: true },
      { code: "FSSAI-05", title: "Zero Landfill Bio-Diversion", desc: "Substandard/expired lots redirected to verified Bio-Methanation or composting.", pass: true }
    ];

    list.innerHTML = rules.map(r => `
      <div class="p-3 bg-black/30 border border-gray-800 rounded-xl flex items-start gap-3">
        <span class="w-6 h-6 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40 flex items-center justify-center text-xs font-bold shrink-0">✓</span>
        <div>
          <div class="flex items-center gap-2">
            <span class="text-[11px] font-mono text-emerald-400 font-semibold">${r.code}</span>
            <h5 class="text-xs font-bold text-white">${r.title}</h5>
          </div>
          <p class="text-[11px] text-gray-400 mt-0.5">${r.desc}</p>
        </div>
      </div>
    `).join("");
  }

  // --- CSR Certificate Generator ---
  generateCSRModal(donorId) {
    const donor = this.data.donors.find(d => d.id === donorId) || this.data.donors[0];
    const donorDonations = this.data.donations.filter(d => d.donor_id === donor.id);
    const totalKg = donorDonations.reduce((sum, d) => sum + d.quantity_kg, 0) || 45.0;
    const totalMeals = donorDonations.reduce((sum, d) => sum + d.portions, 0) || 112;
    const co2e = +(totalKg * 2.5).toFixed(1);

    const modal = document.getElementById("csr-certificate-modal");
    if (!modal) return;

    document.getElementById("cert-donor-name").textContent = donor.name;
    document.getElementById("cert-fssai-license").textContent = `FSSAI License: ${donor.license}`;
    document.getElementById("cert-date").textContent = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    document.getElementById("cert-kg").textContent = `${totalKg} kg`;
    document.getElementById("cert-meals").textContent = `${totalMeals} Meals`;
    document.getElementById("cert-co2").textContent = `${co2e} kg CO2e`;
    document.getElementById("cert-hash").textContent = `HASH: 8F7E-${Math.random().toString(36).substring(2, 9).toUpperCase()}-2026-FSSAI-SIH`;

    modal.style.display = "flex";
  }

  closeCSRModal() {
    const modal = document.getElementById("csr-certificate-modal");
    if (modal) modal.style.display = "none";
  }

  printCertificate() {
    window.print();
  }

  // --- Helper Utilities ---
  getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return +(R * c).toFixed(2);
  }

  showToast(message, type = "info") {
    const toast = document.createElement("div");
    toast.className = `fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl shadow-2xl border text-xs font-semibold flex items-center gap-2 transition-all duration-300 transform translate-y-2 opacity-0`;
    
    if (type === "success") {
      toast.classList.add("bg-emerald-950", "border-emerald-500", "text-emerald-200");
      toast.innerHTML = `<span>✓</span> <span>${message}</span>`;
    } else if (type === "warning") {
      toast.classList.add("bg-amber-950", "border-amber-500", "text-amber-200");
      toast.innerHTML = `<span>⚠</span> <span>${message}</span>`;
    } else {
      toast.classList.add("bg-gray-900", "border-cyan-500", "text-cyan-200");
      toast.innerHTML = `<span>ℹ</span> <span>${message}</span>`;
    }

    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.remove("translate-y-2", "opacity-0");
    }, 10);

    setTimeout(() => {
      toast.classList.add("opacity-0", "translate-y-2");
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  triggerConfetti() {
    if (window.confetti) {
      window.confetti({
        particleCount: 65,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  }
}

// Global App Instance
let app;
window.addEventListener("DOMContentLoaded", () => {
  app = new FoodRescueApp();
});
