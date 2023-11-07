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

//afficher les dates d'ouuverture des boites > si date ajd = vert > si date dépassée = rouge
//lors d'ouverture d'une boîte, mettre à jour la date de la prochaine ouverture
include '../includes/layout.php';
?>

<body>
    <link rel="stylesheet" type="text/css" href="style.css">

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
        <div id="compartiments">
            <div id="compartiments">
                <div id="compartiment-1" class="compartiment 1" data-id="1">Compartiment 1</div>
                <div id="compartiment-2" class="compartiment 2" data-id="2">Compartiment 2</div>
                <div id="compartiment-3" class="compartiment 3" data-id="3">Compartiment 3</div>
                <div id="compartiment-4" class="compartiment 4" data-id="4">Compartiment 4</div>
                <div id="compartiment-5" class="compartiment 5" data-id="5">Compartiment 5</div>
                <div id="compartiment-6" class="compartiment 6" data-id="6">Compartiment 6</div>
                <div id="compartiment-7" class="compartiment 7" data-id="7">Compartiment 7</div>
            </div>
        </div>
        <div id="cartes">
            <!-- Cette section affichera les cartes -->
        </div>
        <script src="script.js"></script>
    </body>

    </html>