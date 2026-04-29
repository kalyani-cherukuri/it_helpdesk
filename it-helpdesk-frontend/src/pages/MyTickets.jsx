// ===========================
// src/pages/MyTickets.jsx
// ===========================

import { useEffect, useState } from "react";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function MyTickets() {
  const { user } = useAuth();

  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    const res = await API.get(
      `/api/tickets/employee/${user.id}`
    );

    setTickets(res.data);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        My Tickets
      </h1>

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-left">

          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-4">Ticket</th>
              <th className="p-4">Title</th>
              <th className="p-4">Priority</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((ticket) => (
              <tr
                key={ticket.id}
                className="border-b"
              >
                <td className="p-4">
                  {ticket.ticketNumber}
                </td>

                <td className="p-4">
                  {ticket.title}
                </td>

                <td className="p-4">
                  {ticket.priority}
                </td>

                <td className="p-4">
                  {ticket.status}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}