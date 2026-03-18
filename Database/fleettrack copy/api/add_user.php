<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Hata raporu aç
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include "db.php";

$input = file_get_contents("php://input");
$data = json_decode($input, true);

if (!$data) {
    echo json_encode(["success" => false, "message" => "JSON boş geldi", "input" => $input]);
    exit;
}

$user_name = $conn->real_escape_string($data['user_name'] ?? '');
$phone = $conn->real_escape_string($data['phone'] ?? '');
$role_id = intval($data['role_id'] ?? 0);
$password = password_hash("1234", PASSWORD_DEFAULT);

if (!$user_name || !$phone || !$role_id) {
    echo json_encode(["success" => false, "message" => "Eksik alan!"]);
    exit;
}

$sql = "INSERT INTO users (user_name, phone, role_id, password)
        VALUES ('$user_name', '$phone', $role_id, '$password')";

if ($conn->query($sql)) {
    echo json_encode(["success" => true, "message" => "Kullanıcı eklendi"]);
} else {
    echo json_encode(["success" => false, "message" => $conn->error]);
}
?>
