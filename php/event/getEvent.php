<?php
ini_set('display_errors', 1);

require_once('../database.php');
session_start();

if(isset($_SESSION['id'])){
    $db = getDb();

    $qr = $db->prepare("SELECT E.id, E.title, E.description, E.priority, E.creation, E.expiry, E.calendar_id
     FROM calendar as C, event as E 
     WHERE C.id = E.calendar_id AND C.id = ?");

    $qr->bind_param("i", $_SESSION['id']);

    $qr->execute();

    $qr->bind_result($id, $title, $description, $priority, $creation, $expire, $calendar_id);

    $calendars = array();

    while($qr->fetch()){
        $calendars[] = array(
            'id' => $id,
            'title' => $title,
            'description' => $description,
            'priority' => $priority,
            'creation' => $creation,
            'expire' => $expire,
            'calendar_id' => $calendar_id
        );
    }

    $qr->close();
    $db->close();

    echo json_encode($calendars);
}