<?php
/*
|--------------------------------------------------------------------------
| inquiry.php
|--------------------------------------------------------------------------
| Product inquiry submission handler for OM Enterprises
| Accepts POST requests, validates input, stores in inquiries table
|--------------------------------------------------------------------------
*/

// Set JSON response header
header('Content-Type: application/json');

// Enable CORS if needed (uncomment if frontend is on different domain)
// header('Access-Control-Allow-Origin: *');
// header('Access-Control-Allow-Methods: POST');
// header('Access-Control-Allow-Headers: Content-Type');

// Include database connection
require_once 'db.php';
require_once 'notification.php';

try {

    // Only POST requests allowed
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Invalid request method. Only POST is allowed.');
    }

    // Get and sanitize form data
    $product_id = intval($_POST['product_id'] ?? 0);
    $product_name = trim($_POST['product_name'] ?? '');
    $customer_name = trim($_POST['customer_name'] ?? '');
    $customer_email = trim($_POST['customer_email'] ?? '');
    $customer_phone = trim($_POST['customer_phone'] ?? '');
    $customer_company = trim($_POST['customer_company'] ?? '');
    $quantity = trim($_POST['quantity'] ?? '');
    $message = trim($_POST['message'] ?? '');

    // Validation - Required fields
    if (empty($customer_name) || empty($customer_email) || empty($product_name)) {
        throw new Exception('Please fill all required fields (Name, Email, Product)');
    }

    // Email validation
    if (!filter_var($customer_email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Please enter a valid email address');
    }

    // Prepare SQL query with prepared statement
    $sql = "INSERT INTO inquiries 
            (product_id, product_name, customer_name, customer_email, customer_phone, customer_company, quantity, message, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())";

    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        throw new Exception('Failed to prepare statement: ' . $conn->error);
    }

    // Bind parameters (i = integer, s = string)
    $stmt->bind_param(
        "isssssss",
        $product_id,
        $product_name,
        $customer_name,
        $customer_email,
        $customer_phone,
        $customer_company,
        $quantity,
        $message
    );

    // Execute the statement
    if (!$stmt->execute()) {
        throw new Exception('Failed to save inquiry: ' . $stmt->error);
    }

    // Close statement
    $stmt->close();

    // Delivery is best-effort: the inquiry is safely stored even if local PHP
    // mail transport has not been configured yet.
    $emailSent = send_inquiry_notification([
        'product_name' => $product_name,
        'customer_name' => $customer_name,
        'customer_email' => $customer_email,
        'customer_phone' => $customer_phone,
        'customer_company' => $customer_company,
        'quantity' => $quantity,
        'message' => $message,
    ]);

    // Return success response
    echo json_encode([
        "success" => true,
        "message" => "Your inquiry has been submitted successfully! We will contact you soon.",
        "notification_sent" => $emailSent
    ]);

} catch (Exception $e) {

    // Return error response
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);

} finally {

    // Close database connection
    if (isset($conn)) {
        $conn->close();
    }

}
?>
