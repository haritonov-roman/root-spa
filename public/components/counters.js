import { rootElem, rootRef, rootComp } from '../root/api.js'
import { counter } from './counter.js';
import { indicator } from './indicator.js';

export function counters() {
  const counter1 = rootRef(0);
  const counter2 = rootRef(0);

  const compData = rootComp(function () {
    return `${counter1.value}_${counter2.value}`
  }, [counter1, counter2])

  return rootElem({
    name: 'counters',
    attributes: [
      {
        name: 'class',
        value: 'counters'
      }
    ],
    children: [
      counter({
        test: function (value) {
          counter1.value = value;
        }
      }),
      counter({
        test: function (value) {
          counter2.value = value;
        }
      }),
      indicator({
        counter: compData
      })
    ]
  })
}
