<?php
// Incluez ici la logique de connexion à votre base de données
// Assurez-vous que les données sont correctement échappées pour éviter les attaques par injection SQL
require_once "connections/config.php";
session_start();
$id = $_SESSION["id"];
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $question = $_POST['question'];
    $reponse = $_POST['reponse'];
    $selectedOption = $_POST['selectedOption'];
    error_log('value = ' . $selectedOption);

    if ($selectedOption == 'null') {
        error_log('root ok' . $selectedOption);
        $validationResult = ['count' => 1];
        $selectedOption = NULL;
    } else {
        // Validate that the selected option belongs to the logged-in user
        $validateQuery = "SELECT COUNT(*) AS count FROM dossiers WHERE id = :selectedOption AND fk_user = :id";

        $validateStmt = $pdo->prepare($validateQuery);
        $validateStmt->bindParam(':selectedOption', $selectedOption);
        $validateStmt->bindParam(':id', $id);
        $validateStmt->execute();
        $validationResult = $validateStmt->fetch(PDO::FETCH_ASSOC);
    }

    if ($validationResult['count'] > 0) {

        $query = "INSERT INTO `leitnerbox` (`question`, `reponse`, `compartiment`, `folder_id`, `fk_user`) VALUES (:question, :reponse, 1, :selectedOption, :id)";

        // Préparez la requête
        $stmt = $pdo->prepare($query);

        // Liaisons de paramètres avec des valeurs
        $stmt->bindParam(':question', $question);
        $stmt->bindParam(':reponse', $reponse);
        $stmt->bindParam(':selectedOption', $selectedOption);
        $stmt->bindParam(':id', $id);


        // Exécutez la requête préparée
        if ($stmt->execute()) {
            // Retrieve the ID of the last inserted row
            $lastInsertedID = $pdo->lastInsertId();
            $response = array('success' => true, 'id' => $lastInsertedID, 'message' => 'Question ajoutée avec succès.');
        } else {
            $response = array('success' => false, 'message' => 'Erreur lors de l\'ajout de la question.');
        }
    } else {
        // The selected option does not belong to the logged-in user
        $response = array('success' => false, 'message' => 'Selected option does not belong to the logged-in user');
    }

    header('Content-type: application/json');
    echo json_encode($response);
} else {
    // Gérez les requêtes non valides ici
}
