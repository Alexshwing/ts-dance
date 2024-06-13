function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children,
    },
  };
}

function render(obj) {
  let {
    type,
    props: { children, ...attrs },
  } = obj;
  const el = document.createElement(type);

  Object.entries(attrs).forEach(([key, value]) => {
    el.setAttribute(key === 'className' ? 'class' : key, value);
  });

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

  return el;
}

export {};
