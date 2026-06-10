import { useEffect, useState } from "react";
import api from "../api/api";

function Maintenance() {
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        api
            .get("/maintenance")
            .then((res) => setRequests(res.data))
            .catch((err) => {
                console.error(err);
                setError("Unable to load maintenance requests.");
            });
    }, []);

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Maintenance Requests</h1>

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            {requests.length === 0 && !error && (
                <div className="alert alert-info">
                    No maintenance requests found.
                </div>
            )}

            {requests.map((request) => (
                <div
                    key={request._id}
                    className="card mb-3 shadow-sm"
                >
                    <div className="card-body">
                        <h4 className="card-title">
                            {request.title}
                        </h4>

                        <p className="card-text">
                            {request.description}
                        </p>

                        <div className="row">
                            <div className="col-md-6">
                                <p>
                                    <strong>Priority:</strong>{" "}
                                    {request.priority}
                                </p>

                                <p>
                                    <strong>Status:</strong>{" "}
                                    {request.status}
                                </p>
                            </div>

                            <div className="col-md-6">
                                <p>
                                    <strong>Tenant:</strong>{" "}
                                    {request.tenantId?.fullName}
                                </p>

                                <p>
                                    <strong>Property:</strong>{" "}
                                    {request.propertyId?.title}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Maintenance;