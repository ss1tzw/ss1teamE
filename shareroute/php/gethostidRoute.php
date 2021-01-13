<?php
if(!empty($_POST["id"])){
    $id = $_POST["id"];
 try {
     $dbh = new PDO('mysql:host=localhost;dbname=ordernavi;charset=utf8', "root", "");
     $sql = "SELECT pinname,lat,lng,name FROM route WHERE  id = '".$id."'";
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
} else {
    echo json_encode("NG");
}

