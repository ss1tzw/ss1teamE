<?php
if (!empty($_POST["name"])) {

    //ここに処理が入ります
    $name = $_POST["name"];
$age = $_POST["age"];
echo json_encode($name.$age);
    
    }

