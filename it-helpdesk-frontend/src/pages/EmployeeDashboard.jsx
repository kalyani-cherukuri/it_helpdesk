// src/pages/EmployeeDashboard.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

export default function EmployeeDashboard() {
  const [stats, setStats] = useState({
    openTickets: 0,
    resolvedTickets: 0,
    totalTickets: 0,
    myAssets: 0,
  });

  const [recentTickets, setRecentTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const ticketRes = await API.get(
        `/api/tickets/employee/${user.id}`
      );

      const assetRes = await API.get(
        `/api/assets/employee/${user.id}`
      );

      const tickets = ticketRes.data || [];
      const assets = assetRes.data || [];

      setStats({
        totalTickets: tickets.length,
        openTickets: tickets.filter(
          (t) =>
            t.status === "OPEN" ||
            t.status === "ASSIGNED" ||
            t.status === "IN_PROGRESS" ||
            t.status === "REOPENED"
        ).length,

        resolvedTickets: tickets.filter(
          (t) =>
            t.status === "RESOLVED" ||
            t.status === "CLOSED"
        ).length,

        myAssets: assets.length,
      });

      setRecentTickets(
        tickets.slice(-5).reverse()
      );

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      title: "My Tickets",
      value: stats.totalTickets,
      color: "text-blue-600",
    },
    {
      title: "Open Tickets",
      value: stats.openTickets,
      color: "text-red-500",
    },
    {
      title: "Resolved",
      value: stats.resolvedTickets,
      color: "text-green-600",
    },
    {
      title: "My Assets",
      value: stats.myAssets,
      color: "text-purple-600",
    },
  ];

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Employee Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome back, {user.name}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow p-6"
          >
            <p className="text-gray-500 text-sm">
              {card.title}
            </p>

            <h2
              className={`text-4xl font-bold mt-3 ${card.color}`}
            >
              {card.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          Quick Actions
        </h2>

        <div className="flex flex-wrap gap-4">
          <Link
            to="/employee/raise-ticket"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
          >
            Raise Ticket
          </Link>

          <Link
            to="/employee/my-tickets"
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl"
          >
            My Tickets
          </Link>

          <Link
            to="/employee/my-assets"
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-xl"
          >
            My Assets
          </Link>
        </div>
      </div>

      {/* Recent Tickets */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          Recent Tickets
        </h2>

        {recentTickets.length === 0 ? (
          <p className="text-gray-500">
            No tickets found
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">

              <thead>
                <tr className="border-b">
                  <th className="py-3">
                    Ticket No
                  </th>
                  <th className="py-3">
                    Title
                  </th>
                  <th className="py-3">
                    Status
                  </th>
                  <th className="py-3">
                    Priority
                  </th>
                </tr>
              </thead>

              <tbody>
                {recentTickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="py-3">
                      {ticket.ticketNumber}
                    </td>

                    <td className="py-3">
                      {ticket.title}
                    </td>

                    <td className="py-3">
                      {ticket.status}
                    </td>

                    <td className="py-3">
                      {ticket.priority}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div>

    </div>
  );
}