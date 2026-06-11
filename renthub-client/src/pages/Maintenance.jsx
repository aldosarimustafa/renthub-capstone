import { useEffect, useState } from "react";
import api from "../api/api";

function Maintenance() {
    const user = JSON.parse(localStorage.getItem("user"));
    const role = user?.role;

    const [requests, setRequests] = useState([]);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [showServiceHistory, setShowServiceHistory] = useState(false);

    const [form, setForm] = useState({
        propertyId: "6a2605cf2a02d3113b67dd43",
        title: "",
        description: "",
        priority: "Medium",
    });

    const loadRequests = () => {
        api
            .get("/maintenance")
            .then((res) => setRequests(res.data))
            .catch((err) => {
                console.error(err);
                setError("Unable to load maintenance requests.");
            });
    };

    useEffect(() => {
        loadRequests();
    }, []);

    const activeRequests = requests.filter(
        (request) => request.status !== "Completed"
    );

    const completedRequests = requests.filter(
        (request) => request.status === "Completed"
    );

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post("/maintenance", form);

            setMessage("Maintenance request submitted successfully.");
            setForm({
                propertyId: "6a2605cf2a02d3113b67dd43",
                title: "",
                description: "",
                priority: "Medium",
            });

            loadRequests();
        } catch (error) {
            console.error(error);
            setMessage("Failed to submit maintenance request.");
        }
    };

    const handleStatusUpdate = async (requestId, status) => {
        try {
            await api.put(`/maintenance/${requestId}`, { status });
            setMessage("Maintenance status updated.");
            loadRequests();
        } catch (error) {
            console.error(error);
            setMessage("Failed to update maintenance status.");
        }
    };

    const renderRequestCard = (request, isHistory = false) => (
        <div key={request._id} className="card mb-3 shadow-sm">
            <div className="card-body">
                <h4 className="card-title">{request.title}</h4>

                <p className="card-text">{request.description}</p>

                <div className="row">
                    <div className="col-md-6">
                        <p>
                            <strong>Priority:</strong> {request.priority}
                        </p>

                        <p>
                            <strong>Status:</strong> {request.status}
                        </p>

                        {role === "Administrator" && !isHistory && (
                            <div className="mb-3">
                                <label className="form-label">Update Status</label>

                                <select
                                    className="form-select"
                                    value={request.status}
                                    onChange={(e) =>
                                        handleStatusUpdate(request._id, e.target.value)
                                    }
                                >
                                    <option>Open</option>
                                    <option>In Progress</option>
                                    <option>Completed</option>
                                </select>
                            </div>
                        )}
                    </div>

                    <div className="col-md-6">
                        <p>
                            <strong>Tenant:</strong> {request.tenantId?.fullName}
                        </p>

                        <p>
                            <strong>Property:</strong> {request.propertyId?.title}
                        </p>

                        <p>
                            <strong>Submitted:</strong>{" "}
                            {new Date(request.createdAt).toLocaleString()}
                        </p>

                        {isHistory && (
                            <p>
                                <strong>Completed/Updated:</strong>{" "}
                                {new Date(request.updatedAt).toLocaleString()}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Maintenance Requests</h1>

            {role === "Tenant" && (
                <div className="card mb-4 shadow-sm">
                    <div className="card-body">
                        <h3>Submit Maintenance Request</h3>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Property ID</label>
                                <input
                                    className="form-control"
                                    name="propertyId"
                                    value={form.propertyId}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Issue Title</label>
                                <input
                                    className="form-control"
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    placeholder="Example: Leaking sink"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <textarea
                                    className="form-control"
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    placeholder="Describe the maintenance issue"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Priority</label>
                                <select
                                    className="form-select"
                                    name="priority"
                                    value={form.priority}
                                    onChange={handleChange}
                                >
                                    <option>Low</option>
                                    <option>Medium</option>
                                    <option>High</option>
                                </select>
                            </div>

                            <button className="btn btn-primary" type="submit">
                                Submit Request
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {message && <div className="alert alert-info">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            {activeRequests.length === 0 && !error && (
                <div className="alert alert-info">No active maintenance requests.</div>
            )}

            {activeRequests.map((request) => renderRequestCard(request))}

            <div className="mt-4">
                <button
                    className="btn btn-secondary mb-3"
                    onClick={() => setShowServiceHistory(!showServiceHistory)}
                >
                    {showServiceHistory
                        ? "Hide Service History"
                        : `Show Service History (${completedRequests.length})`}
                </button>

                {showServiceHistory && (
                    <div>
                        <h2>Service History</h2>

                        {completedRequests.length === 0 ? (
                            <div className="alert alert-secondary">
                                No completed maintenance requests.
                            </div>
                        ) : (
                            completedRequests.map((request) =>
                                renderRequestCard(request, true)
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Maintenance;