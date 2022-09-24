import App from "./App.svelte";
import { testPaths } from "./check-url";
import { CLASS_PREFIX, CONTAINER_PARENT_SELECTOR } from "./constants";

const mainClassname = CLASS_PREFIX + "main";

const main = () => {
  if (document.querySelector("." + mainClassname)) {
    // Already injected content, nothing to do. This can occur when navigating
    // with the browser back button to a 404 page.
    return;
  }

  const div = document.createElement("div");
  div.classList.add(mainClassname);

  const parent = document.querySelector(CONTAINER_PARENT_SELECTOR);
  parent.insertAdjacentElement("afterend", div);

  const segments = [
    {
      content: "github.com",
      left: 0,
      right: 0,
      hovered: false,
    },
    ...window.location.pathname
      .split("/")
      .filter((segment) => segment !== "")
      .map((segment) => ({
        content: segment,
        left: 0,
        right: 0,
        hovered: false,
      })),
  ];

  const app = new App({
    target: div,
    props: { segments, status: "loading", index: 1 },
  });

  const onPathTested = (index: number, ok: boolean) => {
    if (ok) {
      // Given index was ok, move to the next segment. Shifted by one extra due to
      // `github.com` prefix.
      app.$set({ index: index + 2, status: "loading" });
    } else {
      // Given index returned 404, mark it as errored. Shifted by one extra due to
      // `github.com` prefix.
      app.$set({ index: index + 1, status: "error" });
    }
  };

  // TODO catch errors here
  testPaths(window.location.pathname, onPathTested);
};

main();
