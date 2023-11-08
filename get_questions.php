<?php
// Incluez ici la logique de connexion à votre base de données (comme vous l'avez déjà fait dans votre configuration)
require_once "connections/config.php";
session_start();
$id = $_SESSION["id"];
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $compartimentId = isset($_GET['compartiment']) ? $_GET['compartiment'] : 1; // Vous pouvez passer le compartiment souhaité via la requête GET

    // Sélectionnez les questions du compartiment spécifié depuis la base de données
    // Remplacez "votre_database" et "leitnerbox" par le nom de votre base de données et de votre table
    $query = "SELECT id, question, reponse FROM `leitnerbox` WHERE compartiment = :compartimentId AND fk_user = $id";
    
    try {
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':compartimentId', $compartimentId, PDO::PARAM_INT);
        $stmt->execute();

        $questions = $stmt->fetchAll(PDO::FETCH_ASSOC);
        // Vous avez maintenant un tableau de questions du compartiment spécifié

        // Envoyez la réponse JSON avec les questions
        header('Content-type: application/json');
        echo json_encode($questions);
    } catch (PDOException $e) {
        // Gérez les erreurs PDO ici
        $response = array('success' => false, 'message' => 'Erreur PDO : ' . $e->getMessage());
        header('Content-type: application/json');
        echo json_encode($response);
    }
} else {
    // Gérez les requêtes non valides ici
}
?>
