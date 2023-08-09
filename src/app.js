export {addTodosToProject, removeTodosFromProject, removeProject};


const ToDo = (title, dueDate, priority, notes, checkList) => {
    const items = {
        title,
        dueDate,
        priority,
        notes,
        checkList
    }
    return items
}

const Project = () => { 
    return {list : []}
}

let project = Project();

function addTodosToProject() {
    const todo = ToDo("Title", "due date", "priority", "notes", false);
    const todo2 = ToDo("Title", "due date", "priority", "notes", false);
    project.list.push(todo)
    project.list.push(todo2)
    console.table(project.list);
}

function removeTodosFromProject() {
    project.list.splice(0, 1);
    console.table(project.list);
}

function removeProject() {
    project = [];
    console.table(project);
}

