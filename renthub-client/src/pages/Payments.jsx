import { useEffect, useState } from "react";
import api from "../api/api";

function Payments() {
    const user = JSON.parse(localStorage.getItem("user"));

    const [payments, setPayments] = useState([]);
    const [leases, setLeases] = useState([]);
    const [message, setMessage] = useState("");

    const [form, setForm] = useState({
        leaseId: "",
        amount: "",
        paymentMethod: "Transfer",
    });

    const [cardInfo, setCardInfo] = useState({
        cardNumber: "",
        cardHolder: "",
        expiryDate: "",
        cvv: "",
    });

    const loadData = () => {
        api.get("/payments").then((res) => setPayments(res.data));

        if (user?.role === "Tenant") {
            api.get("/leases").then((res) => {
                setLeases(res.data);

                if (res.data.length > 0) {
                    setForm({
                        leaseId: res.data[0]._id,
                        amount: res.data[0].monthlyRent,
                        paymentMethod: "Transfer",
                    });
                }
            });
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "leaseId") {
            const selectedLease = leases.find((lease) => lease._id === value);

            setForm({
                ...form,
                leaseId: value,
                amount: selectedLease?.monthlyRent || "",
            });
        } else {
            setForm({
                ...form,
                [name]: value,
            });
        }
    };

    const handleCardChange = (e) => {
        setCardInfo({
            ...cardInfo,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.paymentMethod === "Card") {
            if (
                !cardInfo.cardNumber ||
                !cardInfo.cardHolder ||
                !cardInfo.expiryDate ||
                !cardInfo.cvv
            ) {
                setMessage("Please complete all card fields.");
                return;
            }
        }

        try {
            await api.post("/payments", {
                leaseId: form.leaseId,
                amount: form.amount,
                paymentMethod: form.paymentMethod,
                paymentStatus: "Paid",
            });

            setMessage("Payment submitted successfully.");

            setCardInfo({
                cardNumber: "",
                cardHolder: "",
                expiryDate: "",
                cvv: "",
            });

            loadData();
        } catch (error) {
            console.error(error);
            setMessage("Payment failed.");
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Payments</h1>

            {user?.role === "Tenant" && (
                <div className="card mb-4 shadow-sm">
                    <div className="card-body">
                        <h3>Submit Payment</h3>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Lease</label>
                                <select
                                    className="form-select"
                                    name="leaseId"
                                    value={form.leaseId}
                                    onChange={handleChange}
                                    required
                                >
                                    {leases.map((lease) => (
                                        <option key={lease._id} value={lease._id}>
                                            {lease.propertyId?.title} - ${lease.monthlyRent}/month
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Amount</label>
                                <input
                                    className="form-control"
                                    name="amount"
                                    type="number"
                                    value={form.amount}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Payment Method</label>
                                <select
                                    className="form-select"
                                    name="paymentMethod"
                                    value={form.paymentMethod}
                                    onChange={handleChange}
                                >
                                    <option>Transfer</option>
                                    <option>Card</option>
                                    <option>Cash</option>
                                </select>
                            </div>

                            {form.paymentMethod === "Card" && (
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <h5>Card Information</h5>

                                        <div className="alert alert-warning">
                                            Demo only. Do not enter real card information.
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Card Number</label>
                                            <input
                                                className="form-control"
                                                name="cardNumber"
                                                value={cardInfo.cardNumber}
                                                onChange={handleCardChange}
                                                placeholder="1234 5678 9012 3456"
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Card Holder Name</label>
                                            <input
                                                className="form-control"
                                                name="cardHolder"
                                                value={cardInfo.cardHolder}
                                                onChange={handleCardChange}
                                            />
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Expiry Date</label>
                                                <input
                                                    className="form-control"
                                                    name="expiryDate"
                                                    value={cardInfo.expiryDate}
                                                    onChange={handleCardChange}
                                                    placeholder="MM/YY"
                                                />
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">CVV</label>
                                                <input
                                                    className="form-control"
                                                    name="cvv"
                                                    value={cardInfo.cvv}
                                                    onChange={handleCardChange}
                                                    placeholder="123"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <button className="btn btn-primary" type="submit">
                                Submit Payment
                            </button>
                        </form>

                        {message && <div className="alert alert-info mt-3">{message}</div>}
                    </div>
                </div>
            )}

            {user?.role === "Administrator" && (
                <div className="alert alert-info">
                    Administrator view: payment records are shown below.
                </div>
            )}

            <h2 className="mb-3">Payment History</h2>

            {payments.map((payment) => (
                <div key={payment._id} className="card mb-3 shadow-sm">
                    <div className="card-body">
                        <h4>${payment.amount}</h4>

                        <p>
                            <strong>Status:</strong> {payment.paymentStatus}
                        </p>

                        <p>
                            <strong>Method:</strong> {payment.paymentMethod}
                        </p>

                        <p>
                            <strong>Tenant:</strong> {payment.tenantId?.fullName}
                        </p>

                        <p>
                            <strong>Property:</strong>{" "}
                            {payment.leaseId?.propertyId?.title || "Property not available"}
                        </p>

                        <p>
                            <strong>Property Address:</strong>{" "}
                            {payment.leaseId?.propertyId?.address || "Address not available"}
                        </p>

                        <p>
                            <strong>Payment Date:</strong>{" "}
                            {new Date(payment.paymentDate).toLocaleString()}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Payments;