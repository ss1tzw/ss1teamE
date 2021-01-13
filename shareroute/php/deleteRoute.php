<?php
if(!empty($_POST["uid"])){
    $uid = $_POST["uid"];
    $routeName = $_POST["routeName"];
    $count = 0;
 try {
     $dbh = new PDO('mysql:host=localhost;dbname=ordernavi;charset=utf8', "root", "");
     $sql = "DELETE FROM route WHERE uid = '$uid' AND routename = '$routeName'";
     $res = $dbh->query($sql);
     echo json_encode("OK");
 }catch (PDOException $e) {
     echo json_encode("$e");
     die();
 }
 $dbh = null;
} else {
    echo json_encode("NG");
}