import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { logout } = useAuth();

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <button
        onClick={logout}
        className="bg-red-500 text-white px-5 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
