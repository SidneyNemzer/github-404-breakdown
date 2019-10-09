import "./style.scss";
import { testPaths } from "./check-url";
import { NOT_FOUND_PAGE_SELECTOR } from "./constants";
import renderPath from "./view/path";
import resizeSuccessBar from "./view/resize-success-bar";
import { hideLoadingBar, moveLoadingBar } from "./view/loading-bar";
import addClassToSegments from "./view/add-class-to-segments";
import createErrorBar from "./view/create-error-bar";

const isNotFoundPage = () => !!document.querySelector(NOT_FOUND_PAGE_SELECTOR);

const onPathTested = (index, ok) => {
  if (ok) {
    resizeSuccessBar(index + 1);
    moveLoadingBar(index + 2);
    addClassToSegments(0, index + 1, "success");
  } else {
    resizeSuccessBar(index);
    addClassToSegments(0, index, "success");
    addClassToSegments(index + 1, index + 1, "not-found");
    createErrorBar(index + 1);
    hideLoadingBar();
  }
};

if (isNotFoundPage()) {
  const segments = window.location.pathname
    .split("/")
    .filter(segment => segment !== "");

  // Show the URL on the page
  renderPath(segments);
  moveLoadingBar(1);
  resizeSuccessBar(0);

  // TODO catch errors here
  testPaths(window.location.pathname, onPathTested);
}
