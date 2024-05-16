class Wrapper {
  element: any;
  constructor(element: any) {
    this.element = element;
  }
  css(key: any, value: any) {
    this.element.style[key] = value;
    return this;
  }
}
function $(el: any) {
  return new Wrapper(el);
}
