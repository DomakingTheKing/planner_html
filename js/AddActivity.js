// Funzione per gestire l'aggiunta di una nuova attività
function addActivity() {
  // Chiedi all'utente i valori per priorità, nome e descrizione

  const newActivityMenu = document.createElement('tr');
  newActivityMenu.innerHTML = `
  <div class="priorityMenu">
    <div class="labelContainer">
      <label>
        <input type="text" placeholder="Nome">
      </label>
      <label>
        <textarea placeholder="Descrizione" rows="3" class="limitedTextarea"></textarea>
      </label>
      <label>
        <select>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>
    </div>
    <div class="buttonContainer">
      <button class="confirmButton">Conferma</button>
      <button class="cancelButton">Annulla</button>
    </div>
  </div>  
  `;

  // Aggiunge la nuova riga alla tabella
  const body = document.querySelector('body');
  body.appendChild(newActivityMenu);
  

  // Controlla se l'utente ha inserito dei valori
  if (priority && name && description) {
    // Converte la priorità in un'icona corrispondente
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
          <circle r="13" cx="25" cy="32" fill=${priorityIcon} />
        </svg>
        <p class="activity-name" id="activity-name">${name}</p>
        <p class="activity-description" id="activity-description">${description}</p>
        <!-- Max 39char e 3 righe per la descrizione, Max30 char e 1 riga per il nome  -->
        <button class="delete-button" onclick="deleteActivity(this)">
          <img src="/img/delete.svg" alt="Delete">
        </button>
    </div>
    `;

    // Aggiunge la nuova riga alla tabella
    const activitiesContainer = document.querySelector('#activities');
    activitiesContainer.appendChild(newActivity);
  } else {
    alert("Devi inserire tutti i valori!");
  }
}
