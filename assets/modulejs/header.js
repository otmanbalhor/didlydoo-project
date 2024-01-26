export async function validateForm() {
    try {
        const name = document.getElementById('inputTitle').value;
        const description = document.getElementById('inputDescription').value;
        const author = document.getElementById('inputAuthor').value;

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

        //
        //METHODE POST
        //
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
        console.error(error);
    }
    function hasDuplicates(array) {

        //
        //SET PERMET DE STOCKER UN ENSEMBLE DE VALEURS DE N'iMPORTE QUEL TYPE
        //
        //PERMET DE NE PAS AVOIR DE DOUBLONS DANS UN TABLEAU
        return new Set(array).size !== array.length;
    }
}

export function resetForm() {
    document.getElementById('inputTitle').value = '';
    document.getElementById('inputDescription').value = '';
    document.getElementById('inputAuthor').value = '';

    //
    //SUPPRIME TOUS LES CHAMPS DE DATE EXISTANTS ET REMET A 1 CHAMP DE DATE
    // 
    const dateContainer = document.getElementById('dates');
    const dateInputs = dateContainer.getElementsByClassName('header__div__date');

    console.log(dateInputs);
    while (dateInputs.length > 0) {
        dateInputs[0].parentNode.removeChild(dateInputs[0]);
    }

    // Ajouter un champ de date initial avec la date actuelle
    addDateField();
}

export function addDateField() {
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
    datesContainer.value = formattedDate;

    datesContainer.appendChild(newDateInput);
}

