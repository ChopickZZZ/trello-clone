const ClickOutsideDirective = {
   mounted(el: El, binding: { value: () => void }) {
      el.__ClickHandler__ = (event: any) => {
         if (!(el === event.target || el.contains(event.target))) {
            binding.value()
         }
      }
      document.body.addEventListener('click', el.__ClickHandler__)
   },
   unmounted(el: El) {
      document.body.removeEventListener('click', el.__ClickHandler__)
   }
}

interface El extends HTMLElement {
   __ClickHandler__: (event: any) => void
}

type ClickOutsideDir = {
   mounted(el: El, binding: { value: () => void }): void,
   unmounted(el: El): void
}

type App = {
   directive: (name: string, dirObj: ClickOutsideDir) => void
}

export default (app: App) => {
   app.directive('click-outside', ClickOutsideDirective)
}