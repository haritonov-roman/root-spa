import { Root, RootElem, Reflex } from "./classes.js";

export function root(config) {
  return new Root(config).create()
}

export function rootElem(params) {
  return new RootElem(params);
}

export function rootRef(defaultValue) {
  return new Proxy(new Reflex(defaultValue), {
    set(target, prop, value) {
      target[prop] = value;

      target.notifySubsribers(target[prop]);

      return true;
    }
  })
}

export function rootComp(fn, subs) {
  const comp = new Proxy(new Reflex(fn), {
    get(target, prop) {
      if (prop === 'value') {
        return target[prop]();
      } else {
        return target[prop];
      }
    },
    set(target, prop) {
      target.notifySubsribers(target[prop]());
      return true;
    }
  });

  subs.forEach((sub) => {
    sub.subsribeObj(comp, 'value');
  });

  return comp
}