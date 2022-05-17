<script lang="ts">
  import App from "./App.svelte";

  let key = false;

  const remount = () => {
    key = !key;
  };

  let index = 1;

  let status: "loading" | "error" = "loading";

  let segmentsInput = `github.com
sidneynemzer
github-404-breakdown
blob
master
images
screenshot-1.pngg
screenshot-1.pngg`;

  $: segments = segmentsInput.split("\n").map((segment) => ({
    content: segment,
    left: 0,
    right: 0,
    hovered: false,
  }));

  $: index = Math.min(index, segments.length - 1);
</script>

{#key key}
  <App {segments} {status} {index} />
{/key}

<div class="controls-layout">
  <div style:margin-right="100px">
    <div>
      <button on:click={remount}>Remount</button>
    </div>
    <div>
      <label>
        Position:
        <input
          type="number"
          bind:value={index}
          min={0}
          max={segments.length - 1}
        />
      </label>
    </div>
    <div>
      <label>
        State:
        <select bind:value={status}>
          <option>loading</option>
          <option>error</option>
        </select>
      </label>
    </div>
  </div>

  <div class="segments-input-container">
    Segments
    <span style:font-size="12px">one per line, remount when done</span>
    <textarea rows="9" cols="34" bind:value={segmentsInput} />
  </div>
</div>

<style>
  .controls-layout {
    margin-top: 30px;
    display: flex;
    justify-content: center;
  }

  .segments-input-container {
    display: flex;
    flex-direction: column;
  }
</style>
