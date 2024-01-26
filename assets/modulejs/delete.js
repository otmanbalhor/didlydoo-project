document.addEventListener('DOMContentLoaded', async function () {
    await getInfos(); // Charger initialement les boutons de suppression
});

const main = document.querySelector('.container');

main.addEventListener('click', async (event) => {
    const deleteBtn = event.target.closest('button[data-event-id]');
    
    if (deleteBtn) {
        const eventId = deleteBtn.getAttribute('data-event-id');
        const confirmation = confirm('Are you sure you want to delete this event?');

        if (confirmation) {
            await deleteEvent(eventId);
            deleteBtn.remove();
            
            // Actualise la page
            location.reload();
        }
    }
});


async function getInfos() {
    try {
        const res = await fetch('http://localhost:3000/api/events');

        if (!res.ok) {
            throw new Error(`Network response was not OK : ${res.status}`);
        }

        const datas = await res.json();

        datas.forEach(data => {
            // Génère du code HTML pour chaque bouton de suppression
            const deleteBtnHTML = `<button data-event-id="${data.id}" class="delete-btn">Delete</button>`;
            // Insère le bouton à côté de l'événement correspondant
            main.insertAdjacentHTML('beforeend', `${data.author} ${data.name} ${deleteBtnHTML}`);
        });
    } catch (error) {
        console.error(error);
    }
}

// Fonction pour supprimer un événement en utilisant son ID
async function deleteEvent(eventId) {
    try {
        // Effectue une requête HTTP DELETE pour supprimer l'événement avec l'ID spécifié
        const res = await fetch(`http://localhost:3000/api/events/${eventId}`, {
            method: 'DELETE',
            headers: {
                'content-Type': 'application/json',
            }
        });

        if (!res.ok) {
            throw new Error(`Network response was not OK : ${res.status}`);
        }

        console.log(`The event with the ID ${eventId} has been deleted.`);
    } catch (error) {
        console.error(error);
    }
}
