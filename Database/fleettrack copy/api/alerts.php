<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

include "db.php";

/*
 Admin için:
 - tüm uyarılar
 - araç plakası
 - oluşturan kullanıcı
*/

$sql = "
SELECT
    a.alerts_id,
    a.alert_type,
    a.severity,
    v.plate_number,
    u.user_name AS created_by
FROM alerts a
JOIN vehicles v ON a.vehicle_id = v.vehicle_id
JOIN users u ON a.created_by = u.user_id
ORDER BY a.alerts_id DESC
";

$result = $conn->query($sql);

$alerts = [];

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $alerts[] = $row;
    }
} else {
    echo json_encode([
        "success" => false,
        "message" => "Uyarılar alınamadı",
        "error" => $conn->error
    ]);
    exit;
}

/*
  LOG SİSTEMİ (ŞİMDİLİK KAPALI)
  ---------------------------
  include "log_action.php";
  addLog($admin_id ?? 0, "Viewed all alerts");
*/

echo json_encode($alerts);
?>
