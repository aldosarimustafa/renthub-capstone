import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import Navbar from "./components/Navbar";
import Reports from "./pages/Reports";
import Maintenance from "./pages/Maintenance";
import Payments from "./pages/Payments";
import Leases from "./pages/Leases";
import AdminDashboard from "./pages/AdminDashboard";
import Applications from "./pages/Applications";
import ProtectedRoute from "./components/ProtectedRoute";
import TenantDashboard from "./pages/TenantDashboard";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/properties" element={<Properties />} />

        <Route
          path="/properties/:id"
          element={<PropertyDetails />}
        />
        <Route path="/reports" element={<Reports />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/maintenance" element={<Maintenance />} />

        <Route path="/payments" element={<Payments />} />

        <Route path="/leases" element={<Leases />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="Administrator">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tenant-dashboard"
          element={
            <ProtectedRoute role="Tenant">
              <TenantDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/applications" element={<Applications />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;