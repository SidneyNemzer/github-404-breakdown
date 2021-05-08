import { selectAll, addClass } from "../domUtils";

export default (start, end, class_) => {
  const segments = selectAll(".segment");
  segments
    .slice(start, end + 1)
    .forEach((segment) => addClass(segment, class_));
};
