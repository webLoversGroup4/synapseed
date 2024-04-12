<?php
header("Access-Control-Allow-Origin: http://localhost:8000");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

include "../settings/connection.php";

function fetchComments($conn, $paper_id) {
    $sql = "
        SELECT c.*, u.fname, u.lname
        FROM comments c
        LEFT JOIN users u ON c.user_id = u.user_id
        WHERE c.paper_id = ?
        ORDER BY c.created_at DESC
    ";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $paper_id);
    $stmt->execute();
    $result = $stmt->get_result();

    $comments = [];
    while ($row = $result->fetch_assoc()) {
        $comments[] = [
            'comment_id' => $row['comment_id'],
            'user_id' => $row['user_id'],
            'content' => $row['content'],
            'created_at' => $row['created_at'],
            'name' => $row['fname']." ".$row['lname'],
        ];
    }

    // Return comments as JSON response
    echo json_encode($comments);
}



// Submit a new comment
function submitComment($content, $user_id, $paper_id) {
    global $conn;
    $sql = "INSERT INTO comments (content, user_id, paper_id) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sii", $content, $user_id, $paper_id);
    return $stmt->execute();
}


?>

