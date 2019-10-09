import { selectAll, select } from "../domUtils";

/**
 * Calculates the left bound of the segment at `start` index and the
 * right bound of the segment at `end` index. Bounds are relative
 * to the container, so they can be used on `position: absolute`
 * elements inside the container for `left` and `right` properties.
 * @returns <[number, number]> the left and right bounds, in pixels,
 *                             as a tuple.
 */
export default (start, end) => {
  const container = select(".container");
  const segments = selectAll(".segment");

  const leftSegment = segments[start];
  const rightSegment = segments[end];

  const containerBounds = container.getBoundingClientRect();
  const leftSegmentBounds = leftSegment.getBoundingClientRect();
  const rightSegmentBounds = rightSegment.getBoundingClientRect();

  const left = leftSegmentBounds.left - containerBounds.left;
  const right = containerBounds.right - rightSegmentBounds.right;

  return [left, right];
};
