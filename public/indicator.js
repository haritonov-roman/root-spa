import { node } from './root.js'

export function indicator({ counter }) {
  return node({
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
