import './main.css'
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

document.addEventListener('DOMContentLoaded', () => {

    getInfos();
    submit.addEventListener('click', function () { });
})

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

            console.log(data.dates)
            console.log(datesColumn);
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

