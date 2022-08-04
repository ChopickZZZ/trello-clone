const focusDirective: Focus = {
   mounted(el: HTMLElement) {
      el.focus()
   }
}

type Focus = {
   mounted(el: HTMLElement): void,
}

type App = {
   directive: (name: string, dirObj: Focus) => void
}

export default (app: App) => app.directive('focus', focusDirective)
