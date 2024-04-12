<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header('Content-Type: application/json');
include "../settings/connection.php";

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve POST data
    $fname = $_POST['fname'] ?? '';
    $lname = $_POST['lname'] ?? '';
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';
    $cpass = $_POST['cpass'] ?? '';

    // Validate input data
    $errors = [];

    // Validate name
    if (empty($fname) || empty($lname)) {
        $errors[] = 'First name and last name are required';
    } else {
        // Check if first name and last name are at least 4 characters long
        if (strlen($fname) < 4 || strlen($lname) < 4) {
            $errors[] = 'First name and last name must be at least 4 characters long';
        }

        // Check if first name and last name contain only alphabetical letters
        if (!preg_match('/^[a-zA-Z]+$/', $fname) || !preg_match('/^[a-zA-Z]+$/', $lname)) {
            $errors[] = 'First name and last name should only contain alphabetical letters';
        }
    }


    // Validate email
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Valid email address is required';
    }

    // Validate password
    if (empty($password) || $password !== $cpass) {
        $errors[] = 'Passwords must match';
    } elseif (strlen($password) < 8 || !preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/', $password)) {
        $errors[] = 'Password must be at least 8 characters long and include lowercase, uppercase, number, and special characters';
    }

    if (!empty($errors)) {
        http_response_code(400);
        echo json_encode(['error' => $errors]);
        exit;
    }

    // Hash the password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Insert user into the database
    if ($conn === false) {
        http_response_code(500);
        echo json_encode(['error' => 'Database connection error']);
        exit;
    }

    $query = "INSERT INTO users (fname, lname, email, password_hash) VALUES ('$fname', '$lname', '$email', '$hashedPassword')";

    if (mysqli_query($conn, $query)) {
        // User registration successful
        http_response_code(201); // Created
        echo json_encode(['success' => 'User registered successfully']);

        // Redirect the user to the login page
        header("Location: /login");
        exit;
    } else {
        // User registration failed
        http_response_code(500);
        echo json_encode(['error' => 'User registration failed. Please try again later.']);
    }

    mysqli_close($conn);
} else {
    http_response_code(405); 
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}
?>
