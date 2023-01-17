import { rootElem, rootRef, rootComp } from './root/api.js'
import { btn } from './btn.js';
import { indicator } from './indicator.js';

export function mainPage() {
  const counter1 = rootRef(0);
  const counter2 = rootRef(0);

  const compData = rootComp(function () {
    return `${counter1.value}_${counter2.value}`
  }, [counter1, counter2])

  const page = rootElem({
    name: 'mainPage',
    attributes: [
      {
        name: 'class',
        value: 'main'
      }
    ],
    children: [
      btn({
        test: function (value) {
          counter1.value = value;
        }
      }),
      btn({
        test: function (value) {
          counter2.value = value;
        }
      }),
      indicator({
        counter: compData
      })
    ]
  });

  // console.dir(page);

  return page
}
