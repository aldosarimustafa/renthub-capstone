import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("tenant2@test.com");
    const [password, setPassword] = useState("password123");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/auth/login", {
                email,
                password,
            });

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            setMessage("Login successful");
            window.location.href = "/properties";
        } catch (error) {
            setMessage("Login failed");
            console.error(error);
        }
    };

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <h1 className="mb-4">Login</h1>

                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                >
                                    Login
                                </button>
                            </form>

                            {message && (
                                <p className="mt-3">
                                    {message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;