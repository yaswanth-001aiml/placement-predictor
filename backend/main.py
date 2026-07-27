from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import joblib
import numpy as np

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load("placement_model.pkl")

class Student(BaseModel):
    cgpa: float
    iq: int

@app.get("/")
def home():
    return {"message":"Placement Prediction API"}

@app.post("/predict")
def predict(student: Student):

    data = np.array([[student.cgpa, student.iq]])

    prediction = model.predict(data)[0]

    probability = model.predict_proba(data)[0]

    confidence = round(max(probability) * 100,2)

    result = "Placed" if prediction == 1 else "Not Placed"

    return {
        "prediction": result,
        "confidence": confidence
    }


# venv\Scripts\activate
#  uvicorn main:app --reload