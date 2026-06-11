import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

function PropertyDetails() {
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem("user"));
    const role = user?.role;

    const [property, setProperty] = useState(null);
    const [monthlyIncome, setMonthlyIncome] = useState("");
    const [employmentStatus, setEmploymentStatus] = useState("");
    const [notes, setNotes] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        api
            .get(`/properties/${id}`)
            .then((res) => setProperty(res.data))
            .catch((err) => console.error("Property details error:", err));
    }, [id]);

    const handleApply = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/applications", {
                propertyId: id,
                monthlyIncome,
                employmentStatus,
                notes,
            });

            setMessage(res.data.message);
        } catch (error) {
            setMessage("Application failed. Please login first.");
            console.error(error);
        }
    };

    if (!property) {
        return <p>Loading property...</p>;
    }

    return (
        <div className="container mt-4">
            {property.imageUrl && (
                <img
                    src={property.imageUrl}
                    alt={property.title}
                    className="img-fluid rounded mb-4"
                    style={{
                        maxHeight: "400px",
                        width: "100%",
                        objectFit: "cover",
                    }}
                />
            )}

            <h1>{property.title}</h1>
            <p>{property.description}</p>
            <p>{property.address}</p>
            <p>
                {property.city}, {property.state} {property.zipCode}
            </p>
            <p>${property.rentAmount}/month</p>
            <p>{property.bedrooms} bedrooms</p>
            <p>{property.bathrooms} bathrooms</p>
            <p>Status: {property.status}</p>

            {role === "Tenant" && (
                <div className="card mt-4 shadow-sm">
                    <div className="card-body">
                        <h2>Apply for this property</h2>

                        <form onSubmit={handleApply}>
                            <div className="mb-3">
                                <label className="form-label">Monthly Income</label>
                                <input
                                    className="form-control"
                                    type="number"
                                    value={monthlyIncome}
                                    onChange={(e) => setMonthlyIncome(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Employment Status</label>
                                <input
                                    className="form-control"
                                    value={employmentStatus}
                                    onChange={(e) => setEmploymentStatus(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Notes</label>
                                <textarea
                                    className="form-control"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                />
                            </div>

                            <button className="btn btn-primary" type="submit">
                                Apply Now
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {role === "Administrator" && (
                <div className="alert alert-info mt-4">
                    Administrator view: applications are managed from the Applications page.
                </div>
            )}

            {message && <div className="alert alert-info mt-3">{message}</div>}
        </div>
    );
}

export default PropertyDetails;