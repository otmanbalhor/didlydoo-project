function NameAndClass(elementName, elementClass) {
    const element = document.createElement(elementName);
    element.classList.add(elementClass);
    return element;
}

// Fonction pour créer et ajouter des boutons
function createEditButtons(eventId) {
    const editAuthorBtn = document.createElement('button');
    editAuthorBtn.textContent = 'Edit Author';
    editAuthorBtn.addEventListener('click', () => editEvent(eventId, 'author'));

    const editDescriptionBtn = document.createElement('button');
    editDescriptionBtn.textContent = 'Edit Description';
    editDescriptionBtn.addEventListener('click', () => editEvent(eventId, 'description'));

    const eventsContainer = document.getElementById('divBtnDlt');
    eventsContainer.append(editAuthorBtn, editDescriptionBtn);
}

// Fonction pour éditer un événement
async function editEvent(eventId, action) {
    try {
        const newValue = prompt(`Enter new ${action}:`);

        if (newValue === null) {
            return;
        }

        const updatedData = {
            [action]: newValue
        };

        const response = await fetch(`http://localhost:3000/api/events/${eventId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });

        if (response.ok) {
            const updatedEventData = await response.json();
            console.log("Data successfully updated:", updatedEventData);
            location.reload();
        } else {
            const errorBody = await response.text();
            console.error(`Error updating data. Status: ${response.status}. Response: ${errorBody}`);
        }
    } catch (error) {
        console.error("An error occurred during the edit:", error);
    }
}

async function displayEdit() {
    try {
        const res = await fetch('http://localhost:3000/api/events');

        if (!res.ok) {
            throw new Error(`Network response was not ok: ${res.status}`);
        }

        const datas = await res.json();

        datas.forEach(data => {
            const eventDiv = NameAndClass('div', 'event');
            eventDiv.innerHTML = `${data.author} ${data.name}`;


            createEditButtons(data.id);

            // Ajoutez au conteneur d'événements
            const eventsContainer = document.getElementById('divBtnDlt');
            eventsContainer.append(eventDiv);
        });
    } catch (error) {
        console.error(error);
    }
}

displayEdit();
