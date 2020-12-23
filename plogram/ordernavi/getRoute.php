<?php
if(!empty($_POST["uid"])){
    $uid = $_POST["uid"];
    $routeName = $_POST["routeName"];
 try {
     $dbh = new PDO('mysql:host=localhost;dbname=ordernavi;charset=utf8', "root", "");
     $sql = "SELECT name,lat,lng FROM route WHERE uid = '".$uid."' AND routename = '".$routeName."'";
     $res = $dbh->query($sql);
     foreach($res as $value){
        $data[] = $value;
    }
    echo json_encode($data);
 }catch (PDOException $e) {
     echo json_encode($e);
     die();
 }
 $dbh = null;
} else {
    echo json_encode("NG");
}

