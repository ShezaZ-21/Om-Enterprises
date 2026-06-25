<?php
/** Best-effort email notifications. Database writes must not fail if mail is unavailable. */
require_once 'config.php';

function send_inquiry_notification(array $inquiry): bool
{
    $recipient = INQUIRY_NOTIFICATION_EMAIL;
    if (!filter_var($recipient, FILTER_VALIDATE_EMAIL) || !filter_var(MAIL_FROM_EMAIL, FILTER_VALIDATE_EMAIL)) {
        error_log('Inquiry notification skipped: email configuration is invalid.');
        return false;
    }

    $subject = 'New product inquiry: ' . str_replace(["\r", "\n"], '', $inquiry['product_name']);
    $lines = [
        'A new product inquiry was received from the OM Enterprises website.',
        '',
        'Product: ' . $inquiry['product_name'],
        'Customer: ' . $inquiry['customer_name'],
        'Email: ' . $inquiry['customer_email'],
        'Phone: ' . ($inquiry['customer_phone'] ?: 'Not provided'),
        'Company: ' . ($inquiry['customer_company'] ?: 'Not provided'),
        'Quantity: ' . ($inquiry['quantity'] ?: 'Not provided'),
        '',
        'Message:',
        $inquiry['message'] ?: 'Not provided',
    ];
    $headers = [
        'From: OM Enterprises <' . MAIL_FROM_EMAIL . '>',
        'Reply-To: ' . $inquiry['customer_email'],
        'Content-Type: text/plain; charset=UTF-8',
    ];

    return @mail($recipient, $subject, implode("\n", $lines), implode("\r\n", $headers));
}
