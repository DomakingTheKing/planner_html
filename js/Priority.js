document.addEventListener("click", function(event) {
  var target = event.target;
  if (target && target.tagName === "BUTTON" && target.classList.contains("priorityBTT")) {
    var priorityMenu = target.nextElementSibling;
    togglePriorityMenu(priorityMenu);
  }
});

function togglePriorityMenu(priorityMenu) {
  if (priorityMenu.style.display === "block") {
    priorityMenu.style.display = "none";
  } else {
    priorityMenu.style.display = "block";
  }
}
