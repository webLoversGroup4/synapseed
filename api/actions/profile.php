<?php
session_start();

include '../settings/connection.php';

$allowedOrigin = "http://localhost:8000"; 
header("Access-Control-Allow-Origin: $allowedOrigin");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-User-Id, X-Full-Name");


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$user_id = $_SERVER['HTTP_X_USER_ID'] ?? null;
$sender = $_SERVER['HTTP_X_FULL_NAME'] ?? null;

// Check for required parameters
if (!$user_id || !$sender) {
    http_response_code(401);
    exit(json_encode(['error' => 'Unauthorized: User ID or Sender not provided']));
}

try {
    // Fetch user profile
    $select_profile_stmt = $conn->prepare("SELECT * FROM users WHERE user_id = ?");
    $select_profile_stmt->bind_param("s", $user_id);
    $select_profile_stmt->execute();
    $fetch_profile_result = $select_profile_stmt->get_result();
    $fetch_profile = $fetch_profile_result->fetch_assoc();

    // Count total uploads
    $select_total_uploads_stmt = $conn->prepare("SELECT COUNT(*) AS total_uploads FROM files WHERE uploaded_by = ?");
    $select_total_uploads_stmt->bind_param("s", $user_id);
    $select_total_uploads_stmt->execute();
    $total_uploads_result = $select_total_uploads_stmt->get_result();
    $total_uploads_data = $total_uploads_result->fetch_assoc();
    $total_uploads = $total_uploads_data['total_uploads'];

    // Count total messages sent
    $select_total_msg_stmt = $conn->prepare("SELECT COUNT(*) AS total_msg FROM chat_messages WHERE sender = ?");
    $select_total_msg_stmt->bind_param("s", $sender);
    $select_total_msg_stmt->execute();
    $total_msg_result = $select_total_msg_stmt->get_result();
    $total_msg_data = $total_msg_result->fetch_assoc();
    $total_msg = $total_msg_data['total_msg'];

    // Count total comments
    $select_total_comm_stmt = $conn->prepare("SELECT COUNT(*) AS total_comm FROM comments WHERE user_id = ?");
    $select_total_comm_stmt->bind_param("s", $user_id);
    $select_total_comm_stmt->execute();
    $total_comm_result = $select_total_comm_stmt->get_result();
    $total_comm_data = $total_comm_result->fetch_assoc();
    $total_comm = $total_comm_data['total_comm'];

    // Prepare response
    $response = [
        'profile' => $fetch_profile,
        'totalUploads' => $total_uploads,
        'totalMessages' => $total_msg,
        'totalComments' => $total_comm,
    ];

    // Return JSON response
    echo json_encode($response);
} catch (Exception $e) {
    http_response_code(500);
    exit(json_encode(['error' => 'Internal Server Error: ' . $e->getMessage()]));
}
?>
