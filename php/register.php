<?php
$db = new mysqli('127.0.0.1', 'root', '', 'web01_module_d');
$db->query('SET NAME UTF-8');

$data = json_decode(file_get_contents('php://input'));
$difficulty = htmlspecialchars($data->difficulty);
$name = htmlspecialchars($data->name);
$time = $data->time;
$score = $data->score;

$sql = "INSERT INTO `user` (`difficulty`,`name`,`time`,`score`) VALUES ('{$difficulty}','{$name}','{$time}','{$score}')";
$db->query($sql);

$sql = "SELECT * FROM `user` WHERE `difficulty` = '{$difficulty}'";
$res = $db->query($sql);
$r = [];
while ($row = $res->fetch_assoc()) {
	$r[] = $row;
}

echo (json_encode($r));
