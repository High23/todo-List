export { setLocalStorageItemsOnPageLoad, addToDoToInbox }

function setLocalStorageItemsOnPageLoad() {
    localStorage.setItem('high', 'red');
    localStorage.setItem('medium', '#fbbf24');
    localStorage.setItem('low', 'blue');
    if (Boolean(localStorage.getItem('inbox')) === false) {
        localStorage.setItem("inbox", JSON.stringify([]))
        localStorage.setItem('projects', JSON.stringify([]));
    }
}

function addToDoToInbox(todo) {
    let inbox = JSON.parse(localStorage.getItem('inbox'));
    inbox.push(todo)
    localStorage.setItem("inbox", JSON.stringify(inbox))
}