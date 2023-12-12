<?php
require_once "connections/config.php";
session_start();
$id = $_SESSION["id"];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the JSON data from the request body
    $jsonData = file_get_contents("php://input");

    // Decode the JSON data
    $cartesArray = json_decode($jsonData, true);

    // Check if decoding was successful
    if ($cartesArray !== null) {
        foreach ($cartesArray as $carte) {
            // Extract data from each card
            $questionId = $carte['id'];
            $question = $carte['question'];
            $reponse = $carte['reponse'];
            $folder = null;

            error_log($question);
            $sql = "UPDATE leitnerbox SET question = :question, reponse = :reponse, folder_id = :folder WHERE id = :questionId AND fk_user = $id";
            $statement = $pdo->prepare($sql);
            $statement->bindParam(":question", $question);
            $statement->bindParam(":reponse", $reponse);
            $statement->bindParam(":folder", $folder);
            $statement->bindParam(":questionId", $questionId);
            $statement->execute();
        }

        // Send a response to the client if needed
        $response = ['success' => true, 'message' => 'Data updated successfully'];
        echo json_encode($response);
    } else {
        // Send an error response if JSON decoding fails
        $response = ['success' => false, 'message' => 'Error decoding JSON data'];
        echo json_encode($response);
    }
}
