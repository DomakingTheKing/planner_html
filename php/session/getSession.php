<?php

require_once('../database.php');


session_start();

if(isset($_COOKIE['session'])){
    $session = $_COOKIE['session'];
    $db = getDb();

    $qr = $db->prepare("SELECT user FROM session WHERE id = ?");
    $qr->bind_param("s", $session);

    $qr->execute();

    $qr->bind_result($id);
    $qr->fetch();

    $qr->close();
    $db->close();

    if($id){
        $_SESSION['id'] = $id;
    }
    echo $_SESSION['id'];
}

header('Location: /events.html');