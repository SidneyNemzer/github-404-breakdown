import { el, addClass } from "../domUtils";
import { check } from "./icons";
import { CONTAINER_PARENT_SELECTOR } from "../constants";

export default segments => {
  const container = el("div", { class: "container" }, [
    el("div", { class: "segments" }, [
      el("span", { class: "segment success" }, "github.com"),

      ...segments.flatMap((segment, index) => [
        el("span", { class: "slash" }, "/"),
        el("span", { class: "segment loading" }, segment)
      ])
    ]),

    el("div", { class: "bar success-bar" }, [check]),

    el("div", { class: "loading-container" }, [
      el("div", { class: "loading-bar loading-bar-1" }),
      el("div", { class: "spacer" }),
      el("div", { class: "loading-bar loading-bar-2" }),
      el("div", { class: "spacer" }),
      el("div", { class: "loading-bar loading-bar-3" })
    ])
  ]);

  const layoutContainer = el("div", { class: "layout-container" }, [container]);

  document
    .querySelector(CONTAINER_PARENT_SELECTOR)
    .insertAdjacentElement("afterend", layoutContainer);

  setTimeout(() => {
    addClass(container, "show");
  });
};
