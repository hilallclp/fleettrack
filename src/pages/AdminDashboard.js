import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Admin.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  /* ---------- STATES ---------- */
  const [show, setShow] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const [maintenance, setMaintenance] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [users, setUsers] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [logs, setLogs] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");

  const [newUser, setNewUser] = useState({
    user_name: "",
    phone: "",
    role_id: 2 // default: Driver
  });

  /* ---------- LOADERS ---------- */

  const loadVehicles = () => {
    setShow("vehicles");
    fetch("http://localhost/fleettrack/api/vehicles.php")
      .then(r => r.json())
      .then(setVehicles);
  };

  const loadMaintenance = () => {
    setShow("maintenance");
    fetch("http://localhost/fleettrack/api/maintenance.php")
      .then(r => r.json())
      .then(setMaintenance);
  };

  const loadAlerts = () => {
    setShow("alerts");
    fetch("http://localhost/fleettrack/api/alerts.php")
      .then(r => r.json())
      .then(setAlerts);
  };

  const loadUsers = () => {
    setShow("users");
  
    fetch("http://localhost/fleettrack/api/users.php")
      .then(r => r.json())
      .then(d => {
        console.log("USERS FROM API:", d);
        setUsers(d); // ✅ DOĞRUSU
      });
  };
  

  const loadAssignments = () => {
    setShow("assignments");
  
    fetch("http://localhost/fleettrack/api/users.php")
      .then(r => r.json())
      .then(setUsers);
  
    fetch("http://localhost/fleettrack/api/vehicles.php")
      .then(r => r.json())
      .then(setVehicles);
  
    fetch("http://localhost/fleettrack/api/assignments.php")
      .then(r => r.json())
      .then(d => setAssignments(d.data));
  };
  

  const loadLogs = () => {
    setShow("logs");
    fetch("http://localhost/fleettrack/api/logs.php")
      .then(r => r.json())
      .then(setLogs);
  };

  /* ---------- USERS ---------- */

  const addUser = async () => {
    if (!newUser.user_name || !newUser.phone) return;

    await fetch("http://localhost/fleettrack/api/add_user.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser)
    });

    setNewUser({ user_name: "", phone: "", role_id: 2 });
    loadUsers();
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Silinsin mi?")) return;

    await fetch("http://localhost/fleettrack/api/delete_user.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: id })
    });

    loadUsers();
  };
/* ---------- ASSIGN VEHICLE ---------- */
const assignVehicle = async () => {
  if (!selectedUser || !selectedVehicle) {
    alert("Driver ve araç seçmelisin");
    return;
  }

  try {
    const res = await fetch("http://localhost/fleettrack/api/assign_vehicle.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: selectedUser,
        vehicle_id: selectedVehicle
      })
    });

    const data = await res.json();

    if (!data.success) {
      alert(data.message || "Atama yapılamadı");
      return;
    }

    alert("Araç başarıyla atandı");

    setSelectedUser("");
    setSelectedVehicle("");
    loadAssignments();

  } catch (err) {
    alert("Bu araç zaten atanmış");
  }
};


const removeAssignment = async (assignment_id) => {
  if (!window.confirm("Atama kaldırılsın mı?")) return;

  await fetch("http://localhost/fleettrack/api/remove_assignment.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ assignment_id })
  });

  loadAssignments();
};

const activeVehicleIds = assignments
  .filter(a => a.end_date === null)
  .map(a => Number(a.vehicle_id));

  const drivers = users.filter(u => u.rol_name === "driver");

  

  /* ---------- RENDER ---------- */

