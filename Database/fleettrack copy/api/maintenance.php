<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "db.php";

$sql = "
SELECT
    m.maintenance_id,
    v.plate_number,
    u.user_name AS technician,
    m.cost,
    m.status
FROM maintenance m
JOIN vehicles v ON m.vehicle_id = v.vehicle_id
JOIN users u ON m.technician_id = u.user_id
";

$result = $conn->query($sql);

$data = [];

while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);

