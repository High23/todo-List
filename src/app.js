export {CreateToDo};


function CreateToDo(submittedForm, getTaskID) {
    const id = getTaskID;
    const titleName = submittedForm[0].childNodes[3].value;
    const dueDate = submittedForm[1].childNodes[3].value;
    const priority = submittedForm[2].childNodes[3].value;
    const note = submittedForm[3].childNodes[3].value;
    const todo = {id, titleName, dueDate, priority, note}
    return todo;
}

