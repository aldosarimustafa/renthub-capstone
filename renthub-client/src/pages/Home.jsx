import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
            <div
                className="text-white text-center d-flex align-items-center"
                style={{
                    minHeight: "500px",
                    backgroundImage:
                        "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('https://images.unsplash.com/photo-1568605114967-8130f3a36994')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="container">
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
                <div className="row text-center">
                    <div className="col-md-4 mb-4">
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                                <h4>Browse Rentals</h4>
                                <p>Search available properties by city, rent, and bedrooms.</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-4">
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                                <h4>Apply Online</h4>
                                <p>Submit rental applications and track approval status.</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-4">
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                                <h4>Manage Your Lease</h4>
                                <p>View leases, payments, and maintenance requests.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;