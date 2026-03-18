
<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "db.php";

$route_id = $_GET["routes_id"] ?? 0;

$sql = "DELETE FROM routes WHERE routes_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $route_id);

echo json_encode(["success" => $stmt->execute()]);
