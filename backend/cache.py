"""
Hot In-Memory & Redis Cache Layer for FoodRescue AI.
Handles ephemeral high-frequency telematics (EV GPS coordinates, countdown TTLs, and claim locks)
to prevent database disk thrashing and table bloat.
"""

import time
import os
import threading
from typing import Optional, Dict, Any

class EphemeralCache:
    def __init__(self):
        self._lock = threading.Lock()
        self._store: Dict[str, Dict[str, Any]] = {}
        self._fleet_telematics: Dict[str, Dict[str, Any]] = {}

    def set_with_ttl(self, key: str, value: Any, ttl_seconds: int = 7200):
        """Sets a key with a specific Time-To-Live (TTL)."""
        expiry = time.time() + ttl_seconds
        with self._lock:
            self._store[key] = {
                "value": value,
                "expires_at": expiry
            }

    def get(self, key: str) -> Optional[Any]:
        """Gets a value if not expired."""
        with self._lock:
            entry = self._store.get(key)
            if not entry:
                return None
            if time.time() > entry["expires_at"]:
                del self._store[key]
                return None
            return entry["value"]

    def delete(self, key: str):
        with self._lock:
            self._store.pop(key, None)

    def update_vehicle_gps(self, vehicle_id: str, lat: float, lng: float, speed_kmh: float, battery_soc: int, cargo_temp: float):
        """High-frequency GPS telematics update without touching relational disk storage."""
        with self._lock:
            self._fleet_telematics[vehicle_id] = {
                "vehicle_id": vehicle_id,
                "lat": lat,
                "lng": lng,
                "speed_kmh": speed_kmh,
                "battery_soc": battery_soc,
                "cargo_temp": cargo_temp,
                "timestamp": time.time()
            }

    def get_fleet_telematics(self) -> Dict[str, Any]:
        with self._lock:
            return dict(self._fleet_telematics)

# Global Cache Instance
cache = EphemeralCache()

# Seed active EV Rider telematics in hot cache
cache.update_vehicle_gps("VOL-4", 28.5700, 77.2150, 28.4, 82, 64.8)
cache.update_vehicle_gps("VOL-2", 28.5350, 77.2050, 31.0, 74, 65.2)
