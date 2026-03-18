import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/TechnicianDashboard.css";

/* ---------- SAFE FETCH ---------- */
const safeFetch = async (url, options = {}) => {
  const res = await fetch(url, options);
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    console.error("JSON değil:", text);
    throw new Error("Geçersiz JSON");
  }
};

function TechnicianDashboard() {
  const navigate = useNavigate();

  /* ---------- USER ---------- */
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const technicianId =Number(user?.user_id);
  const technicianName = user.user_name || "Teknisyen";

  /* ---------- STATE ---------- */
  const [vehicles, setVehicles] = useState([]);
  const [vehicleId, setVehicleId] = useState("");
  const [parts, setParts] = useState([]);
  const [selectedParts, setSelectedParts] = useState([]);
  const [message, setMessage] = useState("");
  const [myMaintenance, setMyMaintenance] = useState([]);
  const [showMyMaintenance, setShowMyMaintenance] = useState(false);

  /* ---------- ARAÇLAR ---------- */
  useEffect(() => {
    safeFetch("http://localhost/fleettrack/api/vehicles.php")
      .then(setVehicles)
      .catch(console.error);
  }, []);

  /* ---------- PARÇALAR / BAKIM ÇEŞİTLERİ ---------- */
  useEffect(() => {
    safeFetch("http://localhost/fleettrack/api/get_parts.php")
      .then(d => d.success && setParts(d.data))
      .catch(console.error);
  }, []);

  /* ---------- BENİM BAKIMLARIM ---------- */
  useEffect(() => {
    safeFetch("http://localhost/fleettrack/api/get_my_maintenance.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ technician_id: technicianId })
    })
      .then(d => {
        console.log("GET MY MAINTENANCE RESPONSE:", d);
        if (d.success) {
          setMyMaintenance(d.data);
          setShowMyMaintenance(true);
        }
      })
      .catch(console.error);
  }, [technicianId]);

  /* ---------- BAKIM ÇEŞİDİ EKLE ---------- */
  const addPart = (part) => {
    if (selectedParts.find(p => p.part_id === Number(part.parts_id))) return;

    const price = Number(
      String(part.price)
        .replace("₺", "")
        //.replace(".", "")
        .replace(",", ".")
    ) || 0;

    setSelectedParts(prev => [
      ...prev,
      {
        part_id: Number(part.parts_id),
        name: part.parts_name,
        total_price: price
      }
    ]);
  };

  /* ---------- TOPLAM MALİYET (CANLI) ---------- */
  const totalCost = selectedParts.reduce(
    (sum, p) => sum + p.total_price,
    0
  );

  /* ---------- ARAÇ METNİ ---------- */
  const getVehicleText = (m) => {
    if (m.plate_number) {
      return `${m.plate_number}${m.model ? ` (${m.model})` : ""}`;
    }

    const vehicle = vehicles.find(
      v => Number(v.vehicle_id) === Number(m.vehicle_id)
    );

    return vehicle
      ? `${vehicle.plate_number} (${vehicle.model})`
      : "-";
  };

/* ---------- BAKIM TAMAMLANDI ---------- */
const markAsCompleted = async (maintenanceId) => {
  try {
    const data = await safeFetch(
      "http://localhost/fleettrack/api/update_maintenance_status.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          maintenance_id: maintenanceId,
          status: "tamamlandı"
        })
      }
    );

    if (data.success) {
      setMyMaintenance(prev =>
        prev.map(m =>
          m.maintenance_id === maintenanceId
            ? { ...m, status: "tamamlandı" }
            : m
        )
      );
    }
  } catch {
    alert("❌ Durum güncellenemedi");
  }
};

  /* ---------- BAKIM EKLE ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!vehicleId) {
      setMessage("❌ Araç seçilmelidir");
      return;
    }

    if (!selectedParts.length) {
      setMessage("❌ En az 1 bakım çeşidi eklemelisiniz");
      return;
    }

    try {
      const data = await safeFetch(
        "http://localhost/fleettrack/api/add_maintenance.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            vehicle_id: Number(vehicleId),
            technician_id: technicianId,
            cost: totalCost,
            parts: selectedParts
          })
        }
      );

      if (data.success) {
        const selectedVehicle = vehicles.find(
          v => Number(v.vehicle_id) === Number(vehicleId)
        );

        setMyMaintenance(prev => [
          {
            maintenance_id: data.maintenance_id || "Yeni",
            vehicle_id: Number(vehicleId),
            plate_number: selectedVehicle?.plate_number,
            model: selectedVehicle?.model,
            cost: totalCost,
            status: "bekliyor"
          },
          ...prev
        ]);

        setSelectedParts([]);
        setVehicleId("");
        setMessage("✅ Bakım başarıyla eklendi");
        setShowMyMaintenance(true);
      } else {
        setMessage("❌ Bakım eklenemedi");
      }
    } catch {
      setMessage("❌ Sunucu hatası");
    }
  };

  /* ---------- RENDER ---------- */
  return (
    <div className="technician-dashboard">
      <div className="dashboard-header">
  <h1>🔧 Teknisyen Paneli</h1>
  <p>Giriş yapan: {technicianName}</p>

  <button
    className="logout-btn"
    onClick={() => {
      localStorage.removeItem("user");
      navigate("/"); // login sayfasına yönlendir
    }}
  >
    Çıkış Yap
  </button>
</div>


      <form className="maintenance-form" onSubmit={handleSubmit}>
        {/* ARAÇ SEÇ */}
        <select value={vehicleId} onChange={e => setVehicleId(e.target.value)}>
          <option value="">-- Araç Seçin --</option>
          {vehicles.map(v => (
            <option key={v.vehicle_id} value={v.vehicle_id}>
              {v.plate_number} ({v.model})
            </option>
          ))}
        </select>

        {/* BAKIM ÇEŞİTLERİ */}
        <ul className="parts-list">
          {parts.map(p => (
            <li key={p.parts_id}>
              {p.parts_name} – {p.price} ₺
              <button type="button" onClick={() => addPart(p)}>
                Ekle
              </button>
            </li>
          ))}
        </ul>

        {/* EKLENEN BAKIM ÇEŞİTLERİ (ALT LİSTE) */}
        {selectedParts.length > 0 && (
          <div className="selected-parts">
            <h4>🧰 Eklenen Bakım Çeşitleri</h4>
            <ul>
              {selectedParts.map((p, i) => (
                <li key={i}>
                  {p.name} – {p.total_price.toFixed(2)} ₺
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* TOPLAM MALİYET */}
        <p className="total-cost">
          <strong>Toplam Maliyet:</strong> {totalCost.toFixed(2)} ₺
        </p>

        <button type="submit">Bakım Ekle</button>

        {message && (
          <p className={`message ${message.includes("❌") ? "error" : "success"}`}>
            {message}
          </p>
        )}
      </form>

      {/* BAKIM LİSTEM */}
      {showMyMaintenance && (
        <table className="maintenance-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Araç</th>
              <th>Maliyet</th>
              <th>Durum</th>
              <th>İşlem</th>

            </tr>
          </thead>
          <tbody>
            {myMaintenance.map((m, i) => (
              <tr key={i}>
                <td>{m.maintenance_id}</td>
                <td>{getVehicleText(m)}</td>
                <td>{Number(m.cost).toFixed(2)} ₺</td>
                <td>{m.status}</td>
                <td>
    {m.status === "bekliyor" && (
      <button
        className="complete-btn"
        onClick={() => markAsCompleted(m.maintenance_id)}
      >
        ✔ Tamamlandı
      </button>
    )}
  </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TechnicianDashboard;