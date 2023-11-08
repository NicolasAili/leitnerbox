<?php
require_once "connections/config.php";
session_start();
$id = $_SESSION["id"];
if ($_SERVER['REQUEST_METHOD'] === 'POST') {


    $compartimentId = isset($_POST['key1']) ? $_POST['key1'] : null;
    $value = isset($_POST['key2']) ? $_POST['key2'] : null;
    $datecompartiment = isset($_POST['key3']) ? $_POST['key3'] : null;

    // Récupérez la date d'ouverture actuelle du compartiment depuis la base de données
    $sql = "SELECT date_ouverture FROM compartiments WHERE numero = :compartimentId AND fk_user = $id";
    $statement = $pdo->prepare($sql);
    $statement->bindParam(":compartimentId", $compartimentId);
    $statement->execute();
    $result = $statement->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        $dateOuvertureActuelle = $result['date_ouverture'];
        $nouvelleDateOuverture = $dateOuvertureActuelle;
        error_log($value);
        if ($value == -1) {
            $nouvelleDateOuverture = date("Y-m-d", strtotime($dateOuvertureActuelle . " -1 day"));
        } elseif ($value == 1) {
            $nouvelleDateOuverture = date("Y-m-d", strtotime($dateOuvertureActuelle . " +1 day"));
        }

        // Exécutez la mise à jour de la date d'ouverture pour le compartiment
        $sql = "UPDATE compartiments SET date_ouverture = :nouvelleDateOuverture WHERE numero = :compartimentId AND fk_user = $id";
        $statement = $pdo->prepare($sql);
        $statement->bindParam(":nouvelleDateOuverture", $nouvelleDateOuverture);
        $statement->bindParam(":compartimentId", $compartimentId);
        $statement->execute();

        // Renvoyez une réponse au client, par exemple, un message de succès
        $response = ['success' => true, 'newdate' => $nouvelleDateOuverture];
    } else {
        $response = ['success' => false, 'message' => 'Compartiment non trouvé'];
    }
    header('Content-Type: application/json');
    echo json_encode($response);
}
