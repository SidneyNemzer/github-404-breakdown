import { NOT_FOUND_PAGE_SELECTOR } from "./constants";

declare const chrome: any;

const isNotFoundPage = !!document.querySelector(NOT_FOUND_PAGE_SELECTOR);

if (isNotFoundPage) {
  const script = document.createElement("script");
  script.setAttribute("src", chrome.runtime.getURL("github-404-breakdown.js"));
  document.body.appendChild(script);
}
