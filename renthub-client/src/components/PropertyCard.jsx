import { Link } from "react-router-dom";

function PropertyCard({ property }) {
    return (
        <div style={{ border: "1px solid #ddd", padding: "15px", margin: "10px" }}>
            <h3>{property.title}</h3>
            <p>{property.city}, {property.state}</p>
            <p>${property.rentAmount}/month</p>
            <p>{property.bedrooms} bed • {property.bathrooms} bath</p>

            <Link to={`/properties/${property._id}`}>View Details</Link>
        </div>
    );
}

export default PropertyCard;