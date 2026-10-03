"""
SQLAlchemy 2.0 Normalized Relational Database Models for FoodRescue AI.
Implements:
- Normalized Relational Entities (Organizations, Users, Batches, Food Items, Orders)
- Foreign Key Constraints & Cascades
- FSSAI Cryptographic Hash-Chained Audit Ledger
- Spatial Geospatial Indexing Attributes
- Optimistic Concurrency Control (version_id)
"""

from datetime import datetime
from sqlalchemy import (
    Column,
    String,
    Float,
    Integer,
    DateTime,
    ForeignKey,
    Text,
    Boolean,
    Index,
)
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()

class Organization(Base):
    """Normalized institutional stakeholder entity (Universities, Corporate Food Courts, NGOs, Fleet Hubs, Biogas Plants)."""
    __tablename__ = "organizations"

    id = Column(String(36), primary_key=True)
    name = Column(String(150), nullable=False, index=True)
    org_type = Column(String(30), nullable=False, index=True) # 'donor', 'ngo', 'delivery', 'biogas', 'admin'
    category = Column(String(100), nullable=True) # 'University Campus', 'Tech Park Canteen', 'Relief NGO'
    fssai_license = Column(String(50), nullable=True, unique=True)
    address = Column(String(255), nullable=False)
    latitude = Column(Float, nullable=False, index=True)
    longitude = Column(Float, nullable=False, index=True)
    contact_phone = Column(String(30), nullable=True)
    rating = Column(Float, default=4.8)
    verified = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    users = relationship("User", back_populates="organization", cascade="all, delete-orphan")
    donations_issued = relationship("DonationBatch", back_populates="donor_org")
    orders_claimed = relationship("DispatchOrder", back_populates="recipient_org")

    __table_args__ = (
        Index("idx_org_lat_lng", "latitude", "longitude"),
    )