return (
  <div className="admin-dashboard">

  <div className="dashboard-header">
    <h2>Hoş geldin {user?.user_name}</h2>

    {/* Logout Button */}
    <button
      className="logout-btn"
      onClick={() => {
        localStorage.removeItem("user");
        navigate("/"); // login sayfasına yönlendir
      }}
      style={{
        marginLeft: "auto",
        padding: "5px 10px",
        backgroundColor: "#f44336",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer"
      }}
    >
      Çıkış Yap
    </button>
  </div>

  {/* BUTTON BAR */}
  <div className="button-bar">
      <button onClick={loadVehicles}>🚗 Araçlar</button>
      <button onClick={loadMaintenance}>🛠 Bakımlar</button>
      <button onClick={loadAlerts}>⚠️ Uyarılar</button>
      <button onClick={loadUsers}>👤 Kullanıcılar</button>
      <button onClick={loadAssignments}>📋 Atamalar</button>
      <button onClick={loadLogs}>🕒 Loglar</button>
    </div>

  
      {/* ---------- VEHICLES ---------- */}
      {show === "vehicles" && (
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Plaka</th><th>Model</th><th>KM</th><th>Durum</th>
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
      )}

      {/* ---------- MAINTENANCE ---------- */}
      {show === "maintenance" && (
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Plaka</th><th>Teknisyen</th><th>Maliyet</th><th>Durum</th>
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
      )}

      {/* ---------- ALERTS ---------- */}
      {show === "alerts" && (
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Araç</th><th>Tip</th><th>Önem</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map(a => (
              <tr key={a.alerts_id}>
                <td>{a.alerts_id}</td>
                <td>{a.plate_number}</td>
                <td>{a.alert_type}</td>
                <td>{a.severity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ---------- USERS ---------- */}
      {show === "users" && (
        <>
          <div className="add-user-box">
            <input
              placeholder="Ad Soyad"
              value={newUser.user_name}
              onChange={e =>
                setNewUser({ ...newUser, user_name: e.target.value })
              }
            />

            <input
              placeholder="Telefon"
              value={newUser.phone}
              onChange={e =>
                setNewUser({ ...newUser, phone: e.target.value })
              }
            />

            <select
              value={newUser.role_id}
              onChange={e =>
                setNewUser({ ...newUser, role_id: Number(e.target.value) })
              }
            >
              <option value={1}>Admin</option>
              <option value={2}>Driver</option>
              <option value={3}>Technician</option>
            </select>

            <button onClick={addUser}>➕</button>
          </div>

          <table>
            <thead>
              <tr>
                <th>ID</th><th>Ad</th><th>Telefon</th><th>Rol</th><th></th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.user_id}>
                  <td>{u.user_id}</td>
                  <td>{u.user_name}</td>
                  <td>{u.phone}</td>
                  <td>{u.rol_name}</td>
                  <td>
                    <button onClick={() => deleteUser(u.user_id)}>❌</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

            {/* ---------- ASSIGNMENTS ---------- */}
            {show === "assignments" && (
        <>
          <div className="assign-box">
            <select value={selectedUser} onChange={e => setSelectedUser(e.target.value)}>
              <option value="">Driver seç</option>
              {drivers.map(d => (
                <option key={d.user_id} value={d.user_id}>
                  {d.user_name}
                </option>
              ))}
            </select>

            <select value={selectedVehicle} onChange={e => setSelectedVehicle(e.target.value)}>
              <option value="">Araç seç</option>
              {vehicles
  .filter(v => !activeVehicleIds.includes(Number(v.vehicle_id)))
  .map(v => (
    <option key={v.vehicle_id} value={v.vehicle_id}>
      {v.plate_number}
    </option>
  ))}

            </select>

            <button onClick={assignVehicle}>➕ Ata</button>
          </div>

          <table>
            <thead>
              <tr>
                <th>ID</th><th>Araç</th><th>Kullanıcı</th>
                <th>Başlangıç</th><th>Bitiş</th><th></th>
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
                  <td>
                    {!a.end_date && (
                      <button
                        className="danger-btn"
                        onClick={() => removeAssignment(a.assignments_id)}
                      >
                        ❌
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {/* ---------- LOGS ---------- */}
      {show === "logs" && (
        <table>
          <thead>
            <tr>
              <th>Kullanıcı</th><th>Rol</th><th>İşlem</th><th>Tarih</th>
            </tr>
          </thead>
          <tbody>
            {logs
              .filter(l => l.action === "login")
              .map((l, i) => (
                <tr key={i}>
                  <td>{l.user_name}</td>
                  <td>{l.rol_name}</td>
                  <td>{l.action}</td>
                  <td>{new Date(l.created_at).toLocaleString("tr-TR")}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}

    </div>
  );
}

export default AdminDashboard;