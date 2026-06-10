import { useEffect, useState } from "react";
import api from "../api/api";

function Payments() {
    const [payments, setPayments] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        api
            .get("/payments")
            .then((res) => setPayments(res.data))
            .catch((err) => {
                console.error(err);
                setError("Unable to load payments.");
            });
    }, []);

    return (
        <div className="container mt-4">
            <h1>Payments</h1>

            {error && <p>{error}</p>}

            {payments.length === 0 && !error && <p>No payments found.</p>}

            {payments.map((payment) => (
                <div
                    key={payment._id}
                    className="card mb-3 shadow-sm"
                >
                    <div className="card-body">
                        <h4 className="card-title">
                            ${payment.amount}
                        </h4>

                        <div className="row">
                            <div className="col-md-6">
                                <p>
                                    <strong>Status:</strong>{" "}
                                    {payment.paymentStatus}
                                </p>

                                <p>
                                    <strong>Method:</strong>{" "}
                                    {payment.paymentMethod}
                                </p>
                            </div>

                            <div className="col-md-6">
                                <p>
                                    <strong>Tenant:</strong>{" "}
                                    {payment.tenantId?.fullName}
                                </p>

                                <p>
                                    <strong>Date:</strong>{" "}
                                    {new Date(
                                        payment.paymentDate
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Payments;