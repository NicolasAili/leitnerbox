<?php
require_once "connections/config.php";
session_start();
$id = $_SESSION["id"];
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $questionId = isset($_POST['question_id']) ? $_POST['question_id'] : null;

    // Remettez la question dans le premier compartiment (définissez le compartiment sur 1)
    // Exécutez une requête SQL pour mettre à jour le compartiment de la question
    $query = "UPDATE `leitnerbox` SET compartiment = 1 WHERE id = :questionId AND fk_user = $id";

    try {
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':questionId', $questionId, PDO::PARAM_INT);
        $stmt->execute();

        // Envoyez une réponse JSON pour indiquer que la mise à jour a réussi
        $response = array('success' => true, 'message' => 'Question remise dans le premier compartiment.');
    } catch (PDOException $e) {
        // Gérez les erreurs PDO ici
        $response = array('success' => false, 'message' => 'Erreur PDO : ' . $e->getMessage());
    }

    header('Content-type: application/json');
    echo json_encode($response);
}
?>