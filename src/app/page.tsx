"use client"
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Username, setUsername] = useState("");


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`User name: ${Username}\nEmail: ${email}\nPassword: ${password}`);
  };

  return (
    <div 
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f0f0",
        color: "#333",
      }}>
        <form 
          onSubmit={handleSubmit} 
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            borderRadius: "8px",
            backgroundColor: "#fff",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            width: "300px"
          }}>
          <h2 style={{ 
            textAlign: "center", 
            marginBottom: "20px", 
            font: "5rem",
            fontWeight: "bold",
          }}>Login</h2>
          <label htmlFor="username" 
          style={{ 
            marginBottom: "5px", 
            fontWeight: "bold" }}>User Name</label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}
          />
          <label htmlFor="Email" 
          style={{ 
            marginBottom: "5px", 
            fontWeight: "bold",
          }}>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "16px"
            }}
          />
          <label htmlFor="Password" 
          style={{ 
            marginBottom: "5px", 
            fontWeight: "bold" }}>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              marginBottom: "20px",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "16px"
            }}
          />
          <button
            type="submit"
            style={{
              padding: "10px",
              borderRadius: "4px",
              border: "none",
              backgroundColor: "#007bff",
              color: "#fff",
              fontSize: "16px",
              cursor: "pointer"
            }}>
            Login
          </button>
        </form>
    </div>
  );
}
