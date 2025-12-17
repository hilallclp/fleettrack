import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch(
      "http://localhost/fleettrack/api/login.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      }
    );

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
    }
     else {
      alert(data.message);
    }
  };

  return (
    <div>
      <h2>FleetTrack Login</h2>

      <input
        placeholder="Kullanıcı Adı"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Şifre"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Giriş Yap</button>
    </div>
  );
}

export default Login;
