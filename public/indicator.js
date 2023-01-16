import { Node } from './root.js'

export function indicator({ counter }) {
  return new Node({
    name: 'indicator',
    attributes: [
      {
        name: 'class',
        value: 'indicator'
      }
    ],
    value: counter
  })
}
