<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

include "db.php";

$data = json_decode(file_get_contents("php://input"), true);
$assignment_id = $data["assignment_id"] ?? 0;

if (!$assignment_id) {
  echo json_encode(["success" => false, "message" => "ID yok"]);
  exit;
}

$sql = "UPDATE assignments
        SET end_date = CURDATE()
        WHERE assignments_id = ? AND end_date IS NULL";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $assignment_id);
$stmt->execute();

echo json_encode([
  "success" => true,
  "affected" => $stmt->affected_rows
]);
