<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

include "db.php";

$sql = "SELECT parts_id, parts_name, stock, price FROM parts";
$result = $conn->query($sql);

$parts = [];

while ($row = $result->fetch_assoc()) {
    $parts[] = $row;
}

echo json_encode(
    [
        "success" => true,
        "data" => $parts
    ],
    JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE
);

$conn->close();
