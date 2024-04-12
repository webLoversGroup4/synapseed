<?php
include '../settings/connection.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header('Content-Type: application/json');


// if (!isset($_SESSION['user_id'])) {
//     http_response_code(401);
//     exit('Unauthorized');
// }

$user_id = $_SESSION['user_id'];

function isValidEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

function isValidBio($bio) {
    $bioLength = strlen($bio);
    if ($bioLength >= 4 && $bioLength < 15) {
        return ctype_alpha($bio); 
    } elseif ($bioLength >= 15) {
        return ctype_digit(substr($bio, 15))
    }
    return false;
}

if (isset($_POST['newEmail'])) {
    $new_email = $_POST['newEmail'];

    if (!isValidEmail($new_email)) {
        echo json_encode(['error' => 'Invalid email format']);
        exit;
    }

    $email_exists_stmt = $conn->prepare("SELECT user_id FROM users WHERE email = ?");
    $email_exists_stmt->bind_param("s", $new_email);
    $email_exists_stmt->execute();
    $email_exists_result = $email_exists_stmt->get_result();

    if ($email_exists_result->num_rows > 0) {
        echo json_encode(['error' => 'Email already exists']);
        exit;
    }

    // Update the user's email
    $update_email_stmt = $conn->prepare("UPDATE users SET email = ? WHERE user_id = ?");
    $update_email_stmt->bind_param("ss", $new_email, $user_id);

    if ($update_email_stmt->execute()) {
        echo json_encode(['message' => 'Email updated successfully']);
    } else {
        echo json_encode(['error' => 'Failed to update email']);
    }

    $update_email_stmt->close();
}

if (isset($_POST['newUsername'])) {
    $new_username = $_POST['newUsername'];

    $update_username_stmt = $conn->prepare("UPDATE users SET fname = ? WHERE user_id = ?");
    $update_username_stmt->bind_param("ss", $new_username, $user_id);

    if ($update_username_stmt->execute()) {
        echo json_encode(['message' => 'Username updated successfully']);
    } else {
        echo json_encode(['error' => 'Failed to update username']);
    }

    $update_username_stmt->close();
}

if (isset($_POST['bio'])) {
    $new_bio = $_POST['bio'];

    if (!isValidBio($new_bio)) {
        echo json_encode(['error' => 'Invalid bio format']);
        exit;
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
?>
