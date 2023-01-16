export function root(config) {
  return new Root(config).create()
}

class Root {
  constructor({ pages = [] }) {
    this.pages = pages;
  }

  create() {
    this.node = document.createElement('div');

    document.querySelector('body').prepend(this.node);

    this.node.append(this.pages[0].node);

    return this.node
  }
}

export class Node extends Root {
  parent = null
  contentNode = null

  constructor({ name, tagName = 'div', attributes = [], events = [], value = '', children = [], handlers = {} }) {
    super({});
    this.name = name;
    this.tagName = tagName;
    this.attributes = attributes;
    this.events = events;
    this.children = children;
    this.handlers = handlers;
    this.value = value;

    this.render(value);
    this.update();
  }

  get value() {
    return this._value;
  }

  set value(newValue) {
    if (typeof newValue === 'object') {
      newValue.subsribeObj(this);

      this._value = newValue.value;
    } else {
      this._value = newValue;
    }
    
    this.update();
  }

  update() {
    if (this.contentNode) {
      this.contentNode.innerText = this.value;
    }
  }

  render(value) {
    this.node = document.createElement(this.tagName)

    if (value) {
      this.contentNode = document.createElement('span')
      this.node.append(this.contentNode);
    }

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

  emit(event, payload) {   
    this.handlers[`${event}`](payload);
  }
}

export class Page extends Node {
  // constructor({ name, attributes, events, content, children, handlers }) {
  //   super({ name, attributes, events, content, children, handlers });
  // }
}

export class Reflection {
  _value = null
  subscribers = []

  constructor(value) {
    this._value = value
  }

  get value() {
    return this.getValue()
  }

  set value(newValue) {
    this.setValue(newValue);
  }

  getValue() {
    return this._value
  }

  setValue(newValue) {
    this._value = newValue;
  }

  subsribeObj(object) {
    this.subscribers.push(object);
  }

  notifySubsribers(value) {
    this.subscribers.forEach((item) => {
      item.value = value;
    });
  }
}

export class ReValue extends Reflection {
  setValue(setValue) {
    super.setValue(setValue);
    this.notifySubsribers(this._value);
  }
}

export class CompValue extends Reflection {
  constructor(value, subs) {
    super(value);

    subs.forEach((sub) => {
      sub.subsribeObj(this);
    })
  }

  getValue() {
    return this._value();
  }

  setValue() {
    this.notifySubsribers(this._value);
  }

  notifySubsribers(value) {
    this.subscribers.forEach((item) => {
      item.value = value();
    });
  }
}
