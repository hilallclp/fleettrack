import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import loginBg from "../assets/login-bg.jpg"; // 👈 EKLENDİ


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setUsername("");
    setPassword("");
  }, []);
  
  const handleLogin = async () => {
    const res = await fetch("http://localhost/fleettrack/api/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.role_name === "admin") {
        navigate("/admin");
      } else if (data.user.role_name === "driver") {
        navigate("/driver");
      } else if (data.user.role_name === "technician") {
        navigate("/technician");
      }
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="login-page">
      {/* SOL TARAF */}
      <div className="login-left">
        <div className="logo-text">
          <span className="fleet">Fleet</span>
          <span className="track">Track</span>
        </div>

        <div className="login-box">
          <input
            type="text"
            placeholder="Kullanıcı Adı"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login-btn" onClick={handleLogin}>
            Giriş Yap
          </button>
        </div>
      </div>

      {/* SAĞ TARAF */}
      <div className="login-right">
        <img
          src={loginBg}
          alt="Login Background"
          className="login-image"
        />
      </div>
    </div>
  );
}

export default Login;
