import { createTask } from "./ToDo";
import { createAddTaskDiv, deleteAddTaskDiv } from "./UI";
import { createAddProjectLI, createProject, deleteAddProjectLI } from "./project";

export { setLocalStorageItemsOnPageLoad, addToDoToInbox, addToDoToProjectStorage, 
    addProjectToStorage, checkIfProjectExists, checkLocalStorageOnPageLoad, 
    loadTodos, loadProjects, checkIfToDoExistsInProjectOrInbox}

function setLocalStorageItemsOnPageLoad() {
    localStorage.setItem('high', 'red');
    localStorage.setItem('medium', '#fbbf24');
    localStorage.setItem('low', 'blue');
    if (Boolean(localStorage.getItem('inbox')) === false) {
        localStorage.setItem("inbox", JSON.stringify([]))
        localStorage.setItem('projects', JSON.stringify([]));
    }
}

function addToDoToInbox(todo) {
    let inbox = JSON.parse(localStorage.getItem('inbox'));
    inbox.push(todo)
    localStorage.setItem("inbox", JSON.stringify(inbox))
}

function addProjectToStorage(projectName) {
    let projects = JSON.parse(localStorage.getItem('projects'));
    projects.push({[projectName]: []})
    localStorage.setItem('projects', JSON.stringify(projects))
}

function checkIfProjectExists(projectName) {
    let projects = JSON.parse(localStorage.getItem('projects'));
    for (let i = 0; i < projects.length; i++){
        if (projects[i].hasOwnProperty(projectName)){
            return true;
        } else {
            return false;
        }
    }
}

function checkIfToDoExistsInProjectOrInbox(ToDoName, origin) {
    if (origin === 'Inbox') {
        let inbox = JSON.parse(localStorage.getItem('inbox'));
        if (Boolean(inbox[0]) === false) return;
        for (let i = 0; i < inbox.length; i++){
            if (inbox[i].titleName === ToDoName) {
                return true
            }
        }
    } else {
        let projects = JSON.parse(localStorage.getItem('projects'));
        let projectID = undefined;
        const projectLIs = document.querySelectorAll('.project');
        projectLIs.forEach((project) => {
            let projectName = project.childNodes[0].textContent;
            if (projectName === origin) {
                projectID = project.dataset.id
            }
        });
        if (Boolean(projects[projectID][[origin]][0]) === false) return;
        for (let i = 0; i < projects[projectID][[origin]].length; i++) {
            let todo = projects[projectID][[origin]][i];
            if (todo.titleName === ToDoName) {
                return true;
            }
        }       
    }
    
}

function addToDoToProjectStorage(todo, projectName) {
    let projects = JSON.parse(localStorage.getItem('projects'));
    const projectsLI = document.querySelectorAll('.project');
    projectsLI.forEach((project, projectIndex) => {
        project = project.childNodes[0].textContent
        if (projectName === project) {
            projects[projectIndex][[projectName]].push(todo);
        }
    });
    
    localStorage.setItem('projects', JSON.stringify(projects));
}

function checkLocalStorageOnPageLoad() {
    const projects = JSON.parse(localStorage.getItem('projects'));
    if (Boolean(projects[0])) {
        loadProjects(projects)
    }
    const inbox = JSON.parse(localStorage.getItem('inbox'));
    if (Boolean(inbox[0])) {
        loadTodos(inbox);
    }
}

function loadProjects(projects) {
    deleteAddProjectLI();
    for (let i = 0; i < projects.length; i++) {
        let projectName = Object.getOwnPropertyNames(projects[i])[0];
        createProject(projectName);
    }
    createAddProjectLI();
}

function loadTodos(storage) {
    deleteAddTaskDiv();
    for (let i = 0; i < storage.length ; i++) {
        createTask(storage[i].titleName, storage[i].dueDate, storage[i].priority, storage[i].note);
    }
    createAddTaskDiv()
}