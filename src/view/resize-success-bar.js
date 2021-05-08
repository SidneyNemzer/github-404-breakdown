import { select } from "../domUtils";
import getSegmentBounds from "./segment-bounds";

/**
 * Moves the success bar to be under the segments between 0 and `index`
 */
export default (index) => {
  const [left, right] = getSegmentBounds(0, index);

  const successBar = select(".success-bar");
  successBar.style.left = `${left}px`;
  successBar.style.right = `${right}px`;
  successBar.style.width = "auto";
};
