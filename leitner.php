<?php
// include the layout file
/*
1 > 1
2 > 2
3 > 4
4 > 9
5 > 16
6 > 35
7 > 80
*/

/**
 * TODO :
 * Ranger les quuestion par dossier ---> diminuer un dossier
 * Vallider la réponse ---> afficher la réponse
 * réinitialiser ----> cacher la réponse
 * Le - mettre un carré et non un rectaglle
 */

//afficher les dates d'ouuverture des boites > si date ajd = vert > si date dépassée = rouge
//lors d'ouverture d'une boîte, mettre à jour la date de la prochaine ouverture
session_start();
if (!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true) {
    // User is not logged in, redirect to the login page
    header("location: connections/login.php");
    exit; // Terminate the script
} else {
?>
    <html>

    <head>
        <link rel="stylesheet" type="text/css" href="style.css">
        <link rel="stylesheet" href="node_modules/@fortawesome/fontawesome-free/css/all.min.css">
        <script src="jquery.min.js"></script>
    </head>

    <body>

        <h1>Boîte de Leitner</h1>
        <div id="add-question">
            <h2>Ajouter une question</h2>
            <form id="question-form">
                <input type="text" id="question" placeholder="Question" required>
                <input type="text" id="reponse" placeholder="Réponse" required>
                <button type="submit">Ajouter</button>
            </form>
        </div>
        <div id="toggleresponsesdiv" class="hide"><button class="toggleresponses">Afficher/Cacher toutes les réponses</button></div>
        <div id="compartiments">
            <div id="compartiments">
                <div id="compartiment-1" class="compartiment 1" data-id="1">
                    <div class="buttonsday">
                        <div class="remove">-</div>
                        <div class="add">+</div>
                    </div>
                    <div class="compcontent">Compartiment 1</div>
                </div>
                <div id="compartiment-2" class="compartiment 2" data-id="2">
                    <div class="buttonsday">
                        <div class="remove">-</div>
                        <div class="add">+</div>
                    </div>
                    <div class="compcontent">Compartiment 2</div>
                </div>
                <div id="compartiment-3" class="compartiment 3" data-id="3">
                    <div class="buttonsday">
                        <div class="remove">-</div>
                        <div class="add">+</div>
                    </div>
                    <div class="compcontent">Compartiment 3</div>
                </div>
                <div id="compartiment-4" class="compartiment 4" data-id="4">
                    <div class="buttonsday">
                        <div class="remove">-</div>
                        <div class="add">+</div>
                    </div>
                    <div class="compcontent">Compartiment 4</div>
                </div>
                <div id="compartiment-5" class="compartiment 5" data-id="5">
                    <div class="buttonsday">
                        <div class="remove">-</div>
                        <div class="add">+</div>
                    </div>
                    <div class="compcontent">Compartiment 5</div>
                </div>
                <div id="compartiment-6" class="compartiment 6" data-id="6">
                    <div class="buttonsday">
                        <div class="remove">-</div>
                        <div class="add">+</div>
                    </div>
                    <div class="compcontent">Compartiment 6</div>
                </div>
                <div id="compartiment-7" class="compartiment 7" data-id="7">
                    <div class="buttonsday">
                        <div class="remove">-</div>
                        <div class="add">+</div>
                    </div>
                    <div class="compcontent">Compartiment 7</div>
                </div>
            </div>
        </div>

        <div id="cartes">
            <!-- Cette section affichera les cartes -->
        </div>
        <script src="script.js"></script>
    </body>


<?php
}
?>

    </html>