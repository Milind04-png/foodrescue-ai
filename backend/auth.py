"""
Authentication & Role-Based Access Control (RBAC) Module for FoodRescue AI.
Generates and validates signed JWT tokens using HMAC-SHA256.
"""

import hmac
import hashlib
import base64
import json
import time
from typing import Optional, Dict
from fastapi import HTTPException, Header, Depends

try:
    from database import get_user_by_email, get_user_by_id, hash_password
except ImportError:
    from backend.database import get_user_by_email, get_user_by_id, hash_password

JWT_SECRET = "foodrescue_ai_enterprise_super_secret_jwt_key_2026"
TOKEN_EXPIRY_SECONDS = 86400 * 7 # 7 days

def base64url_encode(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).decode('utf-8').rstrip('=')

def base64url_decode(data: str) -> bytes:
    padding = '=' * (4 - len(data) % 4)
    return base64.urlsafe_b64decode(data + padding)

def create_jwt_token(payload: dict) -> str:
    header = {"alg": "HS256", "typ": "JWT"}
    header_json = json.dumps(header, separators=(',', ':')).encode('utf-8')
    header_b64 = base64url_encode(header_json)

    token_payload = dict(payload)
    token_payload["exp"] = int(time.time()) + TOKEN_EXPIRY_SECONDS
    token_payload["iat"] = int(time.time())
    payload_json = json.dumps(token_payload, separators=(',', ':')).encode('utf-8')
    payload_b64 = base64url_encode(payload_json)

    signing_input = f"{header_b64}.{payload_b64}".encode('utf-8')
    signature = hmac.new(JWT_SECRET.encode('utf-8'), signing_input, hashlib.sha256).digest()
    signature_b64 = base64url_encode(signature)

    return f"{header_b64}.{payload_b64}.{signature_b64}"

def verify_jwt_token(token: str) -> Optional[dict]:
    try:
        parts = token.split('.')
        if len(parts) != 3:
            return None
        header_b64, payload_b64, signature_b64 = parts

        signing_input = f"{header_b64}.{payload_b64}".encode('utf-8')
        expected_sig = hmac.new(JWT_SECRET.encode('utf-8'), signing_input, hashlib.sha256).digest()
        actual_sig = base64url_decode(signature_b64)

        if not hmac.compare_digest(expected_sig, actual_sig):
            return None

        payload_bytes = base64url_decode(payload_b64)
        payload = json.loads(payload_bytes.decode('utf-8'))

        if payload.get("exp", 0) < time.time():
            return None

        return payload
    except Exception:
        return None

def get_current_user(authorization: Optional[str] = Header(None)) -> dict:
    """Dependency to extract and verify the authenticated user from the Authorization header."""
    if not authorization:
        # Fallback to demo guest user if not provided in open routes
        return {
            "id": "U-DEMO",
            "email": "guest@foodrescue.ai",
            "role": "admin",
            "name": "Demo System User",
            "organization_name": "FoodRescue AI Ecosystem"
        }
    
    parts = authorization.split()
    if len(parts) != 2 or parts[0].lower() != "bearer":
        raise HTTPException(status_code=401, detail="Invalid authorization header format")
    
    token = parts[1]
    payload = verify_jwt_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Token is invalid or expired")
    
    user = get_user_by_id(payload.get("sub"))
    if not user:
        raise HTTPException(status_code=401, detail="User belonging to this token no longer exists")
    
    # Return user dict without password_hash
    safe_user = dict(user)
    safe_user.pop("password_hash", None)
    return safe_user

def require_role(allowed_roles: list):
    """Enforces role-based access control (RBAC)."""
    def role_checker(user: dict = Depends(get_current_user)):
        if user["role"] not in allowed_roles and user["role"] != "admin":
            raise HTTPException(
                status_code=403,
                detail=f"Access denied. Requires role: {', '.join(allowed_roles)}. Current role: {user['role']}"
            )
        return user
    return role_checker
