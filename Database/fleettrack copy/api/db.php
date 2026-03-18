<?php

$host = "localhost";
$user = "root";
$pass = "230601056Hbs.";
$db   = "fleettrack";

$conn = new mysqli($host, $user, $pass, $db);
$conn->set_charset("utf8");

if ($conn->connect_error) {
    die("Veritabanı bağlantı hatası: " . $conn->connect_error);
}

?>