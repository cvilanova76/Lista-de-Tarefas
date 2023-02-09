const form = document.querySelector("#form-create-task");
const tbodyTasks = document.querySelector("#tbody-tasks");
const formFilter = doccument.querySelector("#form-filter-tasks");

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

formFilter.addEventListener("submit", (event) => {
  event.preventDefault();
  const formFilter = event.target;
  const { titleFilter, descriptionFilter } = formFilter;

  const tasksFiltered = filterTasks({
    title: titleFilter.value,
    description: descriptionFilter.value,
  });

  updateViewTable(tasksFiltered);
});

function filterTasks({ title, description }) {
  if (title === "" && description === "") {
    return tasks;
  }

  const newTasks = tasks.filter((task) => {
    let descriptionUpper = task.description.toUpperCase();
    let titleUpper = task.title.toUpperCase();
    let descriptionOk =
      description.lenght > 0 && descriptionUpper.includes(description.toUpperCase());
    let titleOk = title.lenght > 0 && titleUpper.includes(title.toUpperCase());
    return descrptionOk || titleOK;
  });
  return newTasks;
}

function updateViewTable(list) {
  tbodyTasks.innerHTML = "";

  list.forEach((item, index) => {
    const trElement = document.createElement("tr");

    if (item.status) {
      const myClassStatus = getClassByStatus(item.status);
      if (myClassStatus !== "") {
        trElement.classList.add(myClassStatus);
      }
    }

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
                <li><h6 class="dropdown-header">Alterar status</h6></li>
                <li>
                    <button
                        class="btn btn-outline-success btn-status-task" 
                        onclick="updateStatusTask(${index},'done')"
                        type="button">
                        Concluída
                    </button>
                </li>
                <li>
                    <button
                        class="btn btn-outline-warning btn-status-task" 
                        onclick="updateStatusTask(${index},'pending')"
                        type="button">
                        Pendente
                    </button>
                </li>
                <li>
                    <button
                        class="btn btn-outline-danger btn-status-task" 
                        onclick="updateStatusTask(${index},'canceled')"
                        type="button">
                        Cancelado
                    </button>
                </li>
            </ul>
            </div>
        </td>
        `;
    tbodyTasks.appendChild(trElement);
  });
}

function getClassByStatus(status) {
  switch (status) {
    case "done":
      return "table-success";
    case "pending":
      return "table-warning";
    case "canceled":
      return "table-danger";
    default:
      return "";
  }
}

function updateStatusTask(index, status) {
  tasks[index].status = status;
  saveTasksLocalStorage();
  updateViewTable(tasks);
}

function deleteTask(index) {
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

    if (!dataString) {
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
