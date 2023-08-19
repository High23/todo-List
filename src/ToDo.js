import { deleteAddTaskDiv, createAddTaskDiv } from "./UI";
import { CreateToDo, updateID } from "./app";

export {createTask}

function createTask(title, dueDate, priority, note, origin = '') {
    const todosUL = document.querySelector('.todos');
    const task = document.createElement('li');
    task.setAttribute('class', 'task');
    const form = document.createElement('form');
    form.setAttribute('class', 'check');
    form.innerHTML = `<label for="mark-task"></label>
                      <input type="radio" name="mark-task" id="mark-task">`
    const taskTitle = document.createElement('span');
    taskTitle.innerHTML = title;
    const originSpan = document.createElement('span');
    originSpan.innerHTML = origin;
    originSpan.setAttribute('class', 'origin');
    // Sets the todo's check mark border-color based on priority
    form.childNodes[2].style['border-color'] = localStorage.getItem(priority);
    form.appendChild(taskTitle);
    form.appendChild(originSpan);
    task.appendChild(form);
    const span = document.createElement('span');
    const dateSpan = document.createElement('span');
    dateSpan.setAttribute('class', 'date');
    dateSpan.innerHTML = dueDate;
    const taskDropDownIcon = document.createElement('img');
    taskDropDownIcon.setAttribute('src', '../src/icons/triangle-down.png');
    taskDropDownIcon.setAttribute('alt', 'Drop down icon');
    taskDropDownIcon.setAttribute('class', 'details');
    span.appendChild(dateSpan);
    span.appendChild(taskDropDownIcon);
    task.appendChild(span);
    todosUL.appendChild(task);
    let id = document.querySelectorAll('.task').length - 1;
    task.setAttribute('data-Id', id);
    createToDoDetails(priority, note, id, taskDropDownIcon);
}

function viewToDoDetails(taskDropDownIcon, taskLI) {
    taskDropDownIcon.addEventListener('click', () => {
        taskDropDownIcon.setAttribute('src', '../src/icons/triangle.png');
        if (taskLI.childNodes[2]) {
            taskLI.childNodes[2].classList.toggle('hidden');
            if ('hidden' === taskLI.childNodes[2].classList[1]) {
                taskDropDownIcon.setAttribute('src', '../src/icons/triangle-down.png');
            }
            return;
        } 
    });
}

function createToDoDetails(priority, note, id, taskDropDownIcon) {
    let taskLI = returnProperTaskLI(id)
    const details = document.createElement('div');
    details.setAttribute('class', 'view');
    details.classList.add('hidden');
    details.innerHTML = `<textarea class="note-span" rows="6"></textarea>`
    const div = document.createElement('div');
    div.setAttribute('class', 'priority-edit-container');
    div.innerHTML = `<span></span>`
    const editToDoBTN = document.createElement('button');
    editToDoBTN.innerHTML = 'Edit';
    editToDoBTN.setAttribute('class', 'edit');
    const deleteToDoBTN = document.createElement('button');
    deleteToDoBTN.innerHTML = 'Delete';
    deleteToDoBTN.setAttribute('class', 'delete');
    div.appendChild(editToDoBTN);
    div.appendChild(deleteToDoBTN);
    details.appendChild(div)
    taskLI.appendChild(details);
    const noteText = taskLI.childNodes[2].childNodes[0];
    noteText.innerHTML = `Note: ${note}`;
    const prioritySpan = taskLI.childNodes[2].childNodes[1].childNodes[0];
    prioritySpan.innerHTML = `Priority: ${priority}`;
    viewToDoDetails(taskDropDownIcon, taskLI);
    editToDoBTN.addEventListener('click', () => {
        taskLI.classList.add('hidden');
        deleteAddTaskDiv()
        editToDosInfo(taskLI)
    });
    deleteToDoBTN.addEventListener('click', () => {
        taskLI.remove();
        deleteToDo(taskLI.dataset.id)
        updateID(taskLI, 'task')
    });
    
}

function editToDosInfo(taskLI) {
    const todosUL = document.querySelector('.todos');
    const form = document.createElement('form');
    form.setAttribute('class', 'todo-form')
    form.innerHTML = `
            <div class="title">
                <label for="title">Title:</label>
                <input type="text" name="title" id="title" autofocus autocomplete="off" maxlength="50" placeholder="Take the trash out">
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
            <div class="buttons edit-todo">
                <button type="button" class="submit">Save</button>
                <button type="button" class="cancel">Cancel</button>
            </div>`;
    todosUL.insertBefore(form, taskLI);
    const todoSaveBTN = document.querySelector('.edit-todo > .submit');
    todoSaveBTN.addEventListener('click', () => {
        const submittedForm = document.querySelectorAll('.todo-form > div');
        const tab = document.querySelector('.title-of-tab').textContent;
        const ToDo = CreateToDo(submittedForm);
        let taskIndex = taskLI.dataset.id
        if (tab === 'Inbox') {
            const inbox = JSON.parse(localStorage.getItem('inbox'))
            inbox.splice(taskIndex, 1, ToDo);
            localStorage.setItem('inbox', JSON.stringify(inbox))
        } else { 
            let projects = JSON.parse(localStorage.getItem('projects'));
            const projectsLI = document.querySelectorAll('.project');
            projectsLI.forEach((project, projectIndex) => {
                project = project.childNodes[0].textContent
                if (tab === project) {
                    projects[projectIndex][[tab]].splice(taskIndex, 1, ToDo);
                }
            });
            localStorage.setItem('projects', JSON.stringify(projects));
        }
        taskLI.classList.remove('hidden');
        taskLI.childNodes[0].childNodes[3].textContent = ToDo.titleName;
        const view = taskLI.childNodes[2];
        const details = taskLI.childNodes[1].childNodes[1];
        view.classList.add('hidden');
        details.setAttribute('src', '../src/icons/triangle-down.png');
        form.remove();
        createAddTaskDiv();
    });
    const todoCancelBTN = document.querySelector('.edit-todo > .cancel');
    todoCancelBTN.addEventListener('click', () => {
        taskLI.classList.remove('hidden');
        const view = taskLI.childNodes[2];
        const details = taskLI.childNodes[1].childNodes[1];
        view.classList.add('hidden');
        details.setAttribute('src', '../src/icons/triangle-down.png');
        form.remove();
        createAddTaskDiv();
    });
}

function deleteToDo(id) {
    const tab = document.querySelector('.title-of-tab').textContent;
    if (tab === 'Inbox') {
        const inbox = JSON.parse(localStorage.getItem('inbox'))
        inbox.splice(id, 1);
        localStorage.setItem('inbox', JSON.stringify(inbox))
    } else { 
        let projects = JSON.parse(localStorage.getItem('projects'));
        const projectsLI = document.querySelectorAll('.project');
        projectsLI.forEach((project, projectIndex) => {
            project = project.childNodes[0].textContent
            if (tab === project) {
                projects[projectIndex][[tab]].splice(id, 1);
            }
        });
        localStorage.setItem('projects', JSON.stringify(projects));
    }
}

function returnProperTaskLI(id) {
    let taskLI = document.querySelectorAll('.task');
    for (let i = 0; i < taskLI.length; i++) {
        if (Number(taskLI[i].dataset.id) === id){
            return taskLI[i];
        }
    }
}