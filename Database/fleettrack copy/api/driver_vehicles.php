<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "db.php";

$user_id = $_GET["user_id"] ?? 0;

$sql = "
SELECT v.vehicle_id, v.plate_number, v.model, v.status
FROM assignments a
JOIN vehicles v ON a.vehicle_id = v.vehicle_id
WHERE a.user_id = ?
  AND (a.end_date IS NULL OR a.end_date >= CURDATE())
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();

$result = $stmt->get_result();
$vehicles = [];

while ($row = $result->fetch_assoc()) {
    $vehicles[] = $row;
}

echo json_encode($vehicles);

