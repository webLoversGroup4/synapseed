<?php
session_start();
include "../settings/connection.php";

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

// Check if user is authenticated
if (!$user_id) {
    http_response_code(401);
    echo json_encode(['error' => 'User not authenticated']);
    exit();
}

$sql = "SELECT file_id, filename, title, description, uploaded_by, file_path FROM files";

// Prepare the statement
$stmt = $conn->prepare($sql);

if ($stmt === false) {
    die('Failed to prepare statement');
}

// Execute the statement
$stmt->execute();

// Bind result variables
$stmt->bind_result($file_id, $filename, $title, $description, $uploaded_by, $file_path);


$result = $stmt->get_result();

$uploadedFiles = [];
while ($row = $result->fetch_assoc()) {
    $uploadedFiles[] = [
        'id' => $row['file_id'],
        'name' => $row['filename'],
        'title' => $row['title'],
        'description' => $row['description'],
        'uploader' => $row['uploaded_by'],
        'filePath' => $row['file_path'] 
    ];
}

// Return the uploaded files as JSON response
echo json_encode($uploadedFiles);

// Close database connection and statement
$stmt->close();
$conn->close();
?>
