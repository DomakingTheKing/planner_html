<?php
ini_set('display_errors', 1);

require_once('../database.php');
session_start();

if(isset($_SESSION['id'])){
    $db = getDb();

    $qr = $db->prepare("SELECT id, title, start, end, color, calendar_id FROM event WHERE user = ?");

    $qr->bind_param("i", $_SESSION['id']);

    $qr->execute();

    $qr->bind_result($id, $title, $start, $end, $color, $calendar_id);

    $events = array();

    while($qr->fetch()){
        $events[] = array(
            'id' => $id,
            'title' => $title,
            'start' => $start,
            'end' => $end,
            'color' => $color,
            'calendar_id' => $calendar_id
        );
    }

    $qr->close();
    $db->close();

    echo json_encode($events);
    header("Content-Type: application/json");
}