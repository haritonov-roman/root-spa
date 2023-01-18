import { rootElem } from './root/api.js'
import { nav } from './nav.js';
import { title } from './title.js';
import { counters } from './counters.js';

export function mainPage() {
  return rootElem({
    name: 'mainPage',
    attributes: [
      {
        name: 'class',
        value: 'page'
      }
    ],
    children: [
      nav(),
      title({
        title: 'Home'
      }),
      counters()
    ]
  });
}
