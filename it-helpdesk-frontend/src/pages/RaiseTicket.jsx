// ===========================
// src/pages/RaiseTicket.jsx
// ===========================

import { useState } from "react";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function RaiseTicket() {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    category: "SOFTWARE",
    subCategory: "",
    title: "",
    description: "",
    severity: "MINOR",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        `/api/tickets/${user.id}`,
        formData
      );

      setMessage("Ticket raised successfully");

      setFormData({
        category: "SOFTWARE",
        subCategory: "",
        title: "",
        description: "",
        severity: "MINOR",
      });

    } catch (error) {
      setMessage("Failed to raise ticket");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Raise Ticket
      </h1>

      {message && (
        <p className="mb-4 text-blue-600">
          {message}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow space-y-4"
      >
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option>SOFTWARE</option>
          <option>HARDWARE</option>
          <option>NETWORK</option>
          <option>ACCESS</option>
          <option>OTHER</option>
        </select>

        <input
          type="text"
          name="subCategory"
          placeholder="Sub Category"
          value={formData.subCategory}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <select
          name="severity"
          value={formData.severity}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option>MINOR</option>
          <option>MAJOR</option>
          <option>BLOCKER</option>
        </select>

        <button className="w-full bg-blue-600 text-white py-3 rounded">
          Submit Ticket
        </button>
      </form>
    </div>
  );
}