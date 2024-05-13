const addActivityBtn = document.getElementById("addActivity");
const activityModal = document.getElementById("activityModal");
const overlay = document.getElementById("overlay");
const cancelBtn = document.getElementById("cancelBtn");
const activityForm = document.getElementById("activityForm");
const timeline = document.querySelector(".timeline");
const hoursColumn = document.querySelector(".hours");
const activitiesColumn = document.querySelector(".activities");
const datepicker = document.getElementById("datepicker");
const themeSwitch = document.getElementById("themeSwitch");
const currentHourLine = document.querySelector(".current-hour-line");
const currentHourText = document.querySelector(".current-hour-text");


function init() {
    addActivityBtn.addEventListener("click", toggleModal);

    cancelBtn.addEventListener("click", toggleModal);

    overlay.addEventListener("click", function(event) {
        if (!event.target.closest('.modal-content')) {
            toggleModal();
        }
    });

    activityForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const activityName = this.activityName.value;
        const activityStartTime = this.activityStartTime.value;
        const activityEndTime = this.activityEndTime.value;
        const activityColor = document.getElementById("activityColor").value;
        if (activityEndTime && activityStartTime >= activityEndTime) {
            alert("L'ora di inizio deve essere precedente all'ora di fine!");
            return;
        }
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();
        const startTime = parseInt(activityStartTime.split(':')[0]) * 60 + parseInt(activityStartTime.split(':')[1]);
        if (startTime < currentTime) {
            alert("Non puoi aggiungere attività nel passato!");
            return;
        }
        addActivityWithOverlapCheck(activityName, activityStartTime, activityEndTime, activityColor);
        toggleModal();
        this.reset();
    });

    updateCurrentHourLine();
    updateCurrentHourTextPosition();
    
    // Attiva/disattiva la modalità scura quando lo switch viene modificato
    themeSwitch.addEventListener("change", function() {
        document.body.classList.toggle("dark-mode", this.checked);
    });
}


// Funzione per gestire l'apertura e la chiusura del modal delle attività
function toggleModal() {
    overlay.style.display = overlay.style.display === "block" ? "none" : "block";
    activityModal.style.display = activityModal.style.display === "block" ? "none" : "block";
}

    

// Funzione per verificare e posizionare correttamente un'attività in caso di sovrapposizione
function checkAndPlaceActivity(activity) {
    const existingActivities = activitiesColumn.querySelectorAll('.activity');
    const activityRect = activity.getBoundingClientRect();
    const overlappingActivities = Array.from(existingActivities).filter(existingActivity => {
        const existingActivityRect = existingActivity.getBoundingClientRect();
        return !(existingActivityRect.bottom < activityRect.top || existingActivityRect.top > activityRect.bottom);
    });
    if (overlappingActivities.length > 0) {
        const lastOverlappingActivity = overlappingActivities[overlappingActivities.length - 1];
        const lastOverlappingActivityRect = lastOverlappingActivity.getBoundingClientRect();
        const topPosition = lastOverlappingActivityRect.bottom - timeline.getBoundingClientRect().top + 1;
        activity.style.top = `${topPosition}px`;
    }
}

// Aggiungi un'attività quando il form viene confermato, controllando eventuali sovrapposizioni
function addActivityWithOverlapCheck(name, startTime, endTime, color) {
    const activity = document.createElement("div");
    activity.className = "activity";
    activity.textContent = name;
    activity.title = `${startTime} - ${endTime}`;
    activity.classList.add(calculateDurationClass(startTime, endTime));
    if (activity.classList.contains("long")) {
        activity.style.backgroundColor = color;
    }
    const startHour = parseInt(startTime.split(':')[0]);
    const startMinute = parseInt(startTime.split(':')[1]);
    const totalMinutes = startHour * 60 + startMinute;
    const position = (totalMinutes / 1440) * 100;

    const endHour = parseInt(endTime.split(':')[0]);
    const endMinute = parseInt(endTime.split(':')[1]);
    const totEnd = endHour * 60 + endMinute;
    const durata = totEnd - totalMinutes;

    const height = (durata / 1440) * 100;
    activity.style.height = `${height}%`;

    activity.style.top = `calc(${position}% - 1px)`;
    const timeDisplay = document.createElement("div");
    timeDisplay.className = "activity-time";
    timeDisplay.textContent = `${startTime} - ${endTime || ''}`;
    activity.appendChild(timeDisplay);
    activitiesColumn.appendChild(activity);
    checkAndPlaceActivity(activity); // Controlla e posiziona l'attività in caso di sovrapposizione
}

function calculateDurationClass(startTime, endTime) {
    return endTime ? "long" : "short";
}

// Funzione per aggiornare la linea dell'ora corrente
function updateCurrentHourLine() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const totalMinutes = hours * 60 + minutes;
    const position = (totalMinutes / 1440) * 100;
    currentHourLine.style.top = `calc(${position}% - 1px)`;
}

// Funzione per aggiornare la posizione del testo dell'ora corrente
function updateCurrentHourTextPosition() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const totalMinutes = hours * 60 + minutes;
    const position = (totalMinutes / 1440) * 100;
    currentHourText.style.top = position-1.3 + '%';
    currentHourText.textContent = getCurrentHourText();
}

// Funzione per ottenere il testo dell'ora corrente nel formato "HH:MM"
function getCurrentHourText() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}


// Aggiorna la posizione della linea dell'ora corrente e del testo ogni minuto
setInterval(function() {
    updateCurrentHourTextPosition();
    updateCurrentHourLine();
}, 60000);
console.log("Script loaded");