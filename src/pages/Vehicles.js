import { useEffect, useState } from "react";

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetch("http://localhost/fleettrack/api/vehicles.php")
      .then(res => res.json())
      .then(data => setVehicles(data));
  }, []);

  return (
    <div>
      <h2>Araç Listesi</h2>

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
  );
}

export default Vehicles;
