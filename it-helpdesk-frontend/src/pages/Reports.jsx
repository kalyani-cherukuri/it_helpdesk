// src/pages/Reports.jsx

import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Reports() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    openTickets: 0,
    resolvedTickets: 0,
    escalatedTickets: 0,
    availableAssets: 0,
    allocatedAssets: 0,
  });

  const [priorityData, setPriorityData] = useState([]);
  const [workloadData, setWorkloadData] = useState([]);
  const [assetData, setAssetData] = useState([]);
  const [avgData, setAvgData] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const [
        statsRes,
        priorityRes,
        workloadRes,
        assetRes,
        avgRes,
      ] = await Promise.all([
        API.get("/api/dashboard/stats"),
        API.get("/api/dashboard/tickets-priority"),
        API.get("/api/dashboard/agent-workload"),
        API.get("/api/dashboard/asset-utilization"),
        API.get("/api/dashboard/avg-resolution-time"),
      ]);

      setStats(statsRes.data);
      setPriorityData(priorityRes.data);
      setWorkloadData(workloadRes.data);
      setAssetData(assetRes.data);
      setAvgData(avgRes.data);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
    },
    {
      title: "Open Tickets",
      value: stats.openTickets,
    },
    {
      title: "Resolved Tickets",
      value: stats.resolvedTickets,
    },
    {
      title: "Escalated Tickets",
      value: stats.escalatedTickets,
    },
    {
      title: "Available Assets",
      value: stats.availableAssets,
    },
    {
      title: "Allocated Assets",
      value: stats.allocatedAssets,
    },
  ];

  const TableCard = ({ title, headers, rows }) => (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-xl font-bold text-gray-700 mb-4">
        {title}
      </h2>

      {rows.length === 0 ? (
        <p className="text-gray-500">
          No data available
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">

            <thead>
              <tr className="border-b">
                {headers.map((head, index) => (
                  <th
                    key={index}
                    className="py-2"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((row, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50"
                >
                  {row.map((col, i) => (
                    <td
                      key={i}
                      className="py-2"
                    >
                      {col}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading reports...
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-700 mb-6">
        Reports & Analytics
      </h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

        {statCards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow p-6"
          >
            <p className="text-gray-500 text-sm">
              {card.title}
            </p>

            <h2 className="text-3xl font-bold text-blue-600 mt-2">
              {card.value}
            </h2>
          </div>
        ))}

      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <TableCard
          title="Tickets By Priority"
          headers={["Priority", "Count"]}
          rows={priorityData}
        />

        <TableCard
          title="Agent Workload"
          headers={["Agent", "Tickets"]}
          rows={workloadData}
        />

        <TableCard
          title="Asset Utilization"
          headers={["Asset Type", "Count"]}
          rows={assetData}
        />

        <TableCard
          title="Average Resolution Time"
          headers={["Priority", "Hours"]}
          rows={avgData}
        />

      </div>
    </div>
  );
}