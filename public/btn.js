import { Node, proxiRef, proxiComp } from './root.js'

export function btn({ test }) {
  const pRef = proxiRef(0);

  const pComp = proxiComp(function () {
    return `${pRef.value}_btn`
  }, [pRef])

  return new Node({
    name: 'btn',
    tagName: 'button',
    attributes: [
      {
        name: 'class',
        value: 'btn'
      }
    ],
    value: pComp,
    events: [
      {
        name: 'click',
        callback: function () {
          pRef.value++;

          this.emit('test', pRef.value);
        }
      }
    ],
    handlers: {
      test
    }
  })
}
