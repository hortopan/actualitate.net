<script langs="ts">
  export let html = "";

  // get width and height from iframe , if exists regex
  const w = html.match(/width="(\d+)"/);
  const h = html.match(/height="(\d+)"/);

  let ratio = 16 / 9;

  if (w && h) {
    const width = parseInt(w[1], 10);
    const height = parseInt(h[1], 10);
    ratio = height / width;
  }
</script>

<div class="embed" style="--aspect-ration: {ratio}">
  {#if html}
    {@html html}
  {/if}
</div>

<style lang="scss">
  .embed {
    position: relative;
    margin: 10px auto;
    max-width: var(--max-width);

    :global {
      figure {
        aspect-ratio: var(--aspect-ratio, 16 / 9);
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
      }

      iframe {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
</style>
