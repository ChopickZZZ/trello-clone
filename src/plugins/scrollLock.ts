const scrollLock: Lock = {
   mounted() {
      document.body.style.overflow = 'hidden'
   },
   unmounted() {
      document.body.style.overflow = 'auto'
   }
}

type Lock = {
   mounted(): void,
   unmounted(): void
}

type App = {
   directive: (name: string, dirObj: Lock) => void
}

export default (app: App) => app.directive('lock', scrollLock)
