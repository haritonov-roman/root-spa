import { rootElem } from '../root/api.js'
import { nav } from '../components/nav.js';
import { title } from '../components/title.js';
import { counters } from '../components/counters.js';

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
