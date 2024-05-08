// Funzione per gestire l'aggiunta di una nuova attività
function addActivity() {
  const newActivityMenu = document.createElement('tr');
  newActivityMenu.innerHTML = `
  <div class="priorityMenu">
    <div class="labelContainer">
      <label>
        <input type="text" id="activityNameInput" placeholder="Nome">
      </label>
      <label>
        <textarea id="activityDescriptionInput" placeholder="Descrizione" rows="3" class="limitedTextarea"></textarea>
      </label>
      <label>
        <select id="prioritySelect">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>
    </div>
    <div class="buttonContainer">
      <button id="confirmButton" class="confirmButton">Conferma</button>
      <button id="cancelButton" class="cancelButton">Annulla</button>
    </div>
  </div>
  `;

  const body = document.querySelector('body');
  body.appendChild(newActivityMenu);

  const confirmButton = document.getElementById('confirmButton');
  confirmButton.addEventListener('click', storeActivityData);

  const cancelButton = document.getElementById('cancelButton');
  cancelButton.addEventListener('click', cancel);
}

function storeActivityData() {
  // Ottieni i valori inseriti dall'utente
  const name = document.getElementById('activityNameInput').value;
  const description = document.getElementById('activityDescriptionInput').value;
  const priority = document.getElementById('prioritySelect').value;

  if (name && description && priority) {
    let priorityColor = '';
    switch (priority) {
      case 'low':
        priorityColor = 'green';
        break;
      case 'medium':
        priorityColor = 'yellow';
        break;
      case 'high':
        priorityColor = 'red';
        break;
      default:
        priorityColor = 'black';
        break;
    }

    // Crea una nuova riga per la tabella
    const newActivity = document.createElement('tr');
    newActivity.innerHTML = `
    <div class="activity">
        <svg>
          <circle r="13" cx="25" cy="32" fill=${priorityColor} />
        </svg>
        <p class="activity-name" id="activity-name">${name}</p>
        <p class="activity-description" id="activity-description">${description}</p>
        <button class="delete-button" onclick="deleteActivity(this)">
          <img src="/img/delete.svg" alt="Delete">
        </button>
    </div>
    `;

    const activitiesContainer = document.querySelector('#activities');
    activitiesContainer.appendChild(newActivity);

    // Rimuovi il menu di inserimento dell'attività dopo l'aggiunta
    const body = document.querySelector('body');
    body.removeChild(body.lastChild); // Rimuovi l'ultimo figlio (il menu di inserimento)
  } else {
    alert("Devi inserire tutti i valori!");
  }
}

function cancel() {
  // Rimuovi il menu di inserimento dell'attività se viene premuto "Annulla"
  const body = document.querySelector('body');
  body.removeChild(body.lastChild); // Rimuovi l'ultimo figlio (il menu di inserimento)
}
