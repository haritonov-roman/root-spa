'use strict'
import { app, Node } from './root.js'
import { btn } from './btn.js';

app(new Node({
  name: 'div',
  attributes: [
    {
      name: 'class',
      value: 'app'
    }
  ],
  children: [
    btn({ text: 'start' })
  ]
}).node);
