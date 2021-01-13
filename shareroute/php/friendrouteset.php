<?php
if(!empty($_POST["uid"])){
    $uid = $_POST["uid"];
    $pinname = $_POST["nameList"];
    $lat = $_POST["latList"];
    $lng = $_POST["lngList"];
    $name = $_POST["name"];
    $id = $_POST["id"];
    $nameList = explode(",", $pinname);
    $latList = explode(",", $lat);
    $lngList = explode(",", $lng);
    $count = 0;
 try {
     $dbh = new PDO('mysql:host=localhost;dbname=ordernavi;charset=utf8', "root", "");
     $sql = "DELETE FROM friendroute WHERE uid = '$uid' AND id = '$id'";
     $res = $dbh->query($sql);
     for($i = 0; $i < count($latList); $i++ ){
     $sql = "INSERT INTO friendroute (uid,pinname,lat,lng,number,name,id) VALUES ('$uid','$nameList[$i]','$latList[$i]','$lngList[$i]','$i','$name','$id')";
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
