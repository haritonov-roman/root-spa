import { Node, ReValue, CompValue } from './root.js'

export function btn({ test }) {
  const rData = new ReValue(0);

  const compData = new CompValue(function() {
    return `${rData.value}_btn`
  }, [rData])

  return new Node({
    name: 'btn',
    tagName: 'button',
    attributes: [
      {
        name: 'class',
        value: 'btn'
      }
    ],
    value: compData,
    events: [
      {
        name: 'click',
        callback: function () {
          rData.value++;

          this.emit('test', rData.value);
        }
      }
    ],
    handlers: {
      test
    }
  })
}
