<?php
try {
    $dbh = new PDO('mysql:host=localhost;dbname=ordertest', "root", "");
    foreach($dbh->query('SELECT * from test') as $row) {
        print_r($row);
        $dbh = null;
    }
}catch (PDOException $e) {
    print "エラー!: " . $e->getMessage() . "<br/>";
    die();
}