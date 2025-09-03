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
$to_email = 'connect@ofemo.uk'; // Your email address
$from_email = 'noreply@yourdomain.com'; // Your domain email
$smtp_host = 'localhost'; // Usually localhost for cPanel
$smtp_port = 587; // or 465 for SSL

// Get JSON input
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Validate input
if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid JSON data']);
    exit();
}

// Required fields
$required_fields = ['name', 'email', 'subject', 'message'];
foreach ($required_fields as $field) {
    if (empty($data[$field])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => "Field '$field' is required"]);
        exit();
    }
}

// Sanitize input
$name = filter_var(trim($data['name']), FILTER_SANITIZE_STRING);
$email = filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL);
$subject = filter_var(trim($data['subject']), FILTER_SANITIZE_STRING);
$message = filter_var(trim($data['message']), FILTER_SANITIZE_STRING);

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit();
}

// Prepare email content
$email_subject = "Portfolio Contact: " . $subject;
$email_body = "
<html>
<head>
    <title>New Contact Form Submission</title>
</head>
<body>
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> {$name}</p>
    <p><strong>Email:</strong> {$email}</p>
    <p><strong>Subject:</strong> {$subject}</p>
    <p><strong>Message:</strong></p>
    <p>{$message}</p>
    <hr>
    <p><small>Sent from your portfolio contact form</small></p>
</body>
</html>
";

// Email headers
$headers = array(
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=UTF-8',
    'From: ' . $from_email,
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion()
);

// Send email
try {
    $mail_sent = mail($to_email, $email_subject, $email_body, implode("\r\n", $headers));
    
    if ($mail_sent) {
        // Log successful submission (optional)
        $log_entry = date('Y-m-d H:i:s') . " - Contact form submission from: {$email}\n";
        file_put_contents('contact_log.txt', $log_entry, FILE_APPEND | LOCK_EX);
        
        echo json_encode(['success' => true, 'message' => 'Message sent successfully']);
    } else {
        throw new Exception('Failed to send email');
    }
} catch (Exception $e) {
    error_log('Contact form error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send message. Please try again later.']);
}
?>
