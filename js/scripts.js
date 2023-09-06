const formElement = document.getElementById("form");
const inputElement = document.getElementById("input");
const allButtonElement = document.getElementById("allButton");
const uncompletedButtonElement = document.getElementById("uncompletedButton");
const completedButtonElement = document.getElementById("completedButton");
const taskList = document.getElementById("taskList");

let tasks = [];

//Calificar tareas añadidas

function tagTask(filter) {
  taskList.textContent = "";

  let taggedTask = tasks;
  if (filter === "uncompleted") {
    taggedTask = tasks.filter(task => task.completed === false);
  } else if (filter === "completed") {
    taggedTask = tasks.filter(task => task.completed === true);
  }

  const fragment = document.createDocumentFragment();

  taggedTask.forEach(task => {
    const newDiv = document.createElement("div");
    newDiv.classList.add("task");
    if (task.completed) {
      newDiv.classList.add("completed");
    }
    const newInput = document.createElement("input");
    newInput.type = "checkbox";
    newInput.checked = task.completed;
    const newLabel = document.createElement("label");
    newLabel.textContent = task.task;
    const buttonX = document.createElement("button");
    buttonX.textContent = "";
    newDiv.append(newInput, newLabel, buttonX);
    fragment.append(newDiv);
  });
  taskList.append(fragment);
}

//Agregar nueva tarea

const addTask = e => {
  const taskText = inputElement.value;
  e.preventDefault();
  if (taskText !== "") {
    const newObject = {
      id: Date.now(),
      task: taskText,
      completed: false,
    };
    tasks.push(newObject);
    tagTask();
    inputElement.value = "";
  }
};

//Eliminar tarea

taskList.addEventListener("click", e => {
  if (e.target.tagName === "BUTTON") {
    const taskItem = e.target.previousElementSibling.textContent;
    tasks = tasks.filter(task => task.task !== taskItem);
    e.target.parentElement.remove();
    tagTask();
  }
});

//Marcar como completada una tarea

taskList.addEventListener("change", e => {
  if (e.target.tagName === "INPUT") {
    const taskItem = e.target.nextElementSibling.textContent;
    tasks.forEach(task => {
      if (task.task === taskItem) {
        e.target.parentElement.classList.toggle("completed");
        if (task.completed) {
          task.completed = false;
        } else {
          task.completed = true;
          e.target.checked;
        }
      }
    });
  }
});

formElement.addEventListener("submit", addTask);

// Mostrar todas las tareas por defecto
tagTask();

// Filtrar tareas
allButton.addEventListener("click", () => tagTask());
uncompletedButton.addEventListener("click", () => tagTask("uncompleted"));
completedButton.addEventListener("click", () => tagTask("completed"));
