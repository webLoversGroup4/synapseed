<?php
session_start(); 
include "../settings/connection.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    if (empty($email) || empty($password)) {
        http_response_code(400);
        echo json_encode(['error' => 'Email and password are required']);
        exit;
    }

    $query = "SELECT user_id, fname, lname, password_hash FROM users WHERE email=?";
    $stmt = mysqli_prepare($conn, $query);

    if (!$stmt) {
        http_response_code(500);
        echo json_encode(['error' => 'Database query error']);
        exit;
    }

    mysqli_stmt_bind_param($stmt, "s", $email);
    mysqli_stmt_execute($stmt);

    // Get the result of the query
    $result = mysqli_stmt_get_result($stmt);

    // Check if a user with the given email exists
    if (mysqli_num_rows($result) === 1) {
        $row = mysqli_fetch_assoc($result);
        $hashedPassword = $row['password_hash'];
        $userId = $row['user_id'];
        $fullName = $row['fname'] . " " . $row['lname'];

        // Verify the password
        if (password_verify($password, $hashedPassword)) {
            // Set session variables
            $_SESSION['user_id'] = $userId;
            $_SESSION['full_name'] = $fullName;
            $token = generateToken();
            $_SESSION["token"] = $token;

            // Prepare response data
            $userData = [
                'user_id' => $userId,
                'full_name' => $fullName,
                'token' => $token
            ];

            echo json_encode(['success' => true, 'data' => $userData]);
            exit;
        } else {
            http_response_code(401);
            echo json_encode(['error' => 'Invalid credentials']);
            var_dump($_SESSION);
            exit;
        }
    } else {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid credentials']);
        exit;
    }
    mysqli_stmt_close($stmt);
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

/**
 * Function to generate a secure random token.
 * 
 * @param int $length Length of the token in bytes (e.g., 32 for a 64-character hex token).
 * @return string Generated token.
 */
function generateToken($length = 32) {
    return bin2hex(random_bytes($length)); 
}
?>
