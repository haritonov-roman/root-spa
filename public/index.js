'use strict'
import { root } from './root/api.js';
import { mainPage } from './pages/main.js';
import { aboutPage } from './pages/about.js';


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