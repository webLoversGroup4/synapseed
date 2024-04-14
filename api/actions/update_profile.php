<?php
session_start();
include '../settings/connection.php';

$allowedOrigin = "http://localhost:8000";
header("Access-Control-Allow-Origin: $allowedOrigin");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-User-Id, X-Full-Name");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$user_id = $_SERVER['HTTP_X_USER_ID'] ?? null;

if (!$user_id) {
    http_response_code(401);
    exit(json_encode(['error' => 'Unauthorized, could not find user id']));
}

$input = json_decode(file_get_contents('php://input'), true);

if (isset($input['email'])) {
    $new_email = $input['email'];

    // Validate email format
    if (!filter_var($new_email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid email format']);
        exit();
    }

    // Check if the new email is unique
    $check_email_stmt = $conn->prepare("SELECT user_id FROM users WHERE email = ? AND user_id != ?");
    $check_email_stmt->bind_param("ss", $new_email, $user_id);
    $check_email_stmt->execute();
    $check_email_result = $check_email_stmt->get_result();

    if ($check_email_result->num_rows > 0) {
        http_response_code(400);
        echo json_encode(['error' => 'Email already exists']);
        exit();
    }

    $update_email_stmt = $conn->prepare("UPDATE users SET email = ? WHERE user_id = ?");
    $update_email_stmt->bind_param("ss", $new_email, $user_id);

    if ($update_email_stmt->execute()) {
        echo json_encode(['message' => 'Email updated successfully']);
    } else {
        echo json_encode(['error' => 'Failed to update email']);
    }

    $update_email_stmt->close();
} elseif (isset($input['fname'])) {
    $new_fname = $input['fname'];

    // Validate first name format (only letters and at least 4 characters long)
    if (!isValid($new_fname)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid first name format. First name format (only letters and at least 4 characters long)']);
        exit();
    }

    $update_fname_stmt = $conn->prepare("UPDATE users SET fname = ? WHERE user_id = ?");
    $update_fname_stmt->bind_param("ss", $new_fname, $user_id);

    if ($update_fname_stmt->execute()) {
        echo json_encode(['message' => 'Username updated successfully']);
    } else {
        echo json_encode(['error' => 'Failed to update username']);
    }

    $update_fname_stmt->close();
} elseif (isset($input['bio'])) {
    $new_bio = $input['bio'];

    // Validate bio length (between 10 characters) and format (only letters)
    if (!isValidBio($new_bio)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid bio format. Bio length be between 10 and 100 characters long.']);
        exit();
    }

    $update_bio_stmt = $conn->prepare("UPDATE users SET bio = ? WHERE user_id = ?");
    $update_bio_stmt->bind_param("ss", $new_bio, $user_id);

    if ($update_bio_stmt->execute()) {
        echo json_encode(['message' => 'Bio updated successfully']);
    } else {
        echo json_encode(['error' => 'Failed to update bio']);
    }

    $update_bio_stmt->close();
}

$conn->close();

function isValid($me) {
    // Validate that the first name contains only letters and is at least 4 characters long
    if (preg_match('/^[a-zA-Z]{4,}$/', $me)) {
        return true;
    }
    return false;
}

function isValidBio($me) {
    // Validate the bio
    if (preg_match('/^[a-zA-Z]{10,100}$/', $me)) {
        return true;
    }
    return false;
}


?>
