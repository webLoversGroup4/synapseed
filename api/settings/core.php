<?php

// Starting session
session_start();

// Function to check login status
function checkLogin()
{
    // Checking if user id session exists
    if (!isset($_SESSION['pid'])) {
        // Redirecting to login page
        header("Location: ../login/Login_view.php");
        die();
    }
}

function checkUserRoleId()
{
    // Checking if user rid session exists and is not empty
    if (!isset($_SESSION['rid']) || empty($_SESSION['rid'])) {
        return false;
    } else {
        return $_SESSION['rid'];
    }
}

function authenticateUser()
{
    checkLogin();
    $role = checkUserRoleId();

    if ($role == 1) {
        // Super-admin has access to all pages, so no action needed
    } elseif ($role == 2) {
        // Admin
        unset($_GET['id']);
    } elseif ($role == 3) {
        header("Location: ../view/homepage.php");
        exit();
    }

    if (isset($_GET['logout'])) {
        include '../login/Logout_view.php';
    }
}
