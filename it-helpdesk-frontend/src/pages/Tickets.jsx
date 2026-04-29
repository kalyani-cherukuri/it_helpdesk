// src/pages/Tickets.jsx

import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [ticketRes, userRes] =
        await Promise.all([
          API.get("/api/tickets"),
          API.get("/api/users"),
        ]);

      setTickets(ticketRes.data || []);

      const supportAgents =
        (userRes.data || []).filter(
          (u) =>
            u.role === "IT_SUPPORT_AGENT"
        );

      setAgents(supportAgents);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const assignTicket = async (
    ticketId
  ) => {
    const agentId =
      selectedAgent[ticketId];

    if (!agentId) {
      alert("Select agent first");
      return;
    }

    try {
      await API.put(
        `/api/tickets/${ticketId}/assign/${agentId}`
      );

      fetchData();

    } catch (error) {
      console.log(error);
      alert("Failed to assign");
    }
  };

  const updateStatus = async (
    ticketId,
    status
  ) => {
    try {
      await API.put(
        `/api/tickets/${ticketId}/status`,
        { status }
      );

      fetchData();

    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">
        Loading tickets...
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      {/* Header */}
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Ticket Management
      </h1>

      {tickets.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-6 text-gray-500">
          No tickets found
        </div>
      ) : (
        <div className="grid gap-6">

          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white rounded-2xl shadow p-6"
            >
              {/* Top Row */}
              <div className="flex justify-between flex-wrap gap-4">

                {/* Left */}
                <div>
                  <h2 className="text-2xl font-bold text-blue-600">
                    {ticket.ticketNumber}
                  </h2>

                  <p className="font-semibold mt-1">
                    {ticket.title}
                  </p>

                  <p className="text-gray-500 mt-1">
                    {ticket.description}
                  </p>

                  <div className="mt-3 space-y-1 text-sm">
                    <p>
                      Status:
                      <span className="font-semibold ml-2">
                        {ticket.status}
                      </span>
                    </p>

                    <p>
                      Priority:
                      <span className="font-semibold ml-2">
                        {ticket.priority}
                      </span>
                    </p>

                    <p>
                      Raised By:
                      <span className="font-semibold ml-2">
                        {ticket.raisedBy?.name}
                      </span>
                    </p>

                    <p>
                      Assigned To:
                      <span className="font-semibold ml-2">
                        {ticket.assignedTo
                          ?.name || "Unassigned"}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Right */}
                <div className="flex flex-col gap-3 min-w-[250px]">

                  {/* Agent Dropdown */}
                  <select
                    value={
                      selectedAgent[
                        ticket.id
                      ] || ""
                    }
                    onChange={(e) =>
                      setSelectedAgent({
                        ...selectedAgent,
                        [ticket.id]:
                          e.target.value,
                      })
                    }
                    className="border rounded-xl px-4 py-2"
                  >
                    <option value="">
                      Select Agent
                    </option>

                    {agents.map((agent) => (
                      <option
                        key={agent.id}
                        value={agent.id}
                      >
                        {agent.name}
                      </option>
                    ))}
                  </select>

                  {/* Assign */}
                  <button
                    onClick={() =>
                      assignTicket(
                        ticket.id
                      )
                    }
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
                  >
                    Assign Ticket
                  </button>

                  {/* Mark In Progress */}
                  <button
                    onClick={() =>
                      updateStatus(
                        ticket.id,
                        "IN_PROGRESS"
                      )
                    }
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl"
                  >
                    In Progress
                  </button>

                  {/* Resolve */}
                  <button
                    onClick={() =>
                      updateStatus(
                        ticket.id,
                        "RESOLVED"
                      )
                    }
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl"
                  >
                    Resolve
                  </button>

                  {/* Escalate */}
                  <button
                    onClick={() =>
                      updateStatus(
                        ticket.id,
                        "ESCALATED"
                      )
                    }
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
                  >
                    Escalate
                  </button>

                </div>

              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}