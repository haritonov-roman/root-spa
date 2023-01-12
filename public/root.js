export function app(node) {
  document.querySelector('body').prepend(node);
}

export class Root {
  constructor() {}
}

export class Node {
  parent = null

  constructor({ name, attributes = [], events = [], content = '', children = [] }) {
    this.name = name;
    this.attributes = attributes;
    this.events = events;
    this.children = children;

    this.rf();

    this.content = content;
  }

  get content() {
    return this._content;
  }

  set content(newValue) {
    if (typeof newValue === 'object') {
      newValue.subsribeObj(this);

      this._content = newValue.value;
    } else {
      this._content = newValue;
    }

    this.update();
  }

  update() {
    this.contentNode.innerText = this.content;
  }

  rf() {
    this.node = document.createElement(this.name)
    this.contentNode = document.createElement('span') // TODO: Неуклюжее решение создающее ненужную обертку

    this.node.append(this.contentNode);

    if (this.attributes.length) {
      this.attributes.forEach((attr) => {
        this.node.setAttribute(attr.name, attr.value);
      })
    }

    if (this.events.length) {
      this.events.forEach((event) => {
        this.node.addEventListener(event.name, () => {
          event.callback.call(this);
        })
      })
    }

    if (this.children.length) {
      this.children.forEach((child) => {
        child.setParent(this);

        this.node.append(child.node);
      })
    }
  }

  setParent(object) {
    this.parent = object;
  }

  emit(event) {
    console.log(this.name, event);
  }
}

export class ReValue {
  subscribers = []

  constructor(defaultValue) {
    this._value = defaultValue;
  }

  get value() {
    return this._value;
  }

  set value(newValue) {
    this._value = newValue;

    this.subscribers.forEach((item) => {
      item.content = this._value;
    });
  }

  subsribeObj(object) {
    this.subscribers.push(object);
  }
}
