<?php
$db = new mysqli('127.0.0.1', 'root', '', 'web01_module_d');
$db->query('SET NAME UTF-8');

$sql = "SELECT * FROM `user` ORDER BY `user`.`score` DESC";
$res = $db->query($sql);

$r = [];
while ($row = $res->fetch_assoc()) {
    $r[] = $row;
}

echo (json_encode($r));
