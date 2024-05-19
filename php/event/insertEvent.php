<?php

echo  "entro";

ini_set('display_errors', 1);

require_once('../database.php');
session_start();

echo  "entro";

if(isset($_SESSION['id'])  && isset($_POST['title'])  && isset($_POST['start']) && isset($_POST['end']) && isset($_POST['color'])){

    echo "test<br><br>";

    $title = $_POST['title'];
    $start = str_replace("T", " ", $_POST['start']).":00";
    $end = str_replace("T", " ", $_POST['end']).":00";
    $color = $_POST['color'];

    echo $title . "<br>";
    echo $start . "<br>";
    echo $end . "<br>";
    echo $color . "<br>";
    echo  $_SESSION['id'] . "<br>";

    $calendar = 1;

    $db = getDb();

    $qr= $db->prepare("INSERT INTO event (user, title, start, end, calendar_id, color ) VALUES (?, ?, ?, ?, ?, ?)");
    
    $qr->bind_param("isssis", $_SESSION['id'], $title, $start, $end, $calendar, $color);
    
    $resp = $qr->execute();

    if($resp){
        $qr->close();
        $db->close();
        header('Location: /events.html');
        exit();
    }

    $qr->close();
    $db->close();

    header('Location: /events.html');
    exit();

}

header('Location: /');
