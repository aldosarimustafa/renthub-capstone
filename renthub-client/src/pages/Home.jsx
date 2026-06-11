import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropertySlideshow from "../components/PropertySlideshow";
import api from "../api/api";

function Home() {
    const [featuredProperties, setFeaturedProperties] = useState([]);

    useEffect(() => {
        api
            .get("/properties")
            .then((res) => setFeaturedProperties(res.data.slice(0, 3)))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div>
            <div className="position-relative">
                <PropertySlideshow />

                <div className="position-absolute top-50 start-50 translate-middle text-center text-white hero-overlay">
                    <h1 className="display-3 fw-bold">Welcome to RentHub</h1>
                    <p className="lead">
                        Find, apply, and manage your rental property in one place.
                    </p>

                    <Link to="/properties" className="btn btn-primary btn-lg me-3">
                        Browse Properties
                    </Link>

                    <Link to="/register" className="btn btn-outline-light btn-lg">
                        Get Started
                    </Link>
                </div>
            </div>

            <div className="container mt-5">
                <h2 className="mb-4 text-center">Featured Properties</h2>

                <div className="row">
                    {featuredProperties.length === 0 ? (
                        <div className="alert alert-info">
                            No featured properties available right now.
                        </div>
                    ) : (
                        featuredProperties.map((property) => (
                            <div className="col-md-4 mb-4" key={property._id}>
                                <div className="card shadow-sm h-100">
                                    {property.imageUrl && (
                                        <img
                                            src={property.imageUrl}
                                            alt={property.title}
                                            className="card-img-top"
                                            style={{
                                                height: "220px",
                                                objectFit: "cover",
                                            }}
                                        />
                                    )}

                                    <div className="card-body">
                                        <h4>{property.title}</h4>

                                        <p>
                                            {property.city}, {property.state}
                                        </p>

                                        <p>
                                            <strong>${property.rentAmount}/month</strong>
                                        </p>

                                        <p>
                                            {property.bedrooms} Bed • {property.bathrooms} Bath
                                        </p>

                                        <Link
                                            to={`/properties/${property._id}`}
                                            className="btn btn-primary"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;