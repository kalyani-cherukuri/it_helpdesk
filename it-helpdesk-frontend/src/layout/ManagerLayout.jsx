import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";

export default function ManagerLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const nav = [
    { name: "Dashboard", path: "/manager" },
    { name: "Escalated Tickets", path: "/manager/escalated" },
    { name: "Reports", path: "/manager/reports" },
  ];

  const isActive = (p) => location.pathname === p;

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <aside className="w-72 bg-gray-900 text-white flex flex-col">
        <div className="px-6 py-6 border-b border-gray-800">
          <h1 className="text-2xl font-bold">
            IT Helpdesk
          </h1>
          <p className="text-sm text-gray-400">
            Manager Panel
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {nav.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              className={`block px-4 py-3 rounded-xl ${
                isActive(item.path)
                  ? "bg-blue-600"
                  : "hover:bg-gray-800 text-gray-300"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={logout}
            className="w-full bg-red-500 hover:bg-red-600 py-3 rounded-xl"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        <header className="bg-white shadow px-8 py-5 flex justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Manager Dashboard
            </h2>
            <p className="text-sm text-gray-500">
              Monitor escalations & team
            </p>
          </div>

          <div className="text-right">
            <p className="font-semibold">
              {user.name}
            </p>
            <p className="text-sm text-gray-500">
              IT Manager
            </p>
          </div>
        </header>

        <main className="p-6 flex-1">
          <Outlet />
        </main>

      </div>
    </div>
  );
}