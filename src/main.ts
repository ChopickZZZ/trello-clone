import './style.css'
import App from './App.vue'
import router from './router'
import scrollLock from './plugins/scrollLock'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
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
   faXmark,
   faPlus
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faEllipsis, faClock, faCalendarCheck, faT, faBarsStaggered, faCalendarDays, faCircleCheck, faTrashCan, faTag, faXmark, faPlus)

const trelloApp = createApp(App)

trelloApp
   .component('fa-icon', FontAwesomeIcon)
   .use(router)
   .use(scrollLock)
   .use(createPinia())

trelloApp.mount('#app')


