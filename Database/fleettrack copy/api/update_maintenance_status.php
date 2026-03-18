
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

include "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$maintenance_id = $data["maintenance_id"] ?? 0;
$status = $data["status"] ?? "";

if (!$maintenance_id || !$status) {
  echo json_encode(["success" => false]);
  exit;
}

$stmt = $conn->prepare(
  "UPDATE maintenance SET status = ? WHERE maintenance_id = ?"
);
$stmt->bind_param("si", $status, $maintenance_id);

if ($stmt->execute()) {
  echo json_encode(["success" => true]);
} else {
  echo json_encode(["success" => false]);
}
