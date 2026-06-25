<?php
require_once 'auth.php';

json_response([
    'success' => true,
    'authenticated' => !empty($_SESSION['admin_id']),
    'admin' => !empty($_SESSION['admin_username']) ? $_SESSION['admin_username'] : null,
]);
