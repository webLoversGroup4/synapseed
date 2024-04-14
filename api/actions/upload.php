<?php
session_start();
include "../settings/connection.php";
include '../fxns/unique_id_fxn.php';

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

// Validate and process file upload
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_FILES['file'])) {
    $title = $_POST['title'] ?? '';
    $description = $_POST['description'] ?? '';

    // Get user ID from header
    $uploadedBy = $user_id;

    // File details
    $fileName = basename($_FILES['file']['name']);
    $fileType = $_FILES['file']['type'];
    $fileTmpName = $_FILES['file']['tmp_name'];

    // Directory to store uploaded files
    $uploadDir = '../uploads/';
    $ext = pathinfo($fileName, PATHINFO_EXTENSION);
    $rename = unique_id() . '.' . $ext;
    $targetPath = $uploadDir . $rename;

    // Move uploaded file to target directory
    if (move_uploaded_file($fileTmpName, $targetPath)) {
        // Insert file details into database
        $sql = "INSERT INTO files (filename, file_path, uploaded_by, title, description)
                VALUES (?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('ssiss', $fileName, $targetPath, $uploadedBy, $title, $description);

        if ($stmt->execute()) {
            $fileId = $stmt->insert_id; 
            echo json_encode(['success' => true, 'fileId' => $fileId]);
        } else {
            // Failed to insert record
            echo json_encode(['error' => 'Failed to insert file record: ' . $stmt->error]);
        }
    } else {
        // Failed to move uploaded file
        echo json_encode(['error' => 'Failed to upload file']);
    }
} else {
    // Invalid request
    echo json_encode(['error' => 'Invalid request']);
}

// Close database connection
$conn->close();
?>
