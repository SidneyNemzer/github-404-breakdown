import App from "./App.svelte";
import { testPaths } from "./check-url";
import { CONTAINER_PARENT_SELECTOR } from "./constants";

const parent = document.querySelector(CONTAINER_PARENT_SELECTOR);

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

const div = document.createElement("div");
parent.insertAdjacentElement("afterend", div);

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
