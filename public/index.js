'use strict'
import { root } from './root/api.js';
import { mainPage } from './main.js';
import { aboutPage } from './about.js';


root({
  pages: [
    {
      path: '#/',
      page: mainPage
    },
    {
      path: '#/about',
      page: aboutPage
    }
  ]
});