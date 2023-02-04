const form = document.querySelector("#form-create-task");
const tbodyTasks = document.querySelector("#tbody-tasks");

const KEY_TASKS_LOCAL_STORAGE = "tasks";

const tasks = getTasksLocalStorage();

if(tasks.length > 0){
    updateViewTable(tasks);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formValues = event.target;

  const { title, description } = formValues;

  tasks.push({
    title: title.value,
    description: description.value,
  });
  title.value = "";
  description.value = "";

  updateViewTable(tasks);
  saveTasksLocalStorage();
});

function updateViewTable(list) {
  tbodyTasks.innerHTML = "";

  list.forEach((item, index) => {
    const trElement = document.createElement("tr");

    trElement.innerHTML = `
        <td>${index + 1}</td>
        <td>${item.title}</td>
        <td>${item.description}</td>
        <td>ações</td>;
        `;

    tbodyTasks.appendChild(trElement);
  });
}

function saveTasksLocalStorage() {
  const listTasksString = JSON.stringify(tasks);
  localStorage.setItem(KEY_TASKS_LOCAL_STORAGE, listTasksString);
}

function getTasksLocalStorage() {
  const dataString = localStorage.getItem(KEY_TASKS_LOCAL_STORAGE);
  const list = JSON.parse(dataString);
  return list;
}
