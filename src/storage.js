export { setLocalStorageItemsOnPageLoad, addToDoToInbox }

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

function checkIfProjectIsInStorage(projectName) {
    let projects = JSON.parse(localStorage.getItem('projects'));
    for (let i = 0; i < projects.length; i++){
        if (projects[i].hasOwnProperty(projectName)){
            return true;
        } else {
            return false;
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