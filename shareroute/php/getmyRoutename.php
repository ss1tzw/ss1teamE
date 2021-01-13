<?php
if(!empty($_POST["uid"])){
    $uid = $_POST["uid"];
try {
    $dbh = new PDO('mysql:host=localhost;dbname=ordernavi;charset=utf8', "root", "");
    $sql = "SELECT DISTINCT routename FROM route WHERE uid = '" . $uid . "' ";
    $res = $dbh->query($sql);
    foreach($res as $value){
        $data[] = $value;
    }
    if (!isset($data)) {
        echo json_encode("");
    } else {
        echo json_encode($data);
    }
}catch (PDOException $e) {
    echo json_encode($e);
    die();
}
$dbh = null;
}