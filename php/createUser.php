<?php

require_once('database.php');

if(isset($_POST['username']) && isset($_POST['password'])){
    $username = $_POST['username'];
    $password = $_POST['password'];

    $db = getDb();

    $qr = $db->prepare("INSERT INTO user (username, password) VALUES (?, ?)");
    $qr->bind_param("ss", $username, $password);

    $qr->execute();
    $qr->close();
    $db->close();

    echo "User created";

}