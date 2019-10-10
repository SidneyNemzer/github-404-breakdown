import "./style.scss";
import { testPaths } from "./check-url";
import { NOT_FOUND_PAGE_SELECTOR } from "./constants";
import renderPath from "./view/path";
import resizeSuccessBar from "./view/resize-success-bar";
import { hideLoadingBar, moveLoadingBar } from "./view/loading-bar";
import addClassToSegments from "./view/add-class-to-segments";
import createErrorBar from "./view/create-error-bar";
import showLinkOnHover, { renderLink } from "./view/show-success-on-hover";
import addAnchors from "./view/add-anchors";

const isNotFoundPage = () => !!document.querySelector(NOT_FOUND_PAGE_SELECTOR);

const onPathTested = (index, ok) => {
  if (ok) {
    resizeSuccessBar(index + 1);
    moveLoadingBar(index + 2);
    addClassToSegments(0, index + 1, "success");
    addAnchors();
  } else {
    resizeSuccessBar(index);
    addClassToSegments(0, index, "success");
    addAnchors();
    addClassToSegments(index + 1, index + 1, "not-found");
    createErrorBar(index + 1);
    hideLoadingBar();
  }
  renderLink();
};

if (isNotFoundPage()) {
  const segments = window.location.pathname
    .split("/")
    .filter(segment => segment !== "");

  // Add the default content to the page
  renderPath(segments);
  moveLoadingBar(1);
  resizeSuccessBar(0);
  showLinkOnHover();

  // TODO catch errors here
  testPaths(window.location.pathname, onPathTested);
}
