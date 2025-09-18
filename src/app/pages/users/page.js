"use client";

import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { InputText } from "primereact/inputtext";
import { CustomerService } from "../service/CustomerService"; // adjust path
import { Dropdown } from "primereact/dropdown";

export default function UsersScreen() {
  const [users, setUsers] = useState([]);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Simulate the logged-in user's role
  const currentLoggedInRole = "Admin"; // change this dynamically based on auth

  useEffect(() => {
    CustomerService.getCustomersMedium().then((data) => {
      if (Array.isArray(data)) {
        const formatted = data.map((u) => ({
          id: u.id,
          name: u.name || "",
          email: u.email || `user${u.id}@example.com`,
          role: u.role || "User",
        }));
        setUsers(formatted);
      }
    });
  }, []);

  const openSidebar = (user = null) => {
    setCurrentUser(user ? { ...user } : { name: "", email: "", role: "" });
    setSidebarVisible(true);
  };

  const saveUser = () => {
    if (!currentUser.name || !currentUser.email || !currentUser.role) {
      alert("Please fill in all fields!");
      return;
    }

    if (!currentUser.id) {
      const newUser = { ...currentUser, id: Date.now() };
      setUsers([...users, newUser]);
    } else {
      const updated = users.map((u) =>
        u.id === currentUser.id ? currentUser : u
      );
      setUsers(updated);
    }
    setSidebarVisible(false);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  const actionBodyTemplate = (rowData) => (
    <div className="flex gap-2">
      <Button
        icon="pi pi-pencil"
        rounded
        text
        severity="warning"
        onClick={() => openSidebar(rowData)}
        className="rounded-full border"
      />
      <Button
        icon="pi pi-trash"
        rounded
        text
        severity="danger"
        onClick={() => handleDelete(rowData.id)}
        className="rounded-full border"
      />
    </div>
  );

  const roles = [
    { label: "Admin", value: "Admin" },
    { label: "Hoster", value: "Hoster" },
    { label: "User", value: "User" },
    { label: "Driver", value: "Driver" },
    // Add more roles here
  ];

  return (
    <div className="card p-8 font-bold">
      <h2 className="text-center text-2xl font-bold mb-6">Users List</h2>

      <div className="text-right mb-4">
        <Button
          label="Add User"
          icon="pi pi-plus"
          className="mb-3 rounded-full border border-blue-500 hover:bg-blue-500 hover:text-white transition"
          onClick={() => openSidebar()}
        />
      </div>

      <DataTable
        value={users}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{
          minWidth: "100%",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        }}
        className="shadow-lg"
        responsiveLayout="scroll"
      >
        <Column field="name" header="Name" style={{ width: "33%" }} />
        <Column field="email" header="Email" style={{ width: "33%" }} />
        <Column field="role" header="Role" style={{ width: "20%" }} />
        <Column
          header="Actions"
          body={actionBodyTemplate}
          style={{ width: "14%" }}
        />
      </DataTable>

      <Sidebar
        visible={sidebarVisible}
        onHide={() => setSidebarVisible(false)}
        position="right"
        baseZIndex={1000}
        className="p-6"
      >
        <h3 className="text-xl font-bold mb-4">
          {currentUser?.id ? "Edit User" : "Add User"}
        </h3>
        <div className="flex flex-col gap-4">
          <InputText
            placeholder="Name"
            value={currentUser?.name || ""}
            onChange={(e) =>
              setCurrentUser({ ...currentUser, name: e.target.value })
            }
            className="rounded-lg p-2 border border-gray-300"
          />
          <InputText
            placeholder="Email"
            value={currentUser?.email || ""}
            onChange={(e) =>
              setCurrentUser({ ...currentUser, email: e.target.value })
            }
            className="rounded-lg p-2 border border-gray-300"
          />

          {currentLoggedInRole === "Admin" ||
          currentLoggedInRole === "Hoster" ? (
            <Dropdown
              placeholder="Select Role"
              value={currentUser?.role || ""}
              options={roles}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, role: e.value })
              }
              className="rounded-lg p-2 border border-gray-300"
            />
          ) : (
            <InputText
              value={currentUser?.role || ""}
              disabled
              className="rounded-lg p-2 border border-gray-300 bg-gray-100"
            />
          )}

          <Button
            label="Save"
            icon="pi pi-check"
            onClick={saveUser}
            className="rounded-full border border-green-500 hover:bg-green-500 hover:text-white transition"
          />
        </div>
      </Sidebar>
    </div>
  );
}