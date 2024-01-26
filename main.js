import './main.css'
import { validateForm,resetForm,addDateField } from './assets/modulejs/header';
import { dltInfos, deleteEvent} from './assets/modulejs/delete';
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'


function NameAndClass(ElementName, ElementClass) {

    const element = document.createElement(ElementName);
    element.classList.add(ElementClass);

    return element;
}

const main = document.querySelector('.container');

const submit = document.querySelector(".header__div__submit");

const addDateBtn = document.getElementById('addDateBtn');

document.addEventListener('DOMContentLoaded', () => {

    getInfos();
    submit.addEventListener('click', function (event) {
        event.preventDefault();
        validateForm()
            .then(function (data) {
                console.log("Data successfully sent to API :", data);
                resetForm();
                location.reload();
            })
            .catch(function (error) {
                console.error("error :", error);
            });
    });
    addDateBtn.addEventListener('click', function () {
        addDateField();
    });;


})

document.addEventListener('DOMContentLoaded', async function () {
    await dltInfos(); // CHARGE LES BTN DE SUPPRESSIONS
});

const divBtnDlt = document.getElementById('divBtnDlt')

divBtnDlt.addEventListener('click', async (event) => {

    //
    //LE BTN RECHERCHE L'ID QUI CORRESPOND AU BOUTON PAR RAPPORT A LA DATE DE CREATION DE L'EVENT
    //
    const deleteBtn = event.target.closest('button[data-event-id]');
    
    if (deleteBtn) {
        const eventId = deleteBtn.getAttribute('data-event-id');

        //
        //MSG CONFIRMATION
        //
        const confirmation = confirm('Are you sure you want to delete this event?');

        if (confirmation) {
            await deleteEvent(eventId);
            deleteBtn.remove();
            location.reload()
        }
    }
});


async function getInfos() {

    try {
        const res = await fetch('http://localhost:3000/api/events');

        if (!res.ok) {
            throw new Error(`Network response was not ok: ${res.status}`);
        }

        const datas = await res.json();

        datas.forEach(data => {

            const table = NameAndClass('table', 'tableau')
            const event = NameAndClass('h2', 'event');
            const descri = NameAndClass('p', 'descri');
            const author = NameAndClass('h3','author')
            event.innerHTML = data.name;
            descri.innerHTML = data.description;
            author.innerHTML = data.author

            const datesColumn = data.dates

            const aydee = data.id

            getName(table, aydee, datesColumn);

            const rowHead = document.createElement("tr");
            const thParticipant = document.createElement("th");
            rowHead.append(thParticipant);

            data.dates.forEach(date => {
                const thDate = document.createElement("th");
                thDate.innerText = date.date;
                rowHead.append(thDate);
            });

            const division = NameAndClass('div', 'division');

            main.append(event);
            main.append(division);
            event.append(author);
            author.append(descri);

            division.append(table);
        })

    } catch (error) {
        console.error(error);
    }
}

async function getName(table, aydee, eventDates) {

    try {

        const res = await fetch('http://localhost:3000/api/attendees');

        if (!res.ok) {
            throw new Error(`Network response was not ok: ${res.status}`)
        }

        const datas = await res.json();

        let rowHead = document.createElement("tr");
        let tBody = document.createElement("tbody")
        let tHead = document.createElement('thead')

        let thParticipant = document.createElement("th");
        thParticipant.innerText = "participant";
        rowHead.append(thParticipant);

        eventDates.forEach(date => {
            let thDate = document.createElement("th");
            thDate.innerText = date.date;
            rowHead.append(thDate);
        });

        tHead.append(rowHead);

        let participants = datas.filter(data => data.events.some(ev => ev.id === aydee));

        participants.forEach(participant => {
            let row = document.createElement("tr");
            let tData = document.createElement("td");

            tData.innerText = participant.name;
            row.append(tData);

            eventDates.forEach(date => {

                const event = participant.events.find(event => event.id === aydee);

                let availableData = document.createElement("td");
                if (event && event.dates.some(d => d.date === date.date && d.available)) {

                    availableData.innerText = "✅";
                    availableData.style.textAlign ="center"
                } else {

                    availableData.innerText = "❌";
                    availableData.style.textAlign ="center"
                }

                row.append(availableData);
            });

            tBody.append(row);
        })
        table.append(tBody);
        table.append(tHead)

    } catch (error) {
        console.error(error);
    }
}

