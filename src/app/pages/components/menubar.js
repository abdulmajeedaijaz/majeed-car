"use client";
import React, { useState } from "react";
import Link from "next/link";

const menuItems = [
  { name: "Home", link: "/pages/home" },
  { name: "Admin", link: "",
    items: [
      { name: "Users", link: "/pages/users" },   
     ],
   },
  {
    name: "Bookings",
    link: "/bookings",
    items: [
      { name: "View Bookings", link: "/bookings/view" },
      { name: "Manage Bookings", link: "/bookings/manage" },
    ],
  },
  { name: "Customer", link: "/customer" },
  { name: "Logout", link: "/" }, // replace with your login page
];

const Menubar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>CarRental</div>
      <ul style={styles.menu}>
        {menuItems.map((item) => (
          <li
            key={item.name}
            style={styles.menuItem}
            onMouseEnter={() => setOpenDropdown(item.name)}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <Link href={item.link} style={styles.link}>
              {item.name}
            </Link>

            {item.items && openDropdown === item.name && (
              <ul style={styles.dropdown}>
                {item.items.map((subItem) => (
                  <li key={subItem.name} style={styles.dropdownItem}>
                    <Link href={subItem.link} style={styles.link}>
                      {subItem.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#000000ff",
    padding: "10px 30px",
    position: "relative",
  },
  logo: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: "1.5rem",
  },
  menu: {
    listStyle: "none",
    display: "flex",
    margin: 0,
    padding: 0,
  },
  menuItem: {
    marginLeft: "20px",
    position: "relative",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "1rem",
    padding: "5px 10px",
    display: "inline-block",
  },
  dropdown: {
    position: "absolute",
    top: "100%",
    left: 0,
    background: "#000000ff",
    listStyle: "none",
    margin: 0,
    padding: "10px 0",
    minWidth: "180px",
    borderRadius: "5px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
  },
  dropdownItem: {
    margin: 0,
  },
};

export default Menubar;