export function btn(params) {
  const state = {
    _data_: 0,

    get data() {
      console.log('get')
      return this._data_;
    },

    set data(val) {
      console.log('set')
      this._data_ = val;
    }
  };

  const computed = {
    content: function () {
      return `${params.text} - ${state.data}`
    }
  }

  const template = {
    name: 'button',
    attributes: null,
    content: computed.content(),
    events: [
      {
        name: 'click',
        callback: function () {
          state.data++;
          // template.content = computed.content();

          // console.log(template)
        }
      }
    ],
    childNodes: null
  }

  function rf (tmp) {
    const result = document.createElement(tmp.name);
    result.insertAdjacentHTML('beforeend', tmp.content);

    tmp.events.forEach((item) => {
      result.addEventListener(item.name, item.callback)
    })

    return result
  }

  return {
    template: rf(template)
  }
}
