<?php
ini_set('display_errors', 1);
require_once('../database.php');

session_start();

if(isset($_SESSION['id']) && isset($_POST['name']) && isset($_POST['color'])){
    
    $db = getDb();
    

    if(isset($_POST['description'])){
        $qr = $db->prepare("INSERT INTO calendar (id, name, description, color) VALUES (?, ?, ?, ?)");
        $qr->bind_param("isss", $_SESSION['id'], $_POST['name'], $_POST['description'], $_POST['color']);
    }else{
        $qr = $db->prepare("INSERT INTO calendar (id, name, color) VALUES (?, ?, ?)");
        $qr->bind_param("iss", $_SESSION['id'], $_POST['name'], $_POST['color']);
    }

    $qr->execute();
    $qr->close();
    $db->close();

    header('Location: /');

}