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


function check($id){
    $db = getDb();

    $qr = $db->prepare("SELECT id FROM session WHERE user = ?");
    $qr->bind_param("i", $id);

    $qr->execute();

    $qr->bind_result($sess);
    $qr->fetch();

    $qr->close();
    $db->close();

    if($sess){
        return $sess;
    }
    return null;
}

session_start();

echo "mamma";

if(isset($_SESSION['id'])){
    echo "mia";
    $s = check($_SESSION['id']);
    if($s){
        setcookie("session",  $s, time() + (99*24*3600), "/");
    }else{
        $cook = create($_SESSION['id']);
        setcookie("session",  $cook, time() + (99*24*3600), "/");
    }
    header('Location: /');
    exit();
}





