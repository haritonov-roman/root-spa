import { rootElem } from '../root/api.js';
import { nav } from '../components/nav.js';
import { title } from '../components/title.js';
import { list } from '../components/list.js';

export function aboutPage() {
  return rootElem({
    name: 'aboutPage',
    attributes: [
      {
        name: 'class',
        value: 'page'
      }
    ],
    children: [
      nav(),
      title({
        title: 'About'
      }),
      list()
    ]
  });
}