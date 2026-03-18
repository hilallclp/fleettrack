<?php
header("Content-Type: application/json; charset=UTF-8");
include "db.php";

/**
 * Kullanıcı işlemi kaydı
 * @param int $user_id
 * @param string $action
 */
function addLog($user_id, $action) {
    global $conn;
    $stmt = $conn->prepare("INSERT INTO logs (user_id, action) VALUES (?, ?)");
    $stmt->bind_param("is", $user_id, $action);
    $stmt->execute();
}
?>

