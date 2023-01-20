import { rootElem } from '../root/api.js'

export function btn({ text, go }) {
  return rootElem({
    name: 'btn',
    tagName: 'button',
    attributes: [
      {
        name: 'class',
        value: 'btn'
      }
    ],
    content: text,
    events: [
      {
        name: 'click',
        callback: function () {
          this.emit('go');
        }
      }
    ],
    handlers: {
      go
    }
  });
}
