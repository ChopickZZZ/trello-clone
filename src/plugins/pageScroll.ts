import debounce from 'lodash/debounce'

const PageScrollDirective = {
   mounted(el: El, binding: { value: () => void }) {
      el.__ScrollHandler__ = debounce(() => binding.value(), 250, { leading: true })
      window.addEventListener('scroll', el.__ScrollHandler__)
   },
   unmounted(el: El) {
      window.removeEventListener('scroll', el.__ScrollHandler__)
   }
}

interface El extends HTMLElement {
   __ScrollHandler__: (event: any) => void
}

type PageScroll = {
   mounted(el: El, binding: { value: () => void }): void,
   unmounted(el: El): void
}

type App = {
   directive: (name: string, dirObj: PageScroll) => void
}

export default (app: App) => {
   app.directive('page-scroll', PageScrollDirective)
}