import React, { useEffect, useState } from "react";

function TechnicianDashboard() {
  // 🔹 Login'den gelen user_id
  const technicianId = JSON.parse(localStorage.getItem("user"))?.user_id || 6;

  const [vehicles, setVehicles] = useState([]);
  const [vehicleId, setVehicleId] = useState("");

  const [parts, setParts] = useState([]);
  const [selectedParts, setSelectedParts] = useState([]);
  const [message, setMessage] = useState("");

  // 🔹 Yaptığım bakımlar
  const [myMaintenance, setMyMaintenance] = useState([]);
  const [showMyMaintenance, setShowMyMaintenance] = useState(false);

  // 🔹 Araçları çek
  useEffect(() => {
    fetch("http://localhost/fleettrack/api/vehicles.php")
      .then(res => res.json())
      .then(data => setVehicles(data));
  }, []);

  // 🔹 Parçaları çek
  useEffect(() => {
    fetch("http://localhost/fleettrack/api/get_parts.php")
      .then(res => res.json())
      .then(data => {
        if (data.success) setParts(data.data);
      });
  }, []);

  // 🔹 Teknisyenin kendi bakımları
  useEffect(() => {
    fetch("http://localhost/fleettrack/api/get_my_maintenance.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        technician_id: technicianId
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setMyMaintenance(data.data);
          setShowMyMaintenance(true);
        }
      });
  }, [technicianId]);

  // 🔹 Parça ekle (aynı parça tekrar eklenemez)
  const addPart = (part) => {
    if (selectedParts.find(p => p.part_id === part.parts_id)) return;

    let cleanPrice = part.price;
    if (typeof cleanPrice === "string") {
      cleanPrice = Number(cleanPrice.replace("₺", "").replace(",", ".").trim());
    }
    if (isNaN(cleanPrice)) cleanPrice = 0;

    setSelectedParts(prev => [
      ...prev,
      {
        part_id: part.parts_id,
        name: part.parts_name,
        total_price: cleanPrice,
      }
    ]);
  };

  // 🔹 Toplam maliyet
  const totalCost = selectedParts
    .reduce((sum, p) => sum + parseFloat(p.total_price), 0)
    .toFixed(2);

  // 🔹 Bakım ekle
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!vehicleId) {
      setMessage("❌ Araç seçilmelidir");
      return;
    }
    if (selectedParts.length === 0) {
      setMessage("❌ En az 1 parça seçmelisiniz");
      return;
    }

    fetch("http://localhost/fleettrack/api/add_maintenance.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        vehicle_id: Number(vehicleId),
        technician_id: technicianId,
        cost: Number(totalCost),
        parts: selectedParts,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setMessage("✅ Bakım başarıyla eklendi");
          setVehicleId("");
          setSelectedParts([]);

          // 🔹 bakım eklendikten sonra listeyi yenile
          setMyMaintenance(prev => [
            {
              maintenance_id: "Yeni",
              plate_number: vehicles.find(v => v.vehicle_id == vehicleId)?.plate_number,
              model: vehicles.find(v => v.vehicle_id == vehicleId)?.model,
              cost: totalCost,
              status: "bekliyor"
            },
            ...prev
          ]);
        } else {
          setMessage("❌ Bakım eklenemedi");
        }
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🔧 Teknisyen Paneli</h1>

      {/* 🔹 BAKIM EKLEME FORMU */}
      <form onSubmit={handleSubmit}>
        <h3>Araç Seçimi</h3>
        <select
          value={vehicleId}
          onChange={(e) => setVehicleId(e.target.value)}
          required
        >
          <option value="">-- Araç Seçin --</option>
          {vehicles.map(v => (
            <option key={v.vehicle_id} value={v.vehicle_id}>
              {v.plate_number} ({v.model})
            </option>
          ))}
        </select>

        <h3 style={{ marginTop: "20px" }}>🔩 Kullanılan Parçalar</h3>
        <ul>
          {parts.map(p => (
            <li key={p.parts_id}>
              {p.parts_name} – {p.price}₺
              <button
                type="button"
                onClick={() => addPart(p)}
                style={{ marginLeft: "10px" }}
              >
                Ekle
              </button>
            </li>
          ))}
        </ul>

        <h4>🧾 Seçilen Parçalar</h4>
        <ul>
          {selectedParts.map((p, i) => (
            <li key={i}>
              {p.name} – {p.total_price.toFixed(2)}₺
            </li>
          ))}
        </ul>

        <p><strong>Toplam Maliyet:</strong> {totalCost}₺</p>

        <button type="submit">Bakım Ekle</button>
      </form>

      {message && <p>{message}</p>}

      {/* 🔹 YAPTIĞIM BAKIMLAR */}
      {showMyMaintenance && (
        <div style={{ marginTop: "40px" }}>
          <h2>📋 önceki Bakımlar</h2>

          {myMaintenance.length === 0 ? (
            <p>Henüz bakım kaydınız yok.</p>
          ) : (
            <table border="1" cellPadding="8">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Araç</th>
                  <th>Maliyet</th>
                  <th>Durum</th>
                </tr>
              </thead>
              <tbody>
                {myMaintenance.map((m, index) => (
                  <tr key={index}>
                    <td>{m.maintenance_id}</td>
                    <td>{m.plate_number} ({m.model})</td>
                    <td>{m.cost} ₺</td>
                    <td>{m.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default TechnicianDashboard;
