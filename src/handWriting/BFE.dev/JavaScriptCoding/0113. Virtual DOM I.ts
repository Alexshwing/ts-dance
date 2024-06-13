// dom to obj
function virtualize(el) {
  const ans = {
    type: el.tagName.toLowerCase(),
    props: {},
  };

  const props = {};

  if (el.hasAttributes()) {
    for (const { name, value } of el.attributes) {
      props[name == 'class' ? 'className' : name] = value;
    }
  }

  const children = [];
  if (el.hasChildNodes()) {
    for (const node of el.childNodes) {
      if (node.nodeType === 1) {
        children.push(virtualize(node));
      } else if (node.nodeType === 3) {
        children.push(node.textContent);
      }
    }
  }

  if (children.length) {
    // @ts-ignore
    props.children = children.length === 1 ? children[0] : children;
  }

  ans.props = props;
  return ans;
}

// obj to dom
function render(obj) {
  let {
    type,
    props: { children, className, ...restProps },
  } = obj;

  const el = document.createElement(type);

  if (className) {
    el.classList.add(className);
  }

  if (children) {
    if (!(children instanceof Array)) {
      children = [children];
    }
    children.forEach((child) => {
      if (typeof child === 'string') {
        el.append(document.createTextNode(child));
      } else {
        el.append(render(child));
      }
    });
  }

  if (restProps) {
    Object.entries(restProps).forEach(([key, value]) => {
      el.setAttribute(key, value);
    });
  }
  return el;
}

export {};
