from sklearn.ensemble import RandomForestClassifier


def train_credit_model(df):

    X = df[
        [
            "LoanAmount",
            "AnnualRevenue",
            "DebtRatio",
            "InterestCoverage",
        ]
    ]

    y = df["Defaulted"]

    model = RandomForestClassifier(
        n_estimators=100,
        random_state=42
    )

    model.fit(X, y)

    return model