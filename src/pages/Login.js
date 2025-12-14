// React ve useState hook'u import edilir
// useState → form alanlarındaki verileri tutmak için kullanılır
import React, { useState } from "react";

// useNavigate → role göre farklı sayfalara yönlendirme yapmak için
import { useNavigate } from "react-router-dom";

// Login sayfasına ait CSS dosyası
import "../styles/Login.css";

function Login() {
  // Kullanıcının girdiği email bilgisini tutar
  const [email, setEmail] = useState("");

  // Kullanıcının girdiği şifreyi tutar
  const [password, setPassword] = useState("");

  // Kullanıcının seçtiği rolü tutar (driver / technician / admin)
  const [role, setRole] = useState("");

  // Sayfa yönlendirme işlemleri için kullanılır
  const navigate = useNavigate();

  // Login formu gönderildiğinde çalışır
  const handleLogin = (e) => {
    e.preventDefault(); // Sayfanın yenilenmesini engeller

    /*
      ŞU ANDA BACKEND YOK
      Bu yüzden sadece role bakarak yönlendirme yapıyoruz.
      İleride burada:
      - email & şifre backend'e gönderilecek
      - kullanıcı doğrulanacak
    */

    if (role === "driver") {
      navigate("/driver"); // Sürücü paneline git
    }

    if (role === "technician") {
      navigate("/technician"); // Teknisyen paneline git
    }

    if (role === "admin") {
      navigate("/admin"); // Yönetici paneline git
    }
  };

  return (
    <div className="login-container">
      <h2>FleetTrack Giriş</h2>

      {/* Rol seçimi alanı */}
      <div className="role-buttons">
        <button onClick={() => setRole("driver")}>Sürücü</button>
        <button onClick={() => setRole("technician")}>Teknisyen</button>
        <button onClick={() => setRole("admin")}>Yönetici</button>
      </div>

      {/* Rol seçilmeden login formu gösterilmez */}
      {role && (
        <form onSubmit={handleLogin} className="login-form">
          {/* Email girişi */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Şifre girişi */}
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Giriş butonu */}
          <button type="submit">Giriş Yap</button>
        </form>
      )}

      {/* Kayıt ol sayfasına yönlendirme */}
      <p>
        Hesabın yok mu? <a href="/register">Kayıt Ol</a>
      </p>
    </div>
  );
}

// Component dışa aktarılır
export default Login;
