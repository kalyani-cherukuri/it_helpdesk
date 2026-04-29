// src/App.jsx

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

/* Public */
import Login from "./pages/Login";
import Register from "./pages/Register";

/* Layouts */
import AdminLayout from "./layout/AdminLayout";
import EmployeeLayout from "./layout/EmployeeLayout";
import AgentLayout from "./layout/AgentLayout";
import ManagerLayout from "./layout/ManagerLayout";

/* Dashboards */
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import AgentDashboard from "./pages/AgentDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";

/* Admin Pages */
import Users from "./pages/Users";
import Assets from "./pages/Assets";
import Allocations from "./pages/Allocations";
import Tickets from "./pages/Tickets";
import Reports from "./pages/Reports";

/* Employee Pages */
import RaiseTicket from "./pages/RaiseTicket";
import MyTickets from "./pages/MyTickets";
import MyAssets from "./pages/MyAssets";

/* Agent Pages */
import AssignedTickets from "./pages/AssignedTickets";

/* Manager Pages */
import EscalatedTickets from "./pages/EscalatedTickets";

/* Auth */
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ================= ADMIN ================= */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/allocations" element={<Allocations />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/reports" element={<Reports />} />
        </Route>

        {/* ================= EMPLOYEE ================= */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["EMPLOYEE"]}>
              <EmployeeLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/employee" element={<EmployeeDashboard />} />
          <Route path="/employee/raise-ticket" element={<RaiseTicket />} />
          <Route path="/employee/my-tickets" element={<MyTickets />} />
          <Route path="/employee/my-assets" element={<MyAssets />} />
        </Route>

        {/* ================= AGENT ================= */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["IT_SUPPORT_AGENT"]}>
              <AgentLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/agent" element={<AgentDashboard />} />
          <Route path="/agent/tickets" element={<AssignedTickets />} />
        </Route>

        {/* ================= MANAGER ================= */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["IT_MANAGER"]}>
              <ManagerLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/manager" element={<ManagerDashboard />} />
          <Route path="/manager/escalated" element={<EscalatedTickets />} />
          <Route path="/manager/reports" element={<Reports />} />
        </Route>

        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center text-3xl font-bold">
              404 Page Not Found
            </div>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}