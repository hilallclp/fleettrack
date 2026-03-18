<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$username = $data["username"] ?? "";
$password = $data["password"] ?? "";

$sql = "
SELECT u.user_id, u.user_name, r.rol_name
FROM users u
JOIN roles r ON u.role_id = r.rol_id
WHERE u.user_name = ? AND u.password = ?
";


$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $username, $password);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    include "log_action.php";
        addLog($row["user_id"], "login"); 
    echo json_encode([
        "success" => true,
        "user" => [
            "user_id" => $row["user_id"],
            "user_name" => $row["user_name"],
            "role_name" => $row["rol_name"]
        ]
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Kullanıcı adı veya şifre hatalı"
    ]);
}

?>

