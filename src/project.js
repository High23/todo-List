export {createAddProjectLI};

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
    const projectDropDownIcon = document.createElement('img');
    projectDropDownIcon.setAttribute('src', '../src/icons/triangle-down.png');
    projectDropDownIcon.setAttribute('alt', 'Drop down icon');
    projectDropDownIcon.setAttribute('class', 'details');
    projectLI.appendChild(projectName);
    projectLI.appendChild(projectDropDownIcon);
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

function openProject() {

}