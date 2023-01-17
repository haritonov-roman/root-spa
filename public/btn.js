import { rootElem, rootRef, rootComp } from './root/api.js'

export function btn({ test }) {
  const pRef = rootRef(0);

  const pComp = rootComp(function () {
    return `click: ${pRef.value}`
  }, [pRef]);

  const color = rootRef(false);

  const pColor = rootComp(function () {
    const cssClass = {
      'btn': true,
      'btn_red': color.value
    }

    const result = []

    for (let key in cssClass) {
      if (cssClass[key]) {
        result.push(key);
      }
    }

    return result.join(' ')
  }, [color])

  return rootElem({
    name: 'btn',
    tagName: 'button',
    attributes: [
      {
        name: 'class',
        value: pColor
      }
    ],
    content: pComp,
    events: [
      {
        name: 'click',
        callback: function () {
          pRef.value++;

          color.value = !color.value;

          this.emit('test', pRef.value);
        }
      }
    ],
    handlers: {
      test
    }
  });
}
