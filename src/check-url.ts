export class UnexpectedStatus extends Error {
  res: Response;

  constructor(res: Response) {
    super("Unexpected status: " + res.status);
    this.res = res;
  }
}

/**
 *
 * @param {string} segment
 * @param {string[]} previousSegments Note: may be mutated
 * @param {boolean} hasNextSegment
 * @returns {Promise<boolean>} `true` for 2xx response, `false` for 404, throws an
 *  error for any other response.
 */
export const testPath = async (segment, previousSegments, hasNextSegment) => {
  // We know the last segment fails because the page 404'd
  if (!hasNextSegment) {
    return false;
  }

  // `tree` appears in folder URLs and "blob" appears in file URLs, but they aren't
  // pages on GitHub. We can skip them.
  if (
    previousSegments.length === 2 &&
    (segment === "tree" || segment === "blob")
  ) {
    return true;
  }

  // `blob` means file and `tree` means folder. Github can redirect to the correct
  // one, unless you're requesting a branch -- it must be `tree` for a branch, `blob`
  // won't work. Since `tree` works in all other cases, we just use `tree`.
  if (previousSegments[2] === "blob") {
    previousSegments[2] = "tree";
  }

  const path = "/" + previousSegments.concat([segment]).join("/");

  const res = await fetch(path);
  if (res.ok) {
    return true;
  } else if (res.status === 404) {
    return false;
  }

  throw new UnexpectedStatus(res);
};

/**
 * @param {string} path
 * @param {(number, bool) => void} update
 * @param {Function} testPath
 */
export const testPaths = async (path, update, testPath_ = testPath) => {
  const segments = path.split("/").filter((segment) => !!segment);
  const oks = new Set();
  let backtracked = false;
  let index = 0;

  // This condition prevents out-of-bounds access, however, the fuction should
  // always return early
  while (index >= 0 && index < segments.length) {
    const ok = await testPath_(
      segments[index],
      segments.slice(0, index),
      index < segments.length - 1
    );

    if (ok && backtracked) {
      // If the path passes and the next path fails
      update(index + 1, false);
      return;
    } else if (ok) {
      // If the path passes
      oks.add(index);
      update(index, true);
      index = Math.min(index + 2, segments.length - 1);
    } else if (oks.has(index - 1) || index === 0) {
      // The path 404'd and the previous path passes
      update(index, false);
      return;
    } else {
      // The path 404'd but we don't know if the previous path passes
      backtracked = true;
      index--;
    }
  }

  throw new Error("the loop should never terminate like this");
};
