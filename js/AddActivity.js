// Funzione per gestire l'aggiunta di una nuova attività
function addActivity() {
  // Chiedi all'utente i valori per priorità, nome e descrizione
  const priority = prompt("Inserisci la priorità (low, medium, high):");
  const name = prompt("Inserisci il nome dell'attività:");
  const description = prompt("Inserisci la descrizione dell'attività:");

  // Controlla se l'utente ha inserito dei valori
  if (priority && name && description) {
    // Converte la priorità in un'icona corrispondente
    let priorityIcon = '';
    switch (priority) {
      case 'low':
        priorityIcon = 'circle_green.svg';
        break;
      case 'medium':
        priorityIcon = 'circle_yellow.svg';
        break;
      case 'high':
        priorityIcon = 'circle_red.svg';
        break;
      default:
        priorityIcon = 'circle.svg';
        break;
    }

    // Crea una nuova riga per la tabella
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td class="priority"><button onclick="setActivityPriority(this)"><img src="img/${priorityIcon}" alt="${priority}"></button></td>
      <td>${name}</td>
      <td>${description}</td>
      <td><button class="optionsButton" onclick="modifyActivity()"><img src="img/more.svg" alt="Options"></button></td>
      <td><button class="deleteButton" onclick="deleteActivity(this)"><img src="img/delete.svg" alt="Delete"></button></td>
    `;

    // Aggiunge la nuova riga alla tabella
    const tableBody = document.querySelector('#activity table tbody');
    tableBody.appendChild(newRow);
  } else {
    alert("Devi inserire tutti i valori!");
  }
}

function deleteActivity(button) {
  const tableRow = button.closest("tr");
  if (tableRow) {
    tableRow.remove();
  }
}
