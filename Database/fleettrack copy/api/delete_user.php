<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include "db.php";

$input = file_get_contents("php://input");
$data = json_decode($input, true);

$user_id = intval($data['user_id'] ?? 0);

if (!$user_id) {
    echo json_encode(["success" => false, "message" => "Eksik ID"]);
    exit;
}

$sql = "DELETE FROM users WHERE user_id = $user_id";

if ($conn->query($sql)) {
    echo json_encode(["success" => true, "message" => "Kullanıcı silindi"]);
} else {
    echo json_encode(["success" => false, "message" => $conn->error]);
}
?>
