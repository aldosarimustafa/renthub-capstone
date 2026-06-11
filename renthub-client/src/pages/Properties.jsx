import { useEffect, useState } from "react";
import api from "../api/api";
import PropertyCard from "../components/PropertyCard";

function Properties() {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        api.get("/properties")
            .then((res) => setProperties(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="container mt-4">
            <h1>Available Properties</h1>

            {properties.length === 0 ? (
                <div className="alert alert-info mt-3">
                    No current properties available.
                </div>
            ) : (
                properties.map((property) => (
                    <PropertyCard key={property._id} property={property} />
                ))
            )}
        </div>
    );
}

export default Properties;