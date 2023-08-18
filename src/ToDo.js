export {createTask, getTaskID}

function createTask(title, dueDate, priority, note, id, origin = '') {
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
    return tasks.length;
}

function deleteDetails(taskLI) {
    taskLI.childNodes[2].remove()
}

function createDetails(priority, note, id, taskDropDownIcon) {
    // This loop simply gets the correct task li element
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
    const noteText = taskLI.childNodes[2].childNodes[0];
    noteText.innerHTML = `Note: ${note}`;
    const prioritySpan = taskLI.childNodes[2].childNodes[1].childNodes[0];
    prioritySpan.innerHTML = `Priority: ${priority}`;
    viewDetails(taskDropDownIcon, taskLI);
}
