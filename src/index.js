import { setLocalStorageItemsOnPageLoad, checkLocalStorageOnPageLoad } from './modules/storage';
import { createLayout } from './modules/UI';
import './style.css'

createLayout();
setLocalStorageItemsOnPageLoad();
checkLocalStorageOnPageLoad();
