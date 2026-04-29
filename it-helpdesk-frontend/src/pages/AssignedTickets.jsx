// src/pages/AssignedTickets.jsx

import { useEffect, useState } from "react";
import API from "../api/axios";

export default function AssignedTickets() {
  const [tickets, setTickets] = useState([]);

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await API.get("/api/tickets");

      const myTickets =
        res.data.filter(
          (t) =>
            t.assignedTo &&
            t.assignedTo.id === user.id
        ) || [];

      setTickets(myTickets);

    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (
    id,
    status
  ) => {
    try {
      await API.put(
        `/api/tickets/${id}/status`,
        { status }
      );

      fetchTickets();

    } catch (error) {
      console.log(error);
    }
  };

  const resolveTicket = async (id) => {
    try {
      await API.put(
        `/api/tickets/${id}/resolve`,
        {
          resolution:
            "Issue resolved by support agent",
        }
      );

      fetchTickets();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Assigned Tickets
      </h1>

      {tickets.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-6 text-gray-500">
          No assigned tickets
        </div>
      ) : (
        <div className="grid gap-6">

          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white rounded-2xl shadow p-6"
            >
              <div className="flex justify-between flex-wrap gap-4">

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

                  <p className="mt-2 text-sm">
                    Status:
                    <span className="font-bold ml-2">
                      {ticket.status}
                    </span>
                  </p>
                </div>

                <div className="flex flex-col gap-3">

                  <button
                    onClick={() =>
                      updateStatus(
                        ticket.id,
                        "IN_PROGRESS"
                      )
                    }
                    className="bg-purple-600 text-white px-4 py-2 rounded-xl"
                  >
                    Start Work
                  </button>

                  <button
                    onClick={() =>
                      resolveTicket(ticket.id)
                    }
                    className="bg-green-600 text-white px-4 py-2 rounded-xl"
                  >
                    Resolve
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