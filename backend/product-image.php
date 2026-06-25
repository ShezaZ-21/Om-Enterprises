<?php
/** Product image upload helpers. */

function upload_product_image(?array $file): ?string
{
    if (!$file || ($file['error'] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_NO_FILE) {
        return null;
    }

    if ($file['error'] !== UPLOAD_ERR_OK) {
        throw new RuntimeException('The image upload could not be completed.');
    }
    if ($file['size'] > 5 * 1024 * 1024) {
        throw new RuntimeException('Image must be 5 MB or smaller.');
    }

    $mime = (new finfo(FILEINFO_MIME_TYPE))->file($file['tmp_name']);
    $extensions = [
        'image/jpeg' => 'jpg',
        'image/png' => 'png',
        'image/webp' => 'webp',
        'image/gif' => 'gif',
    ];
    if (!isset($extensions[$mime])) {
        throw new RuntimeException('Please upload a JPG, PNG, WEBP, or GIF image.');
    }

    $directory = __DIR__ . '/../uploads/products';
    if (!is_dir($directory) && !mkdir($directory, 0755, true)) {
        throw new RuntimeException('Unable to create the image upload directory.');
    }

    $filename = bin2hex(random_bytes(16)) . '.' . $extensions[$mime];
    if (!move_uploaded_file($file['tmp_name'], $directory . '/' . $filename)) {
        throw new RuntimeException('Unable to save the uploaded image.');
    }

    return 'uploads/products/' . $filename;
}

function delete_product_image(?string $path): void
{
    if (!$path || !preg_match('#^uploads/products/[a-f0-9]{32}\.(jpg|png|webp|gif)$#', $path)) {
        return;
    }
    $fullPath = __DIR__ . '/../' . $path;
    if (is_file($fullPath)) {
        unlink($fullPath);
    }
}
