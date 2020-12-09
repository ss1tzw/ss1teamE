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
        $stmt = $pdo -> prepare("DELETE FROM testtb WHERE name = :name");
        $stmt->bindParam(':name', $name, PDO::PARAM_STR);
    }
    $stmt->execute();
    //header('Content-type: application/json');
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} else {
    echo json_encode("name not found!");
}