import * as $ from 'jquery'

function createAnalytics() {
  let isDestroyed: boolean = false  // TypeScript syntax
  let counter = 0

  const listener = () => counter++

  $(document).on('click', listener) // document.addEventListener('click', listener)

  return {
    destroy() {
      document.removeEventListener('click', listener)
      isDestroyed = true
    },
    getClicked() {
      if (isDestroyed) console.log(`Analytics destroyed! Totla clicks = ${counter}`)
      return counter
    },
  }
}
window['analytics'] = createAnalytics()
