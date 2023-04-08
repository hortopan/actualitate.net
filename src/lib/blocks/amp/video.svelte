<script lang="ts">
  export let html: string;

  // try to find aspect ration from html video
  const w = html.match(/width="(\d+)"/);
  const h = html.match(/height="(\d+)"/);

  // get poster from background image
  const poster = html.match(/background-image: url\(([^)]+)\)/)?.[1];

  // get source from html
  const src = html.match(/src="([^"]+)"/)?.[1];

  let width = 1920;
  let height = 1080;

  if (w && h) {
    width = parseInt(w[1], 10);
    height = parseInt(h[1], 10);
  }
</script>

{#if src}
  <div class="container">
    <amp-video controls {width} {height} layout="responsive" {poster}>
      <source {src} type="video/mp4" />
      <div fallback>
        <p>This browser does not support the video element.</p>
      </div>
    </amp-video>
  </div>
{/if}
