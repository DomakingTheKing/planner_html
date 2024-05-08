function deleteActivity(button) {
  const activity = button.closest("div");
  if (activity) {
    activity.remove();
  }
}
