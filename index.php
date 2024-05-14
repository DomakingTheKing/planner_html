<?php


session_start();

if(isset($_SESSION['id'])){
    header('Location: /events.html');
    exit();
}else if(isset($_COOKIE['session'])){
    header('Location: /php/session/getSession.php');
    exit();
}else {
    header('Location: /login.html');
    exit();
}