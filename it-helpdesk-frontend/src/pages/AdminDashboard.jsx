import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    openTickets: 0,
    resolvedTickets: 0,
    escalatedTickets: 0,
    availableAssets: 0,
    allocatedAssets: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get("/api/dashboard/stats");
      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const cards = [
    { title: "Total Users", value: stats.totalUsers },
    { title: "Open Tickets", value: stats.openTickets },
    { title: "Resolved Tickets", value: stats.resolvedTickets },
    { title: "Escalated Tickets", value: stats.escalatedTickets },
    { title: "Available Assets", value: stats.availableAssets },
    { title: "Allocated Assets", value: stats.allocatedAssets },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-700 mb-6">
        Admin Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition"
          >
            <p className="text-gray-500">{card.title}</p>

            <h2 className="text-3xl font-bold text-blue-600 mt-2">
              {card.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">
          Quick Actions
        </h2>

        <div className="flex gap-4 flex-wrap">

          <Link
            to="/users"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl transition"
          >
            Manage Users
          </Link>

          <Link
            to="/assets"
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl transition"
          >
            Manage Assets
          </Link>

          <Link
            to="/allocations"
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl transition"
          >
            Allocations
          </Link>

          <Link
            to="/tickets"
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl transition"
          >
            Tickets
          </Link>

          <Link
            to="/reports"
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-xl transition"
          >
            Reports
          </Link>

        </div>
      </div>
    </div>
  );
}