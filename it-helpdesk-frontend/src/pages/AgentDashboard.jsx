// src/pages/AgentDashboard.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

export default function AgentDashboard() {
  const [tickets, setTickets] = useState([]);
  const [stats, setStats] = useState({
    assigned: 0,
    inProgress: 0,
    resolved: 0,
    open: 0,
  });

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await API.get("/api/tickets");
      const all = res.data || [];

      const myTickets = all.filter(
        (t) =>
          t.assignedTo &&
          t.assignedTo.id === user.id
      );

      setTickets(myTickets);

      setStats({
        assigned: myTickets.length,
        inProgress: myTickets.filter(
          (t) => t.status === "IN_PROGRESS"
        ).length,
        resolved: myTickets.filter(
          (t) => t.status === "RESOLVED"
        ).length,
        open: myTickets.filter(
          (t) =>
            t.status === "OPEN" ||
            t.status === "ASSIGNED"
        ).length,
      });

    } catch (error) {
      console.log(error);
    }
  };

  const cards = [
    {
      title: "Assigned Tickets",
      value: stats.assigned,
      color: "text-blue-600",
    },
    {
      title: "Open Tickets",
      value: stats.open,
      color: "text-orange-500",
    },
    {
      title: "In Progress",
      value: stats.inProgress,
      color: "text-purple-600",
    },
    {
      title: "Resolved",
      value: stats.resolved,
      color: "text-green-600",
    },
  ];

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-4xl font-bold text-gray-800 mb-2">
        Agent Dashboard
      </h1>

      <p className="text-gray-500 mb-8">
        Welcome back, {user.name}
      </p>

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
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-bold mb-4">
          Quick Actions
        </h2>

        <div className="flex gap-4 flex-wrap">

          <Link
            to="/agent/tickets"
            className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700"
          >
            Assigned Tickets
          </Link>

          <Link
            to="/agent/tickets"
            className="bg-green-600 text-white px-5 py-3 rounded-xl hover:bg-green-700"
          >
            Resolve Issues
          </Link>

        </div>
      </div>
    </div>
  );
}