<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

include "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$user_id    = intval($data["user_id"] ?? 0);
$vehicle_id = intval($data["vehicle_id"] ?? 0);

if (!$user_id || !$vehicle_id) {
    echo json_encode(["success" => false, "message" => "Eksik veri"]);
    exit;
}

/* 🔒 SADECE DRIVER MI? */
$check = $conn->query("SELECT role_id FROM users WHERE user_id = $user_id");
$user  = $check->fetch_assoc();

if (!$user || $user["role_id"] != 2) {
    echo json_encode([
        "success" => false,
        "message" => "Sadece Driver kullanıcıya araç atanabilir"
    ]);
    exit;
}

/* 🚫 ARAÇ AKTİF Mİ? */
$activeCheck = $conn->query("
    SELECT assignments_id FROM assignments
    WHERE vehicle_id = $vehicle_id
    AND end_date IS NULL
");


if ($activeCheck->num_rows > 0) {
    echo json_encode([
        "success" => false,
        "message" => "Bu araç zaten başka bir sürücüye atanmış"
    ]);
    exit;
}

/* 📌 ATAMA */
$sql = "INSERT INTO assignments (user_id, vehicle_id, start_date)
        VALUES ($user_id, $vehicle_id, NOW())";

if ($conn->query($sql)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Atama yapılamadı"
    ]);
}
