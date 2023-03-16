//Associated Alert Dialog Items
const alertButton = document.getElementById('alertButton');
const customAlert = document.getElementById('customAlert');
const closeAlert  = document.getElementById('closeAlert');
//Associated Confirm Dialog Items
const confirmButton = document.getElementById('confirmButton');
const customConfirm = document.getElementById('customConfirm');
const confirmAnswer = document.getElementById('confirm');
const denyAnswer = document.getElementById('deny');
//Associated Prompt Dialog Items
const promptButton = document.getElementById('promptButton');
const customPrompt = document.getElementById('customPrompt');
const confirmUsername = document.getElementById('confirmUsername');
const denyUsername = document.getElementById('denyUsername');
let userName = document.getElementById('user');

//Output result
let result = document.getElementById('result');

// Open up the Alert <dialog> modally
alertButton.addEventListener('click', myAlert);
function myAlert() {
    customAlert.showModal();
    // If OK is selected, close out of our alert.
    closeAlert.addEventListener('click', () => {
        customAlert.close();
    });
}

// Open up the Confirm <dialog> modally
confirmButton.addEventListener('click', myConfirm);
function myConfirm() {
    customConfirm.showModal();
    // If confirm is selected, echo back the value to the screen and close the dialog.
    confirmAnswer.addEventListener('click', () => {
        document.getElementById('result').value = `Confirm result: ${true}`;
        customConfirm.close();
    });
    // If cancel is selected, echo back the value to the screen and close the dialog.
    denyAnswer.addEventListener('click', () => {
        document.getElementById('result').value = `Confirm result: ${false}`;
        customConfirm.close();
    });
}

// Open up the Prompt <dialog> modally
promptButton.addEventListener('click', myPrompt);
function myPrompt() {
    customPrompt.showModal();
    // Update the prompt to display the username then close out of the dialog.
    confirmUsername.addEventListener('click', () => {
        if(!userName.value) {
            document.getElementById('result').value = 'Prompt result: User didn’t enter anything!';
        } 
        else { 
            let clean = DOMPurify.sanitize(userName.value);
            document.getElementById('result').value = `Prompt result: ${clean}!`;
        }
        customPrompt.close();
    });
    // User did not give input, specify. Close out of dialog.
    denyUsername.addEventListener('click', () => {
        document.getElementById('result').value = 'Prompt result: User didn’t enter anything!';
        customPrompt.close();
    });
}
// Clear the output upon selecting a new button
alertButton.addEventListener('click', clearFunct);
confirmButton.addEventListener('click', clearFunct);
promptButton.addEventListener('click', clearFunct);
function clearFunct() {
    document.getElementById('result').value = "";
}


