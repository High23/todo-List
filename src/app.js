import { format } from "date-fns";

export {CreateToDo, updateID, hideAllOtherEditBTNs, unHideAllEditBTNs, toggleAllTasksEditBTNs, toggleAllProjectsEditBTNs};


function CreateToDo(submittedForm) {
    const titleName = submittedForm[0].childNodes[3].value;
    let dueDate = submittedForm[1].childNodes[3].value;
    dueDate = dueDate.split('-')
    dueDate = format(new Date(dueDate[0], dueDate[1] - 1, dueDate[2]), 'MM/dd/yyyy')
    const priority = submittedForm[2].childNodes[3].value;
    const note = submittedForm[3].childNodes[3].value;
    return {titleName, dueDate, priority, note};
}

function updateID(element, type='') {
    if (type === 'task') {
        const tasks = document.querySelectorAll('.task')
        tasks.forEach((task, index) =>{
            task.dataset.id = index;
        })
        return;
    }
    return Number(element.dataset.id);
}

function hideAllOtherEditBTNs(clickedButton, type) {
    if (type === 'task') {
        const allTasksEditBTN = document.querySelectorAll('.priority-edit-container > .edit');
        let totalBTNCount = allTasksEditBTN.length
        for (let i = 0; i < totalBTNCount; i++) {
            let button = allTasksEditBTN[i];
            if (!(button === clickedButton)) {
                button.classList.add('hidden');
            }
        }
    } else if (type === 'project') {
        const allProjectsEditBTN = document.querySelectorAll('.project-drop-down-buttons > .edit');
        let totalBTNCount = allProjectsEditBTN.length
        for (let i = 0; i < totalBTNCount; i++) {
            let button = allProjectsEditBTN[i];
            if (!(button === clickedButton)) {
                button.classList.add('hidden');
            }
        }
    }
}

function unHideAllEditBTNs(type) {
    if (type === 'task') {
        const allTasksEditBTN = document.querySelectorAll('.priority-edit-container > .edit');
        allTasksEditBTN.forEach((button) => {
            button.classList.remove('hidden')
        });
    } else if (type === 'project') {
        const allProjectsEditBTN = document.querySelectorAll('.project-drop-down-buttons > .edit');
        allProjectsEditBTN.forEach((button) => {
            button.classList.remove('hidden')
        });
    }
}

function toggleAllTasksEditBTNs(type='') {
    const allTasksEditBTN = document.querySelectorAll('.priority-edit-container > .edit');
    if (type === 'hide'){
        allTasksEditBTN.forEach((button) => {
            button.classList.add('hidden')
        });
    } else {
        allTasksEditBTN.forEach((button) => {
            button.classList.remove('hidden')
        });
    }
}

function toggleAllProjectsEditBTNs(type='') {
    const allProjectsEditBTN = document.querySelectorAll('.project-drop-down-buttons > .edit');
    if (type === 'hide'){
        allProjectsEditBTN.forEach((button) => {
            button.classList.add('hidden')
        });
    } else {
        allProjectsEditBTN.forEach((button) => {
            button.classList.remove('hidden')
        });
    }
}