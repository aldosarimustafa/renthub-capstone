import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function Register() {
    const navigate = useNavigate();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("Tenant");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await api.post("/auth/register", {
                fullName,
                email,
                password,
                role,
                phone,
            });

            setMessage("Registration successful. Redirecting to login...");
            setTimeout(() => navigate("/login"), 1000);
        } catch (error) {
            setMessage("Registration failed. Email may already exist.");
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Register</h1>

            <form onSubmit={handleRegister}>
                <input placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                <br />

                <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <br />

                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <br />

                <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <br />

                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option>Tenant</option>
                    <option>Property Manager</option>
                    <option>Administrator</option>
                </select>
                <br />

                <button type="submit">Register</button>
            </form>

            <p>{message}</p>
        </div>
    );
}

export default Register;