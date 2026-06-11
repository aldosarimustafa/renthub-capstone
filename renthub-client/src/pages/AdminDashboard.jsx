import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function AdminDashboard() {
    const navigate = useNavigate();

    const [message, setMessage] = useState("");
    const [properties, setProperties] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const [stats, setStats] = useState({
        totalProperties: 0,
        pendingApplications: 0,
        openMaintenance: 0,
        totalPayments: 0,
    });

    const emptyForm = {
        title: "",
        description: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        rentAmount: "",
        bedrooms: "",
        bathrooms: "",
        imageUrl: "",
        status: "Available",
    };

    const [form, setForm] = useState(emptyForm);

    const loadProperties = () => {
        api.get("/properties")
            .then((res) => setProperties(res.data))
            .catch((err) => console.error(err));
    };

    const loadDashboardData = async () => {
        try {
            const [propertiesRes, applicationsRes, maintenanceRes, paymentsRes] =
                await Promise.all([
                    api.get("/properties"),
                    api.get("/applications"),
                    api.get("/maintenance"),
                    api.get("/payments"),
                ]);

            setStats({
                totalProperties: propertiesRes.data.length,
                pendingApplications: applicationsRes.data.filter(
                    (a) => a.status === "Pending"
                ).length,
                openMaintenance: maintenanceRes.data.filter(
                    (m) => m.status !== "Completed"
                ).length,
                totalPayments: paymentsRes.data.length,
            });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadProperties();
        loadDashboardData();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const resetForm = () => {
        setForm(emptyForm);
        setEditingId(null);
    };

    const refreshAdminData = () => {
        loadProperties();
        loadDashboardData();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingId) {
                await api.put(`/properties/${editingId}`, form);
                setMessage("Property updated successfully");
            } else {
                await api.post("/properties", form);
                setMessage("Property added successfully");
            }

            resetForm();
            refreshAdminData();
        } catch (error) {
            console.error(error);
            setMessage("Property save failed. Admin access required.");
        }
    };

    const handleEdit = (property) => {
        setEditingId(property._id);

        setForm({
            title: property.title || "",
            description: property.description || "",
            address: property.address || "",
            city: property.city || "",
            state: property.state || "",
            zipCode: property.zipCode || "",
            rentAmount: property.rentAmount || "",
            bedrooms: property.bedrooms || "",
            bathrooms: property.bathrooms || "",
            imageUrl: property.imageUrl || "",
            status: property.status || "Available",
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const handleDelete = async (propertyId) => {
        try {
            await api.delete(`/properties/${propertyId}`);
            setMessage("Property deleted successfully");
            refreshAdminData();
        } catch (error) {
            console.error(error);
            setMessage("Failed to delete property.");
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Admin Dashboard</h1>

            <div className="row mb-4">
                <div className="col-md-3 mb-3">
                    <div className="card text-center shadow-sm">
                        <div className="card-body">
                            <h2>{stats.totalProperties}</h2>
                            <p>Total Properties</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="card text-center shadow-sm">
                        <div className="card-body">
                            <h2>{stats.pendingApplications}</h2>
                            <p>Pending Applications</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="card text-center shadow-sm">
                        <div className="card-body">
                            <h2>{stats.openMaintenance}</h2>
                            <p>Open Requests</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="card text-center shadow-sm">
                        <div className="card-body">
                            <h2>{stats.totalPayments}</h2>
                            <p>Total Payments</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card shadow-sm mb-4">
                <div className="card-body">
                    <h3>{editingId ? "Editing Property" : "Add Property"}</h3>

                    {editingId && (
                        <div className="alert alert-warning">
                            You are currently editing a property. Make your changes below,
                            then click Update Property.
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <input className="form-control mb-3" name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
                        <textarea className="form-control mb-3" name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
                        <input className="form-control mb-3" name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
                        <input className="form-control mb-3" name="city" placeholder="City" value={form.city} onChange={handleChange} required />
                        <input className="form-control mb-3" name="state" placeholder="State" value={form.state} onChange={handleChange} required />
                        <input className="form-control mb-3" name="zipCode" placeholder="Zip Code" value={form.zipCode} onChange={handleChange} required />
                        <input className="form-control mb-3" name="rentAmount" type="number" placeholder="Rent Amount" value={form.rentAmount} onChange={handleChange} required />
                        <input className="form-control mb-3" name="bedrooms" type="number" placeholder="Bedrooms" value={form.bedrooms} onChange={handleChange} required />
                        <input className="form-control mb-3" name="bathrooms" type="number" placeholder="Bathrooms" value={form.bathrooms} onChange={handleChange} required />
                        <input className="form-control mb-3" name="imageUrl" placeholder="Property Image URL" value={form.imageUrl} onChange={handleChange} />

                        <select className="form-select mb-3" name="status" value={form.status} onChange={handleChange}>
                            <option>Available</option>
                            <option>Occupied</option>
                            <option>Maintenance</option>
                        </select>

                        <button className="btn btn-primary me-2" type="submit">
                            {editingId ? "Update Property" : "Add Property"}
                        </button>

                        {editingId && (
                            <button type="button" className="btn btn-secondary" onClick={resetForm}>
                                Cancel Edit
                            </button>
                        )}
                    </form>

                    {message && <div className="alert alert-info mt-3">{message}</div>}
                </div>
            </div>

            <h2 className="mb-3">Manage Properties</h2>

            {properties.map((property) => (
                <div key={property._id} className="card mb-3 shadow-sm">
                    <div className="row g-0">
                        {property.imageUrl && (
                            <div className="col-md-4">
                                <img
                                    src={property.imageUrl}
                                    alt={property.title}
                                    className="img-fluid rounded-start"
                                    style={{
                                        height: "100%",
                                        minHeight: "200px",
                                        objectFit: "cover",
                                    }}
                                />
                            </div>
                        )}

                        <div className={property.imageUrl ? "col-md-8" : "col-md-12"}>
                            <div className="card-body">
                                <h4>{property.title}</h4>
                                <p>{property.description}</p>

                                <p>
                                    {property.address}, {property.city}, {property.state} {property.zipCode}
                                </p>

                                <p>
                                    <strong>${property.rentAmount}/month</strong>
                                </p>

                                <p>
                                    {property.bedrooms} Bed • {property.bathrooms} Bath
                                </p>

                                <p>
                                    <strong>Status:</strong>{" "}
                                    <span
                                        className={
                                            property.status === "Occupied"
                                                ? "badge bg-danger"
                                                : property.status === "Maintenance"
                                                    ? "badge bg-warning text-dark"
                                                    : "badge bg-success"
                                        }
                                    >
                                        {property.status}
                                    </span>
                                </p>

                                {property.status === "Occupied" && (
                                    <div className="alert alert-warning mt-3">
                                        <h6>Occupancy Information</h6>

                                        {property.occupiedBy ? (
                                            <>
                                                <p>
                                                    <strong>Tenant:</strong> {property.occupiedBy.fullName}
                                                </p>

                                                <p>
                                                    <strong>Email:</strong> {property.occupiedBy.email}
                                                </p>

                                                <p>
                                                    <strong>Lease Start:</strong>{" "}
                                                    {property.leaseStartDate
                                                        ? new Date(property.leaseStartDate).toLocaleDateString()
                                                        : "N/A"}
                                                </p>

                                                <p>
                                                    <strong>Lease End:</strong>{" "}
                                                    {property.leaseEndDate
                                                        ? new Date(property.leaseEndDate).toLocaleDateString()
                                                        : "N/A"}
                                                </p>
                                            </>
                                        ) : (
                                            <p>No active lease found.</p>
                                        )}
                                    </div>
                                )}

                                <button className="btn btn-warning me-2" onClick={() => handleEdit(property)}>
                                    Edit Property
                                </button>

                                {property.status === "Occupied" && (
                                    <button className="btn btn-info me-2" onClick={() => navigate("/leases")}>
                                        Manage Lease
                                    </button>
                                )}

                                <button className="btn btn-danger" onClick={() => handleDelete(property._id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AdminDashboard;