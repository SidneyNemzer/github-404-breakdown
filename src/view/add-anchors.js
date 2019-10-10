import { selectAll, el } from "../domUtils";

/**
 * Inserts `<a>`'s into the DOM for the segments that have succeeded.
 * Makes sure not to insert multiple `<a>` for one segment.
 */
export default () => {
  const segments = selectAll(".segment.success");
  let url = "https:/";
  segments.forEach((segmentElement, index) => {
    let segment = segmentElement.innerText;

    // `blob` means file and `tree` means folder. Github can redirect to the correct
    // one, unless you're requesting a branch -- it must be `tree` for a branch, `blob`
    // won't work. Since `tree` works in all other cases, we just use `tree`.
    if (index === 3 && segment === "blob") {
      segment = "tree";
    }

    url += "/" + segment;

    const hasAnchor = !!segmentElement.querySelector("a");
    if (!hasAnchor) {
      const a = el("a", { href: url }, segmentElement.innerText);
      segmentElement.innerText = "";
      segmentElement.appendChild(a);
    }
  });
};
