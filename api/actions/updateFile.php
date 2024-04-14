<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: PUT");
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] === "PUT" && isset($_GET['fileId'])) {
    $fileId = $_GET['fileId'];
    $data = json_decode(file_get_contents("php://input"));

    $newDescription = $data->description ?? '';

    include "../settings/connection.php";

    $sql = "UPDATE files SET description = ? WHERE file_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('si', $newDescription, $fileId);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'File description updated successfully']);
    } else {
        echo json_encode(['error' => 'Failed to update file description']);
    }

    $conn->close();
} else {
    echo json_encode(['error' => 'Invalid request']);
}
?>
