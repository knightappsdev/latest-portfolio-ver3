<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Configuration
$to_email = 'connect@ofemo.uk';
$from_email = 'noreply@yourdomain.com';

// Get JSON input
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Validate input
if (!$data || empty($data['email'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Email is required']);
    exit();
}

// Sanitize and validate email
$email = filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL);
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit();
}

// Check if email already exists in newsletter list
$newsletter_file = 'newsletter_subscribers.txt';
$existing_emails = file_exists($newsletter_file) ? file($newsletter_file, FILE_IGNORE_NEW_LINES) : [];

if (in_array($email, $existing_emails)) {
    echo json_encode(['success' => false, 'message' => 'Email already subscribed']);
    exit();
}

// Add email to newsletter list
file_put_contents($newsletter_file, $email . "\n", FILE_APPEND | LOCK_EX);

// Prepare notification email
$email_subject = "New Newsletter Subscription";
$email_body = "
<html>
<head>
    <title>New Newsletter Subscription</title>
</head>
<body>
    <h2>New Newsletter Subscription</h2>
    <p><strong>Email:</strong> {$email}</p>
    <p><strong>Source:</strong> " . ($data['source'] ?? 'Unknown') . "</p>
    <p><strong>Timestamp:</strong> " . date('Y-m-d H:i:s') . "</p>
</body>
</html>
";

// Email headers
$headers = array(
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=UTF-8',
    'From: ' . $from_email,
    'X-Mailer: PHP/' . phpversion()
);

// Send notification email
try {
    $mail_sent = mail($to_email, $email_subject, $email_body, implode("\r\n", $headers));
    
    if ($mail_sent) {
        echo json_encode(['success' => true, 'message' => 'Successfully subscribed to newsletter']);
    } else {
        throw new Exception('Failed to send notification email');
    }
} catch (Exception $e) {
    error_log('Newsletter subscription error: ' . $e->getMessage());
    // Still return success to user since email was added to list
    echo json_encode(['success' => true, 'message' => 'Successfully subscribed to newsletter']);
}
?>
