<?php
include "../settings/connection.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $sender = $_POST['sender'];
    $receiver = $_POST['receiver'];
    $message = $_POST['message'];
        $sql = "INSERT INTO chat_messages (sender, receiver, message) VALUES (?, ?, ?)";

        $stmt = $conn->prepare($sql);

        $stmt->bind_param("sss", $sender, $receiver, $message);

        if ($stmt->execute()) {
            echo json_encode(array("success" => true, "message" => "Message sent successfully"));
        } else {
            echo json_encode(array("error" => "Error: " . $stmt->error));
        }
        $stmt->close();
    }
?>
