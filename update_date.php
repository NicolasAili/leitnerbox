<?php
require_once "connections/config.php";
session_start();
$id = $_SESSION["id"];
// Récupérez le numéro de compartiment depuis les données POST
$compartimentId = $_POST['compartimentId'];

// Récupérez la date actuelle
$aujourdhui = date("Y-m-d");

// Récupérez la date d'ouverture actuelle du compartiment depuis la base de données
$sql = "SELECT date_ouverture FROM compartiments WHERE numero = :compartimentId AND fk_user = $id";
$statement = $pdo->prepare($sql);
$statement->bindParam(":compartimentId", $compartimentId);
$statement->execute();
$result = $statement->fetch(PDO::FETCH_ASSOC);

if ($result) {
    $dateOuvertureActuelle = $result['date_ouverture'];
    
    // Vérifiez si la date d'ouverture actuelle est soit aujourd'hui, soit une date passée
    if ($dateOuvertureActuelle <= $aujourdhui) {
        // Déterminez la nouvelle date d'ouverture en fonction du numéro de compartiment
        $nouvelleDateOuverture = $aujourdhui; // Par défaut, aujourd'hui

        switch ($compartimentId) {
            case 1:
                $nouvelleDateOuverture = date("Y-m-d", strtotime("+1 day"));
                break;
            case 2:
                $nouvelleDateOuverture = date("Y-m-d", strtotime("+2 days"));
                break;
            case 3:
                $nouvelleDateOuverture = date("Y-m-d", strtotime("+4 days"));
                break;
            case 4:
                $nouvelleDateOuverture = date("Y-m-d", strtotime("+9 days"));
                break;
            case 5:
                $nouvelleDateOuverture = date("Y-m-d", strtotime("+16 days"));
                break;
            case 6:
                $nouvelleDateOuverture = date("Y-m-d", strtotime("+35 days"));
                break;
            case 7:
                $nouvelleDateOuverture = date("Y-m-d", strtotime("+80 days"));
                break;
            default:
                // Gérez le cas où le numéro de compartiment n'est pas reconnu
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
        $response = ['success' => false, 'message' => 'La date d\'ouverture est déjà prévue pour l\'avenir'];
    }
} else {
    $response = ['success' => false, 'message' => 'Compartiment non trouvé'];
}

header('Content-Type: application/json');
echo json_encode($response);
