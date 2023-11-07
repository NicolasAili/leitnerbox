<?php
require_once "../includes/config.php";

// Exécutez une requête SQL pour obtenir les données des compartiments
$sql = "SELECT numero, date_ouverture FROM compartiments";
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