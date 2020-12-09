<?php
if (!empty($_POST["name"])) {

    //ここに処理が入ります
    $name = $_POST["name"];
    try {
        $pdo = new PDO('mysql:host=localhost;dbname=test;charset=utf8','root','');
    } catch (PDOException $e) {
        exit('データベース接続失敗。'.$e->getMessage());
    }
    if($name != "") {
        $stmt = $pdo -> prepare("SELECT name, age FROM testtb WHERE name = :name");
        $stmt->bindParam(':name', $name, PDO::PARAM_STR);
    } else {
        $stmt = $pdo -> prepare("SELECT name, age FROM testtb");
    }
    $stmt->execute();
    //header('Content-type: application/json');
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} else {
    echo json_encode("name not found!");
}