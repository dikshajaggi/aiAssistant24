# =======================
# ✅ Imports
# =======================
from fastapi import FastAPI, Request, Security
from fastapi.openapi.utils import get_openapi
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from jose import jwt  # JWT decoding
from dotenv import load_dotenv
from pathlib import Path
from openai import OpenAI
from twilio.rest import Client as TwilioClient
import requests
import smtplib
from email.message import EmailMessage
import os

# =======================
# ✅ Load Environment Variables
# =======================
env_path = Path(__file__).parent / '.env'
load_dotenv(dotenv_path=env_path)

# Print key env variables (for debugging)
print("✅ SUPABASE_URL:", os.getenv("SUPABASE_URL"))
print("✅ OPENAI_API_KEY:", os.getenv("OPENAI_API_KEY"))
print("✅ JWT SECRET:", os.getenv("SUPABASE_JWT_SECRET"))

# =======================
# ✅ FastAPI App Initialization
# =======================
app = FastAPI()

# =======================
# ✅ Setup CORS
# =======================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =======================
# ✅ Custom OpenAPI with Bearer Auth
# =======================
def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="Dental Marketing Assistant",
        version="1.0.0",
        description="API with JWT Bearer Auth",
        routes=app.routes,
    )
    openapi_schema["components"]["securitySchemes"] = {
        "BearerAuth": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT",
        }
    }
    for path in openapi_schema["paths"].values():
        for operation in path.values():
            operation["security"] = [{"BearerAuth": []}]
    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi

# =======================
# ✅ Global Configs / Clients
# =======================
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
SECRET = os.getenv("SUPABASE_JWT_SECRET")

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

twilio_client = TwilioClient(
    os.getenv("TWILIO_ACCOUNT_SID"),
    os.getenv("TWILIO_AUTH_TOKEN")
)

from_whatsapp_number = os.getenv("TWILIO_WHATSAPP_NUMBER")
EMAIL_ADDRESS = os.getenv("EMAIL_USER")
EMAIL_PASSWORD = os.getenv("EMAIL_PASS")
bearer_scheme = HTTPBearer()

print("✅ Loaded SUPABASE_URL:", SUPABASE_URL)

# =======================
# ✅ Pydantic Models
# =======================

# Patient Models
class Patient(BaseModel):
    name: str
    email: str
    phone: str
    treatment: str
    appointment_date: str

class PatientUpdate(BaseModel):
    name: str | None = None
    email: str | None = None
    phone: str | None = None
    treatment: str | None = None
    appointment_date: str | None = None

# Visit Models
class Visit(BaseModel):
    patient_id: int
    visit_date: str
    treatment: str
    payment_status: str
    amount: float

# Other Models
class ReminderRequest(BaseModel):
    patient_name: str
    treatment: str
    appointment_date: str
    clinic_name: str
    patient_phone: str
    patient_email: str

class SocialPostRequest(BaseModel):
    topic: str
    audience: str

class GeneratePromoEmailRequest(BaseModel):
    offer: str
    audience: str

class SendPromoEmailRequest(BaseModel):
    email_content: str
    offer: str
    email_recipient: str

# =======================
# ✅ Patient Routes
# =======================

@app.post("/add_patient")
async def add_patient(patient: Patient, credentials: HTTPAuthorizationCredentials = Security(bearer_scheme)):
    token = credentials.credentials
    payload = jwt.decode(token, SECRET, algorithms=['HS256'], audience="authenticated")
    user_id = payload["sub"]

    body = patient.dict()
    body["user_id"] = user_id

    # Add patient
    resp = requests.post(
        f"{SUPABASE_URL}/rest/v1/patients",
        headers={
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
            "Prefer": "return=representation"
        },
        json=body
    )
    patient_data = resp.json()[0]
    patient_id = patient_data["id"]

    # Auto-create visit
    visit_body = {
        "patient_id": patient_id,
        "visit_date": patient.appointment_date,
        "treatment": patient.treatment,
        "payment_status": "pending",
        "amount": 0,
        "user_id": user_id
    }

    visit_resp = requests.post(
        f"{SUPABASE_URL}/rest/v1/visits",
        headers={
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
            "Prefer": "return=representation"
        },
        json=visit_body
    )

    return {
        "patient": patient_data,
        "visit": visit_resp.json()
    }

@app.get("/get_patients")
async def get_patients(credentials: HTTPAuthorizationCredentials = Security(bearer_scheme)):
    token = credentials.credentials
    resp = requests.get(
        f"{SUPABASE_URL}/rest/v1/patients?order=id.desc",
        headers={
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {token}",
        }
    )
    return resp.json()

@app.get("/get_patient_by_phone")
async def get_patient_by_phone(phone: str, credentials: HTTPAuthorizationCredentials = Security(bearer_scheme)):
    token = credentials.credentials
    payload = jwt.decode(token, SECRET, algorithms=['HS256'], audience="authenticated")
    user_id = payload["sub"]

    resp = requests.get(
        f"{SUPABASE_URL}/rest/v1/patients?phone=eq.{phone}&user_id=eq.{user_id}",
        headers={
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {token}",
        }
    )
    return resp.json()

