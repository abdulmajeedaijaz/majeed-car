"use client";
import React, { useState } from "react";

const initialUsers = [
  { id: 1, name: "Alice", email: "alice@example.com", role: "admin" },
  { id: 2, name: "Bob", email: "bob@example.com", role: "user" },
  { id: 3, name: "Charlie", email: "charlie@example.com", role: "editor" },
];

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [formData, setFormData] = useState({ name: "", email: "", role: "" });
  const [editingUserId, setEditingUserId] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const openDrawerForAdd = () => {
    setFormData({ name: "", email: "", role: "" });
    setEditingUserId(null);
    setDrawerOpen(true);
  };

  const openDrawerForEdit = (user) => {
    setFormData({ name: user.name, email: user.email, role: user.role });
    setEditingUserId(user.id);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setEditingUserId(null);
    setFormData({ name: "", email: "", role: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.role) return;

    if (editingUserId) {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === editingUserId ? { ...user, ...formData } : user
        )
      );
    } else {
      const newUser = {
        id: users.length ? users[users.length - 1].id + 1 : 1,
        ...formData,
      };
      setUsers((prev) => [...prev, newUser]);
    }

    closeDrawer();
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers((prev) => prev.filter((user) => user.id !== id));
    }
  };

  return (
    <div
      style={{
        maxWidth: "1500px",
        margin: "40px auto",
        padding: "24px",
        background: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
        position: "relative",
        color: "#333",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "24px", fontWeight: "bold",}}>Users</h1>

      <div style={{ marginBottom: "16px", textAlign: "right" }}>
        <button onClick={openDrawerForAdd} style={{ padding: "8px 16px" }}>
          + Add User
        </button>
      </div>

      {/* Table */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={thStyle}>S.NO</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Role</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td style={tdStyle}>{index + 1}</td>
              <td style={tdStyle}>{user.name}</td>
              <td style={tdStyle}>{user.email}</td>
              <td style={tdStyle}>{user.role}</td>
              <td style={tdStyle}>
          <button
             onClick={() => openDrawerForEdit(user)}
                 title="Edit"
                 style={iconButtonStyle}
                 >
                ✏️
             </button>
        <button
          onClick={() => handleDelete(user.id)}
            title="Delete"
              style={{ ...iconButtonStyle, color: "red" }}
          >
            🗑️
        </button>
    </td>

            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "12px" }}>
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Drawer Panel */}
      {drawerOpen && (
        <div style={drawerStyle}>
          <div style={drawerHeaderStyle}>
            <h2>{editingUserId ? "Edit User" : "Add User"}</h2>
            <button onClick={closeDrawer} style={closeButtonStyle}>
              ✕
            </button>
          </div>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              style={inputStyle}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              style={inputStyle}
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="user">User</option>
            </select>
            <button type="submit" style={{ padding: "10px 16px" }}>
              {editingUserId ? "Update User" : "Add User"}
            </button>
            <button type="button" onClick={closeDrawer} style={{ background: "#eee", padding: "10px 16px" }}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

// Styles
const thStyle = {
  borderBottom: "1px solid #eee",
  padding: "8px",
  textAlign: "left",
};

const tdStyle = {
  borderBottom: "1px solid #f5f5f5",
  padding: "8px",
};

const drawerStyle = {
  position: "fixed",
  top: 0,
  right: 0,
  width: "360px",
  height: "100%",
  background: "#fafafa",
  boxShadow: "-2px 0 8px rgba(0,0,0,0.1)",
  padding: "24px",
  zIndex: 1000,
  transition: "transform 0.3s ease-in-out",
  display: "flex",
  flexDirection: "column",
};

const drawerHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "24px",
};

const closeButtonStyle = {
  background: "none",
  border: "none",
  fontSize: "20px",
  cursor: "pointer",
};

const inputStyle = {
  padding: "10px",
  border: "1px solid #ddd",
  borderRadius: "4px",
};

const iconButtonStyle = {
  background: "none",
  border: "none",
  cursor: "pointer",
  fontSize: "18px",
  marginRight: "8px",
};