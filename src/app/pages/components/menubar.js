"use client";

import { useState } from "react";
import {
  Home,
  Settings,
  Package,
  Calendar,
  Users,
  User,
  DollarSign,
  BarChart,
  HelpCircle,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { name: "Home", href: "/", icon: <Home size={18} /> },
    { name: "Admin", href: "/admin", icon: <Settings size={18} /> },
    { name: "Inventory", href: "/inventory", icon: <Package size={18} /> },
    { name: "Bookings", href: "/bookings", icon: <Calendar size={18} /> },
    { name: "Hosters", href: "/hosters", icon: <Users size={18} /> },
    { name: "Customers", href: "/customers", icon: <User size={18} /> },
    { name: "Billing", href: "/billing", icon: <DollarSign size={18} /> },
    { name: "Reports", href: "/reports", icon: <BarChart size={18} /> },
    { name: "Support", href: "/support", icon: <HelpCircle size={18} /> },
  ];

  return (
    <>
      {/* --- Desktop Top Navbar --- */}
      <div className="hidden md:flex items-center justify-between bg-white shadow px-6 py-3 fixed top-0 left-0 right-0 z-20">
        <div className="flex items-center gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-1 text-gray-700 hover:text-purple-600"
            >
              {item.icon} {item.name}
            </Link>
          ))}
        </div>
        <Link
          href="/logout"
          className="flex items-center gap-1 text-red-600 hover:text-red-700"
        >
          <LogOut size={18} /> Logout
        </Link>
      </div>

      {/* --- Mobile Navbar (Hamburger) --- */}
      <div className="md:hidden flex items-center justify-between bg-white shadow px-4 py-3 fixed top-0 left-0 right-0 z-20">
        <h1 className="font-semibold">My App</h1>
        <button onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* --- Mobile Sidebar --- */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r shadow-md p-4 z-30 transform transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4"
        >
          <X size={24} />
        </button>
        <ul className="space-y-4 mt-10">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
                onClick={() => setMobileOpen(false)}
              >
                {item.icon} {item.name}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/logout"
              className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 text-red-600"
            >
              <LogOut size={18} /> Logout
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
