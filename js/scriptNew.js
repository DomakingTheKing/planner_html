const hoursColumn = document.querySelector(".hours");
const activitiesColumn = document.querySelector(".events");
const currentHourLine = document.querySelector(".current-hour-line");
const currentHourText = document.querySelector(".current-hour-text");


function init() {
    updateCurrentHourLine();
    updateCurrentHourTextPosition();

    setInterval(function() {
        updateCurrentHourTextPosition();
        updateCurrentHourLine();
    }, 2000);
}

// Funzione per aggiornare la linea dell'ora corrente
function updateCurrentHourLine() {
    const totalHeight = hoursColumn.offsetHeight; // altezza totale del contenitore delle ore
    const now = new Date();
    const currentHour = now.getHours() + now.getMinutes() / 60; // ora attuale in ore decimali
    const currentHeight = (currentHour / 24) * totalHeight; // altezza corrispondente all'ora attuale
    currentHourLine.style.top = `${currentHeight}px`; // impostare l'altezza calcolata come posizione superiore per la linea dell'ora corrente
}

// Funzione per aggiornare la posizione del testo dell'ora corrente
function updateCurrentHourTextPosition() {
    const totalHeight = activitiesColumn.offsetHeight; // altezza totale del contenitore degli eventi
    const now = new Date();
    const currentHour = now.getHours() + now.getMinutes() / 60; // ora attuale in ore decimali
    const currentHeight = (currentHour / 24) * totalHeight; // altezza corrispondente all'ora attuale
    currentHourText.style.top = `calc(${currentHeight}px - 8px)`; // impostare l'altezza calcolata come posizione superiore per il testo dell'ora corrente
    currentHourText.textContent = getCurrentHourText(); // ottenere il testo dell'ora corrente nel formato "HH:MM"
}

// Funzione per ottenere il testo dell'ora corrente nel formato "HH:MM"
function getCurrentHourText() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}