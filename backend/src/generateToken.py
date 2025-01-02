import secrets

# Generate a secure random secret key for JWT
jwt_secret_key = secrets.token_urlsafe(32)  # Generates a 32-byte secret key

print(f"Generated JWT Secret Key: {jwt_secret_key}")
