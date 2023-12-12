<?php
require_once "connections/config.php";
session_start();
$id = $_SESSION["id"];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {


    $questionId = isset($_POST['key1']) ? $_POST['key1'] : null;
    $value = isset($_POST['key2']) ? $_POST['key2'] : null;

    if ($value == -1) {
        $sql = "DELETE FROM leitnerbox WHERE id = :questionId AND fk_user = $id";
        $statement = $pdo->prepare($sql);
        $statement->bindParam(":questionId", $questionId);
        $statement->execute();
        $response = ['success' => true, 'message' => "question $questionId supprimée avec succès"];
    } elseif ($value == 1) {
        $question = isset($_POST['key3']) ? $_POST['key3'] : null;
        $reponse = isset($_POST['key4']) ? $_POST['key4'] : null;
        $folder = isset($_POST['key5']) ? ($_POST['key5'] === 'null' ? null : $_POST['key5']) : null;

        $sql = "UPDATE leitnerbox SET question = :question, reponse = :reponse, folder_id = :folder WHERE id = :questionId AND fk_user = $id";
        $statement = $pdo->prepare($sql);
        $statement->bindParam(":question", $question);
        $statement->bindParam(":reponse", $reponse);
        $statement->bindParam(":folder", $folder);
        $statement->bindParam(":questionId", $questionId);
        $statement->execute();

        $response = ['success' => true, 'message' => "question modifiée avec succès"];


    }
    header('Content-Type: application/json');
    echo json_encode($response);
}
