import { useEffect, useState } from "react";

function DriverDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [vehicles, setVehicles] = useState([]);
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    // Araçlarım
    fetch(
      `http://localhost/fleettrack/api/driver_vehicles.php?user_id=${user.user_id}`
    )
      .then(res => res.json())
      .then(data => setVehicles(data));

    // Rotalarım
    fetch(
      `http://localhost/fleettrack/api/driver_routes.php?user_id=${user.user_id}`
    )
      .then(res => res.json())
      .then(data => setRoutes(data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Driver Dashboard</h2>

      {/* Araçlarım */}
      <h3>Araçlarım</h3>
      {vehicles.map(v => (
        <div key={v.vehicle_id}>
          🚗 {v.plate_number} – {v.model} ({v.status})
        </div>
      ))}

      {/* Rotalarım */}
      <h3 style={{ marginTop: "20px" }}>Rotalarım</h3>
      {routes.map(r => (
        <div
          key={r.routes_id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px"
          }}
        >
          <p>
            <strong>Araç:</strong> {r.plate_number}
          </p>
          <p>
            {r.start_location} → {r.end_location}
          </p>
          <p>
            Mesafe: {r.distance_km} km
          </p>
        </div>
      ))}
    </div>
  );
}

export default DriverDashboard;
