<?php
include "../settings/connection.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Content-Type: application/json');

// Handle POST request to submit a review
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $paper_id = $_POST['paper_id'];
    $reviewer_id = $_POST['reviewer_id'];
    $rating = $_POST['rating'];
    $comments = $_POST['comments'];
    $reviewed_at = date('Y-m-d H:i:s'); // Current timestamp

    // Insert review into the database
    $sql = "INSERT INTO peer_reviews (paper_id, reviewer_id, rating, comments, reviewed_at)
            VALUES ('$paper_id', '$reviewer_id', '$rating', '$comments', '$reviewed_at')";

    if ($conn->query($sql) === TRUE) {
        echo "Review submitted successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

// Handle GET request to fetch reviews
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Fetch all reviews for a specific paper
    $paper_id = $_GET['paper_id'];

    $sql = "SELECT * FROM peer_reviews WHERE paper_id = '$paper_id'";
    $result = $conn->query($sql);

    $reviews = array();
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $reviews[] = $row;
        }
    }

    header('Content-Type: application/json');
    echo json_encode($reviews);
}

$conn->close();
?>
