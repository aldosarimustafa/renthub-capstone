import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h2>RentHub</h2>

      <div>
        <Link to="/">Home</Link> |{" "}
        <Link to="/properties">Properties</Link> |{" "}
        <Link to="/login">Login</Link> |{" "}
        <Link to="/register">Register</Link> |{" "}
        <Link to="/reports">Reports</Link>
      </div>
    </nav>
  );
}

export default Navbar;