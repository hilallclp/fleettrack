<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

include "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$vehicle_id     = $data["vehicle_id"] ?? 0;
$technician_id  = $data["technician_id"] ?? 0;
$cost           = $data["cost"] ?? 0;
$status         = "bekliyor";
$parts          = $data["parts"] ?? [];

$conn->begin_transaction();

try {
    // 1️⃣ Bakım kaydı eklenir
    // Trigger: trg_vehicle_in_maintenance
    // → araç durumu otomatik 'bakımda' olur
    $stmt = $conn->prepare(
        "INSERT INTO maintenance (vehicle_id, technician_id, cost, status)
         VALUES (?, ?, ?, ?)"
    );
    $stmt->bind_param("iids", $vehicle_id, $technician_id, $cost, $status);
    $stmt->execute();

    $maintenance_id = $conn->insert_id;

    // 2️⃣ Bakımda kullanılan parçalar eklenir
    // Trigger: trg_reduce_part_stock
    // → stok otomatik 1 azalır
    foreach ($parts as $p) {

        $stmt2 = $conn->prepare(
            "INSERT INTO maintenance_parts (maintenance_id, part_id, total_price)
             VALUES (?, ?, ?)"
        );
        $stmt2->bind_param(
            "iid",
            $maintenance_id,
            $p["part_id"],
            $p["total_price"]
        );
        $stmt2->execute();
    }

    // Loglama
    include "log_action.php";
    addLog($technician_id, "add maintenance - maintenance_id: $maintenance_id");

    $conn->commit();
    echo json_encode(["success" => true]);

} catch (Exception $e) {
    $conn->rollback();
    echo json_encode([
        "success" => false,
        "message" => "Bakım eklenemedi",
        "error" => $e->getMessage()
    ]);
}
