import { Node, ReValue } from './root.js'

export function btn(params) {
  const rData = new ReValue(0);

  return new Node({
    name: 'button',
    attributes: [
      {
        name: 'class',
        value: 'btn'
      }
    ],
    content: rData,
    events: [
      {
        name: 'click',
        callback: function () {
          rData.value++;

          this.emit('test');
        }
      }
    ]
  })
}
