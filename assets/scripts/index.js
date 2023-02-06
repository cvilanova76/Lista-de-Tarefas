const form = document.querySelector("#form-create-task");
const tbodyTasks = document.querySelector("#tbody-tasks");

const KEY_TASKS_LOCAL_STORAGE = "tasks";

const tasks = getTasksLocalStorage();

if (tasks.length > 0) {
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
        <td>
            <div class="dropdown-center">
            <img 
                class="dropdown-toggle icon-button" 
                src="./assets/icons/more.svg"
                alt="ícone três pontos" 
                data-bs-toggle="dropdown" 
                /> 
            <ul class="dropdown-menu">
                <li><h6 class="dropdown-header">Ações</h6></li>
                <li><button class="dropdown-item" 
                onclick="deleteTask(${index})">Excluir</button></li>
            </ul>
            </div>
        </td>
        `;
    tbodyTasks.appendChild(trElement);
  });
}

function deleteTask(index){
    tasks.splice(index, 1);

    updateViewTable(tasks);
    saveTasksLocalStorage();
}

function saveTasksLocalStorage() {
  const listTasksString = JSON.stringify(tasks);
  localStorage.setItem(KEY_TASKS_LOCAL_STORAGE, listTasksString);
}

function getTasksLocalStorage() {
  try {
    const dataString = localStorage.getItem(KEY_TASKS_LOCAL_STORAGE);

    if (dataString === "") {
      throw "sem dados";
    }
    const list = JSON.parse(dataString);
    return list;
  } catch (exception) {
    if (exception !== "sem dados") {
      alert("Não foi possível recuperar sua lista de tarefas");
    }
    return [];
  }
}
