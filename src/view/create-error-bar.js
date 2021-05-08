import { el, select } from "../domUtils";
import { cross } from "./icons";
import getSegmentBounds from "./segment-bounds";

/**
 * Creates an error bar under the segment at the given `index`
 */
export default (index) => {
  const [left, right] = getSegmentBounds(index, index);

  const errorBar = el("div", { class: "bar" }, [cross]);
  errorBar.style.left = `${left}px`;
  errorBar.style.right = `${right}px`;

  select(".container").appendChild(errorBar);
};
