<?php
include "../settings/connection.php";
include '../functions/unique_id_fxn.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header('Content-Type: application/json');

// Ensure user is logged in
if (isset($_COOKIE['user_id'])) {
    $author_id = $_COOKIE['user_id'];
} else {
    echo json_encode(['error' => 'User not authenticated']);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_FILES['file'])) {
    $title = $_POST['title'] ?? '';
    $abstract = $_POST['abstract'] ?? '';
    $author = $_POST['author'] ?? '';

    $uploadDir = '../uploads/';
    $fileName = basename($_FILES['file']['name']);
    $targetPath = $uploadDir . $fileName;

    if (move_uploaded_file($_FILES['file']['tmp_name'], $targetPath)) {
        $authorIds = []; 

        $authorNames = explode(',', $author);
        foreach ($authorNames as $name) {
            $authorId = 0;

            $sqlGetAuthorId = "SELECT author_id FROM authors WHERE name = ?";
            $stmt = $conn->prepare($sqlGetAuthorId);
            $stmt->bind_param('s', $name);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                $authorId = $row['author_id'];
            } else {
                $sqlInsertAuthor = "INSERT INTO authors (name) VALUES (?)";
                $stmt = $conn->prepare($sqlInsertAuthor);
                $stmt->bind_param('s', $name);
                if ($stmt->execute()) {
                    $authorId = $stmt->insert_id;
                }
            }

            if ($authorId > 0) {
                $authorIds[] = $authorId;
            }
        }

        $statusApprovalId = 0;

        $sql = "INSERT INTO papers (title, abstract, file_url, author_id, status_approval_id)
                VALUES (?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('ssssi', $title, $abstract, $targetPath, $author_id, $statusApprovalId);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'File uploaded and record inserted successfully']);
        } else {
            echo json_encode(['error' => 'Failed to insert record: ' . $conn->error]);
        }
    } else {
        echo json_encode(['error' => 'Failed to upload file']);
    }
} else {
    echo json_encode(['error' => 'Invalid request']);
}

$conn->close();
?>
