import { useEffect, useState } from "react";
import API from "../api/axios";

export default function EscalatedTickets() {
  const [tickets, setTickets] = useState([]);
  const [allTickets, setAllTickets] = useState([]);
  const [agents, setAgents] = useState({});
  const [agentList, setAgentList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [ticketRes, userRes] = await Promise.all([
        API.get("/api/tickets"),
        API.get("/api/users"),
      ]);

      console.log("ALL TICKETS:", ticketRes.data);

      const all = ticketRes.data || [];

      // ✅ SAFE FILTER (case-proof + null-proof)
      const escalated = all.filter(
  (t) =>
    String(t.status)
      .trim()
      .toUpperCase() === "ESCALATED"
);

      setAllTickets(all);
      setTickets(escalated);
      console.log(all);

      const agentsOnly = (userRes.data || []).filter(
        (u) => u.role === "IT_SUPPORT_AGENT"
      );

      setAgentList(agentsOnly);

    } catch (e) {
      console.error("ERROR:", e);
    } finally {
      setLoading(false);
    }
  };

  const assign = async (ticketId) => {
    const agentId = agents[ticketId];
    if (!agentId) return alert("Select agent");

    await API.put(`/api/tickets/${ticketId}/assign/${agentId}`);
    fetchData();
  };

  const update = async (id, status) => {
    await API.put(`/api/tickets/${id}/status`, { status });
    fetchData();
  };

  if (loading) {
    return (
      <div className="p-6 text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div>

      <h1 className="text-3xl font-bold mb-4">
        Escalated Tickets
      </h1>

      {/* Debug Info */}
      <p className="text-sm text-gray-500 mb-6">
        Total Tickets: {allTickets.length} | Escalated: {tickets.length}
      </p>

      {tickets.length === 0 ? (
        <div className="bg-white p-6 rounded-2xl shadow">
          No escalated tickets found
        </div>
      ) : (
        <div className="grid gap-6">

          {tickets.map((t) => (
            <div
              key={t.id}
              className="bg-white p-6 rounded-2xl shadow border-l-4 border-red-500"
            >

              <h2 className="text-xl font-bold text-red-600">
                {t.ticketNumber || "No Ticket ID"}
              </h2>

              <p className="font-semibold mt-1">
                {t.title}
              </p>

              <p className="text-gray-500">
                {t.description}
              </p>

              <p className="mt-2 text-sm text-gray-600">
                Raised by: {t.raisedBy?.name || "Unknown"}
              </p>

              <p className="mt-1 text-sm">
                Status:{" "}
                <span className="text-red-500 font-semibold">
                  {t.status}
                </span>
              </p>

              {/* Actions */}
              <div className="flex gap-3 mt-4 flex-wrap">

                <select
                  onChange={(e) =>
                    setAgents({
                      ...agents,
                      [t.id]: e.target.value,
                    })
                  }
                  className="border px-4 py-2 rounded-xl"
                >
                  <option>Select Agent</option>
                  {agentList.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => assign(t.id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-xl"
                >
                  Reassign
                </button>

                <button
                  onClick={() =>
                    update(t.id, "IN_PROGRESS")
                  }
                  className="bg-purple-600 text-white px-4 py-2 rounded-xl"
                >
                  Start Work
                </button>

                <button
                  onClick={() =>
                    update(t.id, "RESOLVED")
                  }
                  className="bg-green-600 text-white px-4 py-2 rounded-xl"
                >
                  Resolve
                </button>

              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}