import { Page, ReValue, CompValue } from './root.js'
import { btn } from './btn.js';
import { indicator } from './indicator.js';

export function mainPage() {
  const counter1 = new ReValue(0);
  const counter2 = new ReValue(0);

  const compData = new CompValue(function () {
    return `${counter1.value}_${counter2.value}`
  }, [counter1, counter2])

  return new Page({
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
  })
}
