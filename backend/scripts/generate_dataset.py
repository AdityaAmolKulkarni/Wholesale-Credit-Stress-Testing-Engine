import pandas as pd
import numpy as np

np.random.seed(42)

rows = 1000

loan = np.random.randint(1_000_000, 20_000_000, rows)

revenue = np.random.randint(5_000_000, 50_000_000, rows)

debt_ratio = np.random.uniform(0.2, 0.9, rows)

interest_coverage = np.random.uniform(1.0, 8.0, rows)

default = []

for i in range(rows):

    risk = 0

    if debt_ratio[i] > 0.65:
        risk += 1

    if interest_coverage[i] < 2.5:
        risk += 1

    if loan[i] > revenue[i]:
        risk += 1

    default.append(1 if risk >= 2 else 0)

companies = [f"Company_{i+1}" for i in range(rows)]

df = pd.DataFrame({
    "Company": companies,
    "LoanAmount": loan,
    "AnnualRevenue": revenue,
    "DebtRatio": debt_ratio.round(2),
    "InterestCoverage": interest_coverage.round(2),
    "Defaulted": default
})

df.to_csv("data/sample_portfolio.csv", index=False)

print("Dataset generated successfully!")