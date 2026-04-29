// src/layouts/AdminLayout.jsx

import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menus = [
    {
      name: "Dashboard",
      path: "/admin",
    },
    {
      name: "Users",
      path: "/users",
    },
    {
      name: "Assets",
      path: "/assets",
    },
    {
      name: "Allocations",
      path: "/allocations",
    },
    {
      name: "Tickets",
      path: "/tickets",
    },
    {
      name: "Reports",
      path: "/reports",
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) =>
    location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white hidden md:flex flex-col">

        {/* Logo */}
        <div className="p-6 border-b border-blue-600">
          <h1 className="text-2xl font-bold">
            IT Helpdesk
          </h1>

          <p className="text-sm opacity-80 mt-1">
            Admin Panel
          </p>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-2">

          {menus.map((menu) => (
            <Link
              key={menu.path}
              to={menu.path}
              className={`block px-4 py-3 rounded-xl transition ${
                isActive(menu.path)
                  ? "bg-white text-blue-700 font-semibold"
                  : "hover:bg-blue-800"
              }`}
            >
              {menu.name}
            </Link>
          ))}

        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-blue-600">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 py-3 rounded-xl font-semibold"
          >
            Logout
          </button>
        </div>

      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">

          <div>
            <h2 className="text-2xl font-bold text-gray-700">
              Welcome {user?.name || "Admin"}
            </h2>

            <p className="text-sm text-gray-500">
              {user?.email}
            </p>
          </div>

          <div className="hidden md:block">
            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
              {user?.role}
            </span>
          </div>

        </header>

        {/* Page Content */}
        <main className="p-6 flex-1 overflow-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
}