document.addEventListener("DOMContentLoaded", function () {
    //permet de gérer une carte (ajout, suppression, affichage réponse...)
    function managecard(carte) {
        const top = carte.querySelector(".top");

        const questionDiv = carte.querySelector(".question");
        let textQuestion = questionDiv.textContent;

        const reponseDiv = carte.querySelector(".reponse");
        let textReponse = reponseDiv.textContent;

        const userReponseInput = carte.querySelector(".user-reponse");

        const showReponseButtonDiv = carte.querySelector(".show-reponse-div");
        const showReponseButton = carte.querySelector(".show-reponse");

        const reponseButtonsDiv = carte.querySelector(".reponsebuttons-div");
        const reponseCorrecteButton = carte.querySelector(".reponse-correcte");
        const reponseIncorrecteButton = carte.querySelector(".reponse-incorrecte");

        const cacherreponsediv = carte.querySelector(".cacherreponsediv");
        const cacherreponse = carte.querySelector(".cacherreponse");


        const iconsDiv = carte.querySelector(".icons");
        const editquestion = carte.querySelector(".edit");
        const deletequestion = carte.querySelector(".delete");


        showReponseButton.addEventListener("click", function () {
            showReponseButton.style.display = "none";
            reponseDiv.style.display = "block";
            cacherreponsediv.style.display = "block";
            reponseButtonsDiv.style.display = "block";

            cacherreponse.addEventListener("click", function () {
                reponseDiv.style.display = "none";
                reponseButtonsDiv.style.display = "none";

                showReponseButton.style.display = "block";

                cacherreponsediv.style.display = "none";

                userReponseInput.value = "";
            });

            reponseCorrecteButton.addEventListener("click", function () {
                const questionId = carte.getAttribute("data-question-id");

                $.ajax({
                    type: "POST",
                    url: "move_to_next_compartment.php",
                    data: { question_id: questionId },
                    success: function (response) {
                        if (response.success) {
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

        editquestion.addEventListener("click", function () {
            const dataId = carte.getAttribute('data-question-id');
            top.remove();
            reponseDiv.remove();
            userReponseInput.remove();
            showReponseButtonDiv.remove();
            reponseButtonsDiv.remove();
            const htmlInput = `<div>
                                    <div><input type="text" class="modify-question" value="${textQuestion}"></div>
                                    <div><input type="text" class="modify-reponse" value="${textReponse}"></div>
                                    <div><button class="modify">Modifier</button><button class="annuler">Annuler</button></div>
                                </div>`;
            carte.innerHTML = htmlInput;
            const modifier = carte.querySelector(".modify");
            const annuler = carte.querySelector(".annuler");
            const modifyQuestionDom = carte.querySelector(".modify-question");
            const modifyReponseDom = carte.querySelector(".modify-reponse");

            modifier.addEventListener("click", function () {
                const modifyQuestion = modifyQuestionDom.value;
                const modifyReponse = modifyReponseDom.value;
                modifyQuestionDom.remove();
                modifyReponseDom.remove();
                modifier.remove();
                annuler.remove();

                $.ajax({
                    type: "POST", // Utilisez POST pour ajouter des données à la base de données
                    url: "manage_questions.php", // Le fichier PHP qui traitera la requête
                    data: {
                        key1: dataId,
                        key2: 1,
                        key3: modifyQuestion,
                        key4: modifyReponse
                    },
                    success: function (response) {
                        textQuestion = modifyQuestion;
                        textReponse = modifyReponse;


                        carte.appendChild(top);
                        carte.appendChild(reponseDiv);
                        carte.appendChild(userReponseInput);
                        carte.appendChild(showReponseButtonDiv);
                        carte.appendChild(reponseButtonsDiv);
                        carte.appendChild(cacherreponsediv);
                        showReponseButton.style.display = "block";
                        reponseDiv.style.display = "none";

                        questionDiv.textContent = modifyQuestion;
                        reponseDiv.textContent = modifyReponse;

                        userReponseInput.value = "";
                        reponseButtonsDiv.style.display = "none";
                        cacherreponsediv.style.display = "none";
                    },
                    error: function (xhr, status, error) {
                        // Gérez les erreurs ici, par exemple, afficher un message d'erreur à l'utilisateur
                    }
                });
            });

            annuler.addEventListener("click", function () {
                modifyQuestionDom.remove();
                modifyReponseDom.remove();
                modifier.remove();
                annuler.remove();
                carte.appendChild(top);
                carte.appendChild(reponseDiv);
                carte.appendChild(userReponseInput);
                carte.appendChild(showReponseButtonDiv);
                carte.appendChild(reponseButtonsDiv);
                carte.appendChild(cacherreponsediv);
                cacherreponsediv.style.display = "none";
                reponseDiv.style.display = "none";
                showReponseButton.style.display = "block";
                userReponseInput.value = "";
                reponseButtonsDiv.style.display = "none";
            });
        });

        deletequestion.addEventListener("click", function () {
            const carte = this.closest('.carte');
            const dataId = carte.getAttribute('data-question-id');

            $.ajax({
                type: "POST", // Utilisez POST pour ajouter des données à la base de données
                url: "manage_questions.php", // Le fichier PHP qui traitera la requête
                data: {
                    key1: dataId,
                    key2: -1
                },
                success: function (response) {
                    carte.remove();
                },
                error: function (xhr, status, error) {
                    // Gérez les erreurs ici, par exemple, afficher un message d'erreur à l'utilisateur
                }
            });
        });
    }

    function toggleresponses(value) {
        const cartesparent = document.getElementById("cartes");
        const cartes = document.querySelectorAll(".carte");

        var count = cartesparent.childElementCount;
        if (count > 0) {
            cartes.forEach(function (carte) {
                const reponseDiv = carte.querySelector(".reponse");
                let textReponse = reponseDiv.textContent;
                if (value == 1) {
                    reponseDiv.style.display = "block";
                }
                else if (value == 0) {
                    const reponsebuttons = carte.querySelector(".reponsebuttons-div");
                    const cacherreponsediv = carte.querySelector(".cacherreponsediv");
                    const showreponse = carte.querySelector(".show-reponse");
                    showreponse.style.display = "block";
                    cacherreponsediv.style.display = "none";
                    reponsebuttons.style.display = "none";
                    reponseDiv.style.display = "none";
                }
            });
        }
    }

    const toggleresponsesdiv = document.getElementById("toggleresponsesdiv");
    toggleresponsesdiv.addEventListener("click", function (event) {
        if (toggleresponsesdiv.classList.contains('hide')) {
            toggleresponsesdiv.classList = "";
            toggleresponsesdiv.classList.add('show');
            toggleresponses(1);
        }
        else if (toggleresponsesdiv.classList.contains('show')) {
            toggleresponsesdiv.classList = "";
            toggleresponsesdiv.classList.add('hide');
            toggleresponses(0);
        }
    });

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
                        if (joursRestants === -1) {
                            infoDiv.innerHTML = `Ouverture dépassée de ${-joursRestants} jour`;
                        }
                        else {
                            infoDiv.innerHTML = `Ouverture dépassée de ${-joursRestants} jours`;
                        }
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

    $.ajax({
        type: "GET",
        url: "get_folders.php",
        success: function (response) {
            if (response.success) {
                const dossiersDiv = document.getElementById("dossiers");
                const folderList = document.getElementById("folder-select");

                // Récupérez les données des compartiments depuis la réponse
                const dossiers = response.dossiers;

                // Parcourez les compartiments et affichez les informations sous chaque compartiment
                dossiers.forEach(function (dossier) {
                    const nomDossier = dossier.name;

                    const option = document.createElement("option");

                    // Set the value and text content of the <option> element
                    option.value = dossier.id; // Assuming 'id' is the property containing the value
                    option.textContent = dossier.name; // Assuming 'name' is the property containing the display text
                    
                    // Append the <option> element to the <select> element
                    folderList.appendChild(option);


                    // Create the main div with class "dossier closed"
                    var dossierDiv = document.createElement("div");
                    dossierDiv.className = "folder closed";
                    // Add data-folder-id attribute to the main div
                    dossierDiv.setAttribute("data-folder-id", dossier.id);

                    // Create the top div with class "top"
                    var topDiv = document.createElement("div");
                    topDiv.className = "top";

                    // Create the question div with class "question"
                    var displayName = document.createElement("div");
                    displayName.className = "displayname";
                    displayName.textContent = nomDossier;


                    // Create the icons div with class "icons"
                    var iconsDiv = document.createElement("div");
                    iconsDiv.className = "icons";

                    // Create the edit icon
                    var editIcon = document.createElement("i");
                    editIcon.className = "fa-solid fa-pen-to-square fa-2x edit";

                    // Create the delete icon
                    var deleteIcon = document.createElement("i");
                    deleteIcon.className = "fa-solid fa-trash fa-2x delete";
                    deleteIcon.style.marginLeft = "11px";

                    // Append elements to build the structure
                    iconsDiv.appendChild(editIcon);
                    iconsDiv.appendChild(deleteIcon);
                    topDiv.appendChild(displayName);
                    topDiv.appendChild(iconsDiv);
                    dossierDiv.appendChild(topDiv);

                    // Append the main div to the container
                    dossiersDiv.appendChild(dossierDiv);
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
        const selectedOption = document.getElementById("folder-select").value;

        // Créez un objet contenant les données à envoyer au serveur
        const formData = {
            question: question,
            reponse: reponse,
            selectedOption: selectedOption
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

                const element = document.getElementById("compartiment-1");
                const cartesDiv = document.getElementById("cartes");
                if (element.classList.contains("open")) {
                    const newDiv = document.createElement("div");
                    newDiv.setAttribute("class", "carte");
                    newDiv.setAttribute("data-question-id", response.id);
                    newDiv.innerHTML = `<div class="top">
                                            <div class="question">${questionInput.value}</div>
                                            <div class="icons">
                                                <i class="fa-solid fa-pen-to-square fa-2x edit"></i>
                                                <i class="fa-solid fa-trash fa-2x delete" style="margin-left: 11px;"></i>
                                            </div>
                                        </div>
                                        <div class="reponse">${reponseInput.value}</div>
                                        <input type="text" class="user-reponse" placeholder="Saisir la réponse">
                                        <div class="show-reponse-div">
                                            <button class="show-reponse">Valider la réponse</button>
                                        </div>
                                        <div class="reponsebuttons-div">
                                            <button class="reponse-correcte">Réponse correcte</button>
                                            <button class="reponse-incorrecte">Réponse incorrecte</button>
                                        </div>
                                        <div class="cacherreponsediv">
                                            <button class="cacherreponse">Réinitialiser</button>
                                        </div>`;
                    // Insert the new div as the first child of the parent element
                    cartesDiv.insertBefore(newDiv, cartesDiv.firstChild);
                    managecard(newDiv);
                }
                questionInput.value = "";
                reponseInput.value = "";
            },
            error: function (xhr, status, error) {
                // Gérez les erreurs ici, par exemple, afficher un message d'erreur à l'utilisateur
            }
        });
    });

    const folderForm = document.getElementById("folder-form");
    folderForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const folderInput = document.getElementById("folder");
        const folder = folderInput.value;
        // Créez un objet contenant les données à envoyer au serveur
        const formData = {
            folder: folder
        };

        $.ajax({
            type: "POST", // Utilisez POST pour ajouter des données à la base de données
            url: "add_folder.php", // Le fichier PHP qui traitera la requête
            data: formData,
            success: function (response) {
                console.log("success");
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
        compartiment.addEventListener("click", function (event) {
            if (event.target.classList.contains('remove') || event.target.classList.contains('add')) {
                const parent = this.closest('.compartiment');
                let value;
                if (event.target.classList.contains('remove')) {
                    value = -1;
                }
                else {
                    value = 1;
                }
                if (parent) {
                    const dataId = parent.getAttribute('data-id');
                    $.ajax({
                        type: "POST", // Utilisez POST pour ajouter des données à la base de données
                        url: "change_date.php", // Le fichier PHP qui traitera la requête
                        data: {
                            key1: dataId,
                            key2: value
                        },
                        success: function (response) {
                            const lastChild = parent.lastChild;
                            parent.className = '';
                            parent.removeChild(lastChild);
                            parent.classList.add('compartiment', dataId);
                            const dateOuverture = response.newdate;

                            // Calcul de la prochaine date d'ouverture
                            const aujourdhui = new Date();
                            const prochaineOuverture = new Date(dateOuverture);
                            const joursRestants = Math.ceil((prochaineOuverture - aujourdhui) / (1000 * 60 * 60 * 24));

                            const infoDiv = document.createElement("div");

                            // Ajoutez une classe CSS au compartiment en fonction de la comparaison de la date actuelle avec la date d'ouverture
                            if (joursRestants === 0) {
                                parent.classList.add("ouverture-aujourd-hui");
                                infoDiv.innerHTML = `Ouverture aujourd'hui !`;
                            } else if (joursRestants < 0) {
                                parent.classList.add("ouverture-passee");
                                if (joursRestants === -1) {
                                    infoDiv.innerHTML = `Ouverture dépassée de ${-joursRestants} jour`;
                                }
                                else {
                                    infoDiv.innerHTML = `Ouverture dépassée de ${-joursRestants} jours`;
                                }
                            }
                            else if (joursRestants === 1) {
                                infoDiv.innerHTML = `Prochaine ouverture demain`;
                            }
                            else {
                                infoDiv.innerHTML = `Prochaine ouverture dans ${joursRestants} jours`;
                            }
                            parent.appendChild(infoDiv);
                        },
                        error: function (xhr, status, error) {
                            // Gérez les erreurs ici, par exemple, afficher un message d'erreur à l'utilisateur
                        }
                    });
                }

            }
            else {
                compartiment.classList.add('open');
                const compartimentId = compartiment.getAttribute("data-id");

                // Faites une requête AJAX pour récupérer les questions de ce compartiment depuis la base de données
                $.ajax({
                    type: "GET",
                    url: "get_questions.php?compartiment=" + compartimentId,
                    success: function (questionsData) {
                        // Une fois les données récupérées, créez des cartes pour chaque question
                        const cartesHTML = questionsData.map(function (question) {
                            return `<div class="carte" data-question-id="${question.id}">
                                        <div class="top">
                                            <div class="question">${question.question}</div>
                                            <div class="icons">
                                                <i class="fa-solid fa-pen-to-square fa-2x edit"></i>
                                                <i class="fa-solid fa-trash fa-2x delete" style="margin-left: 11px;"></i>
                                            </div>
                                        </div>
                                        <div class="reponse">${question.reponse}</div>
                                        <input type="text" class="user-reponse" placeholder="Saisir la réponse">
                                        <div class="show-reponse-div">
                                            <button class="show-reponse">Valider la réponse</button>
                                        </div>
                                        <div class="reponsebuttons-div">
                                            <button class="reponse-correcte">Réponse correcte</button>
                                            <button class="reponse-incorrecte">Réponse incorrecte</button>
                                        </div>
                                        <div class="cacherreponsediv">
                                            <button class="cacherreponse">Réinitialiser</button>
                                        </div>
                                    </div>`;
                        });

                        cartesDiv.innerHTML = cartesHTML.join("");

                        // Gérez la logique pour Valider la réponse et mettre à jour le compartiment
                        const cartes = document.querySelectorAll(".carte");
                        cartes.forEach(function (carte) {
                            managecard(carte);
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
                        if (response.newdate) {
                            const lastChild = compartiment.lastChild;
                            compartiment.className = '';
                            compartiment.removeChild(lastChild);
                            console.log(compartimentId);
                            compartiment.classList.add('compartiment', compartimentId);
                            const dateOuverture = response.newdate;

                            // Calcul de la prochaine date d'ouverture
                            const aujourdhui = new Date();
                            const prochaineOuverture = new Date(dateOuverture);
                            const joursRestants = Math.ceil((prochaineOuverture - aujourdhui) / (1000 * 60 * 60 * 24));

                            const infoDiv = document.createElement("div");

                            // Ajoutez une classe CSS au compartiment en fonction de la comparaison de la date actuelle avec la date d'ouverture
                            if (joursRestants === 0) {
                                compartiment.classList.add("ouverture-aujourd-hui");
                                infoDiv.innerHTML = `Ouverture aujourd'hui !`;
                            } else if (joursRestants < 0) {
                                compartiment.classList.add("ouverture-passee");
                                if (joursRestants === -1) {
                                    infoDiv.innerHTML = `Ouverture dépassée de ${-joursRestants} jour`;
                                }
                                else {
                                    infoDiv.innerHTML = `Ouverture dépassée de ${-joursRestants} jours`;
                                }
                            }
                            else if (joursRestants === 1) {
                                infoDiv.innerHTML = `Prochaine ouverture demain`;
                            }
                            else {
                                infoDiv.innerHTML = `Prochaine ouverture dans ${joursRestants} jours`;
                            }
                            compartiment.appendChild(infoDiv);
                        }
                    },
                    error: function (xhr, status, error) {
                        // Gérez les erreurs ici, par exemple, afficher un message d'erreur à l'utilisateur
                    }
                });
            }
        });
    });
});