import pandas as pd


def apply_stress(df, scenario):

    stressed = df.copy()

    if scenario == "recession":

        stressed["AnnualRevenue"] *= 0.80

    elif scenario == "interest":

        stressed["InterestCoverage"] *= 0.70

    elif scenario == "inflation":

        stressed["AnnualRevenue"] *= 0.90
        stressed["DebtRatio"] *= 1.10

    return stressed