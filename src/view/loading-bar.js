import { select, selectAll } from "../domUtils";

export const hideLoadingBar = () => {
  const loadingBar = select(".loading-container");
  loadingBar.style.display = "none";
};

export const moveLoadingBar = (index) => {
  const container = select(".container");
  const segments = selectAll(".segment");

  const loadingSegment = segments[index];

  const containerBounds = container.getBoundingClientRect();
  const loadingSegmentBounds = loadingSegment.getBoundingClientRect();

  const left = loadingSegmentBounds.left - containerBounds.left;
  const right = containerBounds.right - loadingSegmentBounds.right;

  const loadingBar = select(".loading-container");
  loadingBar.style.left = `${left}px`;
  loadingBar.style.right = `${right}px`;
};
