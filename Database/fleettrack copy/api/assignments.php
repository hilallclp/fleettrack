
<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

include "db.php";

$sql = "
SELECT
  a.assignments_id,
  a.vehicle_id,
  v.plate_number,
  u.user_name,
  a.start_date,
  a.end_date
FROM assignments a
JOIN vehicles v ON a.vehicle_id = v.vehicle_id
JOIN users u ON a.user_id = u.user_id
ORDER BY a.assignments_id ASC

";

$result = $conn->query($sql);

$assignments = [];

while ($row = $result->fetch_assoc()) {
    $assignments[] = $row;
}

include "log_action.php";

// Admin ID veya user ID buradan alınmalı
$admin_id = 1; // login’den alacağın user_id ile değiştir

addLog($admin_id, "Viewed all assignments");

echo json_encode([
    "success" => true,
    "data" => $assignments
], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

$conn->close();
?>
