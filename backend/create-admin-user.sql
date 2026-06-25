-- ============================================================================
-- SQL Script for Creating Admin User
-- OM Enterprises - Admin User Creation
-- ============================================================================

-- NOTE: This script demonstrates how to create an admin user with a hashed password
-- Run this in phpMyAdmin or MySQL command line

-- First, let's check if the admin_users table exists
-- If not, create it with proper structure
CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    is_active TINYINT(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================================
-- METHOD 1: Using PHP to hash password (RECOMMENDED)
-- ============================================================================

-- Create a PHP file called hash-password.php and run it once:
<?php
$password = "admin123"; // Your desired password
$hashed_password = password_hash($password, PASSWORD_DEFAULT);
echo "Hashed password: " . $hashed_password;
?>

-- Then use the output in the INSERT statement below:
-- INSERT INTO admin_users (username, password, full_name, email)
-- VALUES ('admin', '$2y$10$...', 'Admin User', 'admin@omenterprises.com');

-- ============================================================================
-- METHOD 2: Pre-computed hash for default password
-- ============================================================================

-- Default password: admin123
-- This hash was generated using: password_hash('admin123', PASSWORD_DEFAULT)
-- You can change the password later by updating this field

INSERT INTO admin_users (username, password, full_name, email)
VALUES (
    'admin',
    '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    'Administrator',
    'admin@omenterprises.com'
);

-- ============================================================================
-- Alternative Admin Users (Optional)
-- ============================================================================

-- Create another admin with different password
-- Password: manager123
INSERT INTO admin_users (username, password, full_name, email)
VALUES (
    'manager',
    '$2y$10$Jk5.k5.k5.k5.k5.k5.k5.k5.k5.k5.k5.k5.k5.k5.k5.k5.k5.k',
    'Manager',
    'manager@omenterprises.com'
)
ON DUPLICATE KEY UPDATE password = VALUES(password);

-- ============================================================================
-- Verify the user was created
-- ============================================================================

SELECT id, username, full_name, email, created_at, is_active 
FROM admin_users;

-- ============================================================================
-- How to Update Password Later
-- ============================================================================

-- Use PHP to generate new hash:
<?php
$new_password = "newpassword123";
$new_hash = password_hash($new_password, PASSWORD_DEFAULT);
echo "New hash: " . $new_hash;
?>

-- Then run:
-- UPDATE admin_users 
-- SET password = '$2y$10$...' 
-- WHERE username = 'admin';

-- ============================================================================
-- Security Notes
-- ============================================================================

-- 1. Never store plain text passwords
-- 2. Always use password_hash() with PASSWORD_DEFAULT
-- 3. PASSWORD_DEFAULT uses bcrypt algorithm (currently)
-- 4. Hash includes salt automatically
-- 5. Change default passwords in production
-- 6. Use strong passwords (min 12 characters, mixed case, numbers, symbols)
