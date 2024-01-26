
export async function dltInfos() {
    try {
        const res = await fetch('http://localhost:3000/api/events');

        if (!res.ok) {
            throw new Error(`Network response was not OK : ${res.status}`);
        }

        const datas = await res.json();

        datas.forEach(data => {
           const deleteBtnHTML = `<button data-event-id="${data.id}" class="delete-btn">Delete</button>`;

            //
            // Insère le bouton à côté de l'événement correspondant
            //
            divBtnDlt.insertAdjacentHTML('beforeend', `${data.author} ${data.name} ${deleteBtnHTML}`);
        });
    } catch (error) {
        console.error(error);
    }
}

// Fonction pour supprimer un événement en utilisant son ID
export async function deleteEvent(eventId) {
    try {
        //
        // Effectue une requête HTTP DELETE pour supprimer l'événement avec l'ID spécifié
        //
        const res = await fetch(`http://localhost:3000/api/events/${eventId}`, {
            method: 'DELETE',
            headers: {
                'content-Type': 'application/json',
            }
        });

        if (!res.ok) {
            throw new Error(`Network response was not OK : ${res.status}`);
        }

        
    } catch (error) {
        console.error(error);
    }
}
