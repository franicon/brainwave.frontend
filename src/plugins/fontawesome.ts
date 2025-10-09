import type { App } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faUser,
  faLock,
  faGauge,
  faChartBar,
  faPlus,
  faPen,
  faTrash,
  faCheck,
  faTimes,
  faMoon,
  faSun,
  faCreditCard,
  faPlay,
  faBook,
  faShoppingCart,
  faRightFromBracket,
  faBell,
  faCog,
  faUsers,
  faVideo,
  faWallet,
  faEye,
  faEyeSlash,
  faChevronLeft,
  faChevronRight,
  faSpinner,
  faBars,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faUser,
  faLock,
  faGauge,
  faChartBar,
  faPlus,
  faPen,
  faTrash,
  faCheck,
  faTimes,
  faMoon,
  faSun,
  faCreditCard,
  faPlay,
  faBook,
  faShoppingCart,
  faRightFromBracket,
  faBell,
  faCog,
  faUsers,
  faVideo,
  faWallet,
  faEye,
  faEyeSlash,
  faChevronLeft,
  faChevronRight,
  faSpinner,
  faBars 
)

export function configureIcons(app: App<Element>) {
  app.component('FontAwesomeIcon', FontAwesomeIcon)
}
