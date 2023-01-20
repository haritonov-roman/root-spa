import { rootElem } from '../root/api.js'

export function indicator({ counter }) {
  return rootElem({
    name: 'indicator',
    attributes: [
      {
        name: 'class',
        value: 'indicator'
      }
    ],
    content: counter
  })
}
