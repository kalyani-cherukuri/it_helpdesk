// src/pages/Allocations.jsx

import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Allocations() {
  const [allocations, setAllocations] = useState([]);
  const [assets, setAssets] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [formData, setFormData] = useState({
    assetId: "",
    employeeId: "",
    adminId: 1,
  });

  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [allocRes, assetRes, userRes] =
        await Promise.all([
          API.get("/api/allocations"),
          API.get("/api/assets/available"),
          API.get("/api/users"),
        ]);

      setAllocations(allocRes.data);

      setAssets(assetRes.data);

      const onlyEmployees =
        userRes.data.filter(
          (user) =>
            user.role === "EMPLOYEE"
        );

      setEmployees(onlyEmployees);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const allocateAsset = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        "/api/allocations/allocate",
        formData
      );

      setFormData({
        assetId: "",
        employeeId: "",
        adminId: 1,
      });

      fetchData();

    } catch (error) {
      console.log(error);
      alert("Failed to allocate asset");
    }
  };

  const returnAsset = async (id) => {
    try {
      setProcessingId(id);

      await API.put(
        `/api/allocations/return/${id}`
      );

      fetchData();

    } catch (error) {
      console.log(error);
      alert("Failed to return asset");
    } finally {
      setProcessingId(null);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-700";

      case "RETURNED":
        return "bg-gray-100 text-gray-700";

      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  return (
    <div className="p-6">

      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-700 mb-6">
        Asset Allocations
      </h1>

      {/* Allocate Form */}
      <form
        onSubmit={allocateAsset}
        className="bg-white p-6 rounded-2xl shadow grid md:grid-cols-4 gap-4 mb-6"
      >

        <select
          name="assetId"
          value={formData.assetId}
          onChange={handleChange}
          required
          className="border px-4 py-3 rounded-lg"
        >
          <option value="">
            Select Asset
          </option>

          {assets.map((asset) => (
            <option
              key={asset.id}
              value={asset.id}
            >
              {asset.assetTag} -{" "}
              {asset.assetType}
            </option>
          ))}
        </select>

        <select
          name="employeeId"
          value={formData.employeeId}
          onChange={handleChange}
          required
          className="border px-4 py-3 rounded-lg"
        >
          <option value="">
            Select Employee
          </option>

          {employees.map((emp) => (
            <option
              key={emp.id}
              value={emp.id}
            >
              {emp.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="adminId"
          value={formData.adminId}
          onChange={handleChange}
          className="border px-4 py-3 rounded-lg"
        />

        <button
          className="bg-blue-600 text-white rounded-lg px-4 py-3"
        >
          Allocate
        </button>

      </form>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">

        {loading ? (
          <div className="p-6 text-center text-gray-500">
            Loading allocations...
          </div>
        ) : allocations.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No allocations found
          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-4">ID</th>
                  <th className="p-4">Asset</th>
                  <th className="p-4">Employee</th>
                  <th className="p-4">Allocated By</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Return Due</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {allocations.map(
                  (allocation) => (
                    <tr
                      key={
                        allocation.id
                      }
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="p-4">
                        {
                          allocation.id
                        }
                      </td>

                      <td className="p-4">
                        {
                          allocation.asset
                            ?.assetTag
                        }
                      </td>

                      <td className="p-4">
                        {
                          allocation
                            .allocatedTo
                            ?.name
                        }
                      </td>

                      <td className="p-4">
                        {
                          allocation
                            .allocatedBy
                            ?.name
                        }
                      </td>

                      <td className="p-4">
                        {
                          allocation.allocationDate
                        }
                      </td>

                      <td className="p-4">
                        {
                          allocation.expectedReturnDate
                        }
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(
                            allocation.status
                          )}`}
                        >
                          {
                            allocation.status
                          }
                        </span>
                      </td>

                      <td className="p-4">
                        {allocation.status ===
                        "ACTIVE" ? (
                          <button
                            onClick={() =>
                              returnAsset(
                                allocation.id
                              )
                            }
                            disabled={
                              processingId ===
                              allocation.id
                            }
                            className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                          >
                            Return
                          </button>
                        ) : (
                          "-"
                        )}
                      </td>
                    </tr>
                  )
                )}
              </tbody>

            </table>

          </div>
        )}

      </div>
    </div>
  );
}