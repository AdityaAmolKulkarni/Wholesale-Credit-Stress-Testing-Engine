import { useState } from "react";
import axios from "axios";

import PortfolioTable from "./PortfolioTable";
import SummaryCards from "./SummaryCards";
import RiskCharts from "./RiskCharts";
import UploadBox from "./UploadBox";

import "./UploadPortfolio.css";

function UploadPortfolio() {
    const [file, setFile] = useState(null);
    const [portfolio, setPortfolio] = useState([]);
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(false);

    const uploadFile = async () => {

        if (!file) {
            alert("Please choose a CSV file.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        setLoading(true);

        try {

            const response = await axios.post(
                "http://127.0.0.1:8000/upload",
                formData
            );

            setPortfolio(response.data.data);
            setSummary(response.data.summary);

        } catch (err) {

            alert("Upload failed.");

        } finally {

            setLoading(false);

        }

    };

    const runStressTest = async (scenario) => {

        if (!file) {
            alert("Upload a portfolio first.");
            return;
        }

        const formData = new FormData();

        formData.append("file", file);
        formData.append("scenario", scenario);

        setLoading(true);

        try {

            const response = await axios.post(
                "http://127.0.0.1:8000/stress",
                formData
            );

            setPortfolio(response.data.data);
            setSummary(response.data.summary);

        } catch (err) {

            alert("Stress test failed.");

        } finally {

            setLoading(false);

        }

    };

    return (

        <>

            <div className="upload-card">

                <h2 className="upload-title">
                    Upload Loan Portfolio
                </h2>

                <div className="upload-section">

                    <UploadBox

    file={file}

    onChange={(e)=>setFile(e.target.files[0])}

/>

                    <button
                        className="upload-btn"
                        disabled={loading}
                        onClick={uploadFile}
                    >
                        {loading ? "Processing..." : "Upload Portfolio"}
                    </button>

                </div>

                {file && (

                    <p className="selected-file">

                        Selected File :
                        <strong> {file.name}</strong>

                    </p>

                )}

            </div>

            <div className="stress-buttons">

                <button
                    className="stress-btn recession"
                    disabled={loading}
                    onClick={() => runStressTest("recession")}
                >
                    📉 Recession
                </button>

                <button
                    className="stress-btn interest"
                    disabled={loading}
                    onClick={() => runStressTest("interest")}
                >
                    📈 Interest Shock
                </button>

                <button
                    className="stress-btn inflation"
                    disabled={loading}
                    onClick={() => runStressTest("inflation")}
                >
                    💸 Inflation
                </button>

            </div>

            {portfolio.length === 0 ? (

                <div className="empty-state">

                    Upload a CSV portfolio to begin stress testing.

                </div>

            ) : (

                <>

                    <h2 className="section-title">
                        Portfolio Summary
                    </h2>

                    <SummaryCards summary={summary} />

                    <h2 className="section-title">
                        Portfolio Risk Analytics
                    </h2>

                    <RiskCharts portfolio={portfolio} />

                    <h2 className="section-title">
                        Corporate Loan Portfolio
                    </h2>

                    <PortfolioTable portfolio={portfolio} />

                </>

            )}

            <footer>

                Wholesale Credit Stress Testing Engine

                <br />

                Built using React • FastAPI • Scikit-Learn

            </footer>

        </>

    );

}

export default UploadPortfolio;