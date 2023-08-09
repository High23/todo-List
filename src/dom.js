import {addTodosToProject, removeTodosFromProject, removeProject} from "./app";

addTodosToProject();

setTimeout(() => {
    removeTodosFromProject();
}, 10000);

setTimeout(() => {
    removeProject();
}, 20000);