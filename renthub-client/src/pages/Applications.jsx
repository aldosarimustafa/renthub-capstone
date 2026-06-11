import { useEffect, useState } from "react";
import api from "../api/api";

function Applications() {
    const user = JSON.parse(localStorage.getItem("user"));
    const role = user?.role;

    const [applications, setApplications] = useState([]);
    const [message, setMessage] = useState("");
    const [showApproved, setShowApproved] = useState(false);
    const [showRejected, setShowRejected] = useState(false);

    const loadApplications = () => {
        api
            .get("/applications")
            .then((res) => setApplications(res.data))
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        loadApplications();
    }, []);

    const updateStatus = async (id, status) => {
        try {
            await api.put(`/applications/${id}`, { status });
            setMessage(`Application moved to ${status}.`);
            loadApplications();
        } catch (error) {
            console.error(error);
            setMessage("Failed to update application.");
        }
    };

    const pendingApplications = applications.filter(
        (app) => app.status === "Pending"
    );

    const approvedApplications = applications.filter(
        (app) => app.status === "Approved"
    );

    const rejectedApplications = applications.filter(
        (app) => app.status === "Rejected"
    );

    const renderApplicationCard = (application, showButtons = false) => (
        <div key={application._id} className="card mb-3 shadow-sm">
            <div className="card-body">
                <h4>{application.propertyId?.title}</h4>

                <p>
                    <strong>Applicant:</strong> {application.applicantId?.fullName}
                </p>

                <p>
                    <strong>Email:</strong> {application.applicantId?.email}
                </p>

                <p>
                    <strong>Monthly Income:</strong> ${application.monthlyIncome}
                </p>

                <p>
                    <strong>Employment:</strong> {application.employmentStatus}
                </p>

                <p>
                    <strong>Notes:</strong> {application.notes}
                </p>

                <p>
                    <strong>Status:</strong> {application.status}
                </p>

                <p>
                    <strong>Applied:</strong>{" "}
                    {new Date(application.createdAt).toLocaleString()}
                </p>

                {showButtons && role === "Administrator" && (
                    <>
                        <button
                            className="btn btn-success me-2"
                            onClick={() => updateStatus(application._id, "Approved")}
                        >
                            Approve
                        </button>

                        <button
                            className="btn btn-danger"
                            onClick={() => updateStatus(application._id, "Rejected")}
                        >
                            Reject
                        </button>
                    </>
                )}
            </div>
        </div>
    );

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Applications</h1>

            {message && <div className="alert alert-info">{message}</div>}

            <h2>Pending Applications</h2>
            {pendingApplications.length === 0 ? (
                <div className="alert alert-secondary">
                    No pending applications.
                </div>
            ) : (
                pendingApplications.map((application) =>
                    renderApplicationCard(application, true)
                )
            )}

            <div className="mt-4">
                <button
                    className="btn btn-success me-2 mb-3"
                    onClick={() => setShowApproved(!showApproved)}
                >
                    {showApproved
                        ? "Hide Approved Applications"
                        : `Show Approved Applications (${approvedApplications.length})`}
                </button>

                <button
                    className="btn btn-danger mb-3"
                    onClick={() => setShowRejected(!showRejected)}
                >
                    {showRejected
                        ? "Hide Rejected Applications"
                        : `Show Rejected Applications (${rejectedApplications.length})`}
                </button>
            </div>

            {showApproved && (
                <div>
                    <h2 className="mt-3">Approved Applications</h2>

                    {approvedApplications.length === 0 ? (
                        <div className="alert alert-secondary">
                            No approved applications.
                        </div>
                    ) : (
                        approvedApplications.map((application) =>
                            renderApplicationCard(application)
                        )
                    )}
                </div>
            )}

            {showRejected && (
                <div>
                    <h2 className="mt-3">Rejected Applications</h2>

                    {rejectedApplications.length === 0 ? (
                        <div className="alert alert-secondary">
                            No rejected applications.
                        </div>
                    ) : (
                        rejectedApplications.map((application) =>
                            renderApplicationCard(application)
                        )
                    )}
                </div>
            )}
        </div>
    );
}

export default Applications;