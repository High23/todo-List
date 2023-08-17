import { clearTab } from "./UI";
import { loadTodos } from "./storage";

export {inboxTab}

function inboxTab() {
    const inboxTab = document.querySelector('.sidebar-tab, .inbox');
    inboxTab.addEventListener('click', () => {
        clearTab();
        const inbox = JSON.parse(localStorage.getItem('inbox'));
        loadTodos(inbox);
    });
}
