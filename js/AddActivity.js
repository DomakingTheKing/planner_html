// Funzione per gestire l'aggiunta di una nuova attività
function addActivity() {
  // Chiedi all'utente i valori per priorità, nome e descrizione
  var priority = prompt("Inserisci la priorità (low, medium, high):");
  var name = prompt("Inserisci il nome dell'attività:");
  var description = prompt("Inserisci la descrizione dell'attività:");

  // Controlla se l'utente ha inserito dei valori
  if (priority && name && description) {
    // Converte la priorità in un'icona corrispondente
    var priorityIcon = '';
    if (priority === 'low') {
      priorityIcon = 'circle_green.svg';
    } else if (priority === 'medium') {
      priorityIcon = 'circle_yellow.svg';
    } else if (priority === 'high') {
      priorityIcon = 'circle_red.svg';
    }

    // Crea una nuova riga per la tabella
    var newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td><img src="img/${priorityIcon}" alt="${priority}"></td>
      <td>${name}</td>
      <td>${description}</td>
      <td><button class="optionsButton"><img src="img/more.svg" alt="Options"></button></td>
      <td><button class="deleteButton"><img src="img/delete.svg" alt="Delete"></button></td>
    `;

    // Aggiunge la nuova riga alla tabella
    var tableBody = document.querySelector('#activity table tbody');
    tableBody.appendChild(newRow);
  } else {
    alert("Devi inserire tutti i valori!");
  }
}

// Funzione per gestire l'eliminazione di una riga dalla tabella
function deleteRow(event) {
  var row = event.target.closest('tr');
  if (row) {
    row.remove();
  }
}

// Aggiungi un listener al tasto per aggiungere un'attività
var addActivityButton = document.querySelector('#addActivity');
if (addActivityButton) {
  addActivityButton.addEventListener('click', addActivity);
}

// Aggiungi listener per eliminare una riga dalla tabella
var table = document.querySelector('#activity table');
if (table) {
  table.addEventListener('click', function(event) {
      deleteRow(event);
  });
}
