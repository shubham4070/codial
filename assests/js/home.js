const addButton = document.getElementById("add-task");
addButton.addEventListener("click", addTask);

function addTask() {
  // Get the values of the form fields
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;
  const dueDate = document.getElementById("due-date").value;

  // Create a new list item with the task description and category label
  const taskListItem = document.createElement("li");
  const taskDescription = document.createTextNode(description);
  const categoryLabel = document.createElement("span");
  categoryLabel.classList.add("category");
  categoryLabel.appendChild(document.createTextNode("(" + category + ")"));
  taskListItem.appendChild(taskDescription);
  taskListItem.appendChild(categoryLabel);

  // Add the new task to the task list
  const taskList = document.getElementById("task-list");
  taskList.appendChild(taskListItem);

  // Clear the form fields
  document.getElementById("description").value = "";
  document.getElementById("category").value = "personal";
  document.getElementById("due-date").value = "";
}
