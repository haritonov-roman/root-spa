export function input(value, callback) {
  const state = {
    value
  }

  const node = document.createElement('input');

  node.value = state.value

  node.addEventListener('change', (e) => {
    callback(e.target.value)
  })

  return node
}
