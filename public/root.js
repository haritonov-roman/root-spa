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

class ProxiRef {
  subscribers = []

  constructor(value) {
    this.value = value;
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

export function proxiRef(defaultValue) {
  return new Proxy(new ProxiRef(defaultValue), {
    set(target, value, newValue) {
      target[value] = newValue;

      target.notifySubsribers(target[value]);

      return true;
    }
  })
}

export function proxiComp(fn, subs) {
  const comp = new Proxy(new ProxiRef(fn), {
    get(target, value) {
      if (value === 'value') {
        return target[value]();
      } else {
        return target[value];
      }
    },
    set(target, value) {
      target.notifySubsribers(target[value]());
      return true;
    }
  });

  console.log(fn);

  subs.forEach((sub) => {
    sub.subsribeObj(comp);
  });

  return comp
}