class User(Base):
    """User account entity with Role-Based Access Control (RBAC)."""
    __tablename__ = "users"

    id = Column(String(36), primary_key=True)
    org_id = Column(String(36), ForeignKey("organizations.id"), nullable=False, index=True)
    email = Column(String(100), unique=True, nullable=False, index=True)
    password_hash = Column(String(128), nullable=False)
    name = Column(String(100), nullable=False)
    role = Column(String(30), nullable=False, index=True) # 'donor', 'ngo', 'delivery', 'admin'
    phone = Column(String(30), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationship
    organization = relationship("Organization", back_populates="users")

class DonationBatch(Base):
    """Surplus food batch recorded by institutional donors."""
    __tablename__ = "donation_batches"

    id = Column(String(36), primary_key=True) # e.g. BATCH-9021
    donor_org_id = Column(String(36), ForeignKey("organizations.id"), nullable=False, index=True)
    title = Column(String(150), nullable=False)
    category = Column(String(50), nullable=False, index=True) # 'Cooked Meals', 'Bakery', 'Raw Rations'
    diet = Column(String(20), default="VEG") # 'VEG', 'NON-VEG', 'EGG'
    total_quantity_kg = Column(Float, nullable=False)
    total_portions = Column(Integer, nullable=False)
    storage_condition = Column(String(100), default="Insulated Hot Box")
    core_temp_c = Column(Float, default=65.0)
    expiry_minutes_remaining = Column(Integer, default=240)
    escalation_tier = Column(String(50), default="Tier 1: Flash Markdown", index=True)
    status = Column(String(50), default="Available", index=True) # 'Available', 'Claimed', 'In Transit', 'Delivered', 'Diverted to Biogas'
    otp_code = Column(String(10), nullable=True)
    fssai_form_ix_hash = Column(String(64), nullable=True)
    pickup_address = Column(String(255), nullable=True)
    version_id = Column(Integer, default=1, nullable=False) # Optimistic concurrency counter to prevent race conditions
    created_at = Column(DateTime, default=datetime.utcnow, index=True)

    # Relationships
    donor_org = relationship("Organization", back_populates="donations_issued")
    food_items = relationship("FoodItem", back_populates="batch", cascade="all, delete-orphan")
    dispatch_order = relationship("DispatchOrder", back_populates="batch", uselist=False, cascade="all, delete-orphan")

    __table_args__ = (
        Index("idx_batch_status_tier", "status", "escalation_tier"),
    )

class FoodItem(Base):
    """Itemized breakdown of food within a container pan."""
    __tablename__ = "food_items"

    id = Column(String(36), primary_key=True)
    batch_id = Column(String(36), ForeignKey("donation_batches.id"), nullable=False, index=True)
    item_name = Column(String(100), nullable=False)
    container_code = Column(String(60), nullable=True) # e.g. 'Gastronorm Pan GN 1/1 (530x325x150mm)'
    weight_kg = Column(Float, nullable=False)
    portion_count = Column(Integer, nullable=False)

    batch = relationship("DonationBatch", back_populates="food_items")

class DispatchOrder(Base):
    """Hyperlocal dispatch order tracking courier pickup and delivery custody."""
    __tablename__ = "dispatch_orders"

    id = Column(String(36), primary_key=True)
    batch_id = Column(String(36), ForeignKey("donation_batches.id"), unique=True, nullable=False, index=True)
    recipient_org_id = Column(String(36), ForeignKey("organizations.id"), nullable=False, index=True)
    assigned_driver_user_id = Column(String(36), ForeignKey("users.id"), nullable=True)
    current_step = Column(Integer, default=1) # 1=Temp & Pickup, 2=QR Custody & Seal, 3=Shelter Drop-off
    order_status = Column(String(50), default="Claimed", index=True) # 'Claimed', 'In Transit', 'Delivered', 'Diverted to Biogas'
    transit_core_temp_c = Column(Float, default=65.0)
    claimed_at = Column(DateTime, default=datetime.utcnow)
    delivered_at = Column(DateTime, nullable=True)

    # Relationships
    batch = relationship("DonationBatch", back_populates="dispatch_order")
    recipient_org = relationship("Organization", back_populates="orders_claimed")
    driver = relationship("User")

class AuditLedgerEntry(Base):
    """
    Append-only cryptographically chained audit ledger for legal FSSAI compliance.
    Every row stores the SHA-256 hash of the preceding row, forming an immutable chain.
    """
    __tablename__ = "audit_ledger"

    id = Column(String(36), primary_key=True)
    sequence_number = Column(Integer, unique=True, nullable=False, index=True)
    batch_id = Column(String(36), nullable=False, index=True)
    actor_id = Column(String(36), nullable=False)
    actor_name = Column(String(100), nullable=False)
    actor_role = Column(String(50), nullable=False)
    action = Column(String(100), nullable=False)
    core_temp_logged = Column(Float, nullable=False)
    legal_indemnity_ref = Column(String(100), default="FSSAI-SEC-31-GOOD-SAMARITAN-INDEMNITY")
    details = Column(Text, nullable=True)
    previous_block_hash = Column(String(64), nullable=False) # Genesis block is '0'*64
    current_block_hash = Column(String(64), nullable=False, unique=True)
    timestamp = Column(DateTime, default=datetime.utcnow, nullable=False, index=True)

class EsgMetrics(Base):
    """Consolidated ESG impact and CSR metrics."""
    __tablename__ = "esg_metrics"

    id = Column(Integer, primary_key=True)
    food_rescued_kg = Column(Float, default=0.0)
    meals_served = Column(Integer, default=0)
    co2e_saved_kg = Column(Float, default=0.0)
    water_saved_liters = Column(Float, default=0.0)
    landfill_diverted_kg = Column(Float, default=0.0)
    biogas_kwh_generated = Column(Float, default=0.0)
    updated_at = Column(DateTime, default=datetime.utcnow)
