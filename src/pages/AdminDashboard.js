import { useEffect, useState } from "react";

function AdminDashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [showVehicles, setShowVehicles] = useState(false);

  const [maintenance, setMaintenance] = useState([]);
  const [showMaintenance, setShowMaintenance] = useState(false);

  const [alerts, setAlerts] = useState([]);
  const [showAlerts, setShowAlerts] = useState(false);

  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);

  const [assignments, setAssignments] = useState([]);
  const [showAssignments, setShowAssignments] = useState(false);

  // Araçları yükle
  const loadVehicles = () => {
    fetch("http://localhost/fleettrack/api/vehicles.php")
      .then(res => res.json())
      .then(data => {
        setVehicles(data);
        setShowVehicles(true);
      });
  };

  // Bakımları yükle
  const loadMaintenance = () => {
    fetch("http://localhost/fleettrack/api/maintenance.php")
      .then(res => res.json())
      .then(data => {
        setMaintenance(data);
        setShowMaintenance(true);
      });
  };

  // Uyarıları yükle
  const loadAlerts = () => {
    fetch("http://localhost/fleettrack/api/alerts.php")
      .then(res => res.json())
      .then(data => {
        setAlerts(data);
        setShowAlerts(true);
      });
  };

  // Kullanıcıları yükle
  const loadUsers = () => {
    fetch("http://localhost/fleettrack/api/users.php")
      .then(res => res.json())
      .then(data => {
        console.log("Users API response:", data);
        setUsers(data.data);
        setShowUsers(true);
      })
      .catch(err => console.error("Users fetch error:", err));
  };
  

  // Atamaları yükle
  const loadAssignments = () => {
    fetch("http://localhost/fleettrack/api/assignments.php")
      .then(res => res.json())
      .then(data => {
        setAssignments(data.data);
        setShowAssignments(true);
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Panel</h2>

      {/* Menü */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={loadVehicles}>🚗 Araçları Listele</button>
        <button onClick={loadMaintenance} style={{ marginLeft: "10px" }}>🛠 Bakımları Listele</button>
        <button onClick={loadAlerts} style={{ marginLeft: "10px" }}>⚠️ Uyarıları Listele</button>
        <button onClick={loadUsers} style={{ marginLeft: "10px" }}>👤 Kullanıcıları Listele</button>
        <button onClick={loadAssignments} style={{ marginLeft: "10px" }}>📋 Atamaları Listele</button>
      </div>

      {/* Araç Listesi */}
      {showVehicles && (
        <div>
          <h3>Araç Listesi</h3>
          <table border="1" cellPadding="8">
            <thead>
              <tr>
                <th>ID</th>
                <th>Plaka</th>
                <th>Model</th>
                <th>Kilometre</th>
                <th>Durum</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map(v => (
                <tr key={v.vehicle_id}>
                  <td>{v.vehicle_id}</td>
                  <td>{v.plate_number}</td>
                  <td>{v.model}</td>
                  <td>{v.mileage}</td>
                  <td>{v.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Bakım Listesi */}
      {showMaintenance && (
        <div style={{ marginTop: "30px" }}>
          <h3>Bakım Kayıtları</h3>
          <table border="1" cellPadding="8">
            <thead>
              <tr>
                <th>ID</th>
                <th>Plaka</th>
                <th>Teknisyen</th>
                <th>Maliyet</th>
                <th>Durum</th>
              </tr>
            </thead>
            <tbody>
              {maintenance.map(m => (
                <tr key={m.maintenance_id}>
                  <td>{m.maintenance_id}</td>
                  <td>{m.plate_number}</td>
                  <td>{m.technician}</td>
                  <td>{m.cost} ₺</td>
                  <td>{m.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Uyarılar */}
      {showAlerts && (
        <div style={{ marginTop: "30px" }}>
          <h3>Uyarılar</h3>
          <table border="1" cellPadding="8">
            <thead>
              <tr>
                <th>ID</th>
                <th>Araç</th>
                <th>Oluşturan</th>
                <th>Tip</th>
                <th>Önem</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map(a => (
                <tr key={a.alerts_id}>
                  <td>{a.alerts_id}</td>
                  <td>{a.plate_number}</td>
                  <td>{a.created_by}</td>
                  <td>{a.alert_type}</td>
                  <td>{a.severity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Kullanıcılar */}
      {showUsers && (
        <div style={{ marginTop: "30px" }}>
          <h3>Kullanıcılar</h3>
          <table border="1" cellPadding="8">
            <thead>
              <tr>
                <th>ID</th>
                <th>Ad Soyad</th>
                <th>Telefon</th>
                <th>Rol</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.user_id}>
                  <td>{u.user_id}</td>
                  <td>{u.user_name}</td>
                  <td>{u.phone}</td>
                  <td>{u.rol_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Atamalar */}
      {showAssignments && (
        <div style={{ marginTop: "30px" }}>
          <h3>Atamalar</h3>
          <table border="1" cellPadding="8">
            <thead>
              <tr>
                <th>ID</th>
                <th>Araç</th>
                <th>Kullanıcı</th>
                <th>Başlangıç Tarihi</th>
                <th>Bitiş Tarihi</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map(a => (
                <tr key={a.assignments_id}>
                  <td>{a.assignments_id}</td>
                  <td>{a.plate_number}</td>
                  <td>{a.user_name}</td>
                  <td>{a.start_date}</td>
                  <td>{a.end_date || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;