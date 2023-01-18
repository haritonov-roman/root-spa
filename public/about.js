import { rootElem } from './root/api.js';
import { nav } from './nav.js';
import { title } from './title.js';

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
    ]
  });
}