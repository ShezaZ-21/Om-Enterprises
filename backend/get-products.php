<?php
/*
|--------------------------------------------------------------------------
| get-products.php
|--------------------------------------------------------------------------
| Fetches products from database and returns as JSON
| Supports filtering by category and ID
|--------------------------------------------------------------------------
*/

// Set JSON response header
header('Content-Type: application/json');

// Enable CORS if needed (uncomment if frontend is on different domain)
// header('Access-Control-Allow-Origin: *');
// header('Access-Control-Allow-Methods: GET');
// header('Access-Control-Allow-Headers: Content-Type');

// Include database connection
require_once 'db.php';

try {

    // Only GET requests allowed
    if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
        throw new Exception('Invalid request method. Only GET is allowed.');
    }

    // Get optional query parameters
    $category = trim($_GET['category'] ?? '');
    $id = intval($_GET['id'] ?? 0);

    // Build SQL query based on parameters
    if ($id > 0) {
        // Fetch single product by ID
        $sql = "SELECT * FROM products WHERE id = ?";
        $stmt = $conn->prepare($sql);
        if (!$stmt) {
            throw new Exception('Failed to prepare statement: ' . $conn->error);
        }
        $stmt->bind_param("i", $id);
    } elseif (!empty($category)) {
        // Fetch products by category
        $sql = "SELECT * FROM products WHERE category = ? ORDER BY name ASC";
        $stmt = $conn->prepare($sql);
        if (!$stmt) {
            throw new Exception('Failed to prepare statement: ' . $conn->error);
        }
        $stmt->bind_param("s", $category);
    } else {
        // Fetch all products
        $sql = "SELECT * FROM products ORDER BY name ASC";
        $stmt = $conn->prepare($sql);
        if (!$stmt) {
            throw new Exception('Failed to prepare statement: ' . $conn->error);
        }
    }

    // Execute the statement
    if (!$stmt->execute()) {
        throw new Exception('Failed to fetch products: ' . $stmt->error);
    }

    // Get result
    $result = $stmt->get_result();

    // Fetch all products as array
    $products = [];
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }

    // Close statement
    $stmt->close();

    // Return success response with products data
    echo json_encode([
        "success" => true,
        "data" => $products,
        "count" => count($products)
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
