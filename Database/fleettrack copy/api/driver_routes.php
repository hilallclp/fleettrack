
<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "db.php";

$user_id = $_GET["user_id"] ?? 0;

$sql = "
SELECT r.routes_id, r.start_location, r.end_location, r.distance_km,
       v.plate_number
FROM routes r
JOIN vehicles v ON r.vehicle_id = v.vehicle_id
WHERE r.user_id = ?
ORDER BY r.routes_id DESC
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();

$result = $stmt->get_result();
$routes = [];

while ($row = $result->fetch_assoc()) {
    $routes[] = $row;
}

echo json_encode($routes);
