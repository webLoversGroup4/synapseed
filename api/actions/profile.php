<?php
include '../settings/connection.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header('Content-Type: application/json');


// if (!isset($_SESSION['user_id'])) {
//     http_response_code(401);
//     exit('Unauthorized');
// }

$user_id = 27;

$select_profile_stmt = $conn->prepare("SELECT * FROM users WHERE user_id = ?");
$select_profile_stmt->bind_param("s", $user_id);
$select_profile_stmt->execute();
$fetch_profile_result = $select_profile_stmt->get_result();
$fetch_profile = $fetch_profile_result->fetch_assoc();

$select_total_uploads_stmt = $conn->prepare("SELECT COUNT(*) AS total_uploads FROM files WHERE uploaded_by = ?");
$select_total_uploads_stmt->bind_param("s", $user_id);
$select_total_uploads_stmt->execute();
$total_uploads_result = $select_total_uploads_stmt->get_result();
$total_uploads_data = $total_uploads_result->fetch_assoc();
$total_uploads = $total_uploads_data['total_uploads'];

$response = [
    'profile' => $fetch_profile,
    'totalUploads' => $total_uploads,
    'totalMessages' => 0, 
    'totalComments' => 0, 
];

header('Content-Type: application/json');
echo json_encode($response);
?>
