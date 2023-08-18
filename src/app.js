import { format } from "date-fns";

export {CreateToDo};


function CreateToDo(submittedForm, getTaskID) {
    const id = getTaskID;
    const titleName = submittedForm[0].childNodes[3].value;
    let dueDate = submittedForm[1].childNodes[3].value;
    dueDate = dueDate.split('-')
    dueDate = format(new Date(dueDate[0], dueDate[1] - 1, dueDate[2]), 'MM/dd/yyyy')
    const priority = submittedForm[2].childNodes[3].value;
    const note = submittedForm[3].childNodes[3].value;
    return {id, titleName, dueDate, priority, note};
}

