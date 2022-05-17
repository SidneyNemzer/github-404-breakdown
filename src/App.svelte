<script lang="ts">
  import { onMount } from "svelte";

  import type { SegmentData } from "./types";
  import Bar from "./Bar.svelte";
  import LoadingBar from "./LoadingBar.svelte";
  import Segment from "./Segment.svelte";
  import Slash from "./Slash.svelte";

  export let segments: SegmentData[];

  export let index: number;

  /**
   * status describes the `segment` at `index`. All previous segements are
   * assumed to be "success".
   */
  export let status: "loading" | "error";

  let visible = false;

  $: height = visible ? 80 : 0;
  $: padding = visible ? 10 : 0;

  let contentDiv: HTMLElement | undefined;
  let left = 0;
  // Infinity avoids animating from 0 on the first render
  let right = Infinity;

  const setBounding = () => {
    const bounds = contentDiv.getBoundingClientRect();
    left = bounds.left;
    right = bounds.right;
  };

  onMount(() => {
    visible = true;
    setBounding();
  });

  $: getSegmentStatus = (i: number) => {
    if (status === "loading") {
      if (i < index) {
        return true;
      }

      return undefined;
    } else {
      if (i === index) {
        return false;
      }

      if (i < index) {
        return true;
      }

      return undefined;
    }
  };
</script>

<div class="g4b-layout">
  <div
    class="g4b-container"
    style:height="{height}px"
    style:padding="{padding}px 10px"
  >
    <div class="g4b-content" bind:this={contentDiv}>
      {#each segments as segment, i}
        <Segment
          bind:left={segment.left}
          bind:right={segment.right}
          bind:hovered={segment.hovered}
          active={index === i}
          status={getSegmentStatus(i)}
          content={segment.content}
          url={// URL is this segment and all previous segments joined with slashes
          "https://" +
            segments
              .slice(0, i + 1)
              .map((segment) => segment.content)
              .join("/")}
          highlight={// Highlight when any segment to the right of this one is hovered
          segments.slice(i).some((segment) => segment.hovered)}
        />
        {#if i < segments.length - 1}
          <Slash />
        {/if}
      {/each}
      {#if segments.length > 1 && index > 0}
        <Bar
          type="success"
          left={segments[0].left - left}
          right={right - segments[index - 1].right}
        />
      {/if}
      {#if status === "loading"}
        <LoadingBar
          left={segments[index].left - left}
          right={right - segments[index].right}
        />
      {/if}
      {#if status === "error"}
        <Bar
          type="error"
          left={segments[index].left - left}
          right={right - segments[index].right}
        />
      {/if}
    </div>
  </div>
</div>

<style>
  /* Classes are prefixed with g4b to avoid getting styles from GitHub's CSS
     See: docs/prefix.md
   */

  .g4b-layout {
    /* This prevents the container from filling the available width like a block
       element */
    display: flex;
  }

  .g4b-container {
    /* These variables are referenced in child components */
    --success-color: #2cbe4e;
    --error-color: #cb2431;
    --link-color: #0366d6;
    --background-gray: #fafbfc;

    display: flex;
    overflow: auto;
    max-width: 1000px;
    padding: 0 10px;
    margin: 32px auto 0;
    background: var(--background-gray);
    border: 1px solid #e1e4e8;
    border-radius: 3px;
    font-size: 20px;
    transition: height 0.5s, padding 0.5s;
    white-space: nowrap;
  }

  .g4b-content {
    position: relative;
  }

  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 5px;
    height: 5px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: #d0d7de;
  }
</style>
