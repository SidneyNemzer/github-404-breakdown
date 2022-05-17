import App from "./App.svelte";
import { testPaths } from "./check-url";
import { CONTAINER_PARENT_SELECTOR } from "./constants";

const parent = document.querySelector(CONTAINER_PARENT_SELECTOR);

const segments = window.location.pathname
  .split("/")
  .filter((segment) => segment !== "")
  .map((segment) => ({
    content: segment,
    left: 0,
    right: 0,
    hovered: false,
  }));

const div = document.createElement("div");
parent.insertAdjacentElement("afterend", div);

const app = new App({
  target: div,
  props: { segments, status: "loading", index: 1 },
});

const onPathTested = (index: number, ok: boolean) => {
  if (ok) {
    app.$set({ index: index + 1, status: "loading" });
  } else {
    app.$set({ index, status: "error" });
  }
};

// TODO catch errors here
testPaths(window.location.pathname, onPathTested);
