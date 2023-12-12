<?php
require_once "connections/config.php";
session_start();
$id = $_SESSION["id"];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {


    $titleId = isset($_POST['key1']) ? $_POST['key1'] : null;
    $value = isset($_POST['key2']) ? $_POST['key2'] : null;

    if ($value == -1) {
        $sql = "DELETE FROM dossiers WHERE id = :titleId AND fk_user = $id";
        $statement = $pdo->prepare($sql);
        $statement->bindParam(":titleId", $titleId);
        $statement->execute();
        $response = ['success' => true, 'message' => "dossier $titleId supprimé avec succès"];
    } elseif ($value == 1) {
        $title = isset($_POST['key3']) ? $_POST['key3'] : null;

        $sql = "UPDATE dossiers SET name = :title WHERE id = :titleId AND fk_user = $id";
        $statement = $pdo->prepare($sql);
        $statement->bindParam(":title", $title);
        $statement->bindParam(":titleId", $titleId);
        $statement->execute();

        $response = ['success' => true, 'message' => "nom du dossier modifié avec succès"];
    }
    header('Content-Type: application/json');
    echo json_encode($response);
}
