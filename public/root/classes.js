export class Root {
  pages = null
  currentPage = null

  constructor({ pages = [] }) {
    this.pages = pages;

    this.checkRoute();
  }

  checkRoute() {
    return window.location.hash
  }

  create() {
    window.location.hash = '#/'

    window.addEventListener('hashchange', () => {
      this.render();
    });

    this.node = document.createElement('root');

    document.querySelector('body').prepend(this.node);

    this.render();

    return this.node
  }

  render() {
    const page = this.pages.find((item) => {
      return item.path === this.checkRoute()
    }).page();

    if (this.currentPage) {
      this.currentPage.replaceWith(page.node);
    } else {
      this.node.append(page.node);
    }

    this.currentPage = page.node;
  }
}

export class RootElem {
  _content = null

  constructor({ name, tagName = 'div', attributes = [], events = [], content = '', children = [], handlers = {} }) {
    this.name = name;
    this.attributes = attributes;
    this.handlers = handlers;

    if (typeof content === 'object') {
      content.subsribeObj(this, 'content');
      this.content = content.value;
    } else {
      this.content = content;
    }

    this.render(tagName, events, children);
  }

  get content() {
    return this._content;
  }

  set content(newValue) {
    const content = document.createTextNode(newValue);
    if (this._content) {
      this._content.replaceWith(content);
    }
    this._content = content;
  }

  createNode(tagName) {
    this.node = document.createElement(tagName)
    this.node.rootNode = this;
  }

  setEvents(events) {
    if (events.length) {
      events.forEach((event) => {
        this.node.addEventListener(event.name, () => {
          event.callback.call(this);
        })
      })
    }
  }

  setContent() {
    if (this.content !== null) {
      this.node.append(this.content);
    }
  }

  setAttributes() {
    if (this.attributes.length) {
      const context = this;

      this.attributes.forEach((attr) => {
        if (typeof attr.value === 'object') {
          this[attr.name] = new Proxy({}, {
            set(target, prop, value) {
              target[prop] = value;

              context.node.setAttribute(attr.name, target[prop]);

              return true
            }
          })

          attr.value.subsribeObj(this[attr.name], 'value')

          this.node.setAttribute(attr.name, attr.value.value);
        } else {
          this.node.setAttribute(attr.name, attr.value);
        }
      })
    }
  }

  setChildren(children) {
    if (children.length) {
      children.forEach((child) => {
        this.node.append(child.node);
      })
    }
  }

  render(tagName, events, children) {
    this.createNode(tagName);
    this.setContent();
    this.setAttributes();
    this.setEvents(events);
    this.setChildren(children);
  }

  emit(event, payload) {
    this.handlers[`${event}`](payload);
  }
}

export class Reflex {
  subscribers = []

  constructor(value) {
    this.value = value;
  }

  subsribeObj(target, prop) {
    this.subscribers.push({
      target,
      prop
    });
  }

  notifySubsribers(value) {
    this.subscribers.forEach((item) => {
      item.target[item.prop] = value;
    });
  }
}