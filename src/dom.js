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
