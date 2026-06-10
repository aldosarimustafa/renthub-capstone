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
        <div>
            <h1>Reports Dashboard</h1>

            <p>Total Users: {report.totalUsers}</p>
            <p>Total Properties: {report.totalProperties}</p>
            <p>Total Applications: {report.totalApplications}</p>
            <p>Total Maintenance Requests: {report.totalMaintenanceRequests}</p>
            <p>Total Leases: {report.totalLeases}</p>
            <p>Total Payments: {report.totalPayments}</p>
        </div>
    );
}

export default Reports;