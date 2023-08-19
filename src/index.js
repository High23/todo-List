import { setLocalStorageItemsOnPageLoad, checkLocalStorageOnPageLoad } from './storage';
import { createLayout } from './UI';
import './style.css'

createLayout();
setLocalStorageItemsOnPageLoad();
checkLocalStorageOnPageLoad();
