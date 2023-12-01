<?php
require_once "connections/config.php";
session_start();
$id = $_SESSION["id"];
// Exécutez une requête SQL pour obtenir les données des compartiments
$sql = "SELECT id, name FROM dossiers WHERE fk_user = $id";
$dossiers = $pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);

// Construisez la réponse sous forme de tableau associatif
$response = [
    'success' => true,
    'dossiers' => $dossiers,
];

// Renvoyez la réponse au format JSON
header('Content-Type: application/json');
echo json_encode($response);
?>