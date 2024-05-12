<?php

ini_set('display_errors', 1);

require_once('../database.php');
session_start();


if(isset($_SESSION['id'])  && isset($_POST('title')) && isset($_POST('description')) && isset($_POST('priority')) && isset($_POST('durata'))){
    $user = $_SESSION['id'];
    $title = $_POST('title');
    $description = $_POST('description');
    $priority = $_POST('priority');
    $durata = $_POST('durata');

    $db = getDb();

    $qr = $db->prepare("INSERT INTO event (user, title, description, priority, creation, expiry) VALUES (?, ?, ?, ?, ?, ?)");
    $qr->bind_param("ississ", $user, $title, $description, $priority, date("Y-m-d H:i:s"), date("Y-m-d H:i:s", strtotime("+$durata minutes")));

    header("Location: /");
    
}
