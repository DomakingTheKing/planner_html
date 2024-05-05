document.addEventListener("click", function(event) {
  var target = event.target;
  if (target && target.tagName === "BUTTON" && target.classList.contains("deleteBTT")) {
    var tableRow = target.closest("tr");
    if (tableRow) {
      tableRow.remove();
    }
  }
});
