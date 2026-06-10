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
        <div>
            <h1>Payments</h1>

            {error && <p>{error}</p>}

            {payments.length === 0 && !error && <p>No payments found.</p>}

            {payments.map((payment) => (
                <div
                    key={payment._id}
                    style={{
                        border: "1px solid #ccc",
                        marginBottom: "15px",
                        padding: "10px",
                    }}
                >
                    <h3>${payment.amount}</h3>
                    <p>Status: {payment.paymentStatus}</p>
                    <p>Method: {payment.paymentMethod}</p>
                    <p>Date: {new Date(payment.paymentDate).toLocaleDateString()}</p>
                    <p>Tenant: {payment.tenantId?.fullName}</p>
                    <p>Lease: {payment.leaseId?._id}</p>
                </div>
            ))}
        </div>
    );
}

export default Payments;