@app.patch("/edit_patient/{patient_id}")
async def edit_patient(patient_id: int, patient: PatientUpdate, credentials: HTTPAuthorizationCredentials = Security(bearer_scheme)):
    token = credentials.credentials
    payload = jwt.decode(token, SECRET, algorithms=['HS256'], audience="authenticated")
    body = patient.dict(exclude_unset=True)

    resp = requests.patch(
        f"{SUPABASE_URL}/rest/v1/patients?id=eq.{patient_id}",
        headers={
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
            "Prefer": "return=representation"
        },
        json=body
    )
    return resp.json()

@app.delete("/delete_patient/{patient_id}")
async def delete_patient(patient_id: int, credentials: HTTPAuthorizationCredentials = Security(bearer_scheme)):
    token = credentials.credentials
    resp = requests.delete(
        f"{SUPABASE_URL}/rest/v1/patients?id=eq.{patient_id}",
        headers={
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {token}",
            "Prefer": "return=representation"
        }
    )
    return resp.json()

# =======================
# ✅ Visit Routes
# =======================

@app.post("/add_visit")
async def add_visit(visit: Visit, credentials: HTTPAuthorizationCredentials = Security(bearer_scheme)):
    token = credentials.credentials
    payload = jwt.decode(token, SECRET, algorithms=['HS256'], audience="authenticated")
    user_id = payload["sub"]

    body = visit.dict()
    body["user_id"] = user_id

    resp = requests.post(
        f"{SUPABASE_URL}/rest/v1/visits",
        headers={
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
            "Prefer": "return=representation"
        },
        json=body
    )
    return resp.json()

@app.get("/get_visits/{patient_id}")
async def get_visits(patient_id: int, credentials: HTTPAuthorizationCredentials = Security(bearer_scheme)):
    token = credentials.credentials
    resp = requests.get(
        f"{SUPABASE_URL}/rest/v1/visits?patient_id=eq.{patient_id}&order=id.desc",
        headers={
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {token}"
        }
    )
    return resp.json()

# =======================
# ✅ AI & Communication
# =======================

@app.post("/remind_patient")
async def remind_patient(data: ReminderRequest):
    prompt = (
        f"Act as a dental clinic receptionist. Write a friendly SMS reminder for "
        f"{data.patient_name} who has a {data.treatment} appointment on {data.appointment_date}. "
        f"Clinic name: {data.clinic_name}."
    )

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}]
    )

    reminder = response.choices[0].message.content

    # ✅ Send WhatsApp
    try:
        whatsapp_message = twilio_client.messages.create(
            body=reminder,
            from_=from_whatsapp_number,
            to=f"whatsapp:+91{data.patient_phone}"
        )
    except Exception as e:
        whatsapp_message = {"error": str(e)}

    # ✅ Send Email
    try:
        msg = EmailMessage()
        msg.set_content(reminder)
        msg['Subject'] = f"Appointment Reminder - {data.clinic_name}"
        msg['From'] = EMAIL_ADDRESS
        msg['To'] = data.patient_email

        with smtplib.SMTP('smtp.gmail.com', 587) as smtp:
            smtp.starttls()
            smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            smtp.send_message(msg)
        email_status = "sent"
    except Exception as e:
        email_status = f"failed: {str(e)}"

    return {
        "reminder": reminder,
        "whatsapp": str(whatsapp_message),
        "email": email_status
    }

@app.post("/generate_social_post")
async def generate_social_post(data: SocialPostRequest):
    prompt = (
        f"Act as a content writer for a dental clinic. Write a short, friendly social media post. "
        f"Topic: {data.topic}. Audience: {data.audience}. Include 2-3 dental tips, emojis, and hashtags."
    )
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}]
    )
    return {"post": response.choices[0].message.content}

@app.post("/generate_promo_email")
async def generate_promo_email(data: GeneratePromoEmailRequest):
    prompt = (
        f"Write a warm, friendly promotional email for a dental clinic offering {data.offer} "
        f"to {data.audience}. Include a call-to-action to book an appointment."
    )
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}]
    )
    return {"email_content": response.choices[0].message.content}

@app.post("/send_promo_email")
async def send_promo_email(data: SendPromoEmailRequest):
    msg = EmailMessage()
    msg.set_content(data.email_content)
    msg['Subject'] = f"{data.offer} - Special Offer!"
    msg['From'] = EMAIL_ADDRESS
    msg['To'] = data.email_recipient

    try:
        with smtplib.SMTP('smtp.gmail.com', 587) as smtp:
            smtp.starttls()
            smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            smtp.send_message(msg)
        return {"status": "sent", "to": data.email_recipient}
    except Exception as e:
        return {"status": "failed", "error": str(e)}