import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faLock, faGauge, faChartBar, faPlus, faPen, faTrash, faCheck, faTimes, faMoon, faSun, faCreditCard, faPlay, faBook, faShoppingCart, faRightFromBracket, faBell, faCog, faUsers, faVideo, faWallet, faEye, faEyeSlash, faChevronLeft, faChevronRight, faSpinner, faBars, faTachometerAlt, faClock, faTag, faCircleCheck, } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faUser, faLock, faGauge, faChartBar, faPlus, faPen, faTrash, faCheck, faTimes, faMoon, faSun, faCreditCard, faPlay, faBook, faShoppingCart, faRightFromBracket, faBell, faCog, faUsers, faVideo, faWallet, faEye, faEyeSlash, faChevronLeft, faChevronRight, faSpinner, faBars, faTachometerAlt, faClock, faTag, faCircleCheck);
export function configureIcons(app) {
    app.component('FontAwesomeIcon', FontAwesomeIcon);
}
