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

    // Validate title
    if (strlen($title) < 6 || !ctype_alpha(substr($title, 0, 1))) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid title. Title must be at least 6 characters long and start with a letter.']);
        exit();
    }

    // Validate abstract
    if (strlen($description) < 30 || ctype_digit($description)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid abstract. Abstract must be at least 30 characters long and should not contain numbers alone.']);
        exit();
    }

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
        $sql = "INSERT INTO papers (title, abstract, file_url, author_id)
                VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('sssi', $title, $description, $targetPath, $uploadedBy);

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

$conn->close();
?>
