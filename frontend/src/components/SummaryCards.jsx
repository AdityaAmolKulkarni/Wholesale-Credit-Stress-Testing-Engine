import "./SummaryCards.css";

function SummaryCards({ summary }) {

    if (!summary) return null;

    return (

        <div className="summary-container">

            <div className="summary-card">

                <h4>Average Risk</h4>

                <h2>{summary.averageRisk}%</h2>

            </div>

            <div className="summary-card">

                <h4>High Risk Companies</h4>

                <h2>{summary.highRiskCompanies}</h2>

            </div>

            <div className="summary-card">

                <h4>Total Companies</h4>

                <h2>{summary.totalCompanies}</h2>

            </div>

        </div>

    );

}

export default SummaryCards;