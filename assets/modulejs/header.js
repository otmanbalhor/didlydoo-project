document.addEventListener('DOMContentLoaded', function () {
    const submitBtn = document.getElementById('submitBtn');
    const addDateBtn = document.getElementById('addDateBtn');

    submitBtn.addEventListener('click', function (event) {
        event.preventDefault();
        validateForm()
            .then(function (data) {
                console.log("Data successfully sent to API :", data);
                updateUI(data);
                resetForm();
                location.reload();
            })
            .catch(function (error) {
                console.error("error :", error);
            });
    });
    ;

    addDateBtn.addEventListener('click', function () {
        addDateField();
    });
});

async function validateForm() {
    try {
        const name = document.getElementById('inputTitle').value;
        const description = document.getElementById('inputDescription').value;
        const author = document.getElementById('inputAuthor').value;

        // Vérifier si la longueur de l'entrée dépasse 256 caractères
        if (name.length > 256 || description.length > 256 || author.length > 256) {
            alert("error : The length of the entry must not exceed 256 characters.");
            return;
        }

        // Récupérer les valeurs des champs de date
        const dateInputs = document.querySelectorAll('.header__div__date');
        const dates = Array.from(dateInputs).map(input => input.value);
        // Vérifier si des dates identiques existent
        if (hasDuplicates(dates)) {
            alert("error : Identical dates have been selected.");
            return; 
        }
        const formData = {
            name: name,
            description: description,
            author: author,
            dates: dates
        };

        console.log("Form data:", formData);

        const response = await fetch("http://localhost:3000/api/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const responseBody = await response.text();
            throw new Error(`Error sending data to API. Statut : ${response.status}. Réponse : ${responseBody}`);
        }
    } catch (error) {
        throw error;
    }
    function hasDuplicates(array) {
        return new Set(array).size !== array.length;
    }
}

function resetForm() {
    document.getElementById('inputTitle').value = '';
    document.getElementById('inputDescription').value = '';
    document.getElementById('inputAuthor').value = '';

    // Supprimer tous les champs de date existants
    const dateContainer = document.getElementById('dates');
    const dateInputs = dateContainer.getElementsByClassName('header__div__date');

    while (dateInputs.length > 0) {
        dateInputs[0].parentNode.removeChild(dateInputs[0]);
    }

    // Ajouter un champ de date initial avec la date actuelle
    addDateField();
}

function updateUI(eventData) {
    // Créer un ensemble pour stocker les dates uniques
    const uniqueDatesSet = new Set(eventData.dates);

    let row = `<table><tr><th>Author</th><th>Title</th><th>Description</th><th>Dates</th></tr>`;
    row += `<tr><td>${eventData.author}</td><td>${eventData.name}</td><td>${eventData.description}</td><td>${[...uniqueDatesSet].join(', ')}</td></tr>`;

    row += `</table>`;

    document.getElementById('app').innerHTML = row;
}

function addDateField() {
    // Créer un nouveau champ de date
    const newDateInput = document.createElement('input');
    newDateInput.type = 'date';
    newDateInput.name = 'date';
    newDateInput.classList.add('header__div__date');

    // Définir la valeur par défaut sur la date actuelle
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 10); // Format YYYY-MM-DD
    newDateInput.value = formattedDate;

    // Ajouter le nouveau champ de date à la fin du conteneur des dates
    const datesContainer = document.getElementById('dates');
    datesContainer.appendChild(newDateInput);
}

