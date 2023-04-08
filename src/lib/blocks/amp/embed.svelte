<script langs="ts">
  export let html = "";

  // get width and height from iframe , if exists regex
  const w = html.match(/width="(\d+)"/);
  const h = html.match(/height="(\d+)"/);

  // get iframe src from html
  const src = html.match(/src="([^"]+)"/)?.[1];

  let width = 1920;
  let height = 1080;

  if (w && h) {
    width = parseInt(w[1], 10);
    height = parseInt(h[1], 10);
  }
</script>

{#if src}
  <amp-iframe
    {width}
    {height}
    sandbox="allow-scripts allow-same-origin allow-presentation"
    layout="responsive"
    frameborder="0"
    {src}><amp-img layout="fill" src="/external.svg" placeholder /></amp-iframe
  >
{/if}

<style>
  amp-iframe {
    margin: 15px -15px 15px -15px;
  }
</style>
