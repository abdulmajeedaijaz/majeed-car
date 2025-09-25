"use client";
<<<<<<< HEAD
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`User name: ${username}\nEmail: ${email}\nPassword: ${password}`);
    router.push("/pages/home"); // Redirect to users page
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
            fontSize: "2rem",
            fontWeight: "bold",
          }}>Login</h2>
          
          <label htmlFor="username" style={{ marginBottom: "5px", fontWeight: "bold" }}>User Name</label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            value={username}
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

          <label htmlFor="email" style={{ marginBottom: "5px", fontWeight: "bold" }}>Email</label>
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

          <label htmlFor="password" style={{ marginBottom: "5px", fontWeight: "bold" }}>Password</label>
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
=======

import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import "primereact/resources/themes/lara-light-blue/theme.css"; // optional: use your preferred theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Login failed");
      } else {
        localStorage.setItem("user", JSON.stringify(result.user));

        if (result.user.role === "admin" || result.user.role === "hoster") {
          window.location.href = "/pages/home";
        } else {
          window.location.href = "/";
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex align-items-center justify-content-center min-h-screen bg-gray-100">
      <div className="surface-card p-4 shadow-4 border-round w-full sm:w-30rem">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">Login</h2>

        <div className="field mb-3">
          <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
          <InputText
            id="email"
            className="w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div className="field mb-4">
          <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
          <Password
            id="password"
            className="w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            toggleMask
            feedback={false}
            placeholder="Enter your password"
          />
        </div>

        <Button
          label={loading ? "Logging in..." : "Login"}
          icon="pi pi-sign-in"
          className="w-full p-button p-button-primary"
          onClick={handleLogin}
          disabled={loading}
        />
      </div>
>>>>>>> 92dae6c (commit first)
    </div>
  );
}