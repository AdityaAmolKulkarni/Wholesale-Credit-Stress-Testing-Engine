# 📊 Wholesale Credit Stress Testing Engine using Machine Learning

An end-to-end **Credit Risk Analytics Platform** built using **React**, **FastAPI**, **Scikit-Learn**, and **Pandas** to predict corporate loan default risk and simulate macroeconomic stress scenarios.

The application allows users to upload a corporate loan portfolio, estimate the probability of default using a Machine Learning model, and evaluate how adverse economic conditions impact portfolio risk.

---

## Features

- Upload wholesale loan portfolio in CSV format
- Predict default probability using Random Forest
- Portfolio-level risk analytics
- Interactive stress testing scenarios
  - Recession
  - Interest Rate Shock
  - Inflation Shock
- Summary dashboard
- Interactive charts
- Responsive portfolio table
- Risk categorization (Low / Medium / High)

---

## Tech Stack

### Frontend

- React
- Axios
- Chart.js
- CSS

### Backend

- FastAPI
- Pandas
- NumPy
- Scikit-Learn

---

## Project Architecture

```
CSV Portfolio
      │
      ▼
React Frontend
      │
Axios API Calls
      │
      ▼
FastAPI Backend
      │
      ▼
Portfolio Processing
      │
      ▼
Random Forest Model
      │
      ▼
Default Probability Prediction
      │
      ▼
Stress Testing Engine
      │
      ▼
Dashboard & Visualizations
```

---

## Stress Testing Scenarios

### Recession

- Revenue decreases by 20%

### Interest Rate Shock

- Interest Coverage decreases by 30%

### Inflation Shock

- Revenue decreases
- Debt Ratio increases

The updated financial metrics are passed through the trained ML model to estimate the stressed probability of default.

---

## Dashboard

The application provides

- Portfolio Summary
- Average Risk
- High-Risk Companies
- Company-wise Default Risk
- Risk Distribution
- Interactive Portfolio Table

---

## Machine Learning

Model Used

- Random Forest Classifier

Features

- Loan Amount
- Annual Revenue
- Debt Ratio
- Interest Coverage

Prediction

- Probability of Default

---

## Folder Structure

```
Stress-Testing-Engine/

│
├── backend/
│   ├── app.py
│   ├── services/
│   ├── scripts/
│   ├── data/
│   └── requirements.txt
│
└── frontend/
    ├── src/
    ├── public/
    └── package.json
```

---

## Installation

### Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn app:app --reload
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## Future Improvements

- Probabilistic synthetic data generation
- Model persistence using Joblib
- Multiple ML model comparison
- Monte Carlo stress simulations
- Basel III risk metrics
- PDF report generation
- Authentication & portfolio history

---

## Author

Aditya Amol Kulkarni
