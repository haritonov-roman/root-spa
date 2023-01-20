import { rootElem } from '../root/api.js'

export function title({ title }) {
  return rootElem({
    name: 'title',
    attributes: [
      {
        name: 'class',
        value: 'title'
      }
    ],
    content: title
  })
}
