// src/pages/Assets.jsx

import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Assets() {
  const [assets, setAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] =
    useState([]);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] =
    useState(false);

  const [processingId, setProcessingId] =
    useState(null);

  const [formData, setFormData] = useState({
    assetTag: "",
    assetType: "",
    brand: "",
    model: "",
    serialNumber: "",
    status: "AVAILABLE",
  });

  useEffect(() => {
    fetchAssets();
  }, []);

  useEffect(() => {
    const query =
      search.toLowerCase();

    const result =
      assets.filter((asset) =>
        `${asset.assetTag}
         ${asset.assetType}
         ${asset.brand}
         ${asset.model}
         ${asset.status}`
          .toLowerCase()
          .includes(query)
      );

    setFilteredAssets(result);
  }, [search, assets]);

  const fetchAssets = async () => {
    try {
      const res =
        await API.get(
          "/api/assets"
        );

      setAssets(res.data);
      setFilteredAssets(
        res.data
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const addAsset = async (
    e
  ) => {
    e.preventDefault();

    try {
      await API.post(
        "/api/assets",
        formData
      );

      setFormData({
        assetTag: "",
        assetType: "",
        brand: "",
        model: "",
        serialNumber: "",
        status:
          "AVAILABLE",
      });

      setShowForm(false);

      fetchAssets();

    } catch (error) {
      console.log(error);
      alert(
        "Failed to add asset"
      );
    }
  };

  const deleteAsset =
    async (id) => {
      const confirmDelete =
        window.confirm(
          "Delete this asset?"
        );

      if (!confirmDelete)
        return;

      try {
        setProcessingId(id);

        await API.delete(
          `/api/assets/${id}`
        );

        fetchAssets();

      } catch (error) {
        console.log(error);
        alert(
          "Failed to delete asset"
        );
      } finally {
        setProcessingId(
          null
        );
      }
    };

  const badgeStyle = (
    status
  ) => {
    switch (status) {
      case "AVAILABLE":
        return "bg-green-100 text-green-700";

      case "ALLOCATED":
        return "bg-blue-100 text-blue-700";

      case "MAINTENANCE":
        return "bg-yellow-100 text-yellow-700";

      case "SCRAPPED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <h1 className="text-4xl font-bold text-gray-700">
          Asset Management
        </h1>

        <div className="flex gap-3">

          <input
            type="text"
            placeholder="Search assets..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="border px-4 py-3 rounded-xl w-72 bg-white"
          />

          <button
            onClick={() =>
              setShowForm(
                !showForm
              )
            }
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium"
          >
            {showForm
              ? "Close"
              : "+ Add Asset"}
          </button>

        </div>
      </div>

      {/* Form */}
      {showForm && (
        <form
          onSubmit={
            addAsset
          }
          className="bg-white p-6 rounded-2xl shadow grid md:grid-cols-3 gap-4 mb-6"
        >

          <input
            name="assetTag"
            placeholder="Asset Tag"
            value={
              formData.assetTag
            }
            onChange={
              handleChange
            }
            required
            className="border p-3 rounded-lg"
          />

          <input
            name="assetType"
            placeholder="Asset Type"
            value={
              formData.assetType
            }
            onChange={
              handleChange
            }
            required
            className="border p-3 rounded-lg"
          />

          <input
            name="brand"
            placeholder="Brand"
            value={
              formData.brand
            }
            onChange={
              handleChange
            }
            required
            className="border p-3 rounded-lg"
          />

          <input
            name="model"
            placeholder="Model"
            value={
              formData.model
            }
            onChange={
              handleChange
            }
            required
            className="border p-3 rounded-lg"
          />

          <input
            name="serialNumber"
            placeholder="Serial Number"
            value={
              formData.serialNumber
            }
            onChange={
              handleChange
            }
            required
            className="border p-3 rounded-lg"
          />

          <select
            name="status"
            value={
              formData.status
            }
            onChange={
              handleChange
            }
            className="border p-3 rounded-lg"
          >
            <option>
              AVAILABLE
            </option>
            <option>
              MAINTENANCE
            </option>
          </select>

          <button className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-3 md:col-span-3">
            Save Asset
          </button>

        </form>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">

        {loading ? (
          <div className="p-8 text-center text-gray-500">
            Loading assets...
          </div>
        ) : filteredAssets.length ===
          0 ? (
          <div className="p-8 text-center text-gray-500">
            No assets found
          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-4">
                    Tag
                  </th>
                  <th className="p-4">
                    Type
                  </th>
                  <th className="p-4">
                    Brand
                  </th>
                  <th className="p-4">
                    Model
                  </th>
                  <th className="p-4">
                    Serial
                  </th>
                  <th className="p-4">
                    Status
                  </th>
                  <th className="p-4">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredAssets.map(
                  (asset) => (
                    <tr
                      key={
                        asset.id
                      }
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="p-4 font-medium">
                        {
                          asset.assetTag
                        }
                      </td>

                      <td className="p-4">
                        {
                          asset.assetType
                        }
                      </td>

                      <td className="p-4">
                        {
                          asset.brand
                        }
                      </td>

                      <td className="p-4">
                        {
                          asset.model
                        }
                      </td>

                      <td className="p-4">
                        {
                          asset.serialNumber
                        }
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${badgeStyle(
                            asset.status
                          )}`}
                        >
                          {
                            asset.status
                          }
                        </span>
                      </td>

                      <td className="p-4">
                        <button
                          onClick={() =>
                            deleteAsset(
                              asset.id
                            )
                          }
                          disabled={
                            processingId ===
                            asset.id
                          }
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                        >
                          Delete
                        </button>
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