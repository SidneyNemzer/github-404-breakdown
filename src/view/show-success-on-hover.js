import { selectAll, removeClass, select, addClass } from "../domUtils";

export const renderLink = () => {
  const segments = selectAll(".segment.success");
  const hovered = select(".segment.success:hover");

  let beforeHovered = !!hovered;
  segments.forEach(segment => {
    if (beforeHovered) {
      addClass(segment, "part-of-link");
    } else {
      removeClass(segment, "part-of-link");
    }

    if (segment === hovered) {
      beforeHovered = false;
    }
  });
};

export default () => {
  const segments = selectAll(".segment");
  segments.forEach(segment => {
    segment.addEventListener("mouseenter", renderLink);
    segment.addEventListener("mouseleave", renderLink);
  });
};
