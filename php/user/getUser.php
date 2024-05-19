<?php

ini_set('display_errors', 1);

require_once('../database.php');

session_start();

if(isset($_POST['username']) && isset($_POST['password'])){
    $username = $_POST['username'];
    $password = $_POST['password'];

    //echo $username . "<br>";
    //echo $password . "<br>";
    //echo "<br>";

    $db = getDb();

    $qr = $db->prepare("SELECT id FROM user WHERE username = ? AND password = ?");
    $qr->bind_param("ss", $username, $password);

    $resp = $qr->execute();


    if($resp){
        //echo "resp: ";
        //echo $resp;
        //echo "<br>";

        $qr->store_result();

        //echo "num: ";
        //echo $qr->num_rows."<br>";
        
        $qr->bind_result($id);
        $qr->fetch();

        //echo $id . "<br>";
        $_SESSION['id'] = $id;

        $qr->close();
        $db->close();
        
        //echo "setted: ";
        //echo $_SESSION['id'];

        header('Location: /php/session/createSession.php');
        exit();

    }

    $qr->close();
    $db->close();


    header('Location: /');
    exit();
}