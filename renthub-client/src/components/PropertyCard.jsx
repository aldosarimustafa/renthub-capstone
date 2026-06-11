import { Link } from "react-router-dom";

function PropertyCard({ property }) {
    return (
        <div className="card mb-4 shadow-sm">
            {property.imageUrl && (
                <img
                    src={property.imageUrl}
                    alt={property.title}
                    className="card-img-top"
                    style={{
                        height: "250px",
                        objectFit: "cover",
                    }}
                />
            )}

            <div className="card-body">
                <h4 className="card-title">
                    {property.title}
                </h4>

                <p className="card-text">
                    {property.city}, {property.state}
                </p>

                <p>
                    <strong>
                        ${property.rentAmount}/month
                    </strong>
                </p>

                <p>
                    {property.bedrooms} Bed •{" "}
                    {property.bathrooms} Bath
                </p>

                <p>
                    <span className="badge bg-success">
                        {property.status}
                    </span>
                </p>

                <Link
                    className="btn btn-primary"
                    to={`/properties/${property._id}`}
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}

export default PropertyCard;