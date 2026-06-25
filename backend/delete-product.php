<?php

require_once 'auth.php';
require_once 'db.php';
require_once 'product-image.php';

try {

    require_post();
    require_admin();

    $id = intval($_POST['id'] ?? 0);

    if ($id <= 0) {
        throw new Exception('Invalid product ID');
    }

    $lookup = $conn->prepare('SELECT image FROM products WHERE id = ?');
    $lookup->bind_param('i', $id);
    $lookup->execute();
    $product = $lookup->get_result()->fetch_assoc();
    $lookup->close();
    if (!$product) {
        throw new Exception('Product not found.');
    }

    $sql = "DELETE FROM products WHERE id = ?";

    $stmt = $conn->prepare($sql);

    $stmt->bind_param("i", $id);

    if (!$stmt->execute()) {
        throw new Exception($stmt->error);
    }

    delete_product_image($product['image']);
    json_response(['success' => true, 'message' => 'Product deleted successfully.']);

} catch (Exception $e) {

    json_response(['success' => false, 'message' => $e->getMessage()], 422);

}

?>
