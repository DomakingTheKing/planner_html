<?php

ini_set('display_errors', 1);

require_once('database.php');


function reqSession($id){

    $url = 'http://planner.bossis.it/php/session/createSession.php';

    $data = array(
        'id' => $id,
    );

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);

    if ($response === false) {
        echo 'Errore cURL: ' . curl_error($ch);
        header('Location: /');
        exit(1);
    }

    curl_close($ch);
}


if(isset($_POST['username']) && isset($_POST['password'])){
    $username = $_POST['username'];
    $password = $_POST['password'];

    $db = getDb();

    $qr = $db->prepare("INSERT INTO user (username, password) VALUES (?, ?)");
    $qr->bind_param("ss", $username, $password);

    $qr->execute();
    $qr->close();


    $qr = $db->prepare("SELECT id FROM user WHERE username = ? AND password = ?");
    $qr->bind_param("ss", $username, $password);

    $resp = $qr->execute();


    if($resp){
        $qr->bind_result($id);
        $qr->fetch();

        reqSession($id);

        $qr->close();

    }

    $db->close();


    header('Location: /');

}