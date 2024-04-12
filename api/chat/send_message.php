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
    
    $file = $_FILES['file']; 

    // Check if a file was uploaded
    if (!empty($file['name'])) {
        $fileName = $file['name'];
        $fileTmpName = $file['tmp_name'];
        $fileSize = $file['size'];
        $fileError = $file['error'];

        $uploadDirectory = '../uploads/';
        $targetFilePath = $uploadDirectory . basename($fileName);

        if ($fileError === UPLOAD_ERR_OK) {
            if (move_uploaded_file($fileTmpName, $targetFilePath)) {
                $sql = "INSERT INTO chat_messages (sender, receiver, message, file_path) VALUES (?, ?, ?, ?)";
                
                $stmt = $conn->prepare($sql);

                // Bind parameters to the prepared statement
                $stmt->bind_param("ssss", $sender, $receiver, $message, $targetFilePath);

                // Execute the prepared statement
                if ($stmt->execute()) {
                    echo json_encode(array("success" => true, "message" => "Message sent successfully"));
                } else {
                    echo json_encode(array("error" => "Error: " . $stmt->error));
                }

                // Close the prepared statement
                $stmt->close();
            } else {
                echo json_encode(array("error" => "Failed to move uploaded file"));
            }
        } else {
            echo json_encode(array("error" => "File upload error: " . $fileError));
        }
    } else {
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
}
?>
