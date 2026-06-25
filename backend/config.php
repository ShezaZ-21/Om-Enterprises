<?php
/*
|--------------------------------------------------------------------------
| config.php
|--------------------------------------------------------------------------
| Database configuration settings
|--------------------------------------------------------------------------
*/

// Database credentials
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'om_enterprises');

// Set these in Apache/PHP environment variables in production.  The fallback
// keeps the feature usable locally, but a real inbox is required for delivery.
define('INQUIRY_NOTIFICATION_EMAIL', getenv('INQUIRY_NOTIFICATION_EMAIL') ?: 'admin@omenterprises.com');
define('MAIL_FROM_EMAIL', getenv('MAIL_FROM_EMAIL') ?: 'noreply@omenterprises.com');

?>
