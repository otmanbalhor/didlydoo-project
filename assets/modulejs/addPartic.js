export function addParticipants(tdParticipants){

    let editText = tdParticipants.innerText;

    let textField = document.createElement('input');
    textField.classList.add('edit');
    textField.type = "text"
    textField.value = editText;

    tdParticipants.innerHTML = ''
    tdParticipants.append(textField);
    
    textField.focus();

    textField.addEventListener('blur',function(){

        let newParticipant = this.value;

        let tdParticipants = this.parentElement;

        tdParticipants.innerHTML = newParticipant

    })
}

export function addAvailable(tdAvailables){

    let editText = tdAvailables.innerText;
    let selectField = document.createElement('select');
    selectField.classList.add('selected');
    selectField = editText;
    let trueOption = document.createElement('option');
    trueOption.value = '✅';
    let falseOption = document.createElement('option');
    falseOption.value ='❌';
    
    tdAvailables.innerHTML = ''
    tdAvailables.append(selectField);
    selectField.append(trueOption);
    selectField.append(falseOption);

    selectField.focus();

    selectField.addEventListener('blur',function(){

        let newAvailable = this.value;

        let tdAvailables = this.parentElement;

        tdAvailables.innerHTML = newAvailable;

    })

}


