<script lang="ts">
  type Type = "success" | "error";

  export let type: Type;

  export let left: number;
  export let right: number;
</script>

<div
  class="g4b-bar"
  style="left: {left}px; right: {right}px; width: auto; background: var(--{type}-color);"
>
  <span class="g4b-icon" style="background: var(--{type}-color)">
    {#if type === "success"}
      <svg
        viewBox="0 0 12 16"
        version="1.1"
        width="12"
        height="16"
        fill="white"
      >
        <path
          fill-rule="evenodd"
          d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z"
        />
      </svg>
    {:else}
      <svg
        viewBox="0 0 12 16"
        version="1.1"
        width="12"
        height="16"
        fill="white"
      >
        <path
          fill-rule="evenodd"
          d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"
        />
      </svg>
    {/if}
  </span>
</div>

<style>
  /* Classes are prefixed with g4b to avoid getting styles from GitHub's CSS
     See: docs/prefix.md
   */

  .g4b-bar {
    position: absolute;
    height: 4px;
    top: calc(70% - 2px);
    border-radius: 4px;
    transition: opacity 0.5s, right 1s cubic-bezier(0, 1, 0.38, 1);
  }

  .g4b-icon {
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    left: calc(50% - 20px / 2);
    top: calc(50% - 20px / 2);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.5s;
  }
</style>
