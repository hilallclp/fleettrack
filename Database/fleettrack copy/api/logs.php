<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include "db.php";

$sql = "
SELECT
    u.user_name,
    r.rol_name,
    l.action,
    l.created_at
FROM logs l
JOIN users u ON l.user_id = u.user_id
LEFT JOIN roles r ON u.role_id = r.rol_id
ORDER BY l.created_at DESC
LIMIT 10
";

$result = $conn->query($sql);

if (!$result) {
    echo json_encode([
        "error" => $conn->error
    ]);
    exit;
}

$logs = [];
while ($row = $result->fetch_assoc()) {
    $logs[] = $row;
}

echo json_encode($logs);
$conn->close();
