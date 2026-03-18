<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include "db.php"; // DB bağlantını içeriyor

// Kullanıcılar ve rollerini çek
$sql = "SELECT u.user_id, u.user_name, u.phone, r.rol_name
        FROM users u
        LEFT JOIN roles r ON u.role_id = r.rol_id";

$result = $conn->query($sql);

$users = [];
if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
}

// JSON olarak döndür
echo json_encode($users);
