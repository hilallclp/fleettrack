<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "db.php";

$data = json_decode(file_get_contents("php://input"), true);
$technician_id = $data["technician_id"] ?? 0;

$sql = "
SELECT
    m.maintenance_id,
    v.plate_number,
    v.model,
    m.cost,
    m.status
FROM maintenance m
JOIN vehicles v ON m.vehicle_id = v.vehicle_id
WHERE m.technician_id = ?
ORDER BY m.maintenance_id DESC
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $technician_id);
$stmt->execute();

$result = $stmt->get_result();
$maintenances = [];

while ($row = $result->fetch_assoc()) {
    $maintenances[] = $row;
}

echo json_encode([
    "success" => true,
    "data" => $maintenances
]);

$conn->close();

