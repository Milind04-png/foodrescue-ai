# 🥗 FoodRescue AI — Smart Food Waste Reduction & Sustainable Redistribution Ecosystem

> **AI-Powered Food Waste Reduction & Sustainable Redistribution Ecosystem**  
> **Tagline**: *Save Food · Feed People · Build a Sustainable Tomorrow*  
> **Team Name**: `TECH TITANS`  
> **Team Members**: Arman Chauhan, Anshika Tyagi, Dimple, Ishita Batra, Naman Khatri, Milind Shukla  

---

## 🌟 Executive Summary & Problem Context

In India, approximately **68+ million tonnes** of edible food is wasted annually across banquet halls, 5-star hotel buffets, restaurant kitchens, corporate cafeterias, and wedding catering events—even while millions experience daily nutritional insecurity.

Traditional food donation apps suffer from three critical bottlenecks:
1. **Purely Reactive**: They wait until food has already spoiled or is about to spoil before alerting charities.
2. **Ignorance of Food Safety (FSSAI)**: Perishable cooked gravies in Indian ambient temperatures (30°C–42°C) develop microbial contamination rapidly; without thermal and timestamp tracking, donated food risks causing food poisoning.
3. **Suboptimal Redistribution Logistics**: Donations are matched solely on raw distance without accounting for recipient capacity, emergency hunger shortfall, dietary restrictions (pure veg vs non-veg), or cold-chain availability.

**FoodRescue AI** introduces a **Predict ➔ Rescue ➔ Redistribute ➔ Measure** closed loop that prevents food waste before it is cooked, accelerates rescue before bacterial decay, routes multi-waypoint EV fleets, and diverts substandard batches to municipal bio-methanation plants for **100% Zero-Landfill Waste**.

---

## 🏗️ Architecture & 7-Stage Technical Approach

As specified in the technical approach blueprint:

```
[1. Data Layer] ➔ [2. AI Demand Prediction] ➔ [3. Surplus Detection] ➔ [4. Smart Matching] 
       ➔ [5. Route Optimization] ➔ [6. Food Safety Module] ➔ [7. Analytics & Impact Tracking]
```

| Module | Core Functionality | Algorithms / Tech |
| :--- | :--- | :--- |
| **1. Data Layer** | Consolidates consumption logs, weather APIs, banquet bookings, festival calendars. | REST APIs, JSON Datastores |
| **2. AI Demand Engine** | Predicts footfall and overproduction risk based on weather (monsoon, heatwave) and events. | **Scikit-learn (RandomForestRegressor)** |
| **3. Surplus Detection** | Detects volume, mass, thermal status, and portion yield. | Simulated Computer Vision AI & Rapid Lister |
| **4. Smart Matching** | Multi-objective match ranking: $\text{Score} = 0.35P + 0.30U + 0.20C + 0.15D$ | Weighted Proximity & Hunger-Deficit Heuristic |
| **5. Route Optimization** | Calculates shortest travel duration, EV volunteer dispatch, and route CO2 abated. | Dijkstra / TSP Waypoint Routing |
| **6. Food Safety Module** | Arrhenius microbial decay countdown, FSSAI HACCP checklist, thermal danger zone tracking. | Dynamic Shelf-Life Decay Engine |
| **7. Analytics & ESG** | Live kg rescued, meals served, CO2e averted, and verifiable Section 80G CSR certificates. | Provable SDG 2, 12, 13 Ledger |

---

## 🚀 Unique Winning Innovations Added by TECH TITANS

1. **Pre-Cooking AI Kitchen Advisor**:
   - Rather than just redistributing leftovers, our ML engine analyzes weather forecasts (e.g. monsoon waterlogging in Delhi causing a 28% dine-in drop) and suggests batch cooking adjustments to stop overproduction before cooking.
2. **FSSAI Microbial Thermal Decay Countdown**:
   - Dynamically calculates the bacterial danger zone (5°C to 60°C). High-moisture cooked dairy (paneer gravies) have a 3.5-hour safe limit at 32°C ambient, whereas cold-stored items last longer. Real-time visual countdown shows minutes remaining.
3. **Simulated Computer Vision AI Food Scanner**:
   - Click "AI Vision Scan" to simulate camera recognition of food contours, steam, volume mass, and automatic FSSAI Grade classification.
4. **100% Zero-Landfill Circular Economy Fail-Safe**:
   - If a batch exceeds the safe human consumption threshold, the system **never** dumps it in landfills! It automatically triggers a diversion route to the **MCD Okhla Bio-Methanation & Clean Biogas Unit** or **Pusa Vermicompost Facility**.
5. **Automated Section 80G CSR Tax Certificates**:
   - Incentivizes luxury hotels (Taj, Marriott, Haldirams) by generating verified CSR impact certificates with cryptographic hashes for corporate audit and tax exemption.

---

## 💻 How to Run the Prototype

### Method 1: Modern React Development Server with Hot-Reload (Recommended)
```bash
# Navigate to the folder
cd C:\Users\milin\.gemini\antigravity\scratch\foodrescue-ai

# Start the Vite React development server
npm run dev
```
Then open your browser at:
👉 **`http://127.0.0.1:5173`**

### Method 2: One-Click Windows Launcher
Double-click `run.bat` in this directory:
```bat
run.bat
```
Then open your browser at:
👉 **`http://127.0.0.1:8000`**

### Method 3: Python FastAPI Engine & Static Server
```bash
cd C:\Users\milin\.gemini\antigravity\scratch\foodrescue-ai
python backend/main.py
```

---

## 🎤 3-Minute Platform Demo & Walkthrough Script

* **0:00 - 0:45 (The Problem & The Hook)**:  
  *"In India, weddings and restaurants discard 68 million tonnes of food each year while millions go hungry. Traditional apps are passive—they wait until food is cold and rotting before asking for volunteers. TECH TITANS presents FoodRescue AI: an end-to-end ecosystem that turns food rescue from a reactive scramble into a proactive science."*

* **0:45 - 1:40 (Live Demo & Donor AI)**:  
  *(Show Donor Portal)* *"Look at our AI Demand Forecaster powered by Scikit-Learn. Before a banquet starts cooking in Delhi during monsoon rain, our model detects a 28% footfall drop and warns the chef to scale down batch cooking. For remaining surplus, our Computer Vision scanner assesses portion volume and starts our FSSAI Thermal Decay Timer."*

* **1:40 - 2:20 (Smart Match & Live City Radar)**:  
  *(Show City Radar & Matching)* *"Instead of matching blindly by distance, our Hyperlocal Algorithm balances recipient hunger deficit, urgency, and dietary preferences. Watch as we 1-click dispatch an electric cargo scooter: the live map animates the route, computes ETA, and calculates kilograms of CO2 abated."*

* **2:20 - 3:00 (FSSAI Safety, Circular Zero-Waste & CSR)**:  
  *(Show FSSAI Guard & CSR Modal)* *"What if food spoils? Under our zero-landfill guarantee, expired batches route automatically to MCD Bio-Methanation for clean electricity. And participating hotels receive verified Section 80G CSR certificates. FoodRescue AI achieves SDG 2 Zero Hunger, SDG 12 Responsible Consumption, and SDG 13 Climate Action. Thank you!"*
