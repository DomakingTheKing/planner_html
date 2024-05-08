<?php

require_once('database.php');

function create($id)
{
    $db = getDb();

    $qr = $db->prepare("INSERT INTO session (id, user, creation, expire) VALUES (?, ?, ?, ?)");
    $qr->bind_param("ssss", $id);

    $qr->execute();
    $qr->close();
    $db->close();
    echo "Session created";
}


if(isset($_POST['id'])){

}







