// src/layout/AgentLayout.jsx

import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";

export default function AgentLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const navLinks = [
    {
      name: "Dashboard",
      path: "/agent",
    },
    {
      name: "Assigned Tickets",
      path: "/agent/tickets",
    },
  ];

  const isActive = (path) =>
    location.pathname === path;

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <aside className="w-72 bg-gray-900 text-white flex flex-col shadow-xl">

        {/* Logo */}
        <div className="px-6 py-6 border-b border-gray-800">
          <h1 className="text-2xl font-bold">
            IT Helpdesk
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Agent Panel
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">

          {navLinks.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`block px-4 py-3 rounded-xl transition ${
                isActive(item.path)
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}

        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={logout}
            className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-xl transition"
          >
            Logout
          </button>
        </div>

      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Top Navbar */}
        <header className="bg-white shadow px-8 py-5 flex justify-between items-center">

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Support Agent Dashboard
            </h2>

            <p className="text-sm text-gray-500">
              Manage assigned support requests
            </p>
          </div>

          <div className="text-right">
            <p className="font-semibold text-gray-700">
              {user.name}
            </p>

            <p className="text-sm text-gray-500">
              IT Support Agent
            </p>
          </div>

        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
}