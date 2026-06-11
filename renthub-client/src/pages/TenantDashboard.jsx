import { useEffect, useState } from "react";
import api from "../api/api";

function TenantDashboard() {
    const [leases, setLeases] = useState([]);
    const [payments, setPayments] = useState([]);
    const [maintenance, setMaintenance] = useState([]);
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        api.get("/leases").then((res) => setLeases(res.data));
        api.get("/payments").then((res) => setPayments(res.data));
        api.get("/maintenance").then((res) => setMaintenance(res.data));
        api.get("/applications").then((res) => setApplications(res.data));
    }, []);

    const activeLease = leases[0];

    const openMaintenance = maintenance.filter(
        (request) => request.status !== "Completed"
    );

    const completedMaintenance = maintenance.filter(
        (request) => request.status === "Completed"
    );

    const pendingApplications = applications.filter(
        (application) => application.status === "Pending"
    );

    const lastPayment = payments[0];

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Tenant Dashboard</h1>

            <div className="row">
                <div className="col-md-3 mb-3">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5>Current Property</h5>
                            <h4>
                                {activeLease?.propertyId?.title || "No active lease"}
                            </h4>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5>Monthly Rent</h5>
                            <h4>
                                {activeLease ? `$${activeLease.monthlyRent}` : "$0"}
                            </h4>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5>Open Maintenance</h5>
                            <h4>{openMaintenance.length}</h4>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5>Pending Applications</h5>
                            <h4>{pendingApplications.length}</h4>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card mt-4 shadow-sm">
                <div className="card-body">
                    <h3>Lease Summary</h3>

                    {activeLease ? (
                        <>
                            <p>
                                <strong>Property:</strong>{" "}
                                {activeLease.propertyId?.title}
                            </p>

                            <p>
                                <strong>Start Date:</strong>{" "}
                                {new Date(activeLease.startDate).toLocaleDateString()}
                            </p>

                            <p>
                                <strong>End Date:</strong>{" "}
                                {new Date(activeLease.endDate).toLocaleDateString()}
                            </p>

                            <p>
                                <strong>Status:</strong>{" "}
                                {activeLease.leaseStatus}
                            </p>
                        </>
                    ) : (
                        <p>No active lease found.</p>
                    )}
                </div>
            </div>

            <div className="card mt-4 shadow-sm">
                <div className="card-body">
                    <h3>Payment Summary</h3>

                    <p>
                        <strong>Total Payments:</strong> {payments.length}
                    </p>

                    <p>
                        <strong>Last Payment:</strong>{" "}
                        {lastPayment
                            ? `$${lastPayment.amount} on ${new Date(
                                lastPayment.paymentDate
                            ).toLocaleDateString()}`
                            : "No payments yet"}
                    </p>
                </div>
            </div>

            <div className="card mt-4 shadow-sm">
                <div className="card-body">
                    <h3>Maintenance Summary</h3>

                    <p>
                        <strong>Open Requests:</strong> {openMaintenance.length}
                    </p>

                    <p>
                        <strong>Completed Requests:</strong>{" "}
                        {completedMaintenance.length}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default TenantDashboard;