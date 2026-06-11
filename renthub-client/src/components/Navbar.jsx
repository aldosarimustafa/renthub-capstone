import { Link } from "react-router-dom";

function Navbar() {
    const user = JSON.parse(localStorage.getItem("user"));
    const role = user?.role;

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/";
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
            <Link className="navbar-brand fw-bold" to="/">
                RentHub
            </Link>

            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#rentHubNavbar"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="rentHubNavbar">
                <div className="navbar-nav me-auto">
                    {role === "Tenant" && (
                        <>
                            <Link className="nav-link" to="/tenant-dashboard">
                                Dashboard
                            </Link>

                            <Link className="nav-link" to="/properties">
                                Properties
                            </Link>

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

                    {role === "Administrator" && (
                        <>
                            <Link className="nav-link" to="/admin">
                                Admin Dashboard
                            </Link>

                            <Link className="nav-link" to="/properties">
                                Properties
                            </Link>

                            <Link className="nav-link" to="/applications">
                                Applications
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
                        </>
                    )}

                    {!user && (
                        <Link className="nav-link" to="/properties">
                            Properties
                        </Link>
                    )}
                </div>

                {!user ? (
                    <div className="dropdown">
                        <button
                            className="btn btn-light dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                        >
                            Account
                        </button>

                        <ul className="dropdown-menu dropdown-menu-end">
                            <li>
                                <Link className="dropdown-item" to="/login">
                                    Login
                                </Link>
                            </li>

                            <li>
                                <Link className="dropdown-item" to="/register">
                                    Register
                                </Link>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <div className="dropdown">
                        <button
                            className="btn btn-outline-light dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                        >
                            {user.fullName || user.email}
                        </button>

                        <ul className="dropdown-menu dropdown-menu-end">
                            <li>
                                <span className="dropdown-item-text">
                                    Role: {role}
                                </span>
                            </li>

                            <li>
                                <hr className="dropdown-divider" />
                            </li>

                            <li>
                                <button
                                    className="dropdown-item"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;