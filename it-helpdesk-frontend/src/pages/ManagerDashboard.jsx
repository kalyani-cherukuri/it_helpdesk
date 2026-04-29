import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

export default function ManagerDashboard() {
  const [stats, setStats] = useState({
    escalated: 0,
    open: 0,
    resolved: 0,
    total: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await API.get("/api/tickets");
      const tickets = res.data || [];

      setStats({
        total: tickets.length,
        escalated: tickets.filter(t => t.status === "ESCALATED").length,
        open: tickets.filter(t => t.status === "OPEN" || t.status === "ASSIGNED").length,
        resolved: tickets.filter(t => t.status === "RESOLVED").length,
      });

    } catch (e) {
      console.log(e);
    }
  };

  const cards = [
    { title: "Total Tickets", value: stats.total, color: "text-blue-600" },
    { title: "Escalated", value: stats.escalated, color: "text-red-500" },
    { title: "Open", value: stats.open, color: "text-orange-500" },
    { title: "Resolved", value: stats.resolved, color: "text-green-600" },
  ];

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Overview
      </h1>

      {/* Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {cards.map((c, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow">
            <p className="text-gray-500">{c.title}</p>
            <h2 className={`text-3xl font-bold mt-2 ${c.color}`}>
              {c.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-bold mb-4">
          Quick Actions
        </h2>

        <div className="flex gap-4 flex-wrap">

          <Link
            to="/manager/escalated"
            className="bg-red-500 text-white px-5 py-3 rounded-xl"
          >
            View Escalations
          </Link>

          <Link
            to="/manager/reports"
            className="bg-purple-600 text-white px-5 py-3 rounded-xl"
          >
            Reports
          </Link>

        </div>
      </div>

    </div>
  );
}