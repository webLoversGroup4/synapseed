<?php

include '../settings/connection.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header('Content-Type: application/json');


$tid = $_SESSION['user_id'];

function countRowsP($conn, $query) {
    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->get_result();
    return $result->num_rows;
}

function countRows($conn, $query, $param) {
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $param);
    $stmt->execute();
    $result = $stmt->get_result();
    return $result->num_rows;
}

// Count total users
$total_users = countRowsP($conn, "SELECT * FROM users");

// Count total chats
$total_chats = countRowsP($conn, "SELECT * FROM chat_messages");

// Count total uploads
$total_papers = countRows($conn, "SELECT * FROM papers WHERE author_id = ?", $tid);

// Count total uploads
$total_uploads = countRows($conn, "SELECT * FROM files WHERE uploaded_by = ?", $tid);

// Count total comments
$total_comments = countRows($conn, "SELECT * FROM comments WHERE user_id = ?", $tid);

// Define an array to store the metrics
$metrics = [
    ['name' => 'Total Uploads', 'value' => $total_uploads],
    ['name' => 'Total Papers', 'value' => $total_papers],
    ['name' => 'Total Users', 'value' => $total_users],
    ['name' => 'Total Chats', 'value' => $total_chats],
    ['name' => 'Total Comments', 'value' => $total_comments]
];

// Set response content type to JSON
header('Content-Type: application/json');

// Output the metrics array as JSON
echo json_encode($metrics);
?>
