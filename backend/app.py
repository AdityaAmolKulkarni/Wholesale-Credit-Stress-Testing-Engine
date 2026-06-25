from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from services.train_model import train_credit_model
from services.stress_engine import apply_stress

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "Wholesale Credit Stress Testing Engine Backend Running"
    }

@app.post("/upload")
async def upload_portfolio(file: UploadFile = File(...)):
    df = pd.read_csv(file.file)

    model = train_credit_model(df)

    features = df[
        [
            "LoanAmount",
            "AnnualRevenue",
            "DebtRatio",
            "InterestCoverage",
        ]
    ]

    probabilities = model.predict_proba(features)

    df["PredictedRisk"] = probabilities[:, 1]

    average_risk = round(df["PredictedRisk"].mean() * 100, 2)

    high_risk = len(df[df["PredictedRisk"] >= 0.7])

    total_companies = len(df)

    return {
    "summary": {
        "averageRisk": average_risk,
        "highRiskCompanies": high_risk,
        "totalCompanies": total_companies,
    },
    "data": df.to_dict(orient="records"),
}

@app.post("/stress")
async def stress_test(file: UploadFile = File(...), scenario: str = Form(...)):

    df = pd.read_csv(file.file)

    model = train_credit_model(df)

    stressed_df = apply_stress(df, scenario)

    features = stressed_df[
        [
            "LoanAmount",
            "AnnualRevenue",
            "DebtRatio",
            "InterestCoverage",
        ]
    ]

    probabilities = model.predict_proba(features)

    stressed_df["PredictedRisk"] = probabilities[:, 1]

    average_risk = round(stressed_df["PredictedRisk"].mean() * 100, 2)

    high_risk = len(
        stressed_df[
            stressed_df["PredictedRisk"] >= 0.7
        ]
    )

    total_companies = len(stressed_df)

    return {
    "scenario": scenario,
    "summary": {
        "averageRisk": average_risk,
        "highRiskCompanies": high_risk,
        "totalCompanies": total_companies,
        },
        "data": stressed_df.to_dict(orient="records"),
    }