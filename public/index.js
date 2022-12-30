'use strict'
import { input } from './input.js';
import { btn } from './btn.js';

function app() {
  const app = document.querySelector('.app');
  const container = document.createElement('span');

  const state = {
    value: '1'
  }

  const updateView = function () {
    container.innerText = state.value;
  }

  const renderApp = function () {
    updateView();

    app.append(container);
    app.append(cInput);
    app.append(cBtn);
  }

  const modState = function (param) {
    state.value = param

    updateView();
  }

  const cInput = input(state.value, modState);
  const cBtn = btn({
    text: 'start'
  }).template;

  renderApp();
}

app();
