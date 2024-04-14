<?php
session_start();
include "../settings/connection.php";
include '../fxns/unique_id_fxn.php';

$allowedOrigin = "http://localhost:8000"; 
header("Access-Control-Allow-Origin: $allowedOrigin");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-User-Id, X-Full-Name");

// Handle POST request to submit a review
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve data from POST body
    $data = json_decode(file_get_contents('php://input'), true);

    $paper_id = $data['paper_id'] ?? '';
    $reviewer_id = $data['reviewer_id'] ?? '';
    $rating = $data['rating'] ?? '';
    $comments = $data['comments'] ?? '';

    // Validate input data
    if (empty($paper_id) || empty($reviewer_id) || empty($rating) || empty($comments)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid input data']);
        exit();
    }

    // Validate comments to ensure they are not numbers only
    if (is_numeric($comments)) {
        http_response_code(400);
        echo json_encode(['error' => 'Comments should not be numeric']);
        exit();
    }

    // Prepare SQL statement to insert review into the database
    $stmt = $conn->prepare("INSERT INTO peer_reviews (paper_id, reviewer_id, rating, comments) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssis", $paper_id, $reviewer_id, $rating, $comments);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Review submitted successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to submit review']);
    }

    $stmt->close();
}

// Handle GET request to fetch reviews for a specific paper
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Retrieve paper_id from query parameter
    $paper_id = $_GET['paper_id'] ?? '';

    if (empty($paper_id)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid paper ID']);
        exit();
    }

    // Prepare SQL statement to fetch reviews for the specified paper
    $stmt = $conn->prepare("SELECT * FROM peer_reviews WHERE paper_id = ?");
    $stmt->bind_param("s", $paper_id);
    $stmt->execute();

    $result = $stmt->get_result();
    $reviews = [];

    while ($row = $result->fetch_assoc()) {
        $reviews[] = $row;
    }

    echo json_encode($reviews);

    $stmt->close();
}

$conn->close();
?>
