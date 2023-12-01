<?php
// Incluez ici la logique de connexion à votre base de données
// Assurez-vous que les données sont correctement échappées pour éviter les attaques par injection SQL
require_once "connections/config.php";
session_start();
$id = $_SESSION["id"];
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $foldername = $_POST['folder'];

    // Exécutez la requête SQL pour insérer la question dans la base de données
    // Remplacez "votre_database" par le nom de votre base de données et "leitnerbox" par le nom de votre table
    // Utilisez une requête préparée avec des liaisons de paramètres
    $query = "INSERT INTO `dossiers` (`name`, `fk_user`) VALUES (:foldername, :id)";

    // Préparez la requête
    $stmt = $pdo->prepare($query);

    // Liaisons de paramètres avec des valeurs
    $stmt->bindParam(':foldername', $foldername);
    $stmt->bindParam(':id', $id);


    // Exécutez la requête préparée
    if ($stmt->execute()) {
        // Retrieve the ID of the last inserted row
        $lastInsertedID = $pdo->lastInsertId();
        $response = array('success' => true, 'id' => $lastInsertedID, 'message' => 'Dossier ajouté avec succès.');
    } else {
        $response = array('success' => false, 'message' => 'Erreur lors de l\'ajout du dossier.');
    }

    header('Content-type: application/json');
    echo json_encode($response);
} else {
    // Gérez les requêtes non valides ici
}
