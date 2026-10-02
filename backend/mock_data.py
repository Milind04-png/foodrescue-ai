"""
Realistic mock datasets for FoodRescue AI Ecosystem.
Configured for Indian metropolitan context (Restaurants, Hotels, Banquets, NGOs, Fleets).
"""

DONORS = [
    {
        "id": "D1",
        "name": "The Grand Pavilion Banquet & Lawn",
        "category": "Banquet / Wedding Hall",
        "contact": "+91 98101 23456",
        "address": "Ring Road, Lajpat Nagar, New Delhi",
        "lat": 28.5672,
        "lng": 77.2433,
        "fssai_license": "10021011000452",
        "rating": 4.9,
        "typical_waste_kg": 45.0,
        "preferred_pickup_window": "22:30 - 01:00"
    },
    {
        "id": "D2",
        "name": "Spice Route Fine Dine (Taj Hotel)",
        "category": "5-Star Hotel & Buffet",
        "contact": "+91 98112 34567",
        "address": "Mansingh Road, Central Delhi",
        "lat": 28.6052,
        "lng": 77.2250,
        "fssai_license": "10018011000984",
        "rating": 4.8,
        "typical_waste_kg": 28.0,
        "preferred_pickup_window": "15:30 - 17:00, 22:45 - 23:45"
    },
    {
        "id": "D3",
        "name": "Haldiram's Sweets & Quick Dine",
        "category": "Restaurant / Sweet Shop",
        "contact": "+91 98188 45678",
        "address": "Connaught Place Block B, New Delhi",
        "lat": 28.6315,
        "lng": 77.2167,
        "fssai_license": "10019011000673",
        "rating": 4.7,
        "typical_waste_kg": 18.0,
        "preferred_pickup_window": "21:30 - 23:00"
    },
    {
        "id": "D4",
        "name": "Tech Mahindra Cyber Hub Cafeteria",
        "category": "Corporate Canteen",
        "contact": "+91 98200 56789",
        "address": "DLF Cyber City Phase 2, Gurugram / Delhi Border",
        "lat": 28.4986,
        "lng": 77.0894,
        "fssai_license": "10020011000311",
        "rating": 4.6,
        "typical_waste_kg": 35.0,
        "preferred_pickup_window": "14:30 - 16:00, 21:00 - 22:30"
    },
    {
        "id": "D5",
        "name": "Green Valley Gourmet & Bakery",
        "category": "Bakery & Packaged Goods",
        "contact": "+91 98311 67890",
        "address": "Khan Market, New Delhi",
        "lat": 28.6001,
        "lng": 77.2275,
        "fssai_license": "10022011000182",
        "rating": 4.9,
        "typical_waste_kg": 12.0,
        "preferred_pickup_window": "20:00 - 21:30"
    }
]

NGOS = [
    {
        "id": "NGO1",
        "name": "Robin Hood Army - Central Delhi Hub",
        "contact_person": "Vikas Malhotra",
        "phone": "+91 99100 11223",
        "address": "Barakhamba Road, Connaught Place",
        "lat": 28.6289,
        "lng": 77.2285,
        "capacity_meals": 350,
        "active_volunteers": 24,
        "accepted_diet": "ALL",
        "has_cold_storage": True,
        "verified_fssai": True,
        "urgency_level": "HIGH",
        "current_shortfall_meals": 180
    },
    {
        "id": "NGO2",
        "name": "Delhi Roti Bank Foundation",
        "contact_person": "Sunita Devi",
        "phone": "+91 98109 88776",
        "address": "Lodhi Colony Community Center",
        "lat": 28.5855,
        "lng": 77.2215,
        "capacity_meals": 500,
        "active_volunteers": 35,
        "accepted_diet": "VEG_ONLY",
        "has_cold_storage": True,
        "verified_fssai": True,
        "urgency_level": "CRITICAL",
        "current_shortfall_meals": 320
    },
    {
        "id": "NGO3",
        "name": "Feeding India Zomato Shelter Hub",
        "contact_person": "Rahul Sen",
        "phone": "+91 98711 22334",
        "address": "INA Colony, Near Metro Gate 2",
        "lat": 28.5744,
        "lng": 77.2119,
        "capacity_meals": 250,
        "active_volunteers": 18,
        "accepted_diet": "ALL",
        "has_cold_storage": True,
        "verified_fssai": True,
        "urgency_level": "MEDIUM",
        "current_shortfall_meals": 90
    },
    {
        "id": "NGO4",
        "name": "Snehalaya Children Care & Kitchen",
        "contact_person": "Sister Mary",
        "phone": "+91 98118 77665",
        "address": "Jungpura B, Near Nizamuddin",
        "lat": 28.5822,
        "lng": 77.2448,
        "capacity_meals": 150,
        "active_volunteers": 12,
        "accepted_diet": "ALL",
        "has_cold_storage": False,
        "verified_fssai": True,
        "urgency_level": "HIGH",
        "current_shortfall_meals": 110
    }
]

