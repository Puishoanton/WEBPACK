async function babel() {
  return await Promise.resolve('hello babel')
}
babel().then(console.log)

const unused = 42

class Util {
  static id = Date.now()
}

import('lodash').then(() => {
  console.log('Lodash', _.random(0, 42, true))
})

console.log('Unit id', Util.id)
