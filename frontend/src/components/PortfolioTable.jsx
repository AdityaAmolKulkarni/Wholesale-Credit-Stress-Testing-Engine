import "./PortfolioTable.css";

function PortfolioTable({ portfolio }) {

    if (portfolio.length === 0) return null;

    const columns = Object.keys(portfolio[0]);

    const formatValue = (column, value) => {
        if (
            column === "DebtRatio" ||
            column === "InterestCoverage"
        ) {
            return Number(value).toFixed(2);
        }

        if (
            column === "LoanAmount" ||
            column === "AnnualRevenue"
        ) {
            return `₹${(value/10000000).toFixed(2)} Cr`;
        }

        if (column === "PredictedRisk") {
            return (value * 100).toFixed(1) + "%";
        }

        return value;
    };

    const riskBadge = (risk) => {

        if (risk >= 0.7)
            return <span className="badge high">High</span>;

        if (risk >= 0.3)
            return <span className="badge medium">Medium</span>;

        return <span className="badge low">Low</span>;
    };

    return (

        <div className="table-container">

            <table>

                <thead>

                    <tr>

                        {columns.map(col => (

                            <th key={col}>{col}</th>

                        ))}

                        <th>Risk Level</th>

                    </tr>

                </thead>

                <tbody>

                    {portfolio.map((row, index) => (

                        <tr key={index}>

                            {columns.map(col => (

                                <td
                                    key={col}
                                    className={col === "Company" ? "company-name" : ""}
                                >
                                    {formatValue(col,row[col])}
                                </td>

                            ))}

                            <td>

                                {riskBadge(row.PredictedRisk)}

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default PortfolioTable;