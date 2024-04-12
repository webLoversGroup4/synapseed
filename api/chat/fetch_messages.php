<?php
include "../settings/connection.php"; 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header('Content-Type: application/json');

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $sql = "SELECT sender, message FROM chat_messages ORDER BY created_at";
    $result = $conn->query($sql);

    $messages = [];

    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $messages[] = [
                'sender' => ucfirst($row['sender']), 
                'message' => $row['message'],
                'id' =>$row['id'],
                'time' =>$row['created_at']
            ];
        }
        $result->free();
    } else {
        die('Error fetching messages: ' . $conn->error);
    }

    $conn->close();

    echo json_encode(['messages' => $messages]);
} else {
    echo json_encode(['error' => 'Invalid request method']);
}
?>
