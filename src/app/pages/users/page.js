"use client";

import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const currentLoggedInRole = "Admin";

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      if (!response.ok) throw new Error('Failed to fetch users');

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
      alert('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const openSidebar = (user = null) => {
    setCurrentUser(user ? { ...user } : { name: "", email: "", role: "" });
    setSidebarVisible(true);
  };

  const saveUser = async () => {
    if (!currentUser.name || !currentUser.email || !currentUser.role) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      if (!currentUser.id) {
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(currentUser),
        });
        if (!response.ok) throw new Error('Failed to create user');
        const newUser = await response.json();
        setUsers([...users, newUser]);
      } else {
        const response = await fetch(`/api/users/${currentUser.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(currentUser),
        });
        if (!response.ok) throw new Error('Failed to update user');
        setUsers(users.map(u => (u.id === currentUser.id ? currentUser : u)));
      }

      setSidebarVisible(false);
    } catch (error) {
      console.error(error);
      alert('Failed to save user');
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(`/api/users/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete user');
        setUsers(users.filter(u => u.id !== id));
      } catch (error) {
        console.error(error);
        alert('Failed to delete user');
      }
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
        loading={loading}
        tableStyle={{ minWidth: "100%" }}
        className="shadow-lg"
      >
        <Column field="name" header="Name" style={{ width: "33%" }} />
        <Column field="email" header="Email" style={{ width: "33%" }} />
        <Column field="role" header="Role" style={{ width: "20%" }} />
        <Column header="Actions" body={actionBodyTemplate} style={{ width: "14%" }} />
      </DataTable>

      <Sidebar
        visible={sidebarVisible}
        onHide={() => setSidebarVisible(false)}
        position="right"
        className="p-6"
      >
        <h3 className="text-xl font-bold mb-4">
          {currentUser?.id ? "Edit User" : "Add User"}
        </h3>
        <div className="flex flex-col gap-4">
          <InputText
            placeholder="Name"
            value={currentUser?.name || ""}
            onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
            className="p-2 border"
          />
          <InputText
            placeholder="Email"
            value={currentUser?.email || ""}
            onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
            className="p-2 border"
          />

          {currentLoggedInRole === "Admin" || currentLoggedInRole === "Hoster" ? (
            <Dropdown
              placeholder="Select Role"
              value={currentUser?.role || ""}
              options={roles}
              onChange={(e) => setCurrentUser({ ...currentUser, role: e.value })}
              className="p-2 border"
            />
          ) : (
            <InputText
              value={currentUser?.role || ""}
              disabled
              className="p-2 border bg-gray-100"
            />
          )}

          <Button
            label="Save"
            icon="pi pi-check"
            onClick={saveUser}
            className="border border-green-500 hover:bg-green-500"
          />
        </div>
      </Sidebar>
    </div>
  );
}