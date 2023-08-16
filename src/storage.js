export { setLocalStorageItemsOnPageLoad }

function setLocalStorageItemsOnPageLoad() {
    localStorage.setItem('high', 'red');
    localStorage.setItem('medium', '#fbbf24');
    localStorage.setItem('low', 'blue');
    if (Boolean(localStorage.getItem('inbox')) === false) {
        localStorage.setItem("inbox", JSON.stringify([]))
        localStorage.setItem('projects', JSON.stringify([]));
    }
}