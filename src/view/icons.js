import { el } from "../domUtils";

const crossSvg = `
  <svg viewBox="0 0 12 16" version="1.1" width="12" height="16" fill="white">
    <path fill-rule="evenodd" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"></path>
  </svg>
`;
const checkSvg = `
  <svg viewBox="0 0 12 16" version="1.1" width="12" height="16" fill="white">
    <path fill-rule="evenodd" d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z"></path>
  </svg>
`;

export const cross = el("span", { class: "icon" });
cross.innerHTML = crossSvg;

export const check = el("span", { class: "icon" });
check.innerHTML = checkSvg;
