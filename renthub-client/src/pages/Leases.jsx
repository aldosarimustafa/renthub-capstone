import { useEffect, useState } from "react";
import api from "../api/api";

function Leases() {
    const user = JSON.parse(localStorage.getItem("user"));
    const role = user?.role;

    const [leases, setLeases] = useState([]);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const [editingLease, setEditingLease] = useState(null);

    const [leaseForm, setLeaseForm] = useState({
        startDate: "",
        endDate: "",
        monthlyRent: "",
        leaseStatus: "Active",
    });

    const loadLeases = () => {
        api
            .get("/leases")
            .then((res) => setLeases(res.data))
            .catch((err) => {
                console.error(err);
                setError("Unable to load leases.");
            });
    };

    useEffect(() => {
        loadLeases();
    }, []);

    const handleEditLease = (lease) => {
        setEditingLease(lease._id);

        setLeaseForm({
            startDate: lease.startDate.split("T")[0],
            endDate: lease.endDate.split("T")[0],
            monthlyRent: lease.monthlyRent,
            leaseStatus: lease.leaseStatus,
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const handleLeaseChange = (e) => {
        setLeaseForm({
            ...leaseForm,
            [e.target.name]: e.target.value,
        });
    };

    const saveLease = async () => {
        try {
            await api.put(`/leases/${editingLease}`, leaseForm);

            setMessage("Lease updated successfully.");
            setEditingLease(null);
            loadLeases();
        } catch (error) {
            console.error(error);
            setMessage("Failed to update lease.");
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Leases</h1>

            {message && (
                <div className="alert alert-info">
                    {message}
                </div>
            )}

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            {editingLease && role === "Administrator" && (
                <div className="card mb-4 shadow-sm">
                    <div className="card-body">
                        <h3>Edit Lease</h3>

                        <div className="mb-3">
                            <label className="form-label">Start Date</label>
                            <input
                                type="date"
                                className="form-control"
                                name="startDate"
                                value={leaseForm.startDate}
                                onChange={handleLeaseChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">End Date</label>
                            <input
                                type="date"
                                className="form-control"
                                name="endDate"
                                value={leaseForm.endDate}
                                onChange={handleLeaseChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Monthly Rent</label>
                            <input
                                type="number"
                                className="form-control"
                                name="monthlyRent"
                                value={leaseForm.monthlyRent}
                                onChange={handleLeaseChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Status</label>
                            <select
                                className="form-select"
                                name="leaseStatus"
                                value={leaseForm.leaseStatus}
                                onChange={handleLeaseChange}
                            >
                                <option>Active</option>
                                <option>Expired</option>
                                <option>Terminated</option>
                            </select>
                        </div>

                        <button
                            className="btn btn-success me-2"
                            onClick={saveLease}
                        >
                            Save Changes
                        </button>

                        <button
                            className="btn btn-secondary"
                            onClick={() => setEditingLease(null)}
                        >
                            Cancel
                        </button>
                    </div>
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
                                    <strong>Email:</strong>{" "}
                                    {lease.tenantId?.email}
                                </p>

                                <p>
                                    <strong>Property Address:</strong>{" "}
                                    {lease.propertyId?.address},{" "}
                                    {lease.propertyId?.city},{" "}
                                    {lease.propertyId?.state}
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

                                {role === "Administrator" && (
                                    <button
                                        className="btn btn-warning mt-2"
                                        onClick={() => handleEditLease(lease)}
                                    >
                                        Edit Lease
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Leases;