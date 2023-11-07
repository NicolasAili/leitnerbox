<?php
require_once "../includes/config.php";
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $questionId = isset($_POST['question_id']) ? $_POST['question_id'] : null;

    // Déplacez la question dans le compartiment suivant (ajoutez 1 au compartiment actuel)
    // Exécutez une requête SQL pour mettre à jour le compartiment de la question
    $query = "UPDATE `leitnerbox` SET compartiment = compartiment + 1 WHERE id = :questionId";

    try {
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':questionId', $questionId, PDO::PARAM_INT);
        $stmt->execute();

        // Envoyez une réponse JSON pour indiquer que la mise à jour a réussi
        $response = array('success' => true, 'message' => 'Question déplacée vers le prochain compartiment.');
    } catch (PDOException $e) {
        // Gérez les erreurs PDO ici
        $response = array('success' => false, 'message' => 'Erreur PDO : ' . $e->getMessage());
    }

    header('Content-type: application/json');
    echo json_encode($response);
}
?>