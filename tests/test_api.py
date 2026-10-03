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

def test_database_persistence_and_audit():
    """Verify SQLite persistent database insertions and audit logs"""
    from database import insert_donation, list_all_donations, log_audit_db, get_all_audit_logs
    test_id = insert_donation({
        "id": "TEST-DB-01",
        "title": "UnitTest Paneer Gravy",
        "category": "Cooked Meals",
        "quantity_kg": 15.0,
        "portions": 35,
        "temperature_c": 64.0
    })
    donations = list_all_donations()
    found = any(d["id"] == "TEST-DB-01" for d in donations)
    assert found, "Donation should be retrieved from SQLite"
    
    audit = log_audit_db("TEST-DB-01", "ACTOR-1", "Test Inspector", "admin", "Unit Test Audit", 64.0)
    assert "verification_hash" in audit
    logs = get_all_audit_logs()
    assert len(logs) > 0
    print("[PASS] Database persistence and FSSAI audit trail test passed!")

def test_jwt_auth_and_rbac():
    """Verify JWT token creation, signature verification, and payload decoding"""
    from auth import create_jwt_token, verify_jwt_token
    token = create_jwt_token({
        "sub": "U-TEST-01",
        "email": "test@foodrescue.ai",
        "role": "donor",
        "name": "Test Chef"
    })
    payload = verify_jwt_token(token)
    assert payload is not None, "Token verification failed"
    assert payload["sub"] == "U-TEST-01"
    assert payload["role"] == "donor"
    print("[PASS] JWT Authentication & Token Security test passed!")

def test_computer_vision_inference():
    """Verify computer vision volumetric analysis and spectral categorization"""
    from vision_engine import vision_engine
    result = vision_engine.analyze_image_bytes(
        image_data_b64="data:image/jpeg;base64,/9j/4AAQSkZJRg==",
        container_type="GN 1/1 (530x325x150mm)"
    )
    assert "detected_food" in result
    assert "calculated_weight_kg" in result
    assert "confidence_score" in result
    assert result["calculated_weight_kg"] > 0
    assert result["confidence_score"] > 0.85
    print("[PASS] Computer Vision Volumetric Engine test passed!")

if __name__ == "__main__":
    test_demand_forecast()
    test_fssai_shelf_life()
    test_matching_algorithm()
    test_database_persistence_and_audit()
    test_jwt_auth_and_rbac()
    test_computer_vision_inference()
    print("\nAll 6 enterprise unit tests passed successfully!")
