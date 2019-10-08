import { selectAll, select } from "../domUtils";

/**
 * Moves the success bar to be under the segments between 0 and `index`
 */
export default index => {
  const container = select(".container");
  const segments = selectAll(".segment");

  console.log(index);

  const leftSegment = segments[0];
  const rightSegment = segments[index];

  const containerBounds = container.getBoundingClientRect();
  const leftSegmentBounds = leftSegment.getBoundingClientRect();
  const rightSegmentBounds = rightSegment.getBoundingClientRect();

  const left = leftSegmentBounds.left - containerBounds.left;
  const right = containerBounds.right - rightSegmentBounds.right;

  const successBar = select(".success-bar");
  successBar.style.left = `${left}px`;
  successBar.style.right = `${right}px`;
  successBar.style.width = "auto";
};
