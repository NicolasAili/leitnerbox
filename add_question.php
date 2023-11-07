<?php
// Incluez ici la logique de connexion à votre base de données
// Assurez-vous que les données sont correctement échappées pour éviter les attaques par injection SQL
require_once "../includes/config.php";
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $question = $_POST['question'];
    $reponse = $_POST['reponse'];

    // Exécutez la requête SQL pour insérer la question dans la base de données
    // Remplacez "votre_database" par le nom de votre base de données et "leitnerbox" par le nom de votre table
    // Utilisez une requête préparée avec des liaisons de paramètres
    $query = "INSERT INTO `leitnerbox` (`question`, `reponse`, `compartiment`) VALUES (:question, :reponse, 1)";

    // Préparez la requête
    $stmt = $pdo->prepare($query);

    // Liaisons de paramètres avec des valeurs
    $stmt->bindParam(':question', $question);
    $stmt->bindParam(':reponse', $reponse);

    // Exécutez la requête préparée
    if ($stmt->execute()) {
        $response = array('success' => true, 'message' => 'Question ajoutée avec succès.');
    } else {
        $response = array('success' => false, 'message' => 'Erreur lors de l\'ajout de la question.');
    }

    header('Content-type: application/json');
    echo json_encode($response);
} else {
    // Gérez les requêtes non valides ici
}
