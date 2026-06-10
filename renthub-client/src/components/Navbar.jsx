import { Link } from "react-router-dom";

function Navbar() {
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
            <Link className="navbar-brand" to="/">
                RentHub
            </Link>

            <div className="navbar-nav">
                <Link className="nav-link" to="/properties">
                    Properties
                </Link>

                <Link className="nav-link" to="/maintenance">
                    Maintenance
                </Link>

                <Link className="nav-link" to="/leases">
                    Leases
                </Link>

                <Link className="nav-link" to="/payments">
                    Payments
                </Link>

                <Link className="nav-link" to="/reports">
                    Reports
                </Link>

                <Link className="nav-link" to="/login">
                    Login
                </Link>

                <Link className="nav-link" to="/register">
                    Register
                </Link>
            </div>

            <div className="ms-auto">
                <button
                    className="btn btn-outline-light"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;