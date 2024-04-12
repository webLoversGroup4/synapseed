<?php

$SERVER = 'localhost';
$USERNAME = 'root';
$PASSWORD = '';
$DB_NAME = 'research_education_collaborative';

// Establishing connection to the database
$conn = new mysqli($SERVER, $USERNAME, $PASSWORD, $DB_NAME) or die("Could not establish connection to database");

// Checking if connection worked
if ($conn->connect_error) {
    http_response_code(500); // Internal Server Error
    echo json_encode(['error' => 'Database connection error']);
    exit;
}