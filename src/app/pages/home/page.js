"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [stats, setStats] = useState({
    users: 0,
    cars: 0,
    bookings: 0,
  });

  // Fetch genuine data
  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/stats"); // backend endpoint
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    }
    fetchStats();
  }, []);

  const cards = [
    { title: "Users", desc: "Manage users", total: stats.users, link: "../../users" },
    { title: "Cars", desc: "Manage cars", total: stats.cars, link: "/cars" },
    { title: "Bookings", desc: "View bookings", total: stats.bookings, link: "/bookings" },
    { title: "Settings", desc: "System settings", total: "Configure system", link: "/settings" },
  ];

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map((card, index) => (
          <Link key={index} href={card.link}>
            <div className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition">
              <h2 className="text-lg font-semibold text-blue-500">{card.title}</h2>
              <p className="text-gray-600">{card.desc}</p>
              <p className="text-gray-800 font-medium">Total: {card.total}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
