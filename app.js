document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => addTaskToDOM(task.text, task.completed));
}

document
  .getElementById("taskInput")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });

var task_Group = document.querySelector(".list-group");
var add_btn = document.querySelector(".add_btn");

function addTask() {
  let taskText = document.querySelector("#taskInput").value.trim();
  if(taskText === "") return
  addTaskToDOM(taskText, false);
  saveTask(taskText, false);
  document.querySelector("#taskInput").value = "";
}

// Thêm task Todo mới
add_btn.addEventListener("click", addTask);

// Hàm gạch task Todo
function toggleComplete(button) {
  let li = button.parentElement.parentElement;
  li.classList.toggle("text-decoration-line-through");
  li.classList.toggle("text-muted");
  updateLocalStorage();
}

function addTaskToDOM(taskTest, completed) {
  var property = "";
  if (completed) property = "text-decoration-line-through text-muted";

  let taskHTML = `<li class="list-group-item d-flex justify-content-between align-items-center ${property}">
    <span class="">${taskTest}</span>
    <div>
      <button type="button" class="btn btn-success" onclick = "toggleComplete(this)">Ok</button>
      <button type="button" class="btn btn-danger" onclick = "removeTaskTodo(this)">Del</button>
    </div>
  </li>`;
  task_Group.insertAdjacentHTML("beforeend", taskHTML);
}

function removeTaskTodo(button) {
  button.parentElement.parentElement.remove();
  updateLocalStorage();
}

function deleteTask() {}

function saveTask(text, completed) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text, completed });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateLocalStorage() {
  let tasks = [];
  document.querySelectorAll(".list-group-item").forEach((li) => {
    tasks.push({
      text: li.children[0].textContent,
      completed: li.classList.contains("text-decoration-line-through"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
