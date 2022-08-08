import './style.css'
import App from './App.vue'
import router from './router'
import scrollLock from './plugins/scrollLock'
import focus from './plugins/focus'
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
   faPlus,
   faCaretDown
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faEllipsis, faClock, faCalendarCheck, faT, faBarsStaggered, faCalendarDays, faCircleCheck, faTrashCan, faTag, faXmark, faPlus, faCaretDown)

const trelloApp = createApp(App)

trelloApp
   .component('fa-icon', FontAwesomeIcon)
   .use(createPinia())
   .use(router)
   .use(scrollLock)
   .use(focus)

trelloApp.mount('#app')


