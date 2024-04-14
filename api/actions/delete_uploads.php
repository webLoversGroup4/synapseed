<?php
include "../settings/connection.php";

$allowedOrigin = "http://localhost:8000"; 
header("Access-Control-Allow-Origin: $allowedOrigin");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS,DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-User-Id, X-Full-Name");

if ($_SERVER["REQUEST_METHOD"] === "DELETE" && isset($_GET['fileId'])) {
    $fileId = $_GET['fileId'];


    // Delete file record from database
    $sql = "DELETE FROM files WHERE file_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $fileId);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'File deleted successfully']);
    } else {
        echo json_encode(['error' => 'Failed to delete file']);
    }

    $conn->close();
} else {
    echo json_encode(['error' => 'Invalid request']);
}
?>
