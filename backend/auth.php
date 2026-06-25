<?php
/** Shared session and JSON helpers for admin-only endpoints. */

if (session_status() !== PHP_SESSION_ACTIVE) {
    session_name('om_admin_session');
    session_start([
        'cookie_httponly' => true,
        'cookie_samesite' => 'Lax',
    ]);
}

function json_response(array $payload, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($payload);
    exit;
}

function require_admin(): void
{
    if (empty($_SESSION['admin_id'])) {
        json_response(['success' => false, 'message' => 'Please log in to continue.'], 401);
    }
}

function require_post(): void
{
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        json_response(['success' => false, 'message' => 'Invalid request method.'], 405);
    }
}
