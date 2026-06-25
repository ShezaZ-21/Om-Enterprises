<?php

require_once 'auth.php';
require_once 'db.php';

require_post();

$username = trim($_POST['username'] ?? '');
$password = trim($_POST['password'] ?? '');

if (empty($username) || empty($password)) {
    json_response(['success' => false, 'message' => 'Username and password are required.'], 422);
}

$sql = "SELECT * FROM admin_users WHERE username = ? LIMIT 1";

$stmt = $conn->prepare($sql);

$stmt->bind_param("s", $username);

$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows === 1) {

    $user = $result->fetch_assoc();

    if (password_verify($password, $user['password'])) {
        session_regenerate_id(true);
        $_SESSION['admin_id'] = (int) $user['id'];
        $_SESSION['admin_username'] = $user['username'];
        json_response(['success' => true, 'message' => 'Login successful.']);

    } else {

        json_response(['success' => false, 'message' => 'Invalid username or password.'], 401);

    }

} else {

    json_response(['success' => false, 'message' => 'Invalid username or password.'], 401);

}
?>
