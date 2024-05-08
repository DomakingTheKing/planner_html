<?php

ini_set('display_errors', 1);

require_once('../database.php');


function hash_string($int, $time){
    $hashed = hash('sha256', "-$int-$time-");
    return substr($hashed, 0, 100);
}

function create($id){
    $db = getDb();

    $qr = $db->prepare("INSERT INTO session (id, user, creation, expire) VALUES (?, ?, ?, ?)");

    $now  = date("Y-m-d H:i:s");
    $hash = hash_string($id, $now);
    $expire =  date($now, strtotime("+100 day"));

    $qr->bind_param("ssss", $hash, $id, $now, $expire);

    $qr->execute();
    $qr->close();
    $db->close();
    return  $hash;
}


if(isset($_POST['id'])){

    $cook = create($_POST['id']);

    setcookie("session",  $cook, time() + (99*24*3600), "/");

}





