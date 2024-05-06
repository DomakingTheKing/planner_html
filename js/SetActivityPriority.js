let menuAperto = false;
let currentPriorityMenu = null;

function setActivityPriority(button) {
  if (menuAperto && currentPriorityMenu !== null) {
    currentPriorityMenu.remove();
    menuAperto = false;
    currentPriorityMenu = null;
    return; // Esci dalla funzione per evitare di aprire un nuovo menu
  }

  const cell = button.parentElement;

  // Ottieni le dimensioni della cella
  const cellWidth = cell.offsetWidth;
  const cellHeight = cell.offsetHeight;

  // Crea il menù delle priorità
  const priorityMenu = document.createElement('div');
  priorityMenu.id = 'priorityMenu';
  priorityMenu.classList.add('priorityMenu');
  priorityMenu.style.width = cellWidth + 'px';
  priorityMenu.style.height = cellHeight + 'px';
  priorityMenu.style.top = cell.offsetTop + 'px';
  priorityMenu.style.left = cell.offsetLeft + 'px';
  priorityMenu.style.position = 'absolute';
  priorityMenu.style.zIndex = '3';

  // Crea i pulsanti all'interno del menù
  const priorityOptions = ['Low', 'Medium', 'High'];
  priorityOptions.forEach(function (option) {
    const button = document.createElement('button');
    button.classList.add('priorityOption');

    // Imposta l'icona in base all'opzione
    switch (option) {
      case 'Low':
        button.innerHTML = '<img src="/img/circle_green.svg" alt="Low">';
        break;
      case 'Medium':
        button.innerHTML = '<img src="/img/circle_yellow.svg" alt="Medium">';
        break;
      case 'High':
        button.innerHTML = '<img src="/img/circle_red.svg" alt="High">';
        break;
      default:
        break;
    }
    button.onclick = function () {
      // Cambia la priorità dell'attività
      const row = cell.parentElement;
      const priorityCell = row.querySelector('td:first-child');

      // Cambia il colore del circle
      const circle = priorityCell.querySelector('img');
      switch (option) {
        case 'Low':
          circle.src = 'img/circle_green.svg';
          break;
        case 'Medium':
          circle.src = 'img/circle_yellow.svg';
          break;
        case 'High':
          circle.src = 'img/circle_red.svg';
          break;
        default:
          circle.src = 'img/circle.svg';
          break;
      }

      // Rimuovi il menù delle priorità
      priorityMenu.remove();
      menuAperto = false;
      currentPriorityMenu = null;
    };
    priorityMenu.appendChild(button);
  });

  // Aggiungi il menù alla pagina
  document.body.appendChild(priorityMenu);
  menuAperto = true;
  currentPriorityMenu = priorityMenu;

  // Aggiungi un listener per gestire il clic al di fuori del menu
  window.addEventListener('click', function (event) {
    if (!priorityMenu.contains(event.target) && event.target !== button) {
      // Chiudi il menu solo se il clic avviene al di fuori del menu e non sul pulsante che lo ha aperto
      priorityMenu.remove();
      menuAperto = false;
      currentPriorityMenu = null;
    }
  });
}
