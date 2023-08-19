import { createTask } from "./ToDo";
import { clearTab, deleteAddTaskDiv } from "./UI";
import { loadTodos } from "./storage";
import {format, isToday, isThisWeek, isThisMonth, startOfWeek, endOfWeek} from "date-fns";
import '../style.css'

export {inboxTab, todayTab, weekTab, monthTab, switchTab}

function inboxTab() {
    const inboxTab = document.querySelector('.inbox');
    inboxTab.addEventListener('click', () => {
        const tabTitle = document.querySelector('.title-of-tab');
        tabTitle.innerHTML = 'Inbox'
        clearTab();
        const inbox = JSON.parse(localStorage.getItem('inbox'));
        loadTodos(inbox);
    });
}

function todayTab() {
    const todayTab = document.querySelector('.today');
    todayTab.addEventListener('click', () => {
        let tabName = 'Today';
        clearTab();
        deleteAddTaskDiv();
        getTabToDos(tabName);
        adjustTabInfo(tabName)
    })
}

function weekTab() {
    const weekTab = document.querySelector('.week');
    weekTab.addEventListener('click', () => {
        let tabName = 'Week'
        clearTab();
        deleteAddTaskDiv();
        getTabToDos(tabName)
        adjustTabInfo(tabName)
    })
}
 
function monthTab() {
    const monthTab = document.querySelector('.month');
    monthTab.addEventListener('click', () => {
        let tabName = 'Month';
        clearTab();
        deleteAddTaskDiv();
        getTabToDos(tabName)
        adjustTabInfo(tabName)
    })
}

function switchTab() {
    const tabTitle = document.querySelector('.title-of-tab');
    tabTitle.innerHTML = 'Inbox'
    clearTab();
    const inbox = JSON.parse(localStorage.getItem('inbox'));
    loadTodos(inbox);
}


function getTabToDos(tabName) {
    const inbox = JSON.parse(localStorage.getItem('inbox'));
    const projects = JSON.parse(localStorage.getItem('projects'));
    if (Boolean(inbox[0]) === false && Boolean(projects[0]) === false) return;
    for (let i = 0; i < inbox.length; i++) {
        if (isToday(new Date(inbox[i].dueDate)) && tabName === 'Today') {
            createTask(inbox[i].titleName, 
                inbox[i].dueDate, 
                inbox[i].priority, 
                inbox[i].note,
                '(Inbox)')
        } else if (isThisWeek(new Date(inbox[i].dueDate)) && tabName === 'Week') {
            createTask(inbox[i].titleName, 
                inbox[i].dueDate, 
                inbox[i].priority, 
                inbox[i].note,
                '(Inbox)')
        } else if (isThisMonth(new Date(inbox[i].dueDate)) && tabName === 'Month') {
            createTask(inbox[i].titleName, 
                inbox[i].dueDate, 
                inbox[i].priority, 
                inbox[i].note,
                '(Inbox)')
        }
    }
    if (Boolean(projects[0]) === false) return;
    for (let i = 0; i < projects.length; i++) {
        let projectName = Object.getOwnPropertyNames(projects[i])[0];
        let project = projects[i][[projectName]]
        project.forEach(todo => {
            if (isToday(new Date(todo.dueDate)) && tabName === 'Today') {
                createTask(todo.titleName, 
                            todo.dueDate, 
                            todo.priority, 
                            todo.note,
                            `(${projectName})`)
            } else if (isThisWeek(new Date(todo.dueDate)) && tabName === 'Week') {
                createTask(todo.titleName,
                            todo.dueDate, 
                            todo.priority, 
                            todo.note,
                            `(${projectName})`)
            } else if (isThisMonth(new Date(todo.dueDate)) && tabName === 'Month') {
                createTask(todo.titleName,
                            todo.dueDate, 
                            todo.priority, 
                            todo.note,
                            `(${projectName})`)
            }
        });
    }
}

function adjustTabInfo(tabName) {
    // To understand the format function, visit this website for documentation: https://date-fns.org/v2.30.0/docs/format
    const tabTitle = document.querySelector('.title-of-tab');
    const span = document.createElement('span');
    if (tabName === 'Today') {
        const dateSpan = document.querySelectorAll('.date');
        dateSpan.forEach(span => {
            span.remove()
        });
        tabTitle.textContent = tabName
        span.innerHTML = `${format(new Date(), 'MMM do')}` 
        tabTitle.appendChild(span);
    } else if (tabName === 'Week') {
        tabTitle.textContent = `This ${tabName}`
        span.innerHTML = `${format(startOfWeek(new Date()), 'MM/dd')} - ${format(endOfWeek(new Date()), 'MM/dd')}`
        tabTitle.appendChild(span);
    } else if (tabName === 'Month') {
        tabTitle.innerHTML = `This ${tabName}`
        span.innerHTML = `${format(new Date(), 'MMMM')}`;
        tabTitle.appendChild(span)
    }
}
