// src/layouts/EmployeeLayout.jsx

import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function EmployeeLayout() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const menus = [
    {
      name: "Dashboard",
      path: "/employee",
    },
    {
      name: "Raise Ticket",
      path: "/employee/raise-ticket",
    },
    {
      name: "My Tickets",
      path: "/employee/my-tickets",
    },
    {
      name: "My Assets",
      path: "/employee/my-assets",
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
      <aside className="w-64 bg-blue-600 text-white hidden md:flex flex-col">

        {/* Logo */}
        <div className="p-6 border-b border-blue-500">
          <h1 className="text-2xl font-bold">
            IT Helpdesk
          </h1>

          <p className="text-sm opacity-80 mt-1">
            Employee Panel
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
                  : "hover:bg-blue-700"
              }`}
            >
              {menu.name}
            </Link>
          ))}

        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-blue-500">
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
              Welcome {user?.name || "Employee"}
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

        {/* Content */}
        <main className="p-6 flex-1 overflow-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
}