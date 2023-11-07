document.addEventListener("DOMContentLoaded", function () {
    $.ajax({
        type: "GET",
        url: "get_compartiments.php",
        success: function (response) {
            if (response.success) {
                // Récupérez les données des compartiments depuis la réponse
                const compartiments = response.compartiments;

                // Parcourez les compartiments et affichez les informations sous chaque compartiment
                compartiments.forEach(function (compartiment) {
                    const numero = compartiment.numero;
                    const dateOuverture = compartiment.date_ouverture;

                    // Calcul de la prochaine date d'ouverture
                    const aujourdhui = new Date();
                    const prochaineOuverture = new Date(dateOuverture);
                    const joursRestants = Math.ceil((prochaineOuverture - aujourdhui) / (1000 * 60 * 60 * 24));

                    // Affichage de l'information sous le compartiment
                    const compartimentDiv = document.getElementById("compartiment-" + numero);
                    const infoDiv = document.createElement("div");



                    // Ajoutez une classe CSS au compartiment en fonction de la comparaison de la date actuelle avec la date d'ouverture
                    if (joursRestants === 0) {
                        compartimentDiv.classList.add("ouverture-aujourd-hui");
                        infoDiv.innerHTML = `Ouverture aujourd'hui !`;
                    } else if (joursRestants < 0) {
                        compartimentDiv.classList.add("ouverture-passee");
                        infoDiv.innerHTML = `Ouverture dépassée de ${-joursRestants} jours`;
                    }
                    else if (joursRestants === 1) {
                        infoDiv.innerHTML = `Prochaine ouverture demain`;
                    }
                    else {
                        infoDiv.innerHTML = `Prochaine ouverture dans ${joursRestants} jours`;
                    }

                    compartimentDiv.appendChild(infoDiv);
                });
            } else {
                // Gérez l'erreur de la requête ici
            }
        },
        error: function (xhr, status, error) {
            // Gérez les erreurs ici
        }
    });


    // Gérez le formulaire d'ajout de question
    const questionForm = document.getElementById("question-form");
    questionForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const questionInput = document.getElementById("question");
        const reponseInput = document.getElementById("reponse");
        const question = questionInput.value;
        const reponse = reponseInput.value;

        // Créez un objet contenant les données à envoyer au serveur
        const formData = {
            question: question,
            reponse: reponse
        };

        // Effectuez la requête AJAX pour ajouter la question à la base de données
        $.ajax({
            type: "POST", // Utilisez POST pour ajouter des données à la base de données
            url: "add_question.php", // Le fichier PHP qui traitera la requête
            data: formData,
            success: function (response) {
                // La question a été ajoutée avec succès, vous pouvez gérer la réponse ici
                // Par exemple, afficher un message de confirmation à l'utilisateur

                // Réinitialisez les champs de saisie
                questionInput.value = "";
                reponseInput.value = "";
            },
            error: function (xhr, status, error) {
                // Gérez les erreurs ici, par exemple, afficher un message d'erreur à l'utilisateur
            }
        });
    });

    // Gérez le clic sur un compartiment
    const compartiments = document.querySelectorAll(".compartiment");
    const cartesDiv = document.getElementById("cartes");

    compartiments.forEach(function (compartiment) {
        compartiment.addEventListener("click", function () {
            const compartimentId = compartiment.getAttribute("data-id");

            // Faites une requête AJAX pour récupérer les questions de ce compartiment depuis la base de données
            $.ajax({
                type: "GET",
                url: "get_questions.php?compartiment=" + compartimentId,
                success: function (questionsData) {
                    // Une fois les données récupérées, créez des cartes pour chaque question
                    const cartesHTML = questionsData.map(function (question) {
                        return `<div class="carte" data-question-id="${question.id}">
                                <div class="question">${question.question}</div>
                                <div class="reponse">${question.reponse}</div>
                                <input type="text" class="user-reponse" placeholder="Saisir la réponse">
                                <button class="show-reponse">Afficher la réponse</button>
                                <button class="reponse-correcte">Réponse correcte</button>
                                <button class="reponse-incorrecte">Réponse incorrecte</button>
                            </div>`;
                    });

                    cartesDiv.innerHTML = cartesHTML.join("");

                    // Gérez la logique pour afficher la réponse et mettre à jour le compartiment
                    const cartes = document.querySelectorAll(".carte");
                    cartes.forEach(function (carte) {
                        const showReponseButton = carte.querySelector(".show-reponse");
                        const reponseDiv = carte.querySelector(".reponse");
                        const userReponseInput = carte.querySelector(".user-reponse");
                        const reponseCorrecteButton = carte.querySelector(".reponse-correcte");
                        const reponseIncorrecteButton = carte.querySelector(".reponse-incorrecte");

                        showReponseButton.addEventListener("click", function () {
                            reponseDiv.style.display = "block";
                            reponseCorrecteButton.style.display = "inline-block";
                            reponseIncorrecteButton.style.display = "inline-block";

                            reponseCorrecteButton.addEventListener("click", function () {
                                const questionId = carte.getAttribute("data-question-id");

                                $.ajax({
                                    type: "POST",
                                    url: "move_to_next_compartment.php",
                                    data: { question_id: questionId },
                                    success: function (response) {
                                        if (response.success) {
                                            // La question a été déplacée avec succès
                                            // Vous pouvez effectuer des actions supplémentaires ici
                                            // Par exemple, supprimer la carte actuelle de l'affichage
                                            carte.remove();
                                        } else {
                                            // Gérez l'erreur de la requête ici
                                        }
                                    },
                                    error: function (xhr, status, error) {
                                        // Gérez les erreurs ici
                                    }
                                });

                                // Supprimez la carte actuelle après la mise à jour
                                carte.remove();
                            });

                            reponseIncorrecteButton.addEventListener("click", function () {
                                const questionId = carte.getAttribute("data-question-id");

                                $.ajax({
                                    type: "POST",
                                    url: "move_to_first_compartment.php",
                                    data: { question_id: questionId },
                                    success: function (response) {
                                        if (response.success) {
                                            // La question a été remise dans le premier compartiment avec succès
                                            // Vous pouvez effectuer des actions supplémentaires ici
                                            // Par exemple, supprimer la carte actuelle de l'affichage
                                            carte.remove();
                                        } else {
                                            // Gérez l'erreur de la requête ici
                                        }
                                    },
                                    error: function (xhr, status, error) {
                                        // Gérez les erreurs ici
                                    }
                                });

                                // Supprimez la carte actuelle après la mise à jour
                                carte.remove();
                            });
                        });


                    });
                },
                error: function (xhr, status, error) {
                    // Gérez les erreurs ici
                }
            });

            $.ajax({
                type: "POST",
                url: "update_date.php",
                data: { compartimentId: compartimentId },
                success: function (response) {
                    // Traitez la réponse du serveur, si nécessaire
                },
                error: function (xhr, status, error) {
                    // Gérez les erreurs ici, par exemple, afficher un message d'erreur à l'utilisateur
                }
            });
        });
    });
});