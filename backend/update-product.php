<?php

require_once 'auth.php';
require_once 'db.php';
require_once 'product-image.php';

try {

    require_post();
    require_admin();

    $id = intval($_POST['id'] ?? 0);

    $name = trim($_POST['name'] ?? '');
    $category = trim($_POST['category'] ?? '');
    $description = trim($_POST['description'] ?? '');
    $price = filter_var($_POST['price'] ?? null, FILTER_VALIDATE_FLOAT);

    if ($id <= 0 || empty($name) || empty($category) || empty($description) || $price === false || $price < 0) {
        throw new Exception('Please provide a valid product ID, all product fields, and a valid price.');
    }

    $existing = $conn->prepare('SELECT image FROM products WHERE id = ?');
    $existing->bind_param('i', $id);
    $existing->execute();
    $current = $existing->get_result()->fetch_assoc();
    $existing->close();
    if (!$current) {
        throw new Exception('Product not found.');
    }

    $newImage = upload_product_image($_FILES['image'] ?? null);
    $image = $newImage ?? $current['image'];

    $sql = "UPDATE products
    SET
        name = ?,
        category = ?,
        description = ?,
        price = ?,
        image = ?
    WHERE id = ?";

    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        throw new Exception($conn->error);
    }

    $stmt->bind_param(
        "sssdsi",
        $name,
        $category,
        $description,
        $price,
        $image,
        $id
    );

    if (!$stmt->execute()) {
        throw new Exception($stmt->error);
    }

    if ($newImage) {
        delete_product_image($current['image']);
    }
    json_response(['success' => true, 'message' => 'Product updated successfully.']);

} catch (Exception $e) {

    json_response(['success' => false, 'message' => $e->getMessage()], 422);

}

?>
