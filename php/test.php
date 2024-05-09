<?php


session_start();


$_SESSION['id'] = 1;

header('Location: /php/session/createSession.php');