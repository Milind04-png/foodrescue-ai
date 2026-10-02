# FoodRescue AI - Frontend Platform
> **Tagline:** Predict · Rescue · Redistribute · Sustain  
> **Team:** TECH TITANS

Modern, enterprise-grade web application for B2B & institutional surplus food management (IIT Delhi, corporate tech parks, banquet halls, and hotels).

---

## 📦 What's Inside This Frontend Package

1. **Modern React 19 + Vite + Tailwind CSS v4** (`src/`, `index.html`, `vite.config.js`)
   - **Multi-Role Command Switcher**: Switch seamlessly between 5 stakeholders:
     - 🏢 **Food Donor**: Fast-listing form, AI container recognition, dynamic 3-tier escalation (Flash Markdown 70% off $\rightarrow$ NGO Micro-Rescue within 5 km $\rightarrow$ Biogas diversion), AI demand forecast chart with context factor toggles, and FSSAI CSV compliance export.
     - 🤝 **NGO Portal**: Geofenced 5 km micro-logistics surplus feed, ticking shelf-life countdown badges, portion counters, and 1-click instant claim reservation.
     - 🚚 **Delivery Fleet**: Interactive route map with Green Corridor / peak congestion mode, EV battery telematics, and 3-step custody verification (Core Temp $\rightarrow$ QR Scan $\rightarrow$ Drop-off OTP).
     - 📊 **Command Center**: UN SDG 2, 12, 13 ESG impact analytics, Section 80G CSR tax exemption certificate generator, and Institutional Waste Prevention Leaderboard.
     - 🌐 **Platform Overview**: Interactive institutional pipeline, FAQ guide, and live status.
   - **FSSAI Digital Safety & Handover Gate**: Core probe temperature validation ($>60^\circ\text{C}$ hot, $<7^\circ\text{C}$ cold), Dual-Key QR/OTP custody handshake, and printable Form-IX e-Handover slip with Good Samaritan liability indemnity.
   - **AI Vision Scanner**: Gastronorm pan volumetric estimator (GN 1/1, Cauldrons, Insulated Hot Boxes).
   - **Micro-Interactions**: Web Audio synthesizer chimes and confetti animations.

2. **Pre-Built Production Bundle** (`dist/`)
   - Fully compiled, minified HTML/CSS/JS ready for instant deployment on Vercel, Netlify, Cloudflare Pages, AWS S3, or any static hosting server without requiring Node.js.

3. **Standalone Single-Page Edition** (`frontend/`)
   - Zero-dependency vanilla HTML5/CSS3/ES6 edition for lightweight browser testing.

---

## 🚀 Quick Start (Development Mode)

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- npm (comes with Node.js)

### Installation & Run

1. Open a terminal inside this folder:
   ```bash
   cd foodrescue-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```
   Open your browser at: **`http://localhost:5173`**

4. **Windows One-Click Launcher**:
   Simply double-click **`run_frontend.bat`**.

---

## 🛠️ Production Build & Static Serving

### Build fresh bundle
```bash
npm run build
```
This generates the optimized bundle in `./dist`.

### Preview locally
```bash
npm run preview
```

### Serve pre-built `dist/` directly
```bash
npx serve dist -p 5000
```

---

## ⚙️ Environment Configuration

Copy `.env.example` to `.env` if you want to connect to a custom backend URL:
```env
VITE_API_URL=http://127.0.0.1:8000
```
By default, the frontend includes a rich in-memory reactive state with ticking timers and simulated AI models so it works immediately out-of-the-box!
