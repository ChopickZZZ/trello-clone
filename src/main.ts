import './style.css'
import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
   faEllipsis,
   faClock,
   faCalendarCheck,
   faT,
   faBarsStaggered,
   faCalendarDays,
   faCircleCheck,
   faTrashCan,
   faTag,
   faXmark
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faEllipsis, faClock, faCalendarCheck, faT, faBarsStaggered, faCalendarDays, faCircleCheck, faTrashCan, faTag, faXmark)

const trelloApp = createApp(App)

trelloApp
   .component('font-awesome-icon', FontAwesomeIcon)
   .use(router)

trelloApp.mount('#app')

