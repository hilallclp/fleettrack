<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include "db.php";

$sql = "SELECT * FROM vehicles";
$result = $conn->query($sql);

$vehicles = [];

while ($row = $result->fetch_assoc()) {
    $vehicles[] = $row;
}

echo json_encode($vehicles);
