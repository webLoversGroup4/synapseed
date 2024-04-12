<?php
include "../settings/connection.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Content-Type: application/json');

// SQL query to fetch papers with author's full name
$sql = "SELECT p.paper_id, p.title, p.abstract, p.file_url, p.author_id, p.created_at, u.fname, u.lname
        FROM papers p
        JOIN users u ON p.author_id = u.user_id
        WHERE p.status_approval_id = 1";

$result = $conn->query($sql);

if ($result) {
    if ($result->num_rows > 0) {
        $papers = [];
        while ($row = $result->fetch_assoc()) {
            // Construct the full name of the author
            $authorFullName = $row['fname'] . " " . $row['lname'];
            
            // Prepare paper data to be returned in JSON
            $papers[] = [
                'paper_id' => $row['paper_id'],
                'title' => $row['title'],
                'abstract' => $row['abstract'],
                'file_url' => $row['file_url'],
                'author_id' => $row['author_id'],
                'author_name' => $authorFullName,
                'created_at' => $row['created_at'],
            ];
        }
        echo json_encode($papers);
    } else {
        echo json_encode(['error' => 'No approved papers found']); 
    }
} else {
    echo json_encode(['error' => 'Database query failed: ' . $conn->error]); 
}

$conn->close();
?>
