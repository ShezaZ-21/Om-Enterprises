<?php

require_once 'auth.php';
require_once 'db.php';
require_once 'product-image.php';

try {
    require_post();
    require_admin();

    $name = trim($_POST['name'] ?? '');
    $category = trim($_POST['category'] ?? '');
    $description = trim($_POST['description'] ?? '');
    $price = filter_var($_POST['price'] ?? null, FILTER_VALIDATE_FLOAT);

    if (
        empty($name) ||
        empty($category) ||
        empty($description) || $price === false || $price < 0
    ) {
        throw new Exception('Name, category, description, and a valid price are required.');
    }

    $image = upload_product_image($_FILES['image'] ?? null) ?? '';

    $sql = "INSERT INTO products
    (name, category, description, price, image)
    VALUES (?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        throw new Exception($conn->error);
    }

    $stmt->bind_param(
        "sssds",
        $name,
        $category,
        $description,
        $price,
        $image
    );

    if (!$stmt->execute()) {
        throw new Exception($stmt->error);
    }

    json_response(['success' => true, 'message' => 'Product added successfully.', 'id' => $conn->insert_id]);

} catch (Exception $e) {

    json_response(['success' => false, 'message' => $e->getMessage()], 422);

}

?>
