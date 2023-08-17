import { checkIfProjectExists, addProjectToStorage, loadInbox } from "./storage";
import { clearTab } from "./UI";

export {createAddProjectLI, createProject, deleteAddProjectLI};

function createAddProjectLI() {
    const projectsUl = document.querySelector('.projects');
    const addProjectLI = document.createElement('li');
    addProjectLI.setAttribute('class', 'add-project')
    addProjectLI.innerHTML = `<img src="../src/icons/plus.svg" alt="Plus icon" class="plus-icon">
                              <span>Add project</span>`;
    projectsUl.appendChild(addProjectLI);
    addProjectLI.addEventListener('click', () => {
        deleteAddProjectLI();
        createProjectNameForm(projectsUl);
    });
}

function createProjectNameForm(projectsUl) {
    const projectNameForm = document.createElement('form');
    projectNameForm.setAttribute('class', 'create-project');
    projectNameForm.innerHTML = 
        `<label for="input-project-name"></label>
        <input type="text" name="project-name" id="input-project-name" maxlength="20" autocomplete="off">
        <div class="project-form-buttons">
            <button class="submit" type="button">Create</button>
            <button class="cancel" type="button">Cancel</button>
        </div>`;
    projectsUl.appendChild(projectNameForm);
    cancelProjectNameForm(projectNameForm);
    submitProjectNameForm(projectNameForm);
}

function createProject(title) {
    const projectsUl = document.querySelector('.projects');
    const projectLI = document.createElement('li');
    projectLI.setAttribute('class', 'project');
    const projectName = document.createElement('span');
    const projectDropDownIcon = document.createElement('img');
    projectDropDownIcon.setAttribute('src', '../src/icons/triangle-down.png');
    projectDropDownIcon.setAttribute('alt', 'Drop down icon');
    projectDropDownIcon.setAttribute('class', 'details');
    projectLI.appendChild(projectName);
    projectLI.appendChild(projectDropDownIcon);
    projectsUl.append(projectLI);
    projectLI.setAttribute('data-project-id', setProjectID());
    projectName.innerHTML = title;
    projectLI.addEventListener('click', () => {
        clearTab()
        openProject(title, projectLI);
    });
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
        if (checkIfProjectExists(projectNameForm.childNodes[2].value)) {
            alert('Projects must have different names')
            return;
        } else {
            createProject(document.querySelector('#input-project-name').value);
            addProjectToStorage(projectNameForm.childNodes[2].value)
            projectNameForm.remove();
            createAddProjectLI()
        };
    });
}

function setProjectID() {
    const id = document.querySelectorAll('.project').length - 1;
    return id;
}

function openProject(title, projectLI) {
    const tabTitle = document.querySelector('.title-of-tab');
    tabTitle.innerHTML = title;
    let projects = JSON.parse(localStorage.getItem('projects'));
    let projectIndex = projectLI.dataset.projectId
    loadInbox(projects[projectIndex][[title]])
}

function deleteAddProjectLI() {
    const addProjectLI = document.querySelector('li.add-project');
    addProjectLI.remove()
}

function getProjectToDos(title) {

}