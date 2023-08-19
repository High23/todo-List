import { checkIfProjectExists, addProjectToStorage, loadTodos } from "./storage";
import { clearTab } from "./UI";
import { switchTab } from "./tabs";
import {updateID, hideAllOtherEditBTNs, unHideAllEditBTNs} from "./app";

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
    projectName.innerHTML = title;
    projectsUl.append(projectLI);
    const projectID = document.querySelectorAll('.project').length - 1;
    projectLI.setAttribute('data-Id', projectID);
    projectName.addEventListener('click', () => {
        clearTab()
        title = projectName.innerHTML
        openProject(title, projectLI);
    });
    
    createProjectDetails(projectID, projectDropDownIcon, projectLI)
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


function openProject(title, projectLI) {
    const tabTitle = document.querySelector('.title-of-tab');
    tabTitle.innerHTML = title;
    let projects = JSON.parse(localStorage.getItem('projects'));
    let projectIndex = projectLI.dataset.id
    loadTodos(projects[projectIndex][[title]])
}

function deleteAddProjectLI() {
    const addProjectLI = document.querySelector('li.add-project');
    addProjectLI.remove()
}

function createProjectDetails(id, dropDownIcon) {
    let projectLI = returnProperProjectLI(id)
    const projects = document.querySelectorAll('.project');
    const div = document.createElement('div');
    div.classList.add('project-drop-down-buttons', 'hidden');
    const editBTN = document.createElement('button');
    editBTN.innerHTML = 'Edit';
    editBTN.setAttribute('class', 'edit');
    const deleteBTN = document.createElement('button');
    deleteBTN.innerHTML = 'Delete';
    deleteBTN.setAttribute('class', 'delete');
    div.appendChild(editBTN);
    div.appendChild(deleteBTN);
    projects[id].appendChild(div);
    viewProjectDetails(dropDownIcon, projectLI)
    editBTN.addEventListener('click', () => {
        id = updateID(projectLI)
        hideAllOtherEditBTNs(editBTN, 'project')
        editProjectNameForm(id)
        
    });
    deleteBTN.addEventListener('click', () => {
        id = updateID(projectLI)
        deleteProject(id)
        switchTab()
    });
}

function viewProjectDetails(dropDownIcon, projectLI) {
    dropDownIcon.addEventListener('click', () => {
        dropDownIcon.setAttribute('src', '../src/icons/triangle.png');
        if (projectLI.childNodes[2]) {
            projectLI.childNodes[2].classList.toggle('hidden');
            if ('hidden' === projectLI.childNodes[2].classList[1]) {
                dropDownIcon.setAttribute('src', '../src/icons/triangle-down.png');
            }
            return;
        } 
    });
}

function editProjectNameForm(id) {
    let projectLI = returnProperProjectLI(id);
    const projectNameForm = document.createElement('form');
    projectNameForm.setAttribute('class', 'create-project');
    projectNameForm.innerHTML = 
        `<label for="input-project-name"></label>
        <input type="text" name="project-name" id="input-project-name" maxlength="20" autocomplete="off" class="new-name-form" required>
        <div class="project-form-buttons new-name">
            <button class="submit" type="button">Save</button>
            <button class="cancel" type="button">Cancel</button>
        </div>`;
    toggleHidden(projectLI)
    projectLI.insertBefore(projectNameForm, projectLI.childNodes[0]);
    newNameCancelBTN(projectNameForm, projectLI)
    newNameSubmitBTN(projectNameForm, projectLI, id)  
}

function deleteProject(id) {
    let projects = JSON.parse(localStorage.getItem('projects'))
    let project = returnProperProjectLI(id);
    project.remove()
    projects.splice(id, 1)
    localStorage.setItem('projects', JSON.stringify(projects))
    updateProjectId()
}

function returnProperProjectLI(id) {
    let projectLI = document.querySelectorAll('.project');
    for (let i = 0; i < projectLI.length; i++) {
        if (Number(projectLI[i].dataset.id) === id){
            return projectLI[i];
        }
    }
}

function newNameCancelBTN(projectNameForm, projectLI) {
    const newNameCancelBTN = document.querySelector('.new-name > button.cancel');
    newNameCancelBTN.addEventListener('click', () => {
        projectNameForm.remove();
        toggleHidden(projectLI)
        unHideAllEditBTNs('project');
    });
}

function newNameSubmitBTN(projectNameForm, projectLI, id) {
    const newNameSubmitBTN = document.querySelector('.new-name > button.submit');
    newNameSubmitBTN.addEventListener('click', () => {
        if (checkIfProjectExists(projectNameForm.childNodes[2].value)) {
            alert('Projects must have different names')
            return;
        } else {
            
            if (Boolean(projectNameForm.childNodes[2].value) === false) {
                alert('Projects must have a name')
                return;
            }
            projectNameForm.remove();
            projectLI.childNodes[0].classList.toggle('hidden')
            projectLI.childNodes[1].classList.toggle('hidden')
            projectLI.childNodes[1].setAttribute('src', '../src/icons/triangle-down.png');
            insertNewProjectName(projectNameForm, projectLI, id);
            clearTab();
            openProject(projectNameForm.childNodes[2].value, projectLI);
            unHideAllEditBTNs('project');
        }
    });
}

function insertNewProjectName(projectNameForm, projectLI, id) {
    let project = JSON.parse(localStorage.getItem('projects'))
    let projectName = projectLI.childNodes[0].innerHTML
    let newProjectName = projectNameForm.childNodes[2].value
    const newProject = {[newProjectName]: []}
    for (let i = 0; i < project[id][projectName].length; i++) {
        newProject[newProjectName].push(project[id][[projectName]][i])
    }
    project.splice(id, 1);
    project.splice(id, 0, newProject);
    localStorage.setItem('projects', JSON.stringify(project))
    projectLI.childNodes[0].innerHTML = projectNameForm.childNodes[2].value;
}

function toggleHidden(projectLI) {
    for (let i = 0; i < projectLI.childNodes.length; i++) {
        projectLI.childNodes[i].classList.toggle('hidden')
    }
}

function updateProjectId() {
    const projectLIs = document.querySelectorAll('.project')
    if (projectLIs === false) return;
    projectLIs.forEach((project, value) => {
        project.setAttribute('data-Id', value)
    })
}