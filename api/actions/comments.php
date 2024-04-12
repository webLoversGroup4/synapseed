<?php
header("Access-Control-Allow-Origin: http://localhost:8000");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "../settings/connection.php";
include "../fxns/comments_functions.php";

// Handle incoming requests
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['paper_id'])) {
        $paper_id = $_GET['paper_id'];
        $comments = fetchComments($conn, $paper_id);
        echo json_encode($comments);
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Missing paper_id parameter"]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $user_id = $_SESSION["user_id"];
    $content = $data['content'];

    if (empty($paper_id) || empty($user_id) || empty($content)) {
        http_response_code(400);
        echo json_encode(["error" => "Missing required parameters"]);
    } else {
        if (submitComment($content, $user_id, $paper_id)) {
            http_response_code(201);
            echo json_encode(["message" => "Comment submitted successfully"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Failed to submit comment"]);
        }
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
}

$mysqli->close();
?>
