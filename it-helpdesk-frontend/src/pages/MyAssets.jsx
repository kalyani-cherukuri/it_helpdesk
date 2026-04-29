import { useEffect, useState } from "react";
import API from "../api/axios";

export default function MyAssets() {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    const user =
      JSON.parse(localStorage.getItem("user"));

    const res = await API.get(
      `/api/assets/employee/${user.id}`
    );

    setAssets(res.data);
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6">
        My Assets
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {assets.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow p-6"
          >
            <h2 className="text-2xl font-bold text-blue-600 mb-3">
              {item.asset?.assetTag}
            </h2>

            <p>
              Type:
              {item.asset?.assetType}
            </p>

            <p>
              Brand:
              {item.asset?.brand}
            </p>

            <p>
              Model:
              {item.asset?.model}
            </p>

            <p>
              Status:
              {item.status}
            </p>

            <p>
              Allocated:
              {item.allocationDate}
            </p>

          </div>
        ))}
      </div>
    </div>
  );
}