
<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "db.php";

// GET parametresi ile kullanıcı id al
$user_id = $_GET["user_id"] ?? 0;

// Kullanıcının kendi araçları
$sql = "
SELECT m.maintenance_id, v.plate_number, v.model, m.cost, m.status
FROM maintenance m
JOIN vehicles v ON m.vehicle_id = v.vehicle_id
JOIN assignments a ON v.vehicle_id = a.vehicle_id
WHERE a.user_id = ?
ORDER BY m.maintenance_id DESC
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$maintenances = [];
while ($row = $result->fetch_assoc()) {
    $maintenances[] = $row;
}

echo json_encode($maintenances);

$conn->close();
