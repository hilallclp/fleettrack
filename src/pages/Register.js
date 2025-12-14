// src/pages/Register.js
import React, { useState } from "react";
import "../styles/Register.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    const newUser = {
      name,
      email,
      password,
      role,
    };

    console.log("Kayıt Bilgileri:", newUser);
  };

  return (
    <div className="register-container">
      <h2>Kayıt Ol</h2>

      <form onSubmit={handleRegister} className="register-form">
        <input
          type="text"
          placeholder="Ad Soyad"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="">Rol Seçiniz</option>
          <option value="admin">Yönetici</option>
          <option value="driver">Sürücü</option>
          <option value="technician">Teknisyen</option>
        </select>

        <button type="submit">Kayıt Ol</button>
      </form>
    </div>
  );
}

export default Register;
