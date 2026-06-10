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
        <div>
            <h1>Leases</h1>

            {error && <p>{error}</p>}

            {leases.length === 0 && !error && (
                <p>No leases found.</p>
            )}

            {leases.map((lease) => (
                <div
                    key={lease._id}
                    style={{
                        border: "1px solid #ccc",
                        marginBottom: "15px",
                        padding: "10px",
                    }}
                >
                    <h3>{lease.propertyId?.title}</h3>

                    <p>
                        Tenant: {lease.tenantId?.fullName}
                    </p>

                    <p>
                        Monthly Rent: ${lease.monthlyRent}
                    </p>

                    <p>
                        Status: {lease.leaseStatus}
                    </p>

                    <p>
                        Start: {new Date(
                            lease.startDate
                        ).toLocaleDateString()}
                    </p>

                    <p>
                        End: {new Date(
                            lease.endDate
                        ).toLocaleDateString()}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default Leases;