import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

function PropertyDetails() {
    const { id } = useParams();
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
        <div>
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

            <h2>Apply for this property</h2>

            <form onSubmit={handleApply}>
                <div>
                    <label>Monthly Income</label>
                    <br />
                    <input
                        type="number"
                        value={monthlyIncome}
                        onChange={(e) => setMonthlyIncome(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Employment Status</label>
                    <br />
                    <input
                        value={employmentStatus}
                        onChange={(e) => setEmploymentStatus(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Notes</label>
                    <br />
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>

                <button type="submit">Apply Now</button>
            </form>

            <p>{message}</p>
        </div>
    );
}

export default PropertyDetails;