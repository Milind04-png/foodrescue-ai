"""
Persistent SQLite Database Engine for FoodRescue AI.
Provides ACID transactions, audit logs, and persistent state across restarts.
"""

import sqlite3
import os
import json
import uuid
import hashlib
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "foodrescue.db")

def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def hash_password(password: str, salt: str = "foodrescue_salt_2026") -> str:
    return hashlib.sha256(f"{password}:{salt}".encode("utf-8")).hexdigest()

def init_db():
    conn = get_connection()
    cursor = conn.cursor()

    # 1. Users & Stakeholders Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL,
        name TEXT NOT NULL,
        organization_name TEXT NOT NULL,
        fssai_license TEXT,
        phone TEXT,
        created_at TEXT NOT NULL
    )
    """)

    # 2. Donations Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS donations (
        id TEXT PRIMARY KEY,
        donor_id TEXT NOT NULL,
        donor_name TEXT NOT NULL,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        diet TEXT DEFAULT 'VEG',
        quantity_kg REAL NOT NULL,
        portions INTEGER NOT NULL,
        storage_condition TEXT,
        temperature_c REAL DEFAULT 65.0,
        expiry_minutes_remaining INTEGER DEFAULT 240,
        escalation_tier TEXT DEFAULT 'Tier 1: Flash Markdown',
        status TEXT DEFAULT 'Available',
        claimed_by_ngo_id TEXT,
        claimed_by_ngo_name TEXT,
        driver_id TEXT,
        driver_name TEXT,
        delivery_step INTEGER DEFAULT 1,
        otp_code TEXT,
        fssai_form_ix_hash TEXT,
        pickup_address TEXT,
        created_at TEXT NOT NULL
    )
    """)

    # 3. FSSAI & Good Samaritan Audit Logs Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS audit_logs (
        id TEXT PRIMARY KEY,
        donation_id TEXT,
        actor_id TEXT,
        actor_name TEXT,
        actor_role TEXT,
        action TEXT NOT NULL,
        temperature_logged REAL,
        legal_indemnity_ref TEXT,
        verification_hash TEXT NOT NULL,
        details TEXT,
        timestamp TEXT NOT NULL
    )
    """)

    # 4. ESG Impact Metrics Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS esg_metrics (
        id INTEGER PRIMARY KEY,
        food_rescued_kg REAL NOT NULL,
        meals_served INTEGER NOT NULL,
        co2e_saved_kg REAL NOT NULL,
        water_saved_liters REAL NOT NULL,
        landfill_diverted_kg REAL NOT NULL,
        biogas_kwh_generated REAL NOT NULL,
        updated_at TEXT NOT NULL
    )
    """)

    conn.commit()

    # Seed initial users if empty
    cursor.execute("SELECT COUNT(*) FROM users")
    if cursor.fetchone()[0] == 0:
        seed_users = [
            ("U-DONOR-1", "chef.iitd@foodrescue.ai", hash_password("iitdelhi123"), "donor", "Chef Rajesh Sharma", "IIT Delhi Main Mess & Dining", "10021011000452", "+91 98101 23456"),
            ("U-DONOR-2", "foodcourt@microsoft.cybercity.ai", hash_password("cybercity123"), "donor", "Priya Nair", "Microsoft Campus DLF CyberCity Food Court", "10020011000311", "+91 98200 56789"),
            ("U-NGO-1", "vikas@robinhoodarmy.org", hash_password("robinhood123"), "ngo", "Vikas Malhotra", "Robin Hood Army - Central Delhi Hub", "10019011000999", "+91 99100 11223"),
            ("U-NGO-2", "contact@feedingindia.org", hash_password("feedingindia123"), "ngo", "Sunita Rao", "Feeding India (Zomato Giving) South Hub", "10018011000888", "+91 98111 22334"),
            ("U-DELIVERY-1", "courier.amit@foodrescue.ai", hash_password("courier123"), "delivery", "Amit Kumar (EV Rider #4)", "Delhi Green EV Fleet Logistics", None, "+91 97100 88990"),
            ("U-ADMIN-1", "audit@fssai.gov.in", hash_password("admin123"), "admin", "Dr. Shalini Verma", "FSSAI ESG & Compliance Command Center", "GOV-FSSAI-001", "+91 11 2323 0000")
        ]
        now = datetime.now().isoformat()
        cursor.executemany("""
        INSERT INTO users (id, email, password_hash, role, name, organization_name, fssai_license, phone, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, [(u[0], u[1], u[2], u[3], u[4], u[5], u[6], u[7], now) for u in seed_users])
        conn.commit()

    # Seed initial ESG metrics if empty
    cursor.execute("SELECT COUNT(*) FROM esg_metrics")
    if cursor.fetchone()[0] == 0:
        cursor.execute("""
        INSERT INTO esg_metrics (id, food_rescued_kg, meals_served, co2e_saved_kg, water_saved_liters, landfill_diverted_kg, biogas_kwh_generated, updated_at)
        VALUES (1, 1845.0, 4612, 4612.5, 1845000.0, 1845.0, 320.0, ?)
        """, (datetime.now().isoformat(),))
        conn.commit()

    # Seed initial donations if empty
    cursor.execute("SELECT COUNT(*) FROM donations")
    if cursor.fetchone()[0] == 0:
        seed_donations = [
            (
                "BATCH-9021", "D1", "IIT Delhi Main Mess & Dining",
                "High-Protein Dal Makhani & Jeera Rice", "Cooked Meals", "VEG",
                18.5, 45, "Insulated Hot Box GN 1/1", 66.5, 235,
                "Tier 2: NGO Micro-Rescue", "Available", None, None, None, None, 1,
                "4821", "HASH-FSSAI-89A1", "Hauz Khas, South Delhi", datetime.now().isoformat()
            ),
            (
                "BATCH-9022", "D4", "Microsoft Campus DLF CyberCity Food Court",
                "Paneer Tikka Masala & Phulka Rotis", "Cooked Meals", "VEG",
                24.0, 60, "Stainless Thermal Gastronorm", 63.8, 110,
                "Tier 3: Biogas Re-routing", "Available", None, None, None, None, 1,
                "7734", "HASH-FSSAI-77B2", "DLF Cyber City Phase 2, Gurugram", datetime.now().isoformat()
            ),
            (
                "BATCH-9023", "D2", "The Grand Pavilion Banquet & Lawn",
                "Assorted Tandoori Breads & Naan", "Bakery", "VEG",
                12.0, 30, "Dry Insulated Bin", 28.0, 290,
                "Tier 1: Flash Markdown", "Available", None, None, None, None, 1,
                "5190", "HASH-FSSAI-33C3", "Ring Road, Lajpat Nagar", datetime.now().isoformat()
            )
        ]
        cursor.executemany("""
        INSERT INTO donations (
            id, donor_id, donor_name, title, category, diet, quantity_kg, portions,
            storage_condition, temperature_c, expiry_minutes_remaining, escalation_tier,
            status, claimed_by_ngo_id, claimed_by_ngo_name, driver_id, driver_name,
            delivery_step, otp_code, fssai_form_ix_hash, pickup_address, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, seed_donations)
        conn.commit()

    conn.close()

# --- Query Functions ---

def get_user_by_email(email: str):
    conn = get_connection()
    user = conn.execute("SELECT * FROM users WHERE email = ?", (email,)).fetchone()
    conn.close()
    return dict(user) if user else None

def get_user_by_id(user_id: str):
    conn = get_connection()
    user = conn.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
    conn.close()
    return dict(user) if user else None

def list_all_donations():
    conn = get_connection()
    rows = conn.execute("SELECT * FROM donations ORDER BY created_at DESC").fetchall()
    conn.close()
    return [dict(r) for r in rows]

def insert_donation(data: dict):
    conn = get_connection()
    cursor = conn.cursor()
    donation_id = data.get("id") or f"BATCH-{uuid.uuid4().hex[:6].upper()}"
    now = datetime.now().isoformat()
    cursor.execute("""
    INSERT INTO donations (
        id, donor_id, donor_name, title, category, diet, quantity_kg, portions,
        storage_condition, temperature_c, expiry_minutes_remaining, escalation_tier,
        status, otp_code, fssai_form_ix_hash, pickup_address, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        donation_id,
        data.get("donor_id", "D1"),
        data.get("donor_name", "IIT Delhi Main Mess"),
        data["title"],
        data.get("category", "Cooked Meals"),
        data.get("diet", "VEG"),
        float(data.get("quantity_kg", 10.0)),
        int(data.get("portions", 25)),
        data.get("storage_condition", "Insulated Hot Box"),
        float(data.get("temperature_c", 65.0)),
        int(data.get("expiry_minutes_remaining", 240)),
        data.get("escalation_tier", "Tier 1: Flash Markdown"),
        "Available",
        str(uuid.uuid4().int)[:4],
        f"HASH-FSSAI-{uuid.uuid4().hex[:8].upper()}",
        data.get("pickup_address", "Campus Dining Gate #3"),
        now
    ))
    conn.commit()
    conn.close()
    return donation_id

def claim_donation_db(donation_id: str, ngo_id: str, ngo_name: str, driver_id: str = "VOL-4", driver_name: str = "Amit Kumar (EV Rider #4)"):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
    UPDATE donations
    SET status = 'Claimed', claimed_by_ngo_id = ?, claimed_by_ngo_name = ?, driver_id = ?, driver_name = ?
    WHERE id = ?
    """, (ngo_id, ngo_name, driver_id, driver_name, donation_id))
    conn.commit()
    conn.close()

def advance_delivery_db(donation_id: str):
    conn = get_connection()
    cursor = conn.cursor()
    row = cursor.execute("SELECT delivery_step, quantity_kg, portions FROM donations WHERE id = ?", (donation_id,)).fetchone()
    if not row:
        conn.close()
        return None
    
    current_step = row["delivery_step"]
    new_step = current_step + 1
    new_status = "In Transit" if new_step == 2 else "Delivered"

    cursor.execute("""
    UPDATE donations
    SET delivery_step = ?, status = ?
    WHERE id = ?
    """, (new_step, new_status, donation_id))

    if new_status == "Delivered":
        # Increment ESG metrics
        kg = row["quantity_kg"]
        portions = row["portions"]
        cursor.execute("""
        UPDATE esg_metrics
        SET food_rescued_kg = food_rescued_kg + ?,
            meals_served = meals_served + ?,
            co2e_saved_kg = co2e_saved_kg + ?,
            water_saved_liters = water_saved_liters + ?,
            landfill_diverted_kg = landfill_diverted_kg + ?,
            updated_at = ?
        WHERE id = 1
        """, (kg, portions, round(kg * 2.5, 2), round(kg * 1000.0, 1), kg, datetime.now().isoformat()))

    conn.commit()
    conn.close()
    return {"step": new_step, "status": new_status}

def divert_to_biogas_db(donation_id: str):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
    UPDATE donations
    SET status = 'Diverted to Biogas', escalation_tier = 'Tier 3: Biogas Re-routing'
    WHERE id = ?
    """, (donation_id,))
    cursor.execute("""
    UPDATE esg_metrics
    SET biogas_kwh_generated = biogas_kwh_generated + 45.0,
        landfill_diverted_kg = landfill_diverted_kg + 15.0,
        co2e_saved_kg = co2e_saved_kg + 37.5,
        updated_at = ?
    WHERE id = 1
    """, (datetime.now().isoformat(),))
    conn.commit()
    conn.close()

def log_audit_db(donation_id: str, actor_id: str, actor_name: str, actor_role: str, action: str, temp: float, details: str = ""):
    conn = get_connection()
    cursor = conn.cursor()
    audit_id = f"AUDIT-{uuid.uuid4().hex[:8].upper()}"
    verification_hash = f"SHA256-{hashlib.sha256(f'{audit_id}:{action}:{temp}:{datetime.now().isoformat()}'.encode()).hexdigest()[:16]}"
    legal_indemnity_ref = "FSSAI-SEC-31-GOOD-SAMARITAN-INDEMNITY"
    now = datetime.now().isoformat()

    cursor.execute("""
    INSERT INTO audit_logs (id, donation_id, actor_id, actor_name, actor_role, action, temperature_logged, legal_indemnity_ref, verification_hash, details, timestamp)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (audit_id, donation_id, actor_id, actor_name, actor_role, action, temp, legal_indemnity_ref, verification_hash, details, now))
    conn.commit()
    conn.close()
    return {"audit_id": audit_id, "verification_hash": verification_hash}

def get_all_audit_logs():
    conn = get_connection()
    rows = conn.execute("SELECT * FROM audit_logs ORDER BY timestamp DESC LIMIT 50").fetchall()
    conn.close()
    return [dict(r) for r in rows]

def get_current_esg_metrics():
    conn = get_connection()
    row = conn.execute("SELECT * FROM esg_metrics WHERE id = 1").fetchone()
    conn.close()
    return dict(row) if row else {
        "food_rescued_kg": 1845.0,
        "meals_served": 4612,
        "co2e_saved_kg": 4612.5,
        "water_saved_liters": 1845000.0,
        "landfill_diverted_kg": 1845.0,
        "biogas_kwh_generated": 320.0
    }

# Automatically initialize database tables on import
init_db()
