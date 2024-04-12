<?php
include "../settings/connection.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $paper_id = $_GET['paper_id'];
    $sql = "SELECT file_url FROM papers WHERE paper_id = '$paper_id'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $file_url = $row['file_url'];

        // Serve the PDF file
        header('Content-type: application/pdf');
        readfile($file_url);
        exit;
    } else {
        echo "Paper not found";
    }
}

$conn->close();
?>
