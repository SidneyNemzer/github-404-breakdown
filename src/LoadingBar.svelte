<script lang="ts">
  /**
   * LoadingBar renders an animated bar to indicate loading is in progress.
   *
   * The LoadingBar is intended to be placed in relation to another element.
   * Pass the `left` and `right` of the related element.
   *
   * The LoadingBar resizes between 49px and 70px. When the space is smaller or
   * larger, the LoadingBar will be 49px or 70px respectivly, centered on the
   * available space.
   *
   *     space = parent width - right - left
   *
   *     //    --Parent-------------------------------
   *     //                --Sibling--
   *     //           Left ^---------^ Right
   *     //                   Space
   *
   * The "parent width" is not a prop of LoadingBar. The LoadingBar is
   * positioned with CSS that implements the above sizing rules.
   */

  export let left: number;
  export let right: number;

  // The following calculations are constant at runtime. They're calculated like
  // this so that we have a single source of truth -- they're refereced in CSS
  // via CSS variables.

  const height = 5;
  const segmentWidth = 20;
  const spacerWidth = 5;

  const minWidthFraction = 0.7;
  const desiredWidth = segmentWidth * 3 + spacerWidth * 2;
  const minWidth = desiredWidth * minWidthFraction;
</script>

<div
  class="g4b-position"
  style:left="{left}px"
  style:right="{right}px"
  style:--height="{height}px"
>
  <div
    class="g4b-loading-container"
    style:min-width="{minWidth}px"
    style:--segment-width="{segmentWidth}px"
    style:--spacer-width="{spacerWidth}px"
  >
    <div class="g4b-segment g4b-segment-1" />
    <div class="g4b-spacer" />
    <div class="g4b-segment g4b-segment-2" />
    <div class="g4b-spacer" />
    <div class="g4b-segment g4b-segment-3" />
  </div>
</div>

<style>
  /* Classes are prefixed with g4b to avoid getting styles from GitHub's CSS
     See: docs/prefix.md
   */

  .g4b-position {
    display: flex;
    justify-content: center;
    position: absolute;
    top: calc(70% - var(--height) / 2);
  }

  .g4b-loading-container {
    display: flex;
    transition: opacity 0.5s;
  }

  .g4b-spacer {
    width: var(--spacer-width);
  }

  .g4b-segment {
    background: #e8e8e8;
    width: var(--segment-width);
    height: var(--height);
  }

  .g4b-segment-1 {
    animation: 0.9s linear infinite g4b-segment-flash;
  }
  .g4b-segment-2 {
    animation: 0.9s linear 0.3s infinite g4b-segment-flash;
  }
  .g4b-segment-3 {
    animation: 0.9s linear 0.6s infinite g4b-segment-flash;
  }

  @keyframes g4b-segment-flash {
    0% {
      background: #e8e8e8;
    }

    100% {
      background: #868686;
    }
  }
</style>
