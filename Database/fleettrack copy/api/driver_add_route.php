<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}


include "db.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["success" => false, "error" => "JSON alınamadı"]);
    exit;
}

$user_id = $data["user_id"] ?? null;
$vehicle_id = $data["vehicle_id"] ?? null;
$start = $data["start_location"] ?? "";
$end = $data["end_location"] ?? "";
$distance = $data["distance_km"] ?? 0;

if (!$user_id || !$vehicle_id) {
    echo json_encode(["success" => false, "error" => "Eksik veri"]);
    exit;
}

$sql = "INSERT INTO routes (user_id, vehicle_id, start_location, end_location, distance_km)
        VALUES (?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("iissd", $user_id, $vehicle_id, $start, $end, $distance);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode([
        "success" => false,
        "error" => $stmt->error
    ]);
}
