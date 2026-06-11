import { Link } from "react-router-dom";

function Navbar() {
    const user = JSON.parse(localStorage.getItem("user"));
    const role = user?.role;

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

                {role === "Tenant" && (
                    <>
                        <Link className="nav-link" to="/maintenance">
                            Maintenance
                        </Link>

                        <Link className="nav-link" to="/leases">
                            My Lease
                        </Link>

                        <Link className="nav-link" to="/payments">
                            My Payments
                        </Link>

                        <Link className="nav-link" to="/applications">
                            My Applications
                        </Link>
                    </>
                )}

                {(role === "Administrator" || role === "Property Manager") && (
                    <>
                        <Link className="nav-link" to="/admin">
                            Admin
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

                        <Link className="nav-link" to="/applications">
                            Applications
                        </Link>

                        <Link className="nav-link" to="/tenant-dashboard">
                            Dashboard
                        </Link>
                    </>
                )}

                {!user && (
                    <>
                        <Link className="nav-link" to="/login">
                            Login
                        </Link>

                        <Link className="nav-link" to="/register">
                            Register
                        </Link>
                    </>
                )}
            </div>

            {user && (
                <div className="ms-auto">
                    <button
                        className="btn btn-outline-light"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
}

export default Navbar;