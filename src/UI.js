import {CreateToDo} from "./app";
import {createAddProjectLI} from "./project";
import {createTask, getTaskID} from "./ToDo";
import { addToDoToInbox, addToDoToProjectStorage } from "./storage";

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
                <label for="note">Note: (Optional)</label>
                <textarea name="note" id="note" cols="90" rows="6" maxlength="500" placeholder="Something extra about taking the trash out"></textarea>
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
        const submittedForm = document.querySelectorAll('.todo-form > div');
        const tab = document.querySelector('.title-of-tab').textContent;
        const ToDo = CreateToDo(submittedForm, getTaskID());
        createTask(ToDo.titleName, ToDo.dueDate, ToDo.priority, ToDo.note, ToDo.id);
        if (tab === 'Inbox')
            addToDoToInbox(ToDo);
        else 
            addToDoToProjectStorage(ToDo, tab);
        form.remove();
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