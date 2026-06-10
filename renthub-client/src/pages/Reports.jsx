import { useEffect, useState } from "react";
import api from "../api/api";

function Reports() {
    const [report, setReport] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        api
            .get("/reports")
            .then((res) => setReport(res.data))
            .catch((err) => {
                console.error("Reports error:", err);
                setError("Could not load reports. Please login first.");
            });
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    if (!report) {
        return <p>Loading reports...</p>;
    }

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Reports Dashboard</h1>

            <div className="row">
                <div className="col-md-4 mb-3">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5>Total Users</h5>
                            <h2>{report.totalUsers}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5>Total Properties</h5>
                            <h2>{report.totalProperties}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5>Total Applications</h5>
                            <h2>{report.totalApplications}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5>Maintenance Requests</h5>
                            <h2>{report.totalMaintenanceRequests}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5>Total Leases</h5>
                            <h2>{report.totalLeases}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5>Total Payments</h5>
                            <h2>{report.totalPayments}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Reports;