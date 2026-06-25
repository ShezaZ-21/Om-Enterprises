<?php

header('Content-Type: application/json');

require_once 'db.php';

try {

    // Only POST requests allowed
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Invalid request method');
    }

    // Get form data
    $full_name = trim($_POST['full_name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $company = trim($_POST['company'] ?? '');
    $message = trim($_POST['message'] ?? '');

    // Validation
    if (empty($full_name) || empty($email) || empty($message)) {
        throw new Exception('Please fill all required fields');
    }

    // Prepare SQL query
    $sql = "INSERT INTO contacts 
    (full_name, email, phone, company, message)
    VALUES (?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        throw new Exception($conn->error);
    }

    $stmt->bind_param(
        "sssss",
        $full_name,
        $email,
        $phone,
        $company,
        $message
    );

    if (!$stmt->execute()) {
        throw new Exception($stmt->error);
    }

    echo json_encode([
        "success" => true,
        "message" => "Data saved successfully!"
    ]);

} catch (Exception $e) {

    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);

}