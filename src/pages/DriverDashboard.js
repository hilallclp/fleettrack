import { useEffect, useState } from "react";
import "../styles/DriverDashboard.css";
import { useNavigate } from "react-router-dom";

function DriverDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [vehicles, setVehicles] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [maintenance, setMaintenance] = useState([]);

  // ➕ Rota ekleme state’leri
  const [vehicleId, setVehicleId] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [distance, setDistance] = useState("");

  useEffect(() => {
    fetch(`http://localhost/fleettrack/api/driver_vehicles.php?user_id=${user.user_id}`)
      .then(res => res.json())
      .then(data => setVehicles(data));

    fetch(`http://localhost/fleettrack/api/driver_routes.php?user_id=${user.user_id}`)
      .then(res => res.json())
      .then(data => setRoutes(data));

    fetch(`http://localhost/fleettrack/api/driver_maintenance.php?user_id=${user.user_id}`)
      .then(res => res.json())
      .then(data => setMaintenance(data));
  }, [user.user_id]);

  // ➕ Rota ekle
  const addRoute = () => {
    if (!vehicleId || !start || !end || !distance) {
      alert("Tüm alanları doldur");
      return;
    }
  
    fetch("http://localhost/fleettrack/api/driver_add_route.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user.user_id,
        vehicle_id: Number(vehicleId),
        start_location: start,
        end_location: end,
        distance_km: Number(distance)
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("ADD ROUTE RESPONSE:", data);
  
        if (!data.success) {
          alert("EKLENMEDİ: " + data.error);
          return;
        }
  
        // ✅ başarılıysa tekrar rotaları çek
        return fetch(`http://localhost/fleettrack/api/driver_routes.php?user_id=${user.user_id}`);
      })
      .then(res => res && res.json())
      .then(data => {
        if (data) {
          setRoutes(data);
          setVehicleId("");
          setStart("");
          setEnd("");
          setDistance("");
        }
      })
      .catch(err => {
        console.error("HATA:", err);
      });
  };
  

  // ❌ Rota sil
  const deleteRoute = (id) => {
    fetch(`http://localhost/fleettrack/api/driver_delete_route.php?routes_id=${id}`)
      .then(() => {
        setRoutes(routes.filter(r => r.routes_id !== id));
      });
  };

  return (
    <div className="dashboard-container">

<div className="dashboard-header">
  <div>
    <h1>Driver Dashboard</h1>
    <p>Sürücü paneline hoş geldin</p>
  </div>

  <button
    className="logout-btn"
    onClick={() => {
      localStorage.removeItem("user");
      navigate("/"); // login
    }}
  >
    Çıkış Yap
  </button>
</div>


      {/* Araçlarım */}
      <div className="section">
        <h3>Araçlarım</h3>
        <div className="vehicle-list">
          {vehicles.map(v => (
            <div className="vehicle-card" key={v.vehicle_id}>
              <div className="plate">🚗 {v.plate_number}</div>
              <div>{v.model}</div>
              <span className={`status ${v.status}`}>{v.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Rotalarım */}
      <div className="section">
        <h3>Rotalarım</h3>

        {/* ➕ Rota Ekle Formu */}
        <div className="add-route-form">
          <select value={vehicleId} onChange={e => setVehicleId(e.target.value)}>
            <option value="">Araç Seç</option>
            {vehicles.map(v => (
              <option key={v.vehicle_id} value={v.vehicle_id}>
                {v.plate_number}
              </option>
            ))}
          </select>

          <input placeholder="Başlangıç" value={start} onChange={e => setStart(e.target.value)} />
          <input placeholder="Bitiş" value={end} onChange={e => setEnd(e.target.value)} />
          <input type="number" placeholder="Mesafe (km)" value={distance} onChange={e => setDistance(e.target.value)} />

          <button onClick={addRoute}>➕ Rota Ekle</button>
        </div>

        <div className="routes-grid">
          {routes.map(r => (
            <div className="route-card" key={r.routes_id}>
              <div className="route-vehicle">🚘 {r.plate_number}</div>
              <div className="route-path">
                {r.start_location} → {r.end_location}
              </div>
              <div className="route-distance">
                Mesafe: {r.distance_km} km
              </div>

              <button
                className="delete-route-btn"
                onClick={() => deleteRoute(r.routes_id)}
              >
                ❌ Sil
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Bakım Geçmişim */}
      <div className="section">
        <h3>Bakım Geçmişim</h3>
        <div className="routes-grid">
          {maintenance.map(m => (
            <div className="route-card" key={m.maintenance_id}>
              <div className="route-vehicle">
                🔧 {m.plate_number} – {m.model}
              </div>
              <div className="route-path">
                Maliyet: {m.cost} TL
              </div>
              <span className={`status ${m.status}`}>{m.status}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default DriverDashboard;
