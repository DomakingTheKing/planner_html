<?php

function getDb(){
    $db = mysqli_connect('localhost', getenv('dbUser'), getenv('dbPassword'), 'planner');
    return $db;
}
