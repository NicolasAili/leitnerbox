<?php
require_once "connections/config.php";
session_start();
$id = $_SESSION["id"];
// Exécutez une requête SQL pour obtenir les données des compartiments
$sql = "SELECT numero, date_ouverture FROM compartiments WHERE fk_user = $id";
error_log($sql);
$compartiments = $pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);

// Construisez la réponse sous forme de tableau associatif
$response = [
    'success' => true,
    'compartiments' => $compartiments,
];

// Renvoyez la réponse au format JSON
header('Content-Type: application/json');
echo json_encode($response);
?>