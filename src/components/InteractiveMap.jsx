import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  Navigation,
  Battery,
  Thermometer,
  ShieldAlert,
  Zap,
  Radio,
  Send,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

// Standard Node Coordinates in Delhi NCR
const MAP_NODES = {
  iitd: { name: 'IIT Delhi Main Dining Hall', lat: 28.5450, lng: 77.1926, role: 'donor', tag: 'Donor Hub' },
  cybercity: { name: 'Microsoft CyberCity Cafeteria', lat: 28.4986, lng: 77.0894, role: 'donor', tag: 'Donor Hub' },
  rha: { name: 'Robin Hood Army Central Hub', lat: 28.6289, lng: 77.2285, role: 'ngo', tag: 'Relief Partner' },
  feedingIndia: { name: 'Feeding India South Hub', lat: 28.5494, lng: 77.2582, role: 'ngo', tag: 'Relief Partner' },
  biogas: { name: 'MCD Okhla Bio-Methanation Unit', lat: 28.5300, lng: 77.2750, role: 'biogas', tag: 'Circular Energy' },
  courier: { name: 'EV Rider #4 (Amit Kumar)', lat: 28.5700, lng: 77.2150, role: 'courier', tag: 'EV Volunteer' },
};

export default function InteractiveMap() {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const circleRef = useRef(null);
  const polylineRef = useRef(null);
  const courierMarkerRef = useRef(null);

  const { showToast } = useApp();
  const [trafficMode, setTrafficMode] = useState('green'); // 'green' | 'peak'
  const [activeGeofence, setActiveGeofence] = useState('iitd');
  const [courierTelemetry, setCourierTelemetry] = useState({
    speedKmh: 28,
    batteryPct: 82,
    cargoTempC: 64.8,
    etaMinutes: 11,
  });
  const [whatsAppDispatched, setWhatsAppDispatched] = useState(false);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize Leaflet map instance
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [28.5600, 77.2100],
        zoom: 12,
        zoomControl: false,
      });

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // Clean OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(map);

      // Custom SVG Pin Icon generator
      const createCustomIcon = (color, emoji) =>
        L.divIcon({
          className: 'custom-leaflet-icon',
          html: `<div style="background-color:${color}; width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 12px rgba(0,0,0,0.3); border:2px solid white; font-size:14px; font-weight:bold;">${emoji}</div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        });

      // Place node markers
      Object.entries(MAP_NODES).forEach(([key, node]) => {
        let icon;
        if (node.role === 'donor') icon = createCustomIcon('#0F766E', '🏢');
        else if (node.role === 'ngo') icon = createCustomIcon('#10B981', '🤝');
        else if (node.role === 'biogas') icon = createCustomIcon('#F59E0B', '⚡');
        else icon = createCustomIcon('#0284C7', '🛵');

        const marker = L.marker([node.lat, node.lng], { icon }).addTo(map);
        marker.bindPopup(`
          <div style="font-family:sans-serif; padding:4px;">
            <strong style="color:#0F172A; font-size:13px;">${node.name}</strong>
            <div style="font-size:11px; color:#64748B; margin-top:2px;">${node.tag}</div>
          </div>
        `);

        if (key === 'courier') {
          courierMarkerRef.current = marker;
        }
      });

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Render 5 km Geofence circle around active donor
    const targetNode = MAP_NODES[activeGeofence];
    if (circleRef.current) {
      map.removeLayer(circleRef.current);
    }

    const geofenceCircle = L.circle([targetNode.lat, targetNode.lng], {
      radius: 5000, // 5 km micro-logistics radius
      color: '#059669',
      fillColor: '#10B981',
      fillOpacity: 0.12,
      weight: 2,
      dashArray: '6, 6',
    }).addTo(map);

    geofenceCircle.bindTooltip('5 km Hyperlocal Rescue Geofence', { permanent: false, direction: 'top' });
    circleRef.current = geofenceCircle;

    // Route Polyline
    if (polylineRef.current) {
      map.removeLayer(polylineRef.current);
    }

    const routeCoords = [
      [targetNode.lat, targetNode.lng],
      [MAP_NODES.courier.lat, MAP_NODES.courier.lng],
      [MAP_NODES.rha.lat, MAP_NODES.rha.lng],
    ];

    const routeColor = trafficMode === 'green' ? '#10B981' : '#F59E0B';
    const polyline = L.polyline(routeCoords, {
      color: routeColor,
      weight: 5,
      opacity: 0.85,
      dashArray: trafficMode === 'green' ? null : '10, 10',
    }).addTo(map);

    polylineRef.current = polyline;

    return () => {
      // Keep map intact during state toggle
    };
  }, [activeGeofence, trafficMode]);

  const handleSimulateWhatsAppDispatch = () => {
    setWhatsAppDispatched(true);
    showToast(
      'WhatsApp Cloud API Alert Triggered!',
      'Broadcast sent to 8 registered volunteer couriers within 5 km geofence with 1-click claim button & live GPS directions.',
      'success'
    );
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
      {/* Map Control Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 bg-slate-50/60">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <h3 className="font-bold text-slate-900 text-sm">
              Live Geospatial Micro-Logistics Engine (Delhi NCR)
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real OpenStreetMap cartography · 5,000m geofence enforcement · Live EV telematics
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Geofence Origin Selector */}
          <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-2xs">
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={activeGeofence}
              onChange={(e) => setActiveGeofence(e.target.value)}
              className="bg-transparent outline-none cursor-pointer text-xs"
            >
              <option value="iitd">Geofence: IIT Delhi (South)</option>
              <option value="cybercity">Geofence: CyberCity (Gurugram)</option>
            </select>
          </div>

          {/* Traffic Routing Mode */}
          <div className="flex items-center bg-slate-200/80 p-0.5 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setTrafficMode('green')}
              className={`px-3 py-1 rounded-lg transition-all ${
                trafficMode === 'green'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🌱 Green Corridor
            </button>
            <button
              onClick={() => setTrafficMode('peak')}
              className={`px-3 py-1 rounded-lg transition-all ${
                trafficMode === 'peak'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ⚠️ Peak Congestion
            </button>
          </div>
        </div>
      </div>

      {/* Map Viewport */}
      <div className="relative">
        <div ref={mapContainerRef} className="w-full h-80 sm:h-96 z-0" />

        {/* Live EV Telematics Overlay Box */}
        <div className="absolute top-4 left-4 z-10 bg-slate-900/90 text-white backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-slate-700 max-w-xs text-xs space-y-2.5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-bold flex items-center gap-1.5 text-emerald-400">
              <Zap className="w-4 h-4 text-emerald-400" /> EV Cargo Rider #4
            </span>
            <span className="bg-emerald-950 text-emerald-300 font-mono text-[10px] px-1.5 py-0.5 rounded border border-emerald-500/30">
              ACTIVE DISPATCH
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 font-mono">
            <div>
              <span className="text-[10px] text-slate-400 block">SPEED</span>
              <strong className="text-white text-xs">{courierTelemetry.speedKmh} km/h</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">BATTERY (SOC)</span>
              <strong className="text-emerald-400 text-xs flex items-center gap-1">
                <Battery className="w-3.5 h-3.5" /> {courierTelemetry.batteryPct}%
              </strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">PAYLOAD CORE TEMP</span>
              <strong className="text-amber-400 text-xs flex items-center gap-1">
                <Thermometer className="w-3.5 h-3.5" /> {courierTelemetry.cargoTempC}°C
              </strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">EST. ARRIVAL</span>
              <strong className="text-sky-400 text-xs">{courierTelemetry.etaMinutes} mins</strong>
            </div>
          </div>
        </div>

        {/* WhatsApp Cloud Dispatch Trigger */}
        <div className="absolute bottom-4 left-4 z-10">
          <button
            onClick={handleSimulateWhatsAppDispatch}
            disabled={whatsAppDispatched}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold shadow-lg transition-all ${
              whatsAppDispatched
                ? 'bg-emerald-900/90 text-emerald-200 border border-emerald-700'
                : 'bg-emerald-500 hover:bg-emerald-600 text-white'
            }`}
          >
            {whatsAppDispatched ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>WhatsApp 5 km Broadcast Sent (8 Couriers)</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Simulate WhatsApp 5 km Micro-Dispatch</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
