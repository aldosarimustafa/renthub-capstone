import { useEffect, useState } from "react";
import api from "../api/api";

function Leases() {
    const [leases, setLeases] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        api
            .get("/leases")
            .then((res) => setLeases(res.data))
            .catch((err) => {
                console.error(err);
                setError("Unable to load leases.");
            });
    }, []);

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Leases</h1>

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            {leases.length === 0 && !error && (
                <div className="alert alert-info">
                    No leases found.
                </div>
            )}

            {leases.map((lease) => (
                <div
                    key={lease._id}
                    className="card mb-3 shadow-sm"
                >
                    <div className="card-body">
                        <h4 className="card-title">
                            {lease.propertyId?.title}
                        </h4>

                        <div className="row">
                            <div className="col-md-6">
                                <p>
                                    <strong>Tenant:</strong>{" "}
                                    {lease.tenantId?.fullName}
                                </p>

                                <p>
                                    <strong>Monthly Rent:</strong>{" "}
                                    ${lease.monthlyRent}
                                </p>

                                <p>
                                    <strong>Status:</strong>{" "}
                                    {lease.leaseStatus}
                                </p>
                            </div>

                            <div className="col-md-6">
                                <p>
                                    <strong>Start Date:</strong>{" "}
                                    {new Date(lease.startDate).toLocaleDateString()}
                                </p>

                                <p>
                                    <strong>End Date:</strong>{" "}
                                    {new Date(lease.endDate).toLocaleDateString()}
                                </p>

                                <p>
                                    <strong>Created:</strong>{" "}
                                    {new Date(lease.createdAt).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Leases;