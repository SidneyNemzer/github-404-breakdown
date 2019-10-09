import { findTypes } from "./util";
import { CLASS_PREFIX } from "./constants";

// TODO el('div', [children]) should work but it does not
export const el = (name, ...args) => {
  const { attributes = {}, children = [], text } = findTypes(
    { attributes: "object", children: "array", text: "string" },
    args
  );
  const node = document.createElement(name);
  Object.keys(attributes).forEach(attributeName => {
    const attributeValue = attributes[attributeName];
    if (attributeName === "class") {
      const classes = attributeValue.split(" ");
      node.setAttribute(
        "class",
        classes.map(class_ => CLASS_PREFIX + class_).join(" ")
      );
    } else {
      node.setAttribute(attributeName, attributeValue);
    }
  });
  children.forEach(child => node.appendChild(child));
  if (typeof text === "string") {
    node.innerText = text;
  }
  return node;
};

const prefixClassesInSelector = selector => {
  const classes = selector.split(".");
  if (classes.length > 1) {
    return classes
      .map(class_ => {
        if (class_.length > 0) {
          return CLASS_PREFIX + class_;
        } else {
          return class_;
        }
      })
      .join(".");
  }
  return selector;
};

export const selectAll = selector =>
  Array.from(document.querySelectorAll(prefixClassesInSelector(selector)));

export const select = selector =>
  document.querySelector(prefixClassesInSelector(selector));

export const addClass = (element, class_) => {
  element.classList.add(CLASS_PREFIX + class_);
};
