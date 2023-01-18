import { rootElem } from './root/api.js'
import { btn } from './btn.js';

export function nav() {
  return rootElem({
    name: 'nav',
    attributes: [
      {
        name: 'class',
        value: 'nav'
      }
    ],
    children: [
      btn({
        text: 'Home',
        go: function () {
          window.location.hash = '#/'
        }
      }),
      btn({
        text: 'About',
        go: function () {
          window.location.hash = '#/about'
        }
      })
    ]
  })
}
