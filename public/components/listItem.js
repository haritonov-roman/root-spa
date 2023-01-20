import { rootElem, rootComp } from '../root/api.js'

export function listItem({ text, data }) {
  const compData = rootComp(function () {
    return `${text}: ${data.value}`
  }, [data])

  return rootElem({
    name: 'listItem',
    attributes: [
      {
        name: 'class',
        value: 'list-item'
      }
    ],
    content: compData
  })
}
