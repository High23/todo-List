export {createTask}

function createTask(title, dueDate, priority, note) {
    const todosUL = document.querySelector('.todos');
    const task = document.createElement('li');
    task.setAttribute('class', 'task');
    const form = document.createElement('form');
    form.setAttribute('class', 'check');
    form.innerHTML = `<label for="mark-task"></label>
                      <input type="radio" name="mark-task" id="mark-task">`
    const taskTitle = document.createElement('span');
    taskTitle.innerHTML = title;
    // Sets the todo's check mark border-color based on priority
    form.childNodes[2].style['border-color'] = localStorage.getItem(priority);
    form.appendChild(taskTitle);
    task.appendChild(form);
    const span = document.createElement('span');
    const dateSpan = document.createElement('span');
    const taskDropDownIcon = document.createElement('img');
    dateSpan.innerHTML = dueDate;
    taskDropDownIcon.setAttribute('src', '../src/icons/triangle-down.png');
    taskDropDownIcon.setAttribute('alt', 'Drop down icon');
    taskDropDownIcon.setAttribute('class', 'details');
    span.appendChild(dateSpan);
    span.appendChild(taskDropDownIcon);
    task.appendChild(span);
    todosUL.appendChild(task);
    let id = getTaskID();
    task.setAttribute('data-task-number', id);
    createDetails(priority, note, id, taskDropDownIcon);
}

function viewDetails(taskDropDownIcon, taskLI) {
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

function getTaskID() {
    const tasks = document.querySelectorAll('.task');
    return tasks.length - 1;
}

function deleteDetails(taskLI) {
    taskLI.childNodes[2].remove()
}

function createDetails(priority, note, id, taskDropDownIcon) {
    let taskLI = document.querySelectorAll('.task');
    for (let i = 0; i < taskLI.length; i++) {
        if (Number(taskLI[i].dataset.taskNumber) === id){
            taskLI = taskLI[i];
            break;
        }
    }
    const details = document.createElement('div');
    details.setAttribute('class', 'view');
    details.classList.add('hidden');
    details.innerHTML = `<textarea class="note-span" rows="6"></textarea>`
    const div = document.createElement('div');
    div.setAttribute('class', 'priority-edit-container');
    div.innerHTML = `<span></span>
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>`
    details.appendChild(div)
    taskLI.appendChild(details);
    const noteText = document.querySelectorAll('textarea.note-span');
    noteText[id].innerHTML = `Note: ${note}`;
    const prioritySpan = document.querySelectorAll('.priority-edit-container > span');
    prioritySpan[id].innerHTML = `Priority: ${priority}`;
    viewDetails(taskDropDownIcon, taskLI);
}