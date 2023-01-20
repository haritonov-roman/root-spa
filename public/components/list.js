import { rootElem, rootRef } from '../root/api.js'
import { counter } from './counter.js';
import { listItem } from './listItem.js'

export function list() {
  const counter1 = rootRef(0);

  const values = [
    'text1',
    'text2',
    'text3'
  ]

  return rootElem({
    name: 'list',
    attributes: [
      {
        name: 'class',
        value: 'list'
      }
    ],
    children: [
      counter({
        test: function (value) {
          counter1.value = value;
        }
      }),
      ...values.map((item) => {
        return listItem({
          text: item,
          data: counter1
        })
      })
    ]
  })
}
