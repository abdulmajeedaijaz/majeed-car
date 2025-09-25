"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "primereact/sidebar";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const roles = ["admin", "hoster", "user"];

  // ✅ Run access control + fetch users
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      alert("Please login first.");
      window.location.href = "/pages/login";
      return;
    }

    const user = JSON.parse(stored);
    if (user.role !== "admin" && user.role !== "hoster") {
      alert("Access denied. You must be admin or hoster.");
      window.location.href = "/pages/login";
      return;
    }

    fetchUsers(); // ✅ Fetch only after role check
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();

      const normalized = data.map((u) => ({
        ...u,
        id: u._id || u.id,
      }));

      setUsers(normalized);
    } catch (err) {
      console.error(err);
    }
  };

  const openEditSidebar = (user) => {
    setEditingUser(user);
    setSidebarVisible(true);
  };

  const openAddSidebar = () => {
    setEditingUser({ name: "", email: "", role: "user" });
    setSidebarVisible(true);
  };

  const handleSave = async () => {
    try {
      const method = editingUser.id ? "PUT" : "POST";
      const url = editingUser.id
        ? `/api/users/${editingUser.id}`
        : "/api/users";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingUser),
      });

      if (res.ok) {
        fetchUsers();
        setSidebarVisible(false);
      } else {
        console.error("Failed to save user");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (userId) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`/api/users/${userId}`, { method: "DELETE" });
      if (res.ok) {
        fetchUsers();
      } else {
        console.error("Failed to delete user");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const actionTemplate = (rowData) => (
    <div className="flex gap-2">
      <Button
        label="Edit"
        icon="pi pi-pencil"
        className="p-button-warning p-button-sm"
        onClick={() => openEditSidebar(rowData)}
      />
      <Button
        label="Delete"
        icon="pi pi-trash"
        className="p-button-danger p-button-sm"
        onClick={() => handleDelete(rowData.id)}
      />
    </div>
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2
          style={{
            textAlign: "center",
            width: "100%",
            fontWeight: "bold",
            fontSize: "1.5rem",
          }}
        >
          Users
        </h2>
        <Button
          label="Add User"
          icon="pi pi-plus"
          className="p-button-success"
          onClick={openAddSidebar}
        />
      </div>

      <DataTable value={users} paginator rows={5} stripedRows>
        <Column field="name" header="Name" />
        <Column field="email" header="Email" />
        <Column field="role" header="Role" />
        <Column body={actionTemplate} header="Actions" />
      </DataTable>

      <Sidebar
        visible={sidebarVisible}
        onHide={() => setSidebarVisible(false)}
        position="right"
        header={editingUser?.id ? "Edit User" : "Add User"}
      >
        {editingUser && (
          <div className="p-fluid">
            <div className="p-field mb-3">
              <label htmlFor="name">Name</label>
              <InputText
                id="name"
                value={editingUser.name}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, name: e.target.value })
                }
              />
            </div>
            <div className="p-field mb-3">
              <label htmlFor="email">Email</label>
              <InputText
                id="email"
                value={editingUser.email}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, email: e.target.value })
                }
              />
            </div>
            <div className="p-field mb-3">
              <label htmlFor="role">Role</label>
              <Dropdown
                id="role"
                value={editingUser.role}
                options={roles}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, role: e.value })
                }
              />
            </div>
            <Button
              label="Save"
              icon="pi pi-check"
              onClick={handleSave}
              className="p-button-success"
            />
          </div>
        )}
      </Sidebar>
    </div>
  );
}