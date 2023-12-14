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
 * problème de délai de connexion
 */

//changer la couleur des questions déjà répondues ce jour
//-------------------------------------
//afficher seulement les dossiers utiles (penser au cas où on modifie l'appartenance de la boîte pour une question)
//* problème lorsque question de la 7eme boite validée
//ajouter ou retirer des boîtes
//changer le délai par défaut d'une boîte

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
                <label for="folder-select">Choisissez un dossier (root = pas de dossier):</label>
                <select name="folderlist" id="folder-select">
                    <option value="null">root</option>
                </select>

                <button type="submit">Ajouter</button>
            </form>
        </div>
        <div id="add-folder">
            <h2>Ajouter un dossier</h2>
            <form id="folder-form">
                <input type="text" id="folder" placeholder="Dossier" required>
                <button type="submit">Ajouter</button>
            </form>
        </div>

        <div id="compartiments">
            <div id="compartiments">
                <div id="compartiment-1" class="compartiment 1 closed" data-id="1">
                    <div class="buttonsday">
                        <div class="remove">-</div>
                        <div class="add">+</div>
                    </div>
                    <div class="compcontent">Compartiment 1</div>
                </div>
                <div id="compartiment-2" class="compartiment 2 closed" data-id="2">
                    <div class="buttonsday">
                        <div class="remove">-</div>
                        <div class="add">+</div>
                    </div>
                    <div class="compcontent">Compartiment 2</div>
                </div>
                <div id="compartiment-3" class="compartiment 3 closed" data-id="3">
                    <div class="buttonsday">
                        <div class="remove">-</div>
                        <div class="add">+</div>
                    </div>
                    <div class="compcontent">Compartiment 3</div>
                </div>
                <div id="compartiment-4" class="compartiment 4 closed" data-id="4">
                    <div class="buttonsday">
                        <div class="remove">-</div>
                        <div class="add">+</div>
                    </div>
                    <div class="compcontent">Compartiment 4</div>
                </div>
                <div id="compartiment-5" class="compartiment 5 closed" data-id="5">
                    <div class="buttonsday">
                        <div class="remove">-</div>
                        <div class="add">+</div>
                    </div>
                    <div class="compcontent">Compartiment 5</div>
                </div>
                <div id="compartiment-6" class="compartiment 6 closed" data-id="6">
                    <div class="buttonsday">
                        <div class="remove">-</div>
                        <div class="add">+</div>
                    </div>
                    <div class="compcontent">Compartiment 6</div>
                </div>
                <div id="compartiment-7" class="compartiment 7 closed" data-id="7">
                    <div class="buttonsday">
                        <div class="remove">-</div>
                        <div class="add">+</div>
                    </div>
                    <div class="compcontent">Compartiment 7</div>
                </div>
            </div>
        </div>

        <div id="toggleresponsesdiv" class="hide"><button class="toggleresponses">Afficher/Cacher toutes les réponses</button></div>

        <div id="dossiers">
            <!-- Cette section affichera les cartes -->
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