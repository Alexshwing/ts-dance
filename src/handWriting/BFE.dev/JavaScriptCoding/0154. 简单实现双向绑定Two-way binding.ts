/*

来简单实现下双向绑定。

请实现函数model(state, element)，使得state.value和HTMLInputElement element联动。

const input = document.createElement('input')
const state = { value: 'BFE' }
model(state, input)

console.log(input.value) // 'BFE'
state.value = 'dev'
console.log(input.value) // 'dev'
input.value = 'BFE.dev'
input.dispatchEvent(new Event('change'))
console.log(state.value) // 'BFE.dev'
*/

function model(state: { value: string }, element: HTMLInputElement) {
  element.value = state.value;

  Object.defineProperty(state, 'value', {
    get() {
      return element.value;
    },
    set(newVal) {
      element.value = newVal;
      return true;
    },
  });

  element.addEventListener('change', (event) => {
    state.value = event.target.value;
  });
}
