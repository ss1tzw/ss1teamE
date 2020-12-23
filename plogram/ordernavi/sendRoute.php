<?php
if(!empty($_POST["uid"])){
    $uid = $_POST["uid"];
    $routeName = $_POST["routeName"];
    $name = $_POST["nameList"];
    $lat = $_POST["latList"];
    $lng = $_POST["lngList"];
    $nameList = explode(",", $name);
    $latList = explode(",", $lat);
    $lngList = explode(",", $lng);
    $count = 0;
 try {
     $dbh = new PDO('mysql:host=localhost;dbname=ordernavi;charset=utf8', "root", "");
     for($i = 0; $i < count($latList); $i++ ){
     $sql = "INSERT INTO route (uid,routename,name,lat,lng,number) VALUES ('$uid','$routeName','$nameList[$i]','$latList[$i]','$lngList[$i]','$i')";
     $res = $dbh->query($sql);
     }
     echo json_encode("OK");
 }catch (PDOException $e) {
     echo json_encode("$e");
     die();
 }
 $dbh = null;
} else {
    echo json_encode("NG");
}
