<?php
include "../settings/connection.php";

$allowedOrigin = "http://16.16.90.16:8000";
header("Access-Control-Allow-Origin: $allowedOrigin");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Authorization, X-User-Id, X-Full-Name");

$stmt = $conn->prepare("SELECT 
    r.review_id,
    r.paper_id,
    r.reviewer_id,
    r.rating,
    r.comments,
    r.reviewed_at,
    CONCAT(u.fname, ' ', u.lname) AS reviewer_name,
    p.title AS paper_title
FROM 
    peer_reviews r
JOIN 
    users u ON r.reviewer_id = u.user_id
JOIN 
    papers p ON r.paper_id = p.paper_id");


$stmt->execute();

$result = $stmt->get_result();
$reviews = [];

while ($row = $result->fetch_assoc()) {
    $reviews[] = [
        'review_id' => $row['review_id'],
        'paper_id' => $row['paper_id'],
        'reviewer_id' => $row['reviewer_id'],
        'rating' => $row['rating'],
        'comments' => $row['comments'],
        'reviewed_at' => $row['reviewed_at'],
        'reviewer_name' => $row['reviewer_name'],
        'paper_title' => $row['paper_title']
    ];
}

echo json_encode($reviews);

$stmt->close();
$conn->close();
?>
