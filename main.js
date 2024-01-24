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
const name = document.querySelector('.header__title');


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

            const table = document.createElement('table');
            const event = NameAndClass('h2', 'event');
            const descri = NameAndClass('p','descri');
            event.innerHTML = data.name;
            descri.innerHTML = data.description;

            const datesColumn = data.dates.map(datum => datum.date).join('</th><th>');


            const aydee = data.id

            console.log(aydee);
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>participant</th>
                        <th colspan="${data.dates.length}">${datesColumn}</th>
                    </tr>
                </thead>
            `

            getName(table,aydee);


                let attendees = data.dates.map(name => name.attendees)
                

                attendees.forEach(name => {
                    const tbody = document.createElement('tbody');
    
                   
                    const tr = document.createElement('tr');
                    const td = document.createElement('td');

                    
                   let thomas = name.map(myName => myName.name)

                    for(let i=0;i<thomas.length;i++){

                        td.innerHTML = thomas[i]

                    }
                        tbody.append(tr);
                        tr.append(td);
                    
                    
                 
                    
                    /*date.attendees.forEach(attendee => {
                        const tr = document.createElement('tr');
                        const td = document.createElement('td');
                        td.innerHTML = attendee.available;
                        tbody.append(tr);
                        tr.append(td);
    
                    });*/
                    table.append(tbody);
                });
    
            const division = NameAndClass('div', 'division');
            

            main.append(event);
            main.append(division);
            event.append(descri);
            
            division.append(table);
        })

    } catch (error) {
        console.error(error);
    }
}


async function getName(table,aydee){

    try {

        const res = await fetch('http://localhost:3000/api/attendees');

        if(!res.ok){
            throw new Error(`Network response was not ok: ${res.status}`)
        }

        const datas = await res.json();

        datas.forEach(data => {

            const nom = data.name

            console.log(nom);
            
            const id = data.events.map(id=>id.id);

            if(id === aydee){

            }
        });

   
        
    } catch (error) {
        console.error(error);
    }
}



