import './style.css'
import App from './App.vue'
import router from './router'
import scrollLock from './plugins/scrollLock'
import focus from './plugins/focus'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { auth } from './firebase';
import { useUsersStore } from './stores/users'
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

auth.onAuthStateChanged(user => {
   if (user) {
      useUsersStore().fetchAuthUser()
   }
})
const trelloApp = createApp(App)

trelloApp
   .component('fa-icon', FontAwesomeIcon)
   .use(router)
   .use(scrollLock)
   .use(focus)
   .use(createPinia())

trelloApp.mount('#app')


