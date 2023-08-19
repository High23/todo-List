import { format } from "date-fns";

export {CreateToDo, updateID};


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

