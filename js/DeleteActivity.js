function deleteActivity(button) {
  const tableRow = button.closest("tr");
  if (tableRow) {
    tableRow.remove();
  }
}
