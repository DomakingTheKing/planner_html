<?php

session_start();

if(isset($_SESSION['id'])){
    if(isset($_SESSION['id']) && !isset($_COOKIE['session'])){
        header('Location: /php/session/getSession.php');
        exit();
    }
}else{
    //header('Location: /html/login.html'); pagina di login e registrazione
    exit();
}

header('Location: /');