BIO_FACILITIES = [
    {
        "id": "BIO1",
        "name": "MCD Bio-Methanation & Clean Biogas Unit",
        "address": "Okhla Phase 1 Eco Center, New Delhi",
        "lat": 28.5301,
        "lng": 77.2721,
        "type": "Biogas & Electricity Generation",
        "daily_capacity_tons": 5.0
    },
    {
        "id": "BIO2",
        "name": "Urban Harvest Vermicompost Facility",
        "address": "Pusa Agricultural Institute Zone, New Delhi",
        "lat": 28.6369,
        "lng": 77.1558,
        "type": "Organic Fertilizer & Vermiculture",
        "daily_capacity_tons": 3.0
    }
]

FLEET = [
    {
        "id": "V1",
        "driver_name": "Rohan Sharma (Volunteer #104)",
        "vehicle_type": "Electric Cargo Scooter",
        "capacity_kg": 35.0,
        "insulated_box": True,
        "lat": 28.5950,
        "lng": 77.2300,
        "status": "AVAILABLE",
        "active_deliveries_today": 4
    },
    {
        "id": "V2",
        "driver_name": "Priya Verma (Green Van #202)",
        "vehicle_type": "Tata Ace EV (Cold Van)",
        "capacity_kg": 150.0,
        "insulated_box": True,
        "lat": 28.6150,
        "lng": 77.2100,
        "status": "EN_ROUTE",
        "active_deliveries_today": 6
    },
    {
        "id": "V3",
        "driver_name": "Amit Patel (Eco Fleet #301)",
        "vehicle_type": "E-Rickshaw Cargo Loader",
        "capacity_kg": 60.0,
        "insulated_box": True,
        "lat": 28.5700,
        "lng": 77.2350,
        "status": "AVAILABLE",
        "active_deliveries_today": 3
    }
]

SAMPLE_DONATIONS = [
    {
        "id": "DON-2026-001",
        "donor_id": "D1",
        "donor_name": "The Grand Pavilion Banquet & Lawn",
        "title": "Fresh Royal Shahi Paneer, Pulao & Butter Naan",
        "category": "Cooked Gravy & Rice",
        "diet": "VEG",
        "quantity_kg": 32.5,
        "portions": 80,
        "prepared_at": "2026-10-01T01:30:00",
        "safe_until": "2026-10-01T05:30:00",
        "storage_condition": "Insulated Chafing Dish (65°C)",
        "fssai_status": "VERIFIED_SAFE",
        "status": "MATCHED",
        "matched_ngo": "Delhi Roti Bank Foundation",
        "driver": "Rohan Sharma (Volunteer #104)",
        "co2e_saved_kg": 81.25,
        "water_saved_l": 32500
    },
    {
        "id": "DON-2026-002",
        "donor_id": "D2",
        "donor_name": "Spice Route Fine Dine (Taj Hotel)",
        "title": "Vegetable Biryani & Dal Makhani",
        "category": "Cooked Grains & Lentils",
        "diet": "VEG",
        "quantity_kg": 22.0,
        "portions": 55,
        "prepared_at": "2026-10-01T02:00:00",
        "safe_until": "2026-10-01T06:00:00",
        "storage_condition": "Stainless Steel Hot Pan",
        "fssai_status": "VERIFIED_SAFE",
        "status": "AVAILABLE",
        "matched_ngo": None,
        "driver": None,
        "co2e_saved_kg": 55.0,
        "water_saved_l": 22000
    },
    {
        "id": "DON-2026-003",
        "donor_id": "D5",
        "donor_name": "Green Valley Gourmet & Bakery",
        "title": "Whole Wheat Bread, Croissants & Multigrain Buns",
        "category": "Bakery & Breads",
        "diet": "VEG",
        "quantity_kg": 15.0,
        "portions": 45,
        "prepared_at": "2026-09-30T18:00:00",
        "safe_until": "2026-10-02T12:00:00",
        "storage_condition": "Ambient Sealed Paper Bags",
        "fssai_status": "VERIFIED_SAFE",
        "status": "IN_TRANSIT",
        "matched_ngo": "Snehalaya Children Care & Kitchen",
        "driver": "Amit Patel (Eco Fleet #301)",
        "co2e_saved_kg": 37.5,
        "water_saved_l": 15000
    }
]
