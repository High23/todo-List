import {addTodosToProject, removeTodosFromProject, removeProject} from "./app";

const contentDiv = document.getElementById("content");


createLayout();
createAddTaskDiv();
createAddProjectLI();

function createLayout() {
    createHeader();
    createSidebar();
    createToDoContainer();
}

function createHeader() {
    const headerDiv = document.createElement('div')
    headerDiv.setAttribute('class', 'header');
    headerDiv.innerHTML = `<img src="../src/icons/list-box-outline.svg" alt="Header icon that resembles a checklist" class="header-icon"> 
                            ToDo List`
    contentDiv.appendChild(headerDiv);
}

function createSidebar() {
    const sidebarDiv = document.createElement('div');
    sidebarDiv.setAttribute('class', 'sidebar');
    sidebarDiv.innerHTML = `
    <div class="sidebar">
        <ul class="tabs">
            <li class="sidebar-tab">
                <img src="../src/icons/inbox-outline.png" alt="Inbox icon" class="sidebar-icon"> 
                Inbox
            </li>
            <li class="sidebar-tab">
                <img src="../src/icons/calendar-today-outline.png" alt="A calendar with a day highlighted" class="sidebar-icon">
                Today
            </li>
            <li class="sidebar-tab">
                <img src="../src/icons/calendar-week-outline.png" alt="A calendar with a week highlighted" class="sidebar-icon">
                This Week
            </li>
            <li class="sidebar-tab">
                <img src="../src/icons/calendar-month-outline.png" alt="A calendar with a week highlighted" class="sidebar-icon">
                This Month
            </li>
        </ul>
        <ul class="projects">
            <span>Projects</span>
        </ul>
    </div>`
    contentDiv.appendChild(sidebarDiv);
}

function createToDoContainer() {
    const containerDiv = document.createElement('div');
    containerDiv.setAttribute('class', 'todos-container');
    containerDiv.innerHTML = `
    <div class="todos-container">
        <div class="title-of-tab">Inbox</div>
        <ul class="todos">
        </ul>
    </div>`
    contentDiv.appendChild(containerDiv);
}

function createTaskForm() {
    const todosUL = document.querySelector('.todos');
    const form = document.createElement('form');
    form.setAttribute('class', 'todo-form')
    form.innerHTML = `
            <div class="title">
                <label for="title">Title:</label>
                <input type="text" name="title" id="title" autofocus autocomplete="off" maxlength="43" placeholder="Take the trash out">
            </div>

            <div class="due-date">
                <label for="due-date">Due Date</label>
                <input type="date" name="due-date" id="due-date">
            </div>

            <div class="priority">
                <label for="priority">Priority</label>
                <select name="priority" id="priority">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>

            <div class="note">
                <label for="note">Note:</label>
                <textarea name="note" id="note" cols="90" rows="4" maxlength="580" placeholder="Something extra about taking the trash out"></textarea>
            </div>
            <div class="buttons">
                <button type="button" class="submit">Submit</button>
                <button type="button" class="cancel">Cancel</button>
            </div>`;
    todosUL.appendChild(form)
    cancelFormBTN(form);
    submitFormBTN(form);
}

function cancelFormBTN(form) {
    const cancelBTN = document.querySelector('.buttons > .cancel');
    cancelBTN.addEventListener('click', () => {
        form.remove();
        createAddTaskDiv();
    });
}

function submitFormBTN(form) {
    const submitBTN = document.querySelector('.buttons > .submit');
    submitBTN.addEventListener('click', () => {
        const submittedForm = document.querySelectorAll('.todo-form > div')
        createTask();
        form.remove();
        console.log(submittedForm[0].value)
        createAddTaskDiv();
    });
}

function createAddTaskDiv() {
    const todosUL = document.querySelector('.todos');
    const addTaskLI = document.createElement('li');
    addTaskLI.setAttribute('class', 'add-task');
    addTaskLI.innerHTML = `<img src="../src/icons/plus.svg" alt="Plus icon" class="plus-icon">
                           <span>Add task</span>`
    addTaskLI.addEventListener('click', () => {
        createTaskForm();
        addTaskLI.remove();
    });
    todosUL.appendChild(addTaskLI);
}

function createTask(/* title, dueDate, note, priority */) {
    const todosUL = document.querySelector('.todos');
    const task = document.createElement('li');
    task.setAttribute('class', 'task');
    const form = document.createElement('form');
    form.setAttribute('class', 'check');
    form.innerHTML = `<label for="mark-task"></label>
                      <input type="radio" name="mark-task" id="mark-task">
                      <span></span>`;
    const taskTitle = document.createElement('span');
    taskTitle.innerHTML = 'title';
    form.appendChild(taskTitle);
    task.appendChild(form);
    const span = document.createElement('span');
    const dateSpan = document.createElement('span');
    const dropDownIcon = document.createElement('img');
    dateSpan.innerHTML = 'dueDate';
    dropDownIcon.setAttribute('src', '../src/icons/triangle-down.png');
    dropDownIcon.setAttribute('alt', 'Drop down icon');
    dropDownIcon.setAttribute('class', 'details');
    span.appendChild(dateSpan);
    span.appendChild(dropDownIcon);
    task.appendChild(span);
    todosUL.appendChild(task);
}

function createAddProjectLI() {
    const projectsUl = document.querySelector('.projects');
    const addProjectLI = document.createElement('li');
    addProjectLI.setAttribute('class', 'add-project')
    addProjectLI.innerHTML = `<img src="../src/icons/plus.svg" alt="Plus icon" class="plus-icon">
                              <span>Add project</span>`;
    projectsUl.appendChild(addProjectLI);
    addProjectLI.addEventListener('click', () => {
        addProjectLI.remove();
        createProjectNameForm(projectsUl);
    });
}

function createProjectNameForm(projectsUl) {
    const projectNameForm = document.createElement('form');
    projectNameForm.setAttribute('class', 'create-project');
    projectNameForm.innerHTML = 
        `<label for="input-project-name"></label>
        <input type="text" name="project-name" id="input-project-name" maxlength="20">
        <div class="project-form-buttons">
            <button class="submit" type="button">Create</button>
            <button class="cancel" type="button">Cancel</button>
        </div>`;
    projectsUl.appendChild(projectNameForm);
    cancelProjectNameForm(projectNameForm);
    submitProjectNameForm(projectNameForm);
}

function createProject() {
    const projectsUl = document.querySelector('.projects');
    const projectLI = document.createElement('li');
    projectLI.setAttribute('class', 'project');
    const projectName = document.createElement('span');
    projectName.innerHTML = 'title';
    const dropDownIcon = document.createElement('img');
    dropDownIcon.setAttribute('src', '../src/icons/triangle-down.png');
    dropDownIcon.setAttribute('alt', 'Drop down icon');
    dropDownIcon.setAttribute('class', 'details');
    projectLI.appendChild(projectName);
    projectLI.appendChild(dropDownIcon);
    projectsUl.append(projectLI);
}

function cancelProjectNameForm(projectNameForm) {
    const cancelBTN = document.querySelector('.project-form-buttons > .cancel');
    cancelBTN.addEventListener('click', () => {
        projectNameForm.remove();
        createAddProjectLI();
    });
}

function submitProjectNameForm(projectNameForm) {
    const submitBTN = document.querySelector('.project-form-buttons > .submit');
    submitBTN.addEventListener('click', () => {
        projectNameForm.remove();
        createProject();
        createAddProjectLI();
    });
}

