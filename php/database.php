<?php


function getDb(){
    $db = mysqli_connect('localhost', getenv('dbUser'), getenv('dbPassword'), 'test');
    return $db;
}
