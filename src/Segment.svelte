<script lang="ts">
  import { onMount } from "svelte";

  /**
   * status determines the color of the segment
   * - true -> success
   * - false -> error
   * - undefined -> unknown
   */
  export let status: boolean | undefined = undefined;
  export let content: string;
  export let url: string;
  export let highlight: boolean;
  /**
   * When a segment becomes active, it tries to scroll itself into view
   */
  export let active: boolean;

  /**
   * centerWhen is an action that calls `scrollIntoView` when `active` changes
   * to `true`.
   */
  const centerWhen = (element: HTMLElement, active: boolean) => {
    const scrollIntoView = (active: boolean) => {
      if (active) {
        element.scrollIntoView({
          behavior: "smooth",
          // Horizontial alignment
          inline: "center",
          // Vertical alignment - Since the widget itself never scrolls
          // vertically, the browser would scroll the whole page down. "end"
          // asks the browser to place the element at the bottom of the page,
          // which does nothing (as long as the user hasn't scrolled down).
          block: "end",
        });
      }
    };

    scrollIntoView(active);
    return { update: scrollIntoView };
  };

  /**
   * left is the number of pixels between the left side of the page and this
   * segment
   */
  export let left: number = 0;

  /**
   * right is the number of pixels between the right side of the page and this
   * segment
   */
  export let right: number = 0;

  /**
   * hovered indicates if the mouse is hovered over the segment
   */
  export let hovered: boolean = false;

  let element: HTMLSpanElement | undefined;

  onMount(() => {
    const bounding = element.getBoundingClientRect();
    left = bounding.left;
    right = bounding.right;
  });
</script>

<span
  bind:this={element}
  on:mouseenter={() => (hovered = true)}
  on:mouseleave={() => (hovered = false)}
  use:centerWhen={active}
  class="g4b-segment"
  class:g4b-highlight={highlight}
  class:g4b-success={status === true}
  class:g4b-error={status === false}
>
  <a href={url}>
    {content}
  </a>
</span>

<style>
  /* Classes are prefixed with g4b to avoid getting styles from GitHub's CSS
     See: docs/prefix.md
   */

  .g4b-segment a {
    transition: color 0.2s;
    text-decoration: none;
    color: inherit;
  }

  .g4b-segment.g4b-highlight a {
    color: var(--link-color);
  }

  .g4b-segment {
    color: #c2c2c2;
  }

  .g4b-success {
    color: var(--success-color);
    cursor: pointer;
  }

  .g4b-error {
    color: var(--error-color);
  }
</style>
