import {
    Bar,
    Pie
} from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
    Title
} from "chart.js";

import "./RiskCharts.css";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
    Title
);

function RiskCharts({ portfolio }) {

    if (portfolio.length === 0) return null;

    const sample = portfolio.slice(0, 15);

    const barData = {
        labels: sample.map(company => company.Company),

        datasets: [
            {
                label: "Predicted Risk",

                data: sample.map(company => company.PredictedRisk * 100),

                backgroundColor: "#3B82F6",

                borderColor: "#1B3C59",

                borderWidth: 2,

                borderRadius: 6,
            },
        ],
    };

    let low = 0;
    let medium = 0;
    let high = 0;

    portfolio.forEach(company => {

        if (company.PredictedRisk < 0.3)
            low++;

        else if (company.PredictedRisk < 0.7)
            medium++;

        else
            high++;

    });

    const pieData = {

        labels: ["Low Risk", "Medium Risk", "High Risk"],

        datasets: [

            {

                data: [low, medium, high],

                backgroundColor: [

                    "#22C55E",

                    "#F59E0B",

                    "#EF4444"

                ],

                borderColor: "#ffffff",

                borderWidth: 2

            }

        ]

    };

    const barOptions = {

        responsive: true,

        plugins: {

            legend: {

                display: false

            },

            title: {

                display: true,

                text: "Predicted Default Risk (Sample Companies)",

                color: "#1B3C59",

                font: {

                    size: 18,

                    weight: "bold"

                }

            }

        },

        scales: {

            x: {

                ticks: {

                    color: "#1B3C59"

                }

            },

            y: {

                    beginAtZero: true,

                    max: 100,

                    ticks: {

                        color:"#1B3C59",

                        callback:(value)=> value + "%"

                    }

                }

        }

    };

    const pieOptions = {

        responsive: true,

        plugins: {

            title: {

                display: true,

                text: "Portfolio Risk Distribution",

                color: "#1B3C59",

                font: {

                    size: 18,

                    weight: "bold"

                }

            },

            legend: {

                position: "top",

                labels: {

                    color: "#1B3C59",

                    font: {

                        size: 14

                    }

                }

            }

        }

    };

    return (

        <div className="chart-container">

            <div className="chart-card">

                <Bar

                    data={barData}

                    options={barOptions}

                />

            </div>

            <div className="chart-card">

                <Pie

                    data={pieData}

                    options={pieOptions}

                />

            </div>

        </div>

    );

}

export default RiskCharts;