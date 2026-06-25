<?php
/*
|--------------------------------------------------------------------------
| db.php
|--------------------------------------------------------------------------
| Database connection file for OM Enterprises
| Using MySQLi with proper error handling
|--------------------------------------------------------------------------
*/

// Include configuration file
require_once 'config.php';

// Create connection
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// Check connection
if ($conn->connect_error) {
    die(json_encode([
        "success" => false,
        "message" => "Database connection failed: " . $conn->connect_error
    ]));
}

// Set character encoding
$conn->set_charset("utf8mb4");
?>