"""
Unit tests for FoodRescue AI Demand Forecasting & Shelf-Life Engine
"""

import sys
import os
from datetime import datetime
sys.path.append(os.path.join(os.path.dirname(__file__), "..", "backend"))

from ml_engine import ml_engine
from mock_data import DONORS, NGOS, FLEET

def test_demand_forecast():
    """Verify that demand forecasting responds with valid covers and adjustments"""
    result = ml_engine.forecast_demand(
        establishment_type="Restaurant",
        day_of_week=3,
        weather="Rain",
        is_festival=False,
        planned_portions=300
    )
    assert "predicted_consumed_portions" in result
    assert "predicted_surplus_portions" in result
    assert result["predicted_consumed_portions"] > 0
    print("[PASS] Demand forecast test passed!")

def test_fssai_shelf_life():
    """Verify Arrhenius thermal decay calculation"""
    now_iso = datetime.now().isoformat()
    result = ml_engine.calculate_fssai_shelf_life(
        category="Cooked Gravy & Rice",
        prep_iso=now_iso,
        ambient_temp_c=32.0,
        storage_condition="Standard Hot Pan"
    )
    assert "remaining_minutes" in result
    assert "fssai_status" in result
    assert result["remaining_minutes"] > 0
    print("[PASS] FSSAI shelf-life test passed!")

def test_matching_algorithm():
    """Verify smart recipient matching heuristic"""
    sample_donation = {
        "id": "TEST-01",
        "title": "Fresh Cooked Meals",
        "category": "Cooked",
        "diet": "VEG",
        "quantity_kg": 20,
        "portions": 50,
        "lat": 28.5672,
        "lng": 77.2433
    }
    matches = ml_engine.match_best_recipient(sample_donation, NGOS)
    assert len(matches) > 0
    assert matches[0]["compatibility_score"] > 0
    print("[PASS] Matching algorithm test passed!")

if __name__ == "__main__":
    test_demand_forecast()
    test_fssai_shelf_life()
    test_matching_algorithm()
    print("\nAll unit tests passed successfully!")
