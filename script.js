document.addEventListener("DOMContentLoaded", function () {

    let folderListArray = [{ id: null, name: "root" }];
    //permet de gérer une carte (ajout, suppression, affichage réponse...)
    function managecard(carte, folder_id) {
        carte.addEventListener('click', function (event) {
            event.stopPropagation();
        });
        carte.addEventListener('mouseover', function (event) {
            event.stopPropagation();
        });
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


        showReponseButton.addEventListener("click", function (event) {
            event.stopPropagation();
            showReponseButton.style.display = "none";
            reponseDiv.style.display = "block";
            cacherreponsediv.style.display = "block";
            reponseButtonsDiv.style.display = "block";

            cacherreponse.addEventListener("click", function (e) {
                e.stopPropagation();
                reponseDiv.style.display = "none";
                reponseButtonsDiv.style.display = "none";
                showReponseButton.style.display = "block";
                cacherreponsediv.style.display = "none";
                userReponseInput.value = "";
            });

            reponseCorrecteButton.addEventListener("click", function (r) {
                r.stopPropagation();
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

            reponseIncorrecteButton.addEventListener("click", function (t) {
                t.stopPropagation();
                const questionId = carte.getAttribute("data-question-id");

                $.ajax({
                    type: "POST",
                    url: "move_to_first_compartment.php",
                    data: { question_id: questionId },
                    success: function (response) {
                        if (response.success) {
                            // Select the '.compartiment' element with 'opened' in its class list
                            const openedCompartiment = document.querySelector('.compartiment.opened');
                            // Check if the element is found
                            if (openedCompartiment) {
                                console.log(openedCompartiment);
                                if (openedCompartiment.id !== "compartiment-1") {
                                    carte.remove();
                                } else {
                                    reponseDiv.style.display = "none";
                                    reponseButtonsDiv.style.display = "none";
                                    showReponseButton.style.display = "block";
                                    cacherreponsediv.style.display = "none";
                                    userReponseInput.value = "";
                                }
                            }
                        } else {
                            // Gérez l'erreur de la requête ici
                        }
                    },
                    error: function (xhr, status, error) {
                        // Gérez les erreurs ici
                    }
                });
            });
        });

        editquestion.addEventListener("click", function (event) {
            event.stopPropagation();
            const dataId = carte.getAttribute('data-question-id');
            const folderId = carte.getAttribute('data-folder-id');

            const cartesDiv = document.getElementById("cartes");
            let folderDiv;
            top.remove();
            reponseDiv.remove();
            userReponseInput.remove();
            showReponseButtonDiv.remove();
            reponseButtonsDiv.remove();
            const htmlInput = `<div>
                                    <div><input type="text" class="modify-question" value="${textQuestion}"></div>
                                    <div><input type="text" class="modify-reponse" value="${textReponse}"></div>
                                    <select name="folderlist" class="folder-modify-select">
                                       
                                    </select>
                                    <div><button class="modify">Modifier</button><button class="annuler">Annuler</button></div>
                                </div>`;
            carte.innerHTML = htmlInput;
            const modifyQuestionDom = carte.querySelector(".modify-question");
            const modifyReponseDom = carte.querySelector(".modify-reponse");
            const modifier = carte.querySelector(".modify");
            const annuler = carte.querySelector(".annuler");

            const folderList = carte.querySelector(".folder-modify-select");
            console.log(folderListArray);
            folderListArray.forEach(function (folder) {
                const option = document.createElement("option");

                // Set the value and text content of the <option> element
                option.value = folder.id; // Assuming 'id' is the property containing the value
                option.textContent = folder.name; // Assuming 'name' is the property containing the display text

                // Append the <option> element to the <select> element
                if (folderId == folder.id) {
                    folderList.insertBefore(option, folderList.firstChild);
                    option.selected = true;
                }
                else {
                    folderList.appendChild(option);
                }
            });

            folderList.addEventListener("click", function (event) {
                event.stopPropagation();
            });

            modifier.addEventListener("click", function (event) {
                event.stopPropagation();
                const modifyQuestion = modifyQuestionDom.value;
                const modifyReponse = modifyReponseDom.value;
                const modifyFolder = folderList.value;
                modifyQuestionDom.remove();
                modifyReponseDom.remove();
                folderList.remove();
                modifier.remove();
                annuler.remove();

                $.ajax({
                    type: "POST", // Utilisez POST pour ajouter des données à la base de données
                    url: "manage_questions.php", // Le fichier PHP qui traitera la requête
                    data: {
                        key1: dataId,
                        key2: 1,
                        key3: modifyQuestion,
                        key4: modifyReponse,
                        key5: modifyFolder
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
                        if (modifyFolder != folder_id) {
                            carte.remove();
                            carte.setAttribute("data-folder-id", modifyFolder);
                            folder_id = modifyFolder;
                            folderDiv = document.querySelector(`.folder[data-folder-id="${modifyFolder}"]`);
                            if (folderDiv) {
                                if (folderDiv.classList.contains('closed')) {
                                    carte.style.display = "none";
                                }
                                folderDiv.appendChild(carte);
                            } else {
                                cartesDiv.appendChild(carte);
                            }
                        }
                    },
                    error: function (xhr, status, error) {
                        // Gérez les erreurs ici, par exemple, afficher un message d'erreur à l'utilisateur
                    }
                });
            });

            annuler.addEventListener("click", function (event) {
                event.stopPropagation();
                modifyQuestionDom.remove();
                modifyReponseDom.remove();
                folderList.remove();
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

        deletequestion.addEventListener("click", function (event) {
            event.stopPropagation();
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

    function getFolderslist() {
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: "GET",
                url: "get_folders.php",
                success: function (response) {
                    if (response.success) {
                        // Récupérez les données des compartiments depuis la réponse
                        //const dossiers = ;
                        resolve(response.dossiers);
                    } else {
                        reject("Erreur de la requête");
                    }
                },
                error: function (xhr, status, error) {
                    reject("Erreur de la requête");
                }
            });
        });
    }

    //permet de gérer un dossier (édition, suppression)
    function managefolder(folder) {
        const topFolder = folder.querySelector(".topFolder");
        const dataId = folder.getAttribute('data-folder-id');

        const titleDiv = folder.querySelector(".displayname");
        let textTitle = titleDiv.textContent;

        const iconDiv = folder.querySelector(".iconsfolder");
        const editfolder = folder.querySelector(".edit");
        const deletefolder = folder.querySelector(".delete");

        editfolder.addEventListener("click", function (event) {
            event.stopPropagation();
            titleDiv.remove();
            iconDiv.remove();
            const htmlInput = `
                                    <div><input type="text" class="modify-title" value="${textTitle}"></div>
                                    <div><button class="modify">Modifier</button><button class="annuler">Annuler</button></div>
                                `;
            topFolder.innerHTML = htmlInput;
            const modifier = topFolder.querySelector(".modify");
            const annuler = topFolder.querySelector(".annuler");
            const modifyTitleDom = topFolder.querySelector(".modify-title");
            modifyTitleDom.addEventListener("click", function (event) {
                event.stopPropagation();
            });
            annuler.addEventListener("click", function (event) {
                event.stopPropagation();
                modifyTitleDom.remove();
                modifier.remove();
                annuler.remove();
                topFolder.appendChild(titleDiv);
                topFolder.appendChild(iconDiv);
            });
            modifier.addEventListener("click", function (event) {
                event.stopPropagation();
                const modifyTitle = modifyTitleDom.value;
                modifyTitleDom.remove();
                modifier.remove();
                annuler.remove();
                $.ajax({
                    type: "POST", // Utilisez POST pour ajouter des données à la base de données
                    url: "manage_folders.php", // Le fichier PHP qui traitera la requête
                    data: {
                        key1: dataId,
                        key2: 1,
                        key3: modifyTitle
                    },
                    success: function (response) {
                        topFolder.appendChild(titleDiv);
                        topFolder.appendChild(iconDiv);

                        titleDiv.textContent = modifyTitle;
                    },
                    error: function (xhr, status, error) {
                        // Gérez les erreurs ici, par exemple, afficher un message d'erreur à l'utilisateur
                    }
                });
            });
        });

        deletefolder.addEventListener("click", function (event) {
            const ajaxPromise = new Promise(function (resolve, reject) {
                $.ajax({
                    type: "POST", // Utilisez POST pour ajouter des données à la base de données
                    url: "manage_folders.php", // Le fichier PHP qui traitera la requête
                    data: {
                        key1: dataId,
                        key2: -1
                    },
                    success: function (response) {
                        const newArray = folderListArray.filter((item) => item.id != dataId);
                        // Replace dataArray with newArray
                        folderListArray.length = 0; // Clear existing data in dataArray
                        folderListArray.push(...newArray); // Push all elements from newArray to dataArray

                        const folderListAdd = document.getElementById("folder-select");
                        for (let i = 0; i < folderListAdd.options.length; i++) {
                            if (folderListAdd.options[i].value == dataId) {
                                folderListAdd.remove(i);
                                break; // Exit the loop after removing the option
                            }
                        }
                        const folderDiv = document.querySelector(`.folder[data-folder-id="${dataId}"]`);
                        const cartesDiv = document.getElementById("cartes");

                        let cartes = folderDiv.querySelectorAll(`.carte`);
                        cartes.forEach(function (carte) {
                            carte.remove();
                            carte.style.display = "block";
                            cartesDiv.appendChild(carte);
                        });
                        folder.remove();
                        resolve(response);
                    },
                    error: function (xhr, status, error) {
                        reject(error);
                    }
                });
            });
            // Use the Promise returned by $.ajax
            ajaxPromise
                .then(function (response) {
                    const cartesDiv = document.getElementById("cartes");

                    // Select all elements with class '.carte' and the specified 'data-folder-id'
                    const carteElements = cartesDiv.querySelectorAll(`.carte[data-folder-id="${dataId}"]`);
                    const cartes = cartesDiv.querySelectorAll(`.carte`);
                    // Create an array to store data
                    const cartesArray = [];

                    carteElements.forEach(function (carte) {
                        carte.setAttribute('data-folder-id', 'null'); // Replace 'newFolderId' with the new value
                        const carteId = carte.getAttribute('data-question-id');
                        const question = carte.querySelector(".question").textContent;
                        const reponse = carte.querySelector(".reponse").textContent;

                        // Push data to the array
                        cartesArray.push({
                            id: carteId,
                            question: question,
                            reponse: reponse
                        });
                    });

                    // Convert the array to JSON
                    const jsonData = JSON.stringify(cartesArray);
                    // Use jQuery AJAX to send data to manage_questions.php
                    $.ajax({
                        url: 'manage_questions_bug.php',
                        type: 'POST',
                        contentType: 'application/json; charset=utf-8',
                        dataType: 'json',
                        data: jsonData,
                        success: function (response) {
                            // Handle the response from the server if needed
                            console.log(response);
                        },
                        error: function (error) {
                            // Handle errors if any
                            console.error(error);
                        }
                    });
                })
                .catch(function (error) {
                    console.error("AJAX request failed:", error);
                });
        });
    }

    // Remove all ".carte" elements under every ".folder" element
    function clearContent() {
        const folderElements = document.querySelectorAll('.folder');

        folderElements.forEach(folder => {
            folder.classList.replace('opened', 'closed');
            const carteElements = folder.querySelectorAll('.carte');
            carteElements.forEach(carte => {
                carte.remove();
            });
        });

        // Remove all children of "#cartes" element
        const cartesDiv = document.getElementById('cartes');
        while (cartesDiv.firstChild) {
            cartesDiv.firstChild.remove();
        }
    }

    //permet d'afficher ou de cacher les réponses
    function toggleresponses(value) {
        const cartes = document.querySelectorAll(".carte");

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

    //récupère les compartiments et leur date
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

    //affiche les dossiers
    function displayFolders(dossiers) {
        const dossiersDiv = document.getElementById("dossiers");
        const folderList = document.getElementById("folder-select");
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
            topDiv.className = "topfolder";

            // Create the question div with class "question"
            var displayName = document.createElement("div");
            displayName.className = "displayname";
            displayName.textContent = nomDossier;


            // Create the icons div with class "icons"
            var iconsDiv = document.createElement("div");
            iconsDiv.className = "iconsfolder";

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

            editIcon.addEventListener('mouseover', function (event) {
                event.stopPropagation();
            });


            deleteIcon.addEventListener('mouseover', function (event) {
                event.stopPropagation();
            });

            dossierDiv.addEventListener('mouseover', function () {
                dossierDiv.style.backgroundColor = '#fdd766';
                dossierDiv.style.cursor = 'pointer';
            });
            dossierDiv.addEventListener('mouseout', function () {
                dossierDiv.style.backgroundColor = '#ffc928';
            });

            dossierDiv.addEventListener("click", function (event) {
                var folderChild = dossierDiv.querySelectorAll('.carte');
                if (dossierDiv.classList.contains('closed')) {
                    // If it does, replace "closed" with "opened"
                    dossierDiv.classList.replace('closed', 'opened');
                    folderChild.forEach(function (child) {
                        child.style.display = 'block';
                    });
                } else {
                    // If it doesn't, replace "opened" with "closed"
                    dossierDiv.classList.replace('opened', 'closed');
                    folderChild.forEach(function (child) {
                        child.style.display = 'none';
                    });
                }
            });

            managefolder(dossierDiv);
        });
    }

    // récupère les dossiers
    getFolderslist()
        .then(function (dossiers) {
            // Traitement des dossiers récupérés
            displayFolders(dossiers);
            let newArray = folderListArray.concat(dossiers);
            folderListArray = newArray;
        })
        .catch(function (error) {
            // Gestion des erreurs
            console.error(error);
        });

    //formulaire d'ajout de question
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
                if (element.classList.contains("opened")) {
                    console.log("ok opened");
                    const newDiv = document.createElement("div");
                    newDiv.setAttribute("class", "carte");
                    newDiv.setAttribute("data-question-id", response.id);
                    newDiv.setAttribute("data-folder-id", selectedOption);
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
                                            <button class="show-reponse">Afficher la réponse</button>
                                        </div>
                                        <div class="reponsebuttons-div">
                                            <button class="reponse-correcte">Réponse correcte</button>
                                            <button class="reponse-incorrecte">Réponse incorrecte</button>
                                        </div>
                                        <div class="cacherreponsediv">
                                            <button class="cacherreponse">Cacher la réponse</button>
                                        </div>`;
                    // Insert the new div as the first child of the parent element

                    const folderDiv = document.querySelector(`.folder[data-folder-id="${selectedOption}"]`);
                    if (folderDiv) {
                        folderDiv.insertBefore(newDiv, folderDiv.children[1]);
                        if (folderDiv.classList.contains('closed')) {
                            newDiv.style.display = 'none';
                        }
                    } else {
                        cartesDiv.insertBefore(newDiv, cartesDiv.firstChild);
                    }
                    managecard(newDiv, selectedOption);
                }
                questionInput.value = "";
                reponseInput.value = "";
            },
            error: function (xhr, status, error) {
                // Gérez les erreurs ici, par exemple, afficher un message d'erreur à l'utilisateur
            }
        });
    });

    //formulaire d'ajout de dossier
    const folderForm = document.getElementById("folder-form");
    folderForm.addEventListener("submit", function (event) {
        //ajouter le dossier au dom
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
                const newFolder = { id: response.id, name: folder };
                const folderArray = [newFolder];
                folderListArray.push(newFolder);
                displayFolders(folderArray);
                folderInput.value = "";
            },
            error: function (xhr, status, error) {
                // Gérez les erreurs ici, par exemple, afficher un message d'erreur à l'utilisateur
            }
        });
    });

    // Affiche les questions lorsqu'un compartiment est cliqué
    const compartiments = document.querySelectorAll(".compartiment");
    const cartesDiv = document.getElementById("cartes");
    const dossiers = document.getElementById("dossiers");
    compartiments.forEach(function (compartiment) {
        compartiment.addEventListener("click", function (event) {
            //si on veut modifier la date d'un compartiment
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
                clearContent();
                dossiers.style.display = "block";
                toggleresponsesdiv.style.display = "block";

                if (compartiment.classList.contains('closed')) {
                    // Select all '.compartiment' elements
                    const compartimentElements = document.querySelectorAll('.compartiment');

                    // Loop through each '.compartiment' element
                    compartimentElements.forEach(function (compartiment) {
                        // Check if 'opened' is in the class list
                        if (compartiment.classList.contains('opened')) {
                            // Replace 'opened' with 'closed'
                            compartiment.classList.remove('opened');
                            compartiment.classList.add('closed');
                        }
                    });
                    compartiment.classList.replace('closed', 'opened');
                } /*else {
                    // If it doesn't, replace "opened" with "closed"
                    compartiment.classList.replace('opened', 'closed');
                }*/
                const compartimentId = compartiment.getAttribute("data-id");

                // Faites une requête AJAX pour récupérer les questions de ce compartiment depuis la base de données
                $.ajax({
                    type: "GET",
                    url: "get_questions.php?compartiment=" + compartimentId,
                    success: function (questionsData) {
                        // Une fois les données récupérées, créez des cartes pour chaque question
                        questionsData.forEach(function (question) {
                            // Create a new card element
                            const newCard = document.createElement('div');
                            newCard.className = 'carte';
                            newCard.setAttribute('data-question-id', question.id);
                            newCard.setAttribute('data-folder-id', question.folder_id);


                            // Create the top div
                            const topDiv = document.createElement('div');
                            topDiv.className = 'top';

                            // Create the question div
                            const questionDiv = document.createElement('div');
                            questionDiv.className = 'question';
                            questionDiv.textContent = question.question;

                            // Create the icons div
                            const iconsDiv = document.createElement('div');
                            iconsDiv.className = 'icons';

                            // Create the edit icon
                            const editIcon = document.createElement('i');
                            editIcon.className = 'fa-solid fa-pen-to-square fa-2x edit';

                            // Create the delete icon
                            const deleteIcon = document.createElement('i');
                            deleteIcon.className = 'fa-solid fa-trash fa-2x delete';
                            deleteIcon.style.marginLeft = '11px';

                            // Append the icons to the icons div
                            iconsDiv.appendChild(editIcon);
                            iconsDiv.appendChild(deleteIcon);

                            // Append the question and icons div to the top div
                            topDiv.appendChild(questionDiv);
                            topDiv.appendChild(iconsDiv);

                            // Create the reponse div
                            const reponseDiv = document.createElement('div');
                            reponseDiv.className = 'reponse';
                            reponseDiv.textContent = question.reponse;

                            // Create the user-reponse input
                            const userReponseInput = document.createElement('input');
                            userReponseInput.type = 'text';
                            userReponseInput.className = 'user-reponse';
                            userReponseInput.placeholder = 'Saisir la réponse';

                            // Create the show-reponse-div div
                            const showReponseDiv = document.createElement('div');
                            showReponseDiv.className = 'show-reponse-div';

                            // Create the show-reponse button
                            const showReponseButton = document.createElement('button');
                            showReponseButton.className = 'show-reponse';
                            showReponseButton.textContent = 'Afficher la réponse';

                            // Append the button to the show-reponse-div
                            showReponseDiv.appendChild(showReponseButton);

                            // Create the reponsebuttons-div div
                            const reponseButtonsDiv = document.createElement('div');
                            reponseButtonsDiv.className = 'reponsebuttons-div';

                            // Create the reponse-correcte button
                            const reponseCorrecteButton = document.createElement('button');
                            reponseCorrecteButton.className = 'reponse-correcte';
                            reponseCorrecteButton.textContent = 'Réponse correcte';

                            // Create the reponse-incorrecte button
                            const reponseIncorrecteButton = document.createElement('button');
                            reponseIncorrecteButton.className = 'reponse-incorrecte';
                            reponseIncorrecteButton.textContent = 'Réponse incorrecte';

                            // Append the buttons to the reponsebuttons-div
                            reponseButtonsDiv.appendChild(reponseCorrecteButton);
                            reponseButtonsDiv.appendChild(reponseIncorrecteButton);

                            // Create the cacherreponsediv div
                            const cacherreponsediv = document.createElement('div');
                            cacherreponsediv.className = 'cacherreponsediv';

                            // Create the cacherreponse button
                            const cacherreponseButton = document.createElement('button');
                            cacherreponseButton.className = 'cacherreponse';
                            cacherreponseButton.textContent = 'Cacher la réponse';

                            // Append the button to the cacherreponsediv
                            cacherreponsediv.appendChild(cacherreponseButton);

                            // Append all the created elements to the newCard
                            newCard.appendChild(topDiv);
                            newCard.appendChild(reponseDiv);
                            newCard.appendChild(userReponseInput);
                            newCard.appendChild(showReponseDiv);
                            newCard.appendChild(reponseButtonsDiv);
                            newCard.appendChild(cacherreponsediv);

                            // Append the newCard to the corresponding folder or cartesDiv
                            const folderDiv = document.querySelector(`.folder[data-folder-id="${question.folder_id}"]`);
                            if (folderDiv) {
                                newCard.addEventListener('mouseover', function (event) {
                                    event.stopPropagation();
                                    folderDiv.style.backgroundColor = '#ffc928';
                                    folderDiv.style.cursor = '';
                                });
                                newCard.addEventListener('click', function (event) {
                                    event.stopPropagation();
                                });
                                newCard.style.display = 'none';
                                folderDiv.appendChild(newCard);
                            } else {
                                cartesDiv.appendChild(newCard);
                            }
                            managecard(newCard, question.folder_id